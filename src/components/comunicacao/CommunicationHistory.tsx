import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Calendar, Users } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Communication {
  id: string;
  message_template: string;
  status: string;
  sent_count: number;
  sent_at: string | null;
  created_at: string;
  segments?: {
    name: string;
    voter_count: number;
  };
}

interface CommunicationHistoryProps {
  communications: Communication[];
  onRefetch: () => void;
}

const CommunicationHistory = ({ communications }: CommunicationHistoryProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "sent":
        return "bg-green-500/10 text-green-700 dark:text-green-400";
      case "scheduled":
        return "bg-blue-500/10 text-blue-700 dark:text-blue-400";
      case "draft":
        return "bg-gray-500/10 text-gray-700 dark:text-gray-400";
      default:
        return "bg-gray-500/10 text-gray-700 dark:text-gray-400";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "sent":
        return "Enviada";
      case "scheduled":
        return "Agendada";
      case "draft":
        return "Rascunho";
      default:
        return status;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          Histórico de Comunicações
        </CardTitle>
      </CardHeader>
      <CardContent>
        {communications.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="font-medium">Nenhuma comunicação encontrada</p>
            <p className="text-sm mt-1">
              Crie sua primeira comunicação clicando no botão acima
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {communications.map((comm) => (
              <div
                key={comm.id}
                className="p-4 border rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge className={getStatusColor(comm.status)}>
                        {getStatusLabel(comm.status)}
                      </Badge>
                      {comm.segments && (
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {comm.segments.name}
                        </span>
                      )}
                    </div>
                    <p className="text-sm line-clamp-2">{comm.message_template}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDistanceToNow(new Date(comm.sent_at || comm.created_at), {
                          addSuffix: true,
                          locale: ptBR,
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {comm.sent_count} enviadas
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CommunicationHistory;
