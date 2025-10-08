import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Phone, Home, Calendar, FileText, DollarSign, Loader2 } from "lucide-react";

const activityIcons = {
  call: Phone,
  visit: Home,
  event: Calendar,
  note: FileText,
  donation: DollarSign,
};

const activityColors = {
  call: "text-blue-600",
  visit: "text-green-600",
  event: "text-purple-600",
  note: "text-gray-600",
  donation: "text-yellow-600",
};

interface ActivitiesTabProps {
  voterId: string;
  currentCampaignId?: string;
  currentUserId?: string;
}

export default function ActivitiesTab({ voterId, currentCampaignId, currentUserId }: ActivitiesTabProps) {
  const [title, setTitle] = useState("");
  const [activityType, setActivityType] = useState<string>("call");
  const [description, setDescription] = useState("");
  const queryClient = useQueryClient();

  const { data: activities = [], isLoading } = useQuery({
    queryKey: ["activities", voterId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("activities")
        .select(`
          *,
          profiles:user_id (
            full_name,
            avatar_url
          )
        `)
        .eq("voter_id", voterId)
        .order("activity_date", { ascending: false });

      if (error) throw error;
      return data || [];
    },
  });

  const addActivityMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("activities").insert({
        voter_id: voterId,
        campaign_id: currentCampaignId,
        user_id: currentUserId,
        activity_type: activityType,
        title,
        description,
        activity_date: new Date().toISOString(),
      });

      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Atividade registrada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["activities"] });
      setTitle("");
      setDescription("");
      setActivityType("call");
    },
    onError: (error: any) => {
      toast.error("Erro ao registrar atividade: " + error.message);
    },
  });

  const handleAddActivity = () => {
    if (!title.trim()) {
      toast.error("Por favor, preencha o título da atividade");
      return;
    }
    addActivityMutation.mutate();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4 p-4 border rounded-lg bg-muted/30">
        <h3 className="font-semibold">Registrar Nova Atividade</h3>

        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="activity-type">Tipo</Label>
            <Select value={activityType} onValueChange={setActivityType}>
              <SelectTrigger id="activity-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="call">Ligação</SelectItem>
                <SelectItem value="visit">Visita</SelectItem>
                <SelectItem value="event">Evento</SelectItem>
                <SelectItem value="note">Nota</SelectItem>
                <SelectItem value="donation">Doação</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="activity-title">Título</Label>
            <Input
              id="activity-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Ligação de acompanhamento"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="activity-description">Descrição</Label>
            <Textarea
              id="activity-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detalhes da atividade..."
              rows={3}
            />
          </div>

          <Button onClick={handleAddActivity} disabled={addActivityMutation.isPending}>
            {addActivityMutation.isPending ? "Salvando..." : "Adicionar Atividade"}
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="font-semibold">Histórico de Atividades</h3>

        {activities.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">
            Nenhuma atividade registrada ainda
          </p>
        ) : (
          <div className="space-y-2">
            {activities.map((activity: any) => {
              const Icon = activityIcons[activity.activity_type as keyof typeof activityIcons] || FileText;
              const colorClass = activityColors[activity.activity_type as keyof typeof activityColors] || "text-gray-600";

              return (
                <div key={activity.id} className="p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 ${colorClass}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="text-sm font-medium">{activity.title}</div>
                      {activity.description && (
                        <div className="text-sm text-muted-foreground">{activity.description}</div>
                      )}
                      <div className="text-xs text-muted-foreground">
                        {activity.profiles?.full_name || "Usuário"} •{" "}
                        {new Date(activity.activity_date).toLocaleString("pt-BR")}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
