import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Send, User, MapPin, Building } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface NewCommunicationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  campaignId: string;
  onSuccess: () => void;
}

const NewCommunicationModal = ({
  open,
  onOpenChange,
  campaignId,
  onSuccess,
}: NewCommunicationModalProps) => {
  const [selectedSegmentId, setSelectedSegmentId] = useState<string>("");
  const [messageTemplate, setMessageTemplate] = useState("");
  const [sending, setSending] = useState(false);

  // Fetch segments
  const { data: segments } = useQuery({
    queryKey: ["segments", campaignId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("segments")
        .select("*")
        .eq("campaign_id", campaignId);

      if (error) throw error;
      return data || [];
    },
  });

  // Fetch preview voters
  const { data: previewVoters } = useQuery({
    queryKey: ["preview-voters", campaignId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("voters")
        .select("full_name, city, state")
        .eq("campaign_id", campaignId)
        .limit(3);

      if (error) throw error;
      return data || [];
    },
  });

  const insertMergeTag = (tag: string) => {
    setMessageTemplate((prev) => prev + `{{${tag}}}`);
  };

  const generatePreview = () => {
    if (!previewVoters || previewVoters.length === 0) return [];

    return previewVoters.map((voter) =>
      messageTemplate
        .replace(/\{\{nome\}\}/gi, voter.full_name || "Eleitor")
        .replace(/\{\{cidade\}\}/gi, voter.city || "")
        .replace(/\{\{estado\}\}/gi, voter.state || "")
    );
  };

  const handleSend = async () => {
    if (!selectedSegmentId) {
      toast.error("Selecione um segmento");
      return;
    }

    if (!messageTemplate.trim()) {
      toast.error("Digite uma mensagem");
      return;
    }

    setSending(true);

    try {
      const { data } = await supabase.auth.getSession();
      const selectedSegment = segments?.find((s) => s.id === selectedSegmentId);

      const { error } = await supabase.from("communications").insert({
        campaign_id: campaignId,
        segment_id: selectedSegmentId,
        message_template: messageTemplate,
        status: "sent",
        sent_count: selectedSegment?.voter_count || 0,
        sent_at: new Date().toISOString(),
        created_by: data.session?.user.id,
      });

      if (error) throw error;

      toast.success("Comunicação enviada com sucesso!");
      onSuccess();
      onOpenChange(false);
      setMessageTemplate("");
      setSelectedSegmentId("");
    } catch (error) {
      console.error("Error sending communication:", error);
      toast.error("Erro ao enviar comunicação");
    } finally {
      setSending(false);
    }
  };

  const previews = generatePreview();
  const selectedSegment = segments?.find((s) => s.id === selectedSegmentId);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nova Comunicação</DialogTitle>
          <DialogDescription>
            Crie e envie uma mensagem personalizada para um segmento
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Composer */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Segmento</Label>
              <Select value={selectedSegmentId} onValueChange={setSelectedSegmentId}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um segmento" />
                </SelectTrigger>
                <SelectContent>
                  {segments?.map((segment) => (
                    <SelectItem key={segment.id} value={segment.id}>
                      {segment.name} ({segment.voter_count} eleitores)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Mensagem</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => insertMergeTag("nome")}
                >
                  <User className="w-3 h-3 mr-1" />
                  Nome
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => insertMergeTag("cidade")}
                >
                  <MapPin className="w-3 h-3 mr-1" />
                  Cidade
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => insertMergeTag("estado")}
                >
                  <Building className="w-3 h-3 mr-1" />
                  Estado
                </Button>
              </div>
              <Textarea
                value={messageTemplate}
                onChange={(e) => setMessageTemplate(e.target.value)}
                placeholder="Olá {{nome}}, tudo bem? Estamos em {{cidade}} e precisamos do seu apoio!"
                rows={10}
                maxLength={1000}
              />
              <p className="text-xs text-muted-foreground text-right">
                {messageTemplate.length}/1000 caracteres
              </p>
            </div>

            {selectedSegment && (
              <div className="p-3 bg-muted rounded-md text-sm">
                <p className="text-muted-foreground">
                  Esta mensagem será enviada para{" "}
                  <span className="font-semibold text-foreground">
                    {selectedSegment.voter_count} eleitores
                  </span>{" "}
                  do segmento "{selectedSegment.name}"
                </p>
              </div>
            )}
          </div>

          {/* Right: Preview */}
          <div className="space-y-4">
            <Label>Preview</Label>
            <Card>
              <CardContent className="pt-6 space-y-3">
                {previews.length > 0 ? (
                  previews.map((preview, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-primary/10 rounded-lg border border-primary/20"
                    >
                      <p className="text-sm whitespace-pre-wrap">{preview}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <p className="text-sm">
                      {messageTemplate
                        ? "Selecione um segmento para ver o preview"
                        : "Digite uma mensagem para ver o preview"}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button
            onClick={handleSend}
            disabled={!selectedSegmentId || !messageTemplate.trim() || sending}
          >
            {sending ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Enviando...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Enviar
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewCommunicationModal;
