import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Users, Plus, ChevronDown, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import Sidebar from '@/components/layout/Sidebar';
import AddTeamModal from '@/components/team/AddTeamModal';
import TeamActionsModal from '@/components/team/TeamActionsModal';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function GestaoEquipe() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isAddTeamModalOpen, setIsAddTeamModalOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<any>(null);
  const [isActionsModalOpen, setIsActionsModalOpen] = useState(false);
  const [expandedTeams, setExpandedTeams] = useState<Set<string>>(new Set());

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate('/auth');
      }
    });
  }, [navigate]);

  const { data: teams, isLoading, refetch } = useQuery({
    queryKey: ['teams'],
    queryFn: async () => {
      const { data } = await supabase
        .from('teams')
        .select(`
          *,
          leader:profiles!leader_id(id, full_name, avatar_url),
          members:team_members(id, role, user:profiles(id, full_name, avatar_url)),
          actions:team_actions(
            id, 
            title, 
            description, 
            action_type, 
            status, 
            scheduled_date,
            assigned_to,
            assignee:profiles!assigned_to(id, full_name, avatar_url)
          )
        `)
        .order('created_at', { ascending: false });
      return data;
    }
  });

  const toggleActionStatus = useMutation({
    mutationFn: async ({ actionId, currentStatus }: { actionId: string; currentStatus: string }) => {
      const newStatus = currentStatus === 'completed' ? 'planned' : 'completed';
      const { error } = await supabase
        .from('team_actions')
        .update({ status: newStatus })
        .eq('id', actionId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teams'] });
      toast.success('Status da ação atualizado');
    },
    onError: () => {
      toast.error('Erro ao atualizar status');
    }
  });

  const deleteTeam = useMutation({
    mutationFn: async (teamId: string) => {
      // Delete team members first (foreign key constraint)
      await supabase.from('team_members').delete().eq('team_id', teamId);
      
      // Delete team actions
      await supabase.from('team_actions').delete().eq('team_id', teamId);
      
      // Delete the team
      const { error } = await supabase.from('teams').delete().eq('id', teamId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teams'] });
      toast.success('Equipe excluída com sucesso');
    },
    onError: () => {
      toast.error('Erro ao excluir equipe');
    }
  });

  const toggleTeam = (teamId: string) => {
    setExpandedTeams(prev => {
      const newSet = new Set(prev);
      if (newSet.has(teamId)) {
        newSet.delete(teamId);
      } else {
        newSet.add(teamId);
      }
      return newSet;
    });
  };

  const formatDate = (date: string | null) => {
    if (!date) return 'Sem prazo';
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'outline'> = {
      completed: 'default',
      in_progress: 'secondary',
      planned: 'outline'
    };
    const labels: Record<string, string> = {
      completed: 'Concluída',
      in_progress: 'Em Andamento',
      planned: 'Planejada'
    };
    return <Badge variant={variants[status] || 'outline'}>{labels[status] || status}</Badge>;
  };

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Gestão de Equipe</h1>
            <p className="text-muted-foreground">Organize e gerencie suas equipes de campanha</p>
          </div>
          <button
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
            onClick={() => setIsAddTeamModalOpen(true)}
          >
            <Plus className="w-4 h-4" /> Nova Equipe
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : teams?.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nenhuma equipe criada</h3>
            <p className="text-muted-foreground">Crie sua primeira equipe para organizar colaboradores</p>
          </div>
        ) : (
          <div className="space-y-4">
            {teams?.map((team) => {
              const isExpanded = expandedTeams.has(team.id);
              const actions = team.actions || [];
              
              return (
                <div key={team.id} className="bg-card border rounded-lg overflow-hidden">
                  {/* Team Header */}
                  <div 
                    className="p-4 cursor-pointer hover:bg-muted/50 transition-colors flex items-center justify-between"
                    onClick={() => toggleTeam(team.id)}
                  >
                    <div className="flex items-center gap-3">
                      {isExpanded ? (
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                      )}
                      <div>
                        <h3 className="font-semibold text-lg">{team.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          {team.leader && (
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Avatar className="w-5 h-5">
                                <AvatarImage src={team.leader.avatar_url} />
                                <AvatarFallback>{team.leader.full_name?.[0]}</AvatarFallback>
                              </Avatar>
                              <span>{team.leader.full_name}</span>
                            </div>
                          )}
                          <span className="text-sm text-muted-foreground">
                            • {team.members?.length || 0} membros
                          </span>
                          <span className="text-sm text-muted-foreground">
                            • {actions.length} ações
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTeam(team);
                          setIsAddTeamModalOpen(true);
                        }}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTeam(team);
                          setIsActionsModalOpen(true);
                        }}
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Adicionar Ação
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm(`Tem certeza que deseja excluir a equipe "${team.name}"?`)) {
                            deleteTeam.mutate(team.id);
                          }
                        }}
                      >
                        Excluir
                      </Button>
                    </div>
                  </div>

                  {/* Team Actions List */}
                  {isExpanded && (
                    <div className="border-t">
                      {actions.length === 0 ? (
                        <div className="p-8 text-center text-muted-foreground">
                          <p>Nenhuma ação criada ainda.</p>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-2"
                            onClick={() => {
                              setSelectedTeam(team);
                              setIsActionsModalOpen(true);
                            }}
                          >
                            <Plus className="w-4 h-4 mr-1" />
                            Criar primeira ação
                          </Button>
                        </div>
                      ) : (
                        <div className="divide-y">
                          {actions.map((action: any) => (
                            <div
                              key={action.id}
                              className="p-4 hover:bg-muted/30 transition-colors flex items-center gap-4"
                            >
                              <Checkbox
                                checked={action.status === 'completed'}
                                onCheckedChange={() => {
                                  toggleActionStatus.mutate({
                                    actionId: action.id,
                                    currentStatus: action.status
                                  });
                                }}
                              />
                              
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className={`font-medium ${action.status === 'completed' ? 'line-through text-muted-foreground' : ''}`}>
                                    {action.title}
                                  </h4>
                                  {getStatusBadge(action.status)}
                                </div>
                                {action.description && (
                                  <p className="text-sm text-muted-foreground line-clamp-1">
                                    {action.description}
                                  </p>
                                )}
                              </div>

                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                {action.assignee && (
                                  <div className="flex items-center gap-1">
                                    <Avatar className="w-6 h-6">
                                      <AvatarImage src={action.assignee.avatar_url} />
                                      <AvatarFallback>{action.assignee.full_name?.[0]}</AvatarFallback>
                                    </Avatar>
                                    <span className="hidden md:inline">{action.assignee.full_name}</span>
                                  </div>
                                )}
                                
                                <span className="whitespace-nowrap">
                                  {formatDate(action.scheduled_date)}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <AddTeamModal
          isOpen={isAddTeamModalOpen}
          onClose={() => {
            setIsAddTeamModalOpen(false);
            setSelectedTeam(null);
            refetch();
          }}
          team={selectedTeam}
        />
        <TeamActionsModal
          isOpen={isActionsModalOpen}
          onClose={() => {
            setIsActionsModalOpen(false);
            setSelectedTeam(null);
            refetch();
          }}
          team={selectedTeam}
        />
      </main>
    </div>
  );
}
