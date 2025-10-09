import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ActivitiesTab from "./ActivitiesTab";

const voterSchema = z.object({
  full_name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("Email inválido").optional().or(z.literal("")),
  phone: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  tags: z.string().optional(),
  notes: z.string().optional(),
});

type VoterFormData = z.infer<typeof voterSchema>;

interface VoterModalProps {
  voter: any;
  onClose: () => void;
  currentCampaignId?: string;
  currentUserId?: string;
}

export default function VoterModal({ voter, onClose, currentCampaignId, currentUserId }: VoterModalProps) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VoterFormData>({
    resolver: zodResolver(voterSchema),
    defaultValues: {
      full_name: voter?.full_name || "",
      email: voter?.email || "",
      phone: voter?.phone || "",
      city: voter?.city || "",
      state: voter?.state || "",
      tags: voter?.tags?.join(", ") || "",
      notes: voter?.notes || "",
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (data: VoterFormData) => {
      const tags = data.tags ? data.tags.split(",").map((t) => t.trim()).filter(Boolean) : [];
      const voterData = {
        full_name: data.full_name,
        email: data.email || null,
        phone: data.phone || null,
        city: data.city || null,
        state: data.state || null,
        tags,
        notes: data.notes || null,
        campaign_id: currentCampaignId,
      };

      if (voter?.id) {
        const { error } = await supabase.from("voters").update(voterData).eq("id", voter.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("voters").insert(voterData);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success(voter ? "Eleitor atualizado com sucesso!" : "Eleitor adicionado com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["voters"] });
      onClose();
    },
    onError: (error: any) => {
      toast.error("Erro ao salvar eleitor: " + error.message);
    },
  });

  const onSubmit = (data: VoterFormData) => {
    saveMutation.mutate(data);
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{voter ? "Editar Eleitor" : "Novo Eleitor"}</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="info" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="info">Informações</TabsTrigger>
            {voter && <TabsTrigger value="activities">Atividades</TabsTrigger>}
          </TabsList>

          <TabsContent value="info">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="full_name">Nome Completo *</Label>
                <Input id="full_name" {...register("full_name")} />
                {errors.full_name && (
                  <p className="text-sm text-destructive">{errors.full_name.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" {...register("email")} />
                  {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input id="phone" {...register("phone")} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">Cidade</Label>
                  <Input id="city" {...register("city")} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">Estado</Label>
                  <Input id="state" {...register("state")} maxLength={2} placeholder="EX: SP" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags (separadas por vírgula)</Label>
                <Input id="tags" {...register("tags")} placeholder="apoiador, voluntário, indeciso" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notas</Label>
                <Textarea id="notes" {...register("notes")} rows={4} />
              </div>

              <div className="flex gap-3 justify-end pt-4">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={saveMutation.isPending}>
                  {saveMutation.isPending ? "Salvando..." : "Salvar"}
                </Button>
              </div>
            </form>
          </TabsContent>

          {voter && (
            <TabsContent value="activities">
              <ActivitiesTab
                voterId={voter.id}
                currentCampaignId={currentCampaignId}
                currentUserId={currentUserId}
              />
            </TabsContent>
          )}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
