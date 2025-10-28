import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

type Demand = {
  id: string;
  title: string;
  status: string;
  priority: string;
  deadline: string | null;
  voters?: { full_name: string; } | null;
  profiles?: { full_name: string; } | null;
};

type KanbanViewProps = {
  demands: Demand[];
  onViewDetails: (demand: Demand) => void;
};

const statusColumns = [
  { key: "unassigned", label: "Não Atribuído", color: "bg-gray-100 dark:bg-gray-800" },
  { key: "pending", label: "Pendente", color: "bg-yellow-100 dark:bg-yellow-900" },
  { key: "in_progress", label: "Em Andamento", color: "bg-blue-100 dark:bg-blue-900" },
  { key: "awaiting_response", label: "Aguardando Resposta", color: "bg-orange-100 dark:bg-orange-900" },
  { key: "completed", label: "Concluído", color: "bg-green-100 dark:bg-green-900" },
];

export function KanbanView({ demands, onViewDetails }: KanbanViewProps) {
  const getPriorityIcon = (priority: string) => {
    const icons: Record<string, string> = {
      low: "🔵",
      medium: "🟡",
      high: "🟠",
      critical: "🔴",
    };
    return icons[priority] || "🟡";
  };

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {statusColumns.map((column) => {
        const columnDemands = demands.filter(d => d.status === column.key);

        return (
          <div key={column.key} className="flex-shrink-0 w-80">
            <div className={`${column.color} rounded-t-lg p-3 mb-2`}>
              <h3 className="font-semibold text-sm">
                {column.label}
                <span className="ml-2 text-xs opacity-75">({columnDemands.length})</span>
              </h3>
            </div>

            <div className="space-y-3">
              {columnDemands.map((demand) => (
                <Card key={demand.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-semibold line-clamp-2 flex-1">
                        {demand.title}
                      </h4>
                      <span className="text-xl flex-shrink-0">
                        {getPriorityIcon(demand.priority)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">
                          {demand.voters?.full_name?.[0] || "?"}
                        </AvatarFallback>
                      </Avatar>
                      <span className="truncate">{demand.voters?.full_name || "Sem eleitor"}</span>
                    </div>

                    {demand.deadline && (
                      <div className="text-xs text-muted-foreground">
                        ⏰ {format(new Date(demand.deadline), "dd/MM/yyyy HH:mm", { locale: ptBR })}
                      </div>
                    )}

                    {demand.profiles && (
                      <div className="flex items-center gap-2 text-xs">
                        <Avatar className="h-5 w-5">
                          <AvatarFallback className="text-xs">
                            {demand.profiles.full_name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-muted-foreground truncate">
                          {demand.profiles.full_name}
                        </span>
                      </div>
                    )}

                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      disabled
                    >
                      <Eye className="h-3 w-3 mr-2" />
                      Ver Detalhes
                    </Button>
                  </div>
                </Card>
              ))}

              {columnDemands.length === 0 && (
                <div className="text-center py-8 text-sm text-muted-foreground">
                  Nenhuma demanda
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
