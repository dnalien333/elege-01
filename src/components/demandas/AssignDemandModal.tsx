import { useState, useEffect } from "react";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

type Demand = {
  id: string;
  title: string;
  assigned_to: string | null;
  campaign_id: string;
};

type AssignDemandModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  demand: Demand | null;
};

type TeamMember = {
  id: string;
  full_name: string;
  avatar_url: string | null;
};

export function AssignDemandModal({ open, onOpenChange, demand }: AssignDemandModalProps) {
  const queryClient = useQueryClient();
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch team members (colaboradores from the campaign)
  const { data: teamMembers = [] } = useQuery({
    queryKey: ["team-members", demand?.campaign_id],
    queryFn: async () => {
      if (!demand?.campaign_id) return [];

      const { data, error } = await supabase
        .from("colaboradores")
        .select("id, full_name")
        .eq("campaign_id", demand.campaign_id);

      if (error) throw error;
      return data as TeamMember[];
    },
    enabled: !!demand?.campaign_id && open,
  });

  useEffect(() => {
    if (demand?.assigned_to) {
      setSelectedUser(demand.assigned_to);
    }
  }, [demand]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!demand) return;

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from("demands")
        .update({ assigned_to: selectedUser || null })
        .eq("id", demand.id);

      if (error) throw error;

      // Log assignment history
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from("demand_history").insert({
          demand_id: demand.id,
          user_id: user.id,
          action: "assigned",
          field_changed: "assigned_to",
          new_value: selectedUser,
          old_value: demand.assigned_to,
        });
      }

      toast.success("Demanda atribuída com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["demands"] });
      onOpenChange(false);
    } catch (error) {
      console.error("Error assigning demand:", error);
      toast.error("Erro ao atribuir demanda");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!demand) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Atribuir Demanda</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h4 className="font-semibold mb-2">Demanda</h4>
            <p className="text-sm text-muted-foreground">{demand.title}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="assignee">Responsável</Label>
            <Select value={selectedUser} onValueChange={setSelectedUser}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um responsável" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Não atribuído</SelectItem>
                {teamMembers.map((member) => (
                  <SelectItem key={member.id} value={member.id}>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={member.avatar_url || undefined} />
                        <AvatarFallback>{member.full_name[0]}</AvatarFallback>
                      </Avatar>
                      {member.full_name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Atribuindo..." : "Atribuir"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
