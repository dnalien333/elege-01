import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { 
  Plus, 
  Search, 
  Filter,
  X,
  TrendingUp,
  TrendingDown,
  MoreHorizontal,
  Eye,
  Edit,
  UserPlus,
  Calendar,
  Trash2,
  LayoutGrid,
  List,
  AlertCircle,
  Clock,
  CheckCircle2,
  ClipboardList,
  Download
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format, formatDistanceToNow, isPast, isToday, differenceInDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import { NewDemandModal } from "@/components/demandas/NewDemandModal";
import { DemandDetailsModal } from "@/components/demandas/DemandDetailsModal";
import { AssignDemandModal } from "@/components/demandas/AssignDemandModal";
import { KanbanView } from "@/components/demandas/KanbanView";
import { exportToCSV } from "@/lib/csvUtils";

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
  campaign_id: string;
  voter_id: string | null;
  assigned_to: string | null;
  tags: string[];
  voters?: { full_name: string; } | null;
  profiles?: { full_name: string; avatar_url: string | null; } | null;
};

export default function Demandas() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isMounted, setIsMounted] = useState(false);
  const [viewMode, setViewMode] = useState<"table" | "kanban">("table");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [channelFilter, setChannelFilter] = useState("all");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [showNewDemandModal, setShowNewDemandModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedDemand, setSelectedDemand] = useState<Demand | null>(null);
  const [currentCampaignId, setCurrentCampaignId] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }

      // Get user's first campaign
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
    setIsMounted(true);
  }, [navigate]);

  // Fetch demands
  const { data: demands = [], isLoading } = useQuery({
    queryKey: ["demands", currentCampaignId, statusFilter, priorityFilter, channelFilter],
    queryFn: async () => {
      if (!currentCampaignId) return [];

      let query = supabase
        .from("demands")
        .select(`
          *,
          voters(full_name)
        `)
        .eq("campaign_id", currentCampaignId)
        .order("created_at", { ascending: false });

      if (statusFilter !== "all") {
        query = query.eq("status", statusFilter as any);
      }
      if (priorityFilter !== "all") {
        query = query.eq("priority", priorityFilter as any);
      }
      if (channelFilter !== "all") {
        query = query.eq("channel", channelFilter as any);
      }

      const { data, error } = await query;
      if (error) throw error;

      // Fetch assigned profiles separately
      const demandsWithProfiles = await Promise.all(
        (data || []).map(async (demand: any) => {
          if (demand.assigned_to) {
            const { data: profile } = await supabase
              .from("profiles")
              .select("full_name, avatar_url")
              .eq("id", demand.assigned_to)
              .single();
            return { ...demand, profiles: profile };
          }
          return demand;
        })
      );

      return demandsWithProfiles as Demand[];
    },
    enabled: !!currentCampaignId,
    staleTime: 5 * 60 * 1000,
  });

  // Filter demands by search query
  const filteredDemands = useMemo(() => {
    if (!searchQuery) return demands;
    const query = searchQuery.toLowerCase();
    return demands.filter(d => 
      d.title.toLowerCase().includes(query) ||
      d.voters?.full_name?.toLowerCase().includes(query) ||
      d.profiles?.full_name?.toLowerCase().includes(query)
    );
  }, [demands, searchQuery]);

  // Calculate KPIs
  const kpis = useMemo(() => {
    const total = filteredDemands.length;
    const pending = filteredDemands.filter(d => d.status === "pending").length;
    const inProgress = filteredDemands.filter(d => d.status === "in_progress").length;
    const completed = filteredDemands.filter(d => d.status === "completed").length;
    const overdue = filteredDemands.filter(d => 
      d.deadline && isPast(new Date(d.deadline)) && !["completed", "archived"].includes(d.status)
    ).length;
    const unassigned = filteredDemands.filter(d => !d.assigned_to).length;

    return { total, pending, inProgress, completed, overdue, unassigned };
  }, [filteredDemands]);

  const getChannelBadge = (channel: string) => {
    const colors: Record<string, string> = {
      whatsapp: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      instagram: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
      facebook: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      phone: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      email: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      in_person: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
      website: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200",
      gabinete: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    };
    return colors[channel] || "bg-gray-100 text-gray-800";
  };

  const getPriorityBadge = (priority: string) => {
    const config: Record<string, { color: string; icon: string }> = {
      low: { color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200", icon: "🔵" },
      medium: { color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200", icon: "🟡" },
      high: { color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200", icon: "🟠" },
      critical: { color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200", icon: "🔴" },
    };
    return config[priority] || config.medium;
  };

  const getDeadlineColor = (deadline: string | null, status: string) => {
    if (!deadline || ["completed", "archived"].includes(status)) return "";
    const date = new Date(deadline);
    if (isPast(date)) return "text-red-600 font-semibold";
    if (isToday(date)) return "text-orange-600 font-semibold";
    if (differenceInDays(date, new Date()) <= 3) return "text-yellow-600";
    return "";
  };

  const handleViewDetails = (demand: Demand) => {
    setSelectedDemand(demand);
    setShowDetailsModal(true);
  };

  const handleAssign = (demand: Demand) => {
    setSelectedDemand(demand);
    setShowAssignModal(true);
  };

  const handleDeleteDemand = async (demandId: string) => {
    if (!confirm("Tem certeza que deseja excluir esta demanda?")) return;

    try {
      const { error } = await supabase
        .from("demands")
        .delete()
        .eq("id", demandId);

      if (error) throw error;

      toast.success("Demanda excluída com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["demands"] });
    } catch (error) {
      console.error("Error deleting demand:", error);
      toast.error("Erro ao excluir demanda");
    }
  };

  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setPriorityFilter("all");
    setChannelFilter("all");
  };

  const handleExport = () => {
    const headers = ["ID", "Eleitor", "Título", "Descrição", "Canal", "Status", "Prioridade", "Urgência", "Responsável", "Prazo", "Criado em", "Tags"];
    
    const exportData = filteredDemands.map(demand => ({
      ID: demand.id.slice(0, 8),
      Eleitor: demand.voters?.full_name || "Sem eleitor",
      Título: demand.title,
      Descrição: demand.description || "",
      Canal: demand.channel,
      Status: demand.status,
      Prioridade: demand.priority,
      Urgência: demand.urgency,
      Responsável: demand.profiles?.full_name || "Não atribuído",
      Prazo: demand.deadline ? format(new Date(demand.deadline), "dd/MM/yyyy", { locale: ptBR }) : "",
      "Criado em": format(new Date(demand.created_at), "dd/MM/yyyy HH:mm", { locale: ptBR }),
      Tags: demand.tags.join("; ")
    }));

    exportToCSV(exportData, `demandas_${format(new Date(), "yyyy-MM-dd")}.csv`, headers);
    toast.success("Demandas exportadas com sucesso!");
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar />
      <main className="flex-1 w-full p-6 lg:p-8 overflow-y-auto">
        <div className="flex flex-col gap-8 w-full max-w-[1800px] mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Gestão de Demandas
              </h1>
              <p className="text-muted-foreground">
                Acompanhe, atribua e resolva solicitações dos eleitores
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
                <Button
                  variant={viewMode === "table" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("table")}
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "kanban" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("kanban")}
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
              </div>
              <Button variant="outline" onClick={handleExport}>
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
              <Button onClick={() => setShowNewDemandModal(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Nova Demanda
              </Button>
            </div>
          </div>

          {/* Filter Bar */}
          <Card className="p-4">
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[300px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por eleitor, demanda ou responsável..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <Select value={channelFilter} onValueChange={setChannelFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Canal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os canais</SelectItem>
                  <SelectItem value="whatsapp">WhatsApp</SelectItem>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="facebook">Facebook</SelectItem>
                  <SelectItem value="phone">Telefone</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="in_person">Presencial</SelectItem>
                  <SelectItem value="website">Website</SelectItem>
                  <SelectItem value="gabinete">Gabinete</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="unassigned">Não Atribuído</SelectItem>
                  <SelectItem value="pending">Pendente</SelectItem>
                  <SelectItem value="in_progress">Em Andamento</SelectItem>
                  <SelectItem value="awaiting_response">Aguardando</SelectItem>
                  <SelectItem value="completed">Concluída</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Prioridade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="low">🔵 Baixa</SelectItem>
                  <SelectItem value="medium">🟡 Média</SelectItem>
                  <SelectItem value="high">🟠 Alta</SelectItem>
                  <SelectItem value="critical">🔴 Crítica</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" onClick={clearFilters}>
                <X className="h-4 w-4 mr-2" />
                Limpar Filtros
              </Button>
            </div>
          </Card>

          {/* KPIs */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { label: "Total", value: kpis.total, icon: ClipboardList, color: "text-blue-600" },
              { label: "Pendentes", value: kpis.pending, icon: Clock, color: "text-yellow-600" },
              { label: "Em Andamento", value: kpis.inProgress, icon: AlertCircle, color: "text-orange-600" },
              { label: "Concluídas", value: kpis.completed, icon: CheckCircle2, color: "text-green-600" },
              { label: "Vencidas", value: kpis.overdue, icon: AlertCircle, color: "text-red-600" },
              { label: "Não Atribuídas", value: kpis.unassigned, icon: UserPlus, color: "text-gray-600" },
            ].map((kpi) => (
              <Card key={kpi.label} className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <kpi.icon className={`h-5 w-5 ${kpi.color}`} />
                  <span className="text-2xl font-bold">{kpi.value}</span>
                </div>
                <p className="text-sm text-muted-foreground">{kpi.label}</p>
              </Card>
            ))}
          </div>

          {/* Content Area */}
          {isLoading ? (
            <Card className="p-6">
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            </Card>
          ) : viewMode === "kanban" ? (
            <KanbanView demands={filteredDemands} onViewDetails={handleViewDetails} />
          ) : (
            <Card className="overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox />
                    </TableHead>
                    <TableHead>ID</TableHead>
                    <TableHead>Eleitor</TableHead>
                    <TableHead>Demanda</TableHead>
                    <TableHead>Canal</TableHead>
                    <TableHead>Prioridade</TableHead>
                    <TableHead>Responsável</TableHead>
                    <TableHead>Prazo</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Criado em</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDemands.map((demand) => (
                    <TableRow 
                      key={demand.id}
                      className={
                        demand.deadline && isPast(new Date(demand.deadline)) && 
                        !["completed", "archived"].includes(demand.status)
                          ? "bg-red-50 dark:bg-red-950/20"
                          : demand.deadline && isToday(new Date(demand.deadline))
                          ? "bg-yellow-50 dark:bg-yellow-950/20"
                          : ""
                      }
                    >
                      <TableCell>
                        <Checkbox />
                      </TableCell>
                      <TableCell className="font-mono text-xs">
                        #{demand.id.slice(0, 8)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>
                              {demand.voters?.full_name?.[0] || "?"}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{demand.voters?.full_name || "Sem eleitor"}</span>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-[300px]">
                        <div className="truncate">{demand.title}</div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getChannelBadge(demand.channel)}>
                          {demand.channel}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getPriorityBadge(demand.priority).color}>
                          {getPriorityBadge(demand.priority).icon} {demand.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {demand.assigned_to ? (
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={demand.profiles?.avatar_url || undefined} />
                              <AvatarFallback>
                                {demand.profiles?.full_name?.[0] || "?"}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{demand.profiles?.full_name}</span>
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground">Não atribuído</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {demand.deadline ? (
                          <div className={getDeadlineColor(demand.deadline, demand.status)}>
                            <div className="text-sm">
                              {format(new Date(demand.deadline), "dd/MM/yyyy HH:mm", { locale: ptBR })}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {formatDistanceToNow(new Date(demand.deadline), { locale: ptBR, addSuffix: true })}
                            </div>
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground">Sem prazo</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{demand.status}</Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {format(new Date(demand.created_at), "dd/MM/yyyy HH:mm", { locale: ptBR })}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewDetails(demand)}>
                              <Eye className="h-4 w-4 mr-2" />
                              Ver Detalhes
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleAssign(demand)}>
                              <UserPlus className="h-4 w-4 mr-2" />
                              Atribuir
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDeleteDemand(demand.id)} className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {filteredDemands.length === 0 && (
                <div className="p-12 text-center">
                  <ClipboardList className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">Nenhuma demanda encontrada</h3>
                  <p className="text-muted-foreground mb-4">
                    Crie sua primeira demanda para começar
                  </p>
                  <Button onClick={() => setShowNewDemandModal(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Nova Demanda
                  </Button>
                </div>
              )}
            </Card>
          )}
        </div>
      </main>

      {/* Modals */}
      <NewDemandModal
        open={showNewDemandModal}
        onOpenChange={setShowNewDemandModal}
        campaignId={currentCampaignId}
      />
      <DemandDetailsModal
        open={showDetailsModal}
        onOpenChange={setShowDetailsModal}
        demand={selectedDemand}
      />
      <AssignDemandModal
        open={showAssignModal}
        onOpenChange={setShowAssignModal}
        demand={selectedDemand}
      />
    </div>
  );
}
