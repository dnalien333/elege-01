import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Download, TrendingUp, TrendingDown, Users, CheckCircle2, Activity } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export default function Relatorios() {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState("30");

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
      }
    };
    checkAuth();
  }, [navigate]);

  // Mock data for charts
  const cadastrosData = Array.from({ length: 30 }, (_, i) => ({
    day: `${i + 1}/10`,
    cadastros: Math.floor(5 + (i * 1.5) + Math.random() * 10)
  }));

  const teamActivityData = [
    { team: "Equipe Centro", atividades: 45 },
    { team: "Equipe Zona Norte", atividades: 38 },
    { team: "Equipe Zona Sul", atividades: 32 },
    { team: "Equipe Digital", atividades: 28 },
    { team: "Equipe Juventude", atividades: 25 },
  ];

  const statusData = [
    { name: "Pendente", value: 35, color: "#FCD34D" },
    { name: "Em Andamento", value: 45, color: "#60A5FA" },
    { name: "Concluída", value: 85, color: "#22C55E" },
  ];

  const cityData = [
    { city: "São Paulo", state: "SP", voters: 450, growth: 15 },
    { city: "Rio de Janeiro", state: "RJ", voters: 320, growth: 12 },
    { city: "Belo Horizonte", state: "MG", voters: 280, growth: 18 },
    { city: "Curitiba", state: "PR", voters: 210, growth: 10 },
    { city: "Porto Alegre", state: "RS", voters: 195, growth: 8 },
  ];

  const topTeams = [
    { team: "Equipe Centro", leader: "João Silva", cadastros: 120, demandas: 45, eventos: 8 },
    { team: "Equipe Zona Norte", leader: "Maria Santos", cadastros: 98, demandas: 38, eventos: 6 },
    { team: "Equipe Zona Sul", leader: "Carlos Oliveira", cadastros: 87, demandas: 32, eventos: 5 },
    { team: "Equipe Digital", leader: "Ana Costa", cadastros: 76, demandas: 28, eventos: 4 },
    { team: "Equipe Juventude", leader: "Pedro Souza", cadastros: 65, demandas: 25, eventos: 3 },
  ];

  const commonDemands = [
    { category: "Saúde", count: 85, percentage: 28 },
    { category: "Educação", count: 72, percentage: 24 },
    { category: "Infraestrutura", count: 58, percentage: 19 },
    { category: "Segurança", count: 45, percentage: 15 },
    { category: "Outros", count: 42, percentage: 14 },
  ];

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
                <div className="text-2xl font-bold">1,234</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-green-600">↑ 15%</span> esta semana
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Taxa de Engajamento</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">68%</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-green-600">↑ 8%</span> vs mês anterior
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Demandas Resolvidas</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">85%</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-green-600">↑ 12%</span> este mês
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Crescimento Semanal</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+23%</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-green-600">↑ 5%</span> vs semana anterior
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Cadastros por Dia</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={cadastrosData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="cadastros" stroke="#22C55E" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Atividades por Equipe</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={teamActivityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="team" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="atividades" fill="#22C55E" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Demandas por Status</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => entry.name}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Distribuição Geográfica</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={cityData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="city" type="category" />
                    <Tooltip />
                    <Bar dataKey="voters" fill="#22C55E" />
                  </BarChart>
                </ResponsiveContainer>
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
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Cidade</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Eleitores</TableHead>
                      <TableHead>Crescimento</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cityData.map((city, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium">{city.city}</TableCell>
                        <TableCell>{city.state}</TableCell>
                        <TableCell>{city.voters}</TableCell>
                        <TableCell className="text-green-600">+{city.growth}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top 5 Equipes</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Equipe</TableHead>
                      <TableHead>Líder</TableHead>
                      <TableHead>Cadastros</TableHead>
                      <TableHead>Eventos</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topTeams.map((team, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium">{team.team}</TableCell>
                        <TableCell>{team.leader}</TableCell>
                        <TableCell>{team.cadastros}</TableCell>
                        <TableCell>{team.eventos}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Demandas Mais Comuns</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Quantidade</TableHead>
                    <TableHead>Percentual</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {commonDemands.map((demand, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{demand.category}</TableCell>
                      <TableCell>{demand.count}</TableCell>
                      <TableCell>{demand.percentage}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
