import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Users, Plus } from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import TeamCard from '@/components/team/TeamCard';
import AddTeamModal from '@/components/team/AddTeamModal';
import TeamActionsModal from '@/components/team/TeamActionsModal';

export default function GestaoEquipe() {
  const navigate = useNavigate();
  const [isAddTeamModalOpen, setIsAddTeamModalOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<any>(null);
  const [isActionsModalOpen, setIsActionsModalOpen] = useState(false);

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
          members:team_members(id, role, user:profiles(id, full_name, avatar_url, email))
        `)
        .order('created_at', { ascending: false });
      return data;
    }
  });

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams?.map((team) => (
              <TeamCard
                key={team.id}
                team={team}
                onEdit={() => {
                  setSelectedTeam(team);
                  setIsAddTeamModalOpen(true);
                }}
                onAddActions={() => {
                  setSelectedTeam(team);
                  setIsActionsModalOpen(true);
                }}
              />
            ))}
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
