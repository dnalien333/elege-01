import { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

interface AddTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  team?: any;
}

export default function AddTeamModal({ isOpen, onClose, team }: AddTeamModalProps) {
  const queryClient = useQueryClient();
  const [name, setName] = useState(team?.name || '');
  const [leaderId, setLeaderId] = useState(team?.leader_id || '');
  const [selectedMembers, setSelectedMembers] = useState<string[]>(
    team?.members?.filter((m: any) => m.role === 'member').map((m: any) => m.user_id) || []
  );
  const [location, setLocation] = useState(team?.location || '');
  const [tasks, setTasks] = useState(team?.tasks || '');

  const { data: campaigns } = useQuery({
    queryKey: ['campaigns'],
    queryFn: async () => {
      const { data } = await supabase
        .from('campaigns')
        .select('id')
        .limit(1);
      return data;
    }
  });

  const { data: colaboradores } = useQuery({
    queryKey: ['colaboradores', campaigns?.[0]?.id],
    queryFn: async () => {
      if (!campaigns?.[0]?.id) return [];
      const { data } = await supabase
        .from('colaboradores')
        .select('*')
        .eq('campaign_id', campaigns[0].id)
        .order('full_name');
      return data;
    },
    enabled: !!campaigns?.[0]?.id
  });

  useEffect(() => {
    if (team) {
      setName(team.name);
      setLeaderId(team.leader_id || '');
      setSelectedMembers(team.members?.filter((m: any) => m.role === 'member').map((m: any) => m.user_id) || []);
      setLocation(team.location || '');
      setTasks(team.tasks || '');
    }
  }, [team]);

  const wordCount = tasks.trim().split(/\s+/).filter(word => word.length > 0).length;

  const handleSave = async () => {
    try {
      if (team) {
        const { error } = await supabase.from('teams').update({ 
          name, 
          leader_id: leaderId || null,
          location: location || null,
          tasks: tasks || null
        }).eq('id', team.id);
        if (error) throw error;
        await supabase.from('team_members').delete().eq('team_id', team.id);
        if (leaderId) {
          await supabase.from('team_members').insert({ team_id: team.id, user_id: leaderId, role: 'leader' });
        }
        for (const memberId of selectedMembers) {
          await supabase.from('team_members').insert({ team_id: team.id, user_id: memberId, role: 'member' });
        }
        toast.success('Equipe atualizada com sucesso');
      } else {
        const { data: user } = await supabase.auth.getUser();
        const userId = user?.user?.id;
        
        // Get or create a campaign for the user
        let { data: campaigns } = await supabase.from('campaigns').select('id').limit(1);
        if (!campaigns || campaigns.length === 0) {
          const { data: newCampaign, error: campError } = await supabase
            .from('campaigns')
            .insert({
              name: 'Minha Campanha',
              candidate_name: user?.user?.user_metadata?.full_name || 'Candidato',
              owner_id: userId,
            })
            .select('id')
            .single();
          if (campError) throw campError;
          campaigns = [newCampaign];
        }
        
        const { data: newTeam, error } = await supabase
          .from('teams')
          .insert({
            name,
            leader_id: leaderId || null,
            campaign_id: campaigns[0].id,
            created_by: userId,
            location: location || null,
            tasks: tasks || null
          })
          .select()
          .single();

        if (error) throw error;

        if (newTeam && leaderId) {
          await supabase.from('team_members').insert({ team_id: newTeam.id, user_id: leaderId, role: 'leader' });
        }
        if (newTeam) {
          // Only add members who are not the leader
          for (const memberId of selectedMembers) {
            if (memberId !== leaderId) {
              await supabase.from('team_members').insert({ team_id: newTeam.id, user_id: memberId, role: 'member' });
            }
          }
        }
        toast.success('Equipe criada com sucesso');
      }
      
      // Invalidate teams query to refresh the list
      queryClient.invalidateQueries({ queryKey: ['teams'] });
      onClose();
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
        <div className="space-y-4 max-h-[60vh] overflow-y-auto px-1">
          <div>
            <Label htmlFor="team-name">Nome da Equipe</Label>
            <Input
              id="team-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Equipe Centro"
              className="mt-1.5"
            />
          </div>

          <div>
            <Label htmlFor="leader">Líder</Label>
            <select
              id="leader"
              className="w-full px-3 py-2 border rounded-md mt-1.5 bg-background"
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
            <Label htmlFor="location">Localização</Label>
            <Input
              id="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Ex: Zona Norte, Bairro Centro"
              className="mt-1.5"
            />
          </div>

          <div>
            <Label htmlFor="tasks">Tarefas (máx. 60 palavras)</Label>
            <Textarea
              id="tasks"
              value={tasks}
              onChange={(e) => setTasks(e.target.value)}
              placeholder="Descreva as tarefas da equipe..."
              className="mt-1.5 min-h-[100px]"
            />
            <p className={cn(
              "text-xs mt-1",
              wordCount > 60 ? "text-destructive" : "text-muted-foreground"
            )}>
              {wordCount}/60 palavras
            </p>
          </div>

          <div>
            <Label>Membros da Equipe</Label>
            <div className="border rounded-md p-3 max-h-48 overflow-y-auto space-y-2 mt-1.5">
              {colaboradores?.filter((c) => c.id !== leaderId).map((c) => (
                <div
                  key={c.id}
                  className="flex items-center gap-2 p-2 hover:bg-muted rounded cursor-pointer"
                  onClick={() => {
                    if (selectedMembers.includes(c.id)) {
                      setSelectedMembers(selectedMembers.filter((id) => id !== c.id));
                    } else {
                      setSelectedMembers([...selectedMembers, c.id]);
                    }
                  }}
                >
                  <Checkbox
                    checked={selectedMembers.includes(c.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedMembers([...selectedMembers, c.id]);
                      } else {
                        setSelectedMembers(selectedMembers.filter((id) => id !== c.id));
                      }
                    }}
                  />
                  <span>{c.full_name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            disabled={wordCount > 60}
          >
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
