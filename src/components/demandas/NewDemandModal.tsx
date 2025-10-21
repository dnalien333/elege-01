import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

type NewDemandModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  campaignId: string | null;
};

export function NewDemandModal({ open, onOpenChange, campaignId }: NewDemandModalProps) {
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    channel: "whatsapp" as const,
    priority: "medium" as const,
    urgency: "medium" as const,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!campaignId) {
      toast.error("Nenhuma campanha selecionada");
      return;
    }

    setIsSubmitting(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não autenticado");

      const { error } = await supabase.from("demands").insert({
        ...formData,
        campaign_id: campaignId,
        created_by: user.id,
        status: "unassigned",
      });

      if (error) throw error;

      toast.success("Demanda criada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["demands"] });
      onOpenChange(false);
      setFormData({
        title: "",
        description: "",
        channel: "whatsapp",
        priority: "medium",
        urgency: "medium",
      });
    } catch (error) {
      console.error("Error creating demand:", error);
      toast.error("Erro ao criar demanda");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nova Demanda</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Digite o título da demanda"
                required
                maxLength={100}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="channel">Canal *</Label>
              <Select
                value={formData.channel}
                onValueChange={(value: any) => setFormData({ ...formData, channel: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="whatsapp">WhatsApp</SelectItem>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="facebook">Facebook</SelectItem>
                  <SelectItem value="phone">Telefone</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="in_person">Presencial</SelectItem>
                  <SelectItem value="website">Website</SelectItem>
                  <SelectItem value="gabinete">Gabinete</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Descreva a demanda em detalhes"
              rows={4}
              maxLength={2000}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priority">Prioridade *</Label>
              <Select
                value={formData.priority}
                onValueChange={(value: any) => setFormData({ ...formData, priority: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">🔵 Baixa</SelectItem>
                  <SelectItem value="medium">🟡 Média</SelectItem>
                  <SelectItem value="high">🟠 Alta</SelectItem>
                  <SelectItem value="critical">🔴 Crítica</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="urgency">Urgência *</Label>
              <Select
                value={formData.urgency}
                onValueChange={(value: any) => setFormData({ ...formData, urgency: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">🟢 Baixa</SelectItem>
                  <SelectItem value="medium">🔵 Média</SelectItem>
                  <SelectItem value="high">🟠 Alta</SelectItem>
                  <SelectItem value="critical">🔴 Crítica</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Criando..." : "Criar Demanda"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
