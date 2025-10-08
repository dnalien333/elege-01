import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const Comunicacao = () => {
  const navigate = useNavigate();
  const [selectedSegment, setSelectedSegment] = useState<any>(null);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [currentCampaignId, setCurrentCampaignId] = useState<string>("");

  useEffect(() => {
    const initializeData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }

      // Get first campaign for the user
      const { data: campaigns } = await supabase
        .from("campaigns")
        .select("id")
        .eq("owner_id", session.user.id)
        .limit(1);

      if (campaigns && campaigns.length > 0) {
        setCurrentCampaignId(campaigns[0].id);
      }
    };

    initializeData();
  }, [navigate]);

  const { data: segments = [] } = useQuery({
    queryKey: ["saved-filters", currentCampaignId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("saved_filters")
        .select("*")
        .eq("campaign_id", currentCampaignId);

      if (error) throw error;
      return data || [];
    },
    enabled: !!currentCampaignId,
  });

  const { data: voterCount = 0 } = useQuery({
    queryKey: ["segment-count", selectedSegment],
    queryFn: async () => {
      if (!selectedSegment) return 0;

      let query = supabase
        .from("voters")
        .select("*", { count: "exact", head: true })
        .eq("campaign_id", currentCampaignId);

      const filters = selectedSegment.filters as any;
      if (filters.tags && Array.isArray(filters.tags) && filters.tags.length > 0) {
        query = query.contains("tags", filters.tags);
      }
      if (filters.city) {
        query = query.ilike("city", `%${filters.city}%`);
      }
      if (filters.state) {
        query = query.eq("state", filters.state);
      }

      const { count } = await query;
      return count || 0;
    },
    enabled: !!selectedSegment && !!currentCampaignId,
  });

  const insertMergeTag = (tag: string) => {
    setBody(body + `{{${tag}}}`);
  };

  const handleSend = () => {
    console.log("Sending email to", voterCount, "voters");
    console.log("Subject:", subject);
    console.log("Body:", body);
    toast.success(`Email enviado para ${voterCount} eleitores!`);
  };

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Comunicação
            </h1>
            <p className="text-muted-foreground">
              Envie mensagens para segmentos específicos
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Selecionar Segmento</Label>
              <Select
                onValueChange={(value) =>
                  setSelectedSegment(segments.find((s: any) => s.id === value))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="-- Escolha um segmento --" />
                </SelectTrigger>
                <SelectContent>
                  {segments.map((segment: any) => (
                    <SelectItem key={segment.id} value={segment.id}>
                      {segment.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {voterCount > 0 && (
                <p className="text-sm text-muted-foreground">
                  Esta mensagem será enviada para {voterCount} eleitores
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Assunto</Label>
              <Input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Digite o assunto do email"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Mensagem</Label>
              <div className="flex gap-2 mb-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => insertMergeTag("name")}
                >
                  Inserir nome
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => insertMergeTag("city")}
                >
                  Inserir cidade
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => insertMergeTag("state")}
                >
                  Inserir estado
                </Button>
              </div>
              <Textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Escreva sua mensagem aqui. Use tags de mesclagem para personalizar."
                rows={12}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleSend}
                disabled={!selectedSegment || !subject || !body}
              >
                Enviar Mensagem
              </Button>
              <Button variant="outline">Visualizar</Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Comunicacao;
