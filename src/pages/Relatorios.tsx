import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Download, Users, CheckCircle2, Activity, TrendingUp, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { subDays, format } from "date-fns";

function useDateFilter(dateRange: string) {
  if (dateRange === "all") return null;
  return subDays(new Date(), parseInt(dateRange)).toISOString();
}

export default function Relatorios() {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState("30");
  const since = useDateFilter(dateRange);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate("/auth");
    });
  }, [navigate]);

  // Total voters
  const { data: totalVoters = 0, isLoading: loadingVoters } = useQuery({
    queryKey: ["relatorios-voters", since],
    queryFn: async () => {
      let q = supabase.from("voters").select("id", { count: "exact", head: true });
      if (since) q = q.gte("created_at", since);
      const { count } = await q;
      return count ?? 0;
    },
  });

  // Total demands & resolved
  const { data: demandStats = { total: 0, completed: 0 }, isLoading: loadingDemands } = useQuery({
    queryKey: ["relatorios-demands", since],
    queryFn: async () => {
      let q = supabase.from("demands").select("id, status");
      if (since) q = q.gte("created_at", since);
      const { data } = await q;
      const total = data?.length ?? 0;
      const completed = data?.filter((d) => d.status === "completed").length ?? 0;
      return { total, completed };
    },
  });

  // Activities count (engagement proxy)
  const { data: activitiesCount = 0, isLoading: loadingActivities } = useQuery({
    queryKey: ["relatorios-activities", since],
    queryFn: async () => {
      let q = supabase.from("activities").select("id", { count: "exact", head: true });
      if (since) q = q.gte("created_at", since);
      const { count } = await q;
      return count ?? 0;
    },
  });

  // Colaboradores count
  const { data: colaboradoresCount = 0 } = useQuery({
    queryKey: ["relatorios-colaboradores", since],
    queryFn: async () => {
      let q = supabase.from("colaboradores").select("id", { count: "exact", head: true });
      if (since) q = q.gte("created_at", since);
      const { count } = await q;
      return count ?? 0;
    },
  });

  // Demands by status for pie chart
  const { data: demandsByStatus = [] } = useQuery({
    queryKey: ["relatorios-demands-status", since],
    queryFn: async () => {
      let q = supabase.from("demands").select("status");
      if (since) q = q.gte("created_at", since);
      const { data } = await q;
      if (!data) return [];
      const counts: Record<string, number> = {};
      data.forEach((d) => { counts[d.status] = (counts[d.status] || 0) + 1; });
      const labels: Record<string, { label: string; color: string }> = {
        unassigned: { label: "Não Atribuída", color: "#94A3B8" },
        pending: { label: "Pendente", color: "#FCD34D" },
        in_progress: { label: "Em Andamento", color: "#60A5FA" },
        awaiting_response: { label: "Aguardando", color: "#F97316" },
        completed: { label: "Concluída", color: "#22C55E" },
        archived: { label: "Arquivada", color: "#A78BFA" },
      };
      return Object.entries(counts).map(([status, value]) => ({
        name: labels[status]?.label ?? status,
        value,
        color: labels[status]?.color ?? "#8884d8",
      }));
    },
  });

  // Voters by city
  const { data: cityData = [] } = useQuery({
    queryKey: ["relatorios-voters-city", since],
    queryFn: async () => {
      let q = supabase.from("voters").select("city, state");
      if (since) q = q.gte("created_at", since);
      const { data } = await q;
      if (!data) return [];
      const map: Record<string, { city: string; state: string; voters: number }> = {};
      data.forEach((v) => {
        const key = `${v.city || "Sem cidade"}-${v.state || ""}`;
        if (!map[key]) map[key] = { city: v.city || "Sem cidade", state: v.state || "-", voters: 0 };
        map[key].voters++;
      });
      return Object.values(map).sort((a, b) => b.voters - a.voters).slice(0, 10);
    },
  });

  // Teams with member counts
  const { data: teamsData = [] } = useQuery({
    queryKey: ["relatorios-teams"],
    queryFn: async () => {
      const { data: teams } = await supabase.from("teams").select("id, name, leader_id");
      if (!teams || teams.length === 0) return [];
      const { data: members } = await supabase.from("team_members").select("team_id");
      const { data: actions } = await supabase.from("team_actions").select("team_id");
      return teams.map((t) => ({
        team: t.name,
        membros: members?.filter((m) => m.team_id === t.id).length ?? 0,
        acoes: actions?.filter((a) => a.team_id === t.id).length ?? 0,
      })).sort((a, b) => b.acoes - a.acoes).slice(0, 5);
    },
  });

  const resolvedPct = demandStats.total > 0
    ? Math.round((demandStats.completed / demandStats.total) * 100)
    : 0;

  const isLoading = loadingVoters || loadingDemands || loadingActivities;

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <main className="flex-1 p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Relatórios e Análises</h1>
              <p className="text-muted-foreground">Acompanhe o desempenho da campanha</p>
            </div>
            <div className="flex items-center gap-3">
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">Últimos 7 dias</SelectItem>
                  <SelectItem value="30">Últimos 30 dias</SelectItem>
                  <SelectItem value="90">Últimos 90 dias</SelectItem>
                  <SelectItem value="all">Todo o período</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Exportar PDF
              </Button>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total de Cadastros</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : totalVoters.toLocaleString("pt-BR")}
                </div>
                <p className="text-xs text-muted-foreground mt-1">Eleitores cadastrados</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Atividades</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : activitiesCount.toLocaleString("pt-BR")}
                </div>
                <p className="text-xs text-muted-foreground mt-1">Registradas no período</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Demandas Resolvidas</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : `${resolvedPct}%`}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {demandStats.completed} de {demandStats.total} demandas
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Colaboradores</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : colaboradoresCount.toLocaleString("pt-BR")}
                </div>
                <p className="text-xs text-muted-foreground mt-1">Ativos no período</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Demandas por Status</CardTitle>
              </CardHeader>
              <CardContent>
                {demandsByStatus.length === 0 ? (
                  <div className="flex items-center justify-center h-[300px] text-muted-foreground">Sem demandas no período</div>
                ) : (
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie data={demandsByStatus} cx="50%" cy="50%" labelLine={false} label={(e) => e.name} outerRadius={80} dataKey="value">
                        {demandsByStatus.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Distribuição Geográfica</CardTitle>
              </CardHeader>
              <CardContent>
                {cityData.length === 0 ? (
                  <div className="flex items-center justify-center h-[300px] text-muted-foreground">Sem dados geográficos</div>
                ) : (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={cityData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="city" type="category" width={120} />
                      <Tooltip />
                      <Bar dataKey="voters" fill="hsl(var(--primary))" />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Data Tables */}
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Top 10 Cidades</CardTitle>
              </CardHeader>
              <CardContent>
                {cityData.length === 0 ? (
                  <p className="text-muted-foreground text-sm">Nenhum eleitor cadastrado ainda.</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Cidade</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Eleitores</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cityData.map((city, i) => (
                        <TableRow key={i}>
                          <TableCell className="font-medium">{city.city}</TableCell>
                          <TableCell>{city.state}</TableCell>
                          <TableCell>{city.voters}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Equipes</CardTitle>
              </CardHeader>
              <CardContent>
                {teamsData.length === 0 ? (
                  <p className="text-muted-foreground text-sm">Nenhuma equipe cadastrada ainda.</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Equipe</TableHead>
                        <TableHead>Membros</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {teamsData.map((team, i) => (
                        <TableRow key={i}>
                          <TableCell className="font-medium">{team.team}</TableCell>
                          <TableCell>{team.membros}</TableCell>
                          <TableCell>{team.acoes}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
