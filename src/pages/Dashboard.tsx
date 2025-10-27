import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MessageSquare, BarChart3, Target, Calendar, Plus, ChevronDown, ClipboardList, UserPlus, Flag, DollarSign } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
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
    demands: 0,
    metasCompleted: 3,
    metasTotal: 5,
  });
  const [showActionsMenu, setShowActionsMenu] = useState(false);
  const [myTasks, setMyTasks] = useState<any[]>([]);

  // Mock chart data for last 30 days
  const cadastrosChartData = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    cadastros: Math.floor(5 + (i * 1.5) + Math.random() * 5)
  }));

  // Mock upcoming events
  const upcomingEvents = [
    { id: 1, title: "Reunião com equipe Zona Norte", date: "2025-10-25", time: "14:00" },
    { id: 2, title: "Visita aos apoiadores", date: "2025-10-26", time: "09:00" },
    { id: 3, title: "Evento comunitário", date: "2025-10-28", time: "16:00" },
  ];

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

  useEffect(() => {
    if (user) {
      const loadMyTasks = async () => {
        const { data } = await supabase
          .from("demands")
          .select("*")
          .eq("assigned_to", user.id)
          .in("status", ["pending", "in_progress"])
          .order("created_at", { ascending: false })
          .limit(5);
        
        if (data) {
          setMyTasks(data);
        }
      };
      loadMyTasks();
    }
  }, [user]);

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

        // Count demands
        const { count: demandsCount } = await supabase
          .from("demands")
          .select("*", { count: "exact", head: true })
          .in("campaign_id", campaignIds);

        setStats({
          voters: votersCount || 0,
          communications: commsCount || 0,
          segments: segmentsCount || 0,
          demands: demandsCount || 0,
          metasCompleted: 3,
          metasTotal: 5,
        });
      }
    } catch (error) {
      console.error("Error loading stats:", error);
    }
  };

  if (!user) {
    return null;
  }

  const mockActivities = [
    { id: 1, type: "voter_added", user: "João Silva", description: "adicionou 15 novos eleitores", time: "há 2 horas" },
    { id: 2, type: "communication_sent", user: "Maria Santos", description: "enviou comunicação para 200 eleitores", time: "há 5 horas" },
    { id: 3, type: "segment_created", user: "Pedro Costa", description: "criou novo segmento 'Apoiadores Ativos'", time: "há 1 dia" },
  ];

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <main className="flex-1">
        <div className="sticky top-0 z-10 bg-background border-b shadow-sm">
          <div className="px-6 py-3 flex items-center gap-4">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase">Ações Rápidas</h2>
            <DropdownMenu open={showActionsMenu} onOpenChange={setShowActionsMenu}>
              <DropdownMenuTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" /> Novo Cadastro <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => navigate('/cadastros')}>
                  <Users className="w-4 h-4 mr-2" /> Novo Eleitor
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/cadastros')}>
                  <UserPlus className="w-4 h-4 mr-2" /> Novo Colaborador
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/demandas')}>
                  <ClipboardList className="w-4 h-4 mr-2" /> Nova Demanda
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/gestao-equipe')}>
                  <Flag className="w-4 h-4 mr-2" /> Nova Equipe
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/metas')}>
                  <Target className="w-4 h-4 mr-2" /> Nova Meta
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/financeiro')}>
                  <DollarSign className="w-4 h-4 mr-2" /> Nova Despesa
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
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
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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

            <Card 
              className="border-l-4 border-l-accent cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => navigate('/metas')}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Metas Atingidas
                </CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.metasCompleted}/{stats.metasTotal}</div>
                <p className="text-xs text-muted-foreground">
                  concluídas ({Math.round((stats.metasCompleted / stats.metasTotal) * 100)}%)
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Chart - Cadastros Last 30 Days */}
          <Card>
            <CardHeader>
              <CardTitle>Cadastros nos Últimos 30 Dias</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={cadastrosChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" label={{ value: 'Dia', position: 'insideBottom', offset: -5 }} />
                  <YAxis label={{ value: 'Cadastros', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="cadastros" stroke="#22C55E" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Próximos Eventos */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Próximos Eventos</CardTitle>
                <Button variant="link" onClick={() => navigate('/demandas')}>Ver Todos</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingEvents.map(event => (
                  <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">{event.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(event.date).toLocaleDateString('pt-BR')} às {event.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Minhas Tarefas - Dynamic */}
          <Card>
            <CardHeader>
              <CardTitle>Minhas Tarefas</CardTitle>
              <CardDescription>Demandas atribuídas a mim</CardDescription>
            </CardHeader>
            <CardContent>
              {myTasks.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">Nenhuma tarefa pendente</p>
              ) : (
                <div className="space-y-3">
                  {myTasks.map(task => (
                    <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => navigate('/demandas')}>
                      <div className="flex items-center gap-3">
                        {task.status === "completed" && <CheckCircle2 className="h-5 w-5 text-primary" />}
                        {task.status === "in_progress" && <Clock className="h-5 w-5 text-accent" />}
                        {task.status === "pending" && <AlertCircle className="h-5 w-5 text-muted-foreground" />}
                        <div>
                          <p className="font-medium">{task.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {task.deadline ? new Date(task.deadline).toLocaleDateString('pt-BR') : 'Sem prazo'}
                          </p>
                        </div>
                      </div>
                      <Badge variant={task.priority === "high" || task.priority === "critical" ? "destructive" : "default"}>
                        {task.priority === "high" || task.priority === "critical" ? "Alta" : task.priority === "medium" ? "Média" : "Baixa"}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
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
