import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

interface AddTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  team?: any;
}

export default function AddTeamModal({ isOpen, onClose, team }: AddTeamModalProps) {
  const [name, setName] = useState(team?.name || '');
  const [leaderId, setLeaderId] = useState(team?.leader_id || '');
  const [selectedMembers, setSelectedMembers] = useState<string[]>(
    team?.members?.filter((m: any) => m.role === 'member').map((m: any) => m.user_id) || []
  );

  const { data: colaboradores, refetch } = useQuery({
    queryKey: ['colaboradores'],
    queryFn: async () => {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .order('full_name');
      return data;
    }
  });

  useEffect(() => {
    if (team) {
      setName(team.name);
      setLeaderId(team.leader_id || '');
      setSelectedMembers(team.members?.filter((m: any) => m.role === 'member').map((m: any) => m.user_id) || []);
    }
  }, [team]);

  const handleSave = async () => {
    try {
      if (team) {
        await supabase.from('teams').update({ name, leader_id: leaderId }).eq('id', team.id);
        await supabase.from('team_members').delete().eq('team_id', team.id);
        if (leaderId) {
          await supabase.from('team_members').insert({ team_id: team.id, user_id: leaderId, role: 'leader' });
        }
        for (const memberId of selectedMembers) {
          await supabase.from('team_members').insert({ team_id: team.id, user_id: memberId, role: 'member' });
        }
        toast.success('Equipe atualizada com sucesso');
      } else {
        const { data: campaigns } = await supabase.from('campaigns').select('id').limit(1);
        const { data: user } = await supabase.auth.getUser();
        
        const { data: newTeam } = await supabase
          .from('teams')
          .insert({
            name,
            leader_id: leaderId,
            campaign_id: campaigns?.[0]?.id,
            created_by: user?.user?.id
          })
          .select()
          .single();

        if (newTeam && leaderId) {
          await supabase.from('team_members').insert({ team_id: newTeam.id, user_id: leaderId, role: 'leader' });
        }
        if (newTeam) {
          for (const memberId of selectedMembers) {
            await supabase.from('team_members').insert({ team_id: newTeam.id, user_id: memberId, role: 'member' });
          }
        }
        toast.success('Equipe criada com sucesso');
      }
      onClose();
      refetch();
    } catch (error) {
      toast.error('Erro ao salvar equipe');
      console.error(error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{team ? 'Editar Equipe' : 'Nova Equipe'}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Nome da Equipe</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Equipe Centro"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Líder</label>
            <select
              className="w-full px-3 py-2 border rounded-lg"
              value={leaderId}
              onChange={(e) => setLeaderId(e.target.value)}
            >
              <option value="">Selecione um líder</option>
              {colaboradores?.map((c) => (
                <option key={c.id} value={c.id}>{c.full_name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Colaboradores</label>
            <div className="border rounded-lg p-3 max-h-64 overflow-y-auto space-y-2">
              {colaboradores?.filter((c) => c.id !== leaderId).map((c) => (
                <label
                  key={c.id}
                  className="flex items-center gap-2 p-2 hover:bg-muted rounded cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedMembers.includes(c.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedMembers([...selectedMembers, c.id]);
                      } else {
                        setSelectedMembers(selectedMembers.filter((id) => id !== c.id));
                      }
                    }}
                  />
                  <span>{c.full_name}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <button className="px-4 py-2 border rounded-lg hover:bg-muted" onClick={onClose}>
            Cancelar
          </button>
          <button
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
            onClick={handleSave}
            disabled={!name}
          >
            Salvar
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
