import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MessageSquare, BarChart3, TrendingUp } from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import QuickActionsBar from "@/components/QuickActionsBar";
import { Card as TaskCard } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, AlertCircle } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState({
    voters: 0,
    communications: 0,
    segments: 0,
    campaigns: 0,
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
        loadStats(session.user.id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session?.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const loadStats = async (userId: string) => {
    try {
      // Get user's campaigns
      const { data: campaigns } = await supabase
        .from("campaigns")
        .select("id")
        .eq("owner_id", userId);

      const campaignIds = campaigns?.map(c => c.id) || [];

      if (campaignIds.length > 0) {
        // Count voters
        const { count: votersCount } = await supabase
          .from("voters")
          .select("*", { count: "exact", head: true })
          .in("campaign_id", campaignIds);

        // Count communications
        const { count: commsCount } = await supabase
          .from("communications")
          .select("*", { count: "exact", head: true })
          .in("campaign_id", campaignIds);

        // Count segments
        const { count: segmentsCount } = await supabase
          .from("segments")
          .select("*", { count: "exact", head: true })
          .in("campaign_id", campaignIds);

        setStats({
          voters: votersCount || 0,
          communications: commsCount || 0,
          segments: segmentsCount || 0,
          campaigns: campaigns?.length || 0,
        });
      }
    } catch (error) {
      console.error("Error loading stats:", error);
    }
  };

  if (!user) {
    return null;
  }

  const mockTasks = [
    { id: 1, title: "Ligar para eleitores zona sul", priority: "high", status: "pending", dueDate: "Hoje" },
    { id: 2, title: "Revisar comunicação segmento apoiadores", priority: "medium", status: "in_progress", dueDate: "Amanhã" },
    { id: 3, title: "Reunião com equipe norte", priority: "low", status: "completed", dueDate: "Ontem" },
  ];

  const mockActivities = [
    { id: 1, type: "voter_added", user: "João Silva", description: "adicionou 15 novos eleitores", time: "há 2 horas" },
    { id: 2, type: "communication_sent", user: "Maria Santos", description: "enviou comunicação para 200 eleitores", time: "há 5 horas" },
    { id: 3, type: "segment_created", user: "Pedro Costa", description: "criou novo segmento 'Apoiadores Ativos'", time: "há 1 dia" },
  ];

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <main className="flex-1">
        <QuickActionsBar 
          onOpenVoterModal={() => navigate('/cadastros')}
          onOpenColaboradorModal={() => navigate('/cadastros')}
        />
        <div className="max-w-7xl mx-auto p-8 space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Dashboard Executivo
            </h1>
            <p className="text-muted-foreground">
              Visão geral da sua campanha eleitoral
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-l-4 border-l-primary">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Cadastros
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.voters}</div>
                <p className="text-xs text-muted-foreground">
                  Total de eleitores cadastrados
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-secondary">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Comunicações
                </CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.communications}</div>
                <p className="text-xs text-muted-foreground">
                  Mensagens criadas
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-accent">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Segmentos
                </CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.segments}</div>
                <p className="text-xs text-muted-foreground">
                  Segmentações ativas
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-primary">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Campanhas
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.campaigns}</div>
                <p className="text-xs text-muted-foreground">
                  Campanhas criadas
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Minhas Tarefas */}
          <Card>
            <CardHeader>
              <CardTitle>Minhas Tarefas</CardTitle>
              <CardDescription>Atividades pendentes e em andamento</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockTasks.map(task => (
                  <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {task.status === "completed" && <CheckCircle2 className="h-5 w-5 text-primary" />}
                      {task.status === "in_progress" && <Clock className="h-5 w-5 text-accent" />}
                      {task.status === "pending" && <AlertCircle className="h-5 w-5 text-muted-foreground" />}
                      <div>
                        <p className="font-medium">{task.title}</p>
                        <p className="text-sm text-muted-foreground">{task.dueDate}</p>
                      </div>
                    </div>
                    <Badge variant={task.priority === "high" ? "destructive" : task.priority === "medium" ? "default" : "secondary"}>
                      {task.priority === "high" ? "Alta" : task.priority === "medium" ? "Média" : "Baixa"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Atividade Recente */}
          <Card>
            <CardHeader>
              <CardTitle>Atividade Recente</CardTitle>
              <CardDescription>Últimas ações realizadas na campanha</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockActivities.map(activity => (
                  <div key={activity.id} className="flex items-start gap-3 pb-3 border-b last:border-0">
                    <div className="w-2 h-2 mt-2 rounded-full bg-primary"></div>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium">{activity.user}</span> {activity.description}
                      </p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
