import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Target, Users, TrendingUp } from "lucide-react";
import { toast } from "sonner";

export default function Metas() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [showNewModal, setShowNewModal] = useState(false);
  const [currentCampaignId, setCurrentCampaignId] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }
      
      const { data: campaigns } = await supabase
        .from("campaigns")
        .select("id")
        .eq("owner_id", session.user.id)
        .limit(1)
        .single();
      
      if (campaigns) {
        setCurrentCampaignId(campaigns.id);
      }
    };
    checkAuth();
  }, [navigate]);

  // Mock goals data
  const mockGoals = [
    {
      id: 1,
      title: "Cadastrar 100 novos eleitores",
      category: "Cadastros",
      current: 47,
      target: 100,
      deadline: "2025-11-30",
      status: "on_track",
      team: "Equipe Centro"
    },
    {
      id: 2,
      title: "Realizar 50 visitas domiciliares",
      category: "Engajamento",
      current: 32,
      target: 50,
      deadline: "2025-10-25",
      status: "on_track",
      team: "Equipe Zona Norte"
    },
    {
      id: 3,
      title: "Organizar 3 eventos comunitários",
      category: "Eventos",
      current: 3,
      target: 3,
      deadline: "2025-10-15",
      status: "completed",
      team: "Equipe Digital"
    },
    {
      id: 4,
      title: "Arrecadar R$ 10.000",
      category: "Financeiro",
      current: 6500,
      target: 10000,
      deadline: "2025-11-15",
      status: "on_track",
      team: null
    },
    {
      id: 5,
      title: "Conquistar 200 apoiadores",
      category: "Cadastros",
      current: 156,
      target: 200,
      deadline: "2025-11-05",
      status: "on_track",
      team: "Equipe Zona Sul"
    },
  ];

  const completed = mockGoals.filter(g => g.status === "completed").length;
  const total = mockGoals.length;
  const percentage = Math.round((completed / total) * 100);

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "Cadastros": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      "Engajamento": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      "Eventos": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
      "Financeiro": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  const getStatusBadge = (status: string) => {
    const config: Record<string, { label: string; color: string }> = {
      completed: { label: "Concluída", color: "bg-green-100 text-green-800" },
      on_track: { label: "No Prazo", color: "bg-blue-100 text-blue-800" },
      delayed: { label: "Atrasada", color: "bg-red-100 text-red-800" },
    };
    return config[status] || config.on_track;
  };

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <main className="flex-1 p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Metas</h1>
              <p className="text-muted-foreground">Defina e acompanhe seus objetivos</p>
            </div>
            <Dialog open={showNewModal} onOpenChange={setShowNewModal}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Meta
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Nova Meta</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Título</Label>
                    <Input placeholder="Ex: Cadastrar 100 eleitores" />
                  </div>
                  <div>
                    <Label>Categoria</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cadastros">Cadastros</SelectItem>
                        <SelectItem value="engajamento">Engajamento</SelectItem>
                        <SelectItem value="eventos">Eventos</SelectItem>
                        <SelectItem value="financeiro">Financeiro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Valor Alvo</Label>
                    <Input type="number" placeholder="Ex: 100" />
                  </div>
                  <div>
                    <Label>Prazo</Label>
                    <Input type="date" />
                  </div>
                  <div>
                    <Label>Equipe Responsável (opcional)</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="team1">Equipe Centro</SelectItem>
                        <SelectItem value="team2">Equipe Zona Norte</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Descrição (opcional)</Label>
                    <Textarea placeholder="Detalhes adicionais..." />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setShowNewModal(false)}>Cancelar</Button>
                    <Button onClick={() => {
                      toast.success("Meta criada com sucesso!");
                      setShowNewModal(false);
                    }}>Criar Meta</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Progress Summary */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Progresso Geral
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="text-4xl font-bold">{completed} de {total}</div>
                  <p className="text-muted-foreground">metas concluídas ({percentage}%)</p>
                  <Progress value={percentage} className="h-3" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Top Equipes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Equipe Centro</span>
                    <Badge>2 metas</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Equipe Zona Norte</span>
                    <Badge>1 meta</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Equipe Digital</span>
                    <Badge>1 meta</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Goals Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockGoals.map((goal) => (
              <Card key={goal.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{goal.title}</CardTitle>
                    <Badge className={getCategoryColor(goal.category)}>{goal.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Progresso</span>
                      <span className="text-sm font-medium">
                        {goal.category === "Financeiro" 
                          ? `R$ ${goal.current.toLocaleString()} / R$ ${goal.target.toLocaleString()}`
                          : `${goal.current} / ${goal.target}`
                        }
                      </span>
                    </div>
                    <Progress value={(goal.current / goal.target) * 100} className="h-2" />
                    <p className="text-sm text-muted-foreground mt-1">
                      {Math.round((goal.current / goal.target) * 100)}% concluído
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Prazo:</span>
                    <span>{new Date(goal.deadline).toLocaleDateString('pt-BR')}</span>
                  </div>
                  
                  {goal.team && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Equipe:</span>
                      <span>{goal.team}</span>
                    </div>
                  )}
                  
                  <Badge className={getStatusBadge(goal.status).color}>
                    {getStatusBadge(goal.status).label}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
