import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

type Demand = {
  id: string;
  title: string;
  description: string | null;
  channel: string;
  status: string;
  priority: string;
  urgency: string;
  deadline: string | null;
  created_at: string;
  assigned_to: string | null;
  voters?: { full_name: string; } | null;
  profiles?: { full_name: string; avatar_url: string | null; } | null;
};

type DemandDetailsModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  demand: Demand | null;
};

export function DemandDetailsModal({ open, onOpenChange, demand }: DemandDetailsModalProps) {
  if (!demand) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Detalhes da Demanda</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-4">{demand.title}</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Canal</p>
                <Badge>{demand.channel}</Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Prioridade</p>
                <Badge>{demand.priority}</Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Urgência</p>
                <Badge>{demand.urgency}</Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Status</p>
                <Badge variant="outline">{demand.status}</Badge>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Eleitor</h4>
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarFallback>
                  {demand.voters?.full_name?.[0] || "?"}
                </AvatarFallback>
              </Avatar>
              <span>{demand.voters?.full_name || "Sem eleitor"}</span>
            </div>
          </div>

          {demand.assigned_to && (
            <div>
              <h4 className="font-semibold mb-2">Responsável</h4>
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={demand.profiles?.avatar_url || undefined} />
                  <AvatarFallback>
                    {demand.profiles?.full_name?.[0] || "?"}
                  </AvatarFallback>
                </Avatar>
                <span>{demand.profiles?.full_name}</span>
              </div>
            </div>
          )}

          {demand.description && (
            <div>
              <h4 className="font-semibold mb-2">Descrição</h4>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                {demand.description}
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Criado em</h4>
              <p className="text-sm text-muted-foreground">
                {format(new Date(demand.created_at), "dd/MM/yyyy HH:mm", { locale: ptBR })}
              </p>
            </div>
            {demand.deadline && (
              <div>
                <h4 className="font-semibold mb-2">Prazo</h4>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(demand.deadline), "dd/MM/yyyy HH:mm", { locale: ptBR })}
                </p>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Fechar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
