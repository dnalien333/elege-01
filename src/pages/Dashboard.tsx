import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MessageSquare, BarChart3, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/layout/Sidebar";

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

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
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

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
              <CardDescription>
                Comece a trabalhar rapidamente
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4">
              <Button onClick={() => navigate("/cadastro")}>
                Novo Cadastro
              </Button>
              <Button variant="secondary" onClick={() => navigate("/campanhas")}>
                Nova Campanha
              </Button>
              <Button variant="outline" onClick={() => navigate("/segmentos")}>
                Criar Segmento
              </Button>
              <Button variant="outline" onClick={() => navigate("/comunicacao")}>
                Nova Comunicação
              </Button>
            </CardContent>
          </Card>

          {/* Getting Started */}
          {stats.campaigns === 0 && (
            <Card className="bg-primary-light border-primary">
              <CardHeader>
                <CardTitle>Bem-vindo! 🎉</CardTitle>
                <CardDescription>
                  Para começar, crie sua primeira campanha
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={() => navigate("/campanhas")}>
                  Criar Primeira Campanha
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
