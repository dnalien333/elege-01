import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";
import { useMemo } from "react";

interface Communication {
  id: string;
  status: string;
  sent_count: number;
}

interface CommunicationStatsProps {
  communications: Communication[];
}

const CommunicationStats = ({ communications }: CommunicationStatsProps) => {
  const stats = useMemo(() => {
    const byStatus = communications.reduce(
      (acc, comm) => {
        acc[comm.status] = (acc[comm.status] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    const total = communications.length;
    const sent = byStatus.sent || 0;
    const scheduled = byStatus.scheduled || 0;
    const draft = byStatus.draft || 0;

    return {
      total,
      sent,
      scheduled,
      draft,
      sentPercentage: total > 0 ? Math.round((sent / total) * 100) : 0,
    };
  }, [communications]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          Estatísticas de Envio
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Total</p>
            <p className="text-2xl font-bold">{stats.total}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Enviadas</p>
            <p className="text-2xl font-bold text-green-600">{stats.sent}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Agendadas</p>
            <p className="text-2xl font-bold text-blue-600">{stats.scheduled}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Rascunhos</p>
            <p className="text-2xl font-bold text-gray-600">{stats.draft}</p>
          </div>
        </div>

        {stats.total > 0 && (
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Taxa de Envio</span>
              <span className="font-semibold">{stats.sentPercentage}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all"
                style={{ width: `${stats.sentPercentage}%` }}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CommunicationStats;
