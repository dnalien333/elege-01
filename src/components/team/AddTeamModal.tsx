import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  const [location, setLocation] = useState(team?.location || '');
  const [tasks, setTasks] = useState(team?.tasks || '');
  const [deliveryDate, setDeliveryDate] = useState<Date | undefined>(
    team?.delivery_date ? new Date(team.delivery_date) : undefined
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
      setLocation(team.location || '');
      setTasks(team.tasks || '');
      setDeliveryDate(team.delivery_date ? new Date(team.delivery_date) : undefined);
    }
  }, [team]);

  const wordCount = tasks.trim().split(/\s+/).filter(word => word.length > 0).length;

  const handleSave = async () => {
    try {
      if (team) {
        await supabase.from('teams').update({ 
          name, 
          leader_id: leaderId,
          location,
          tasks,
          delivery_date: deliveryDate?.toISOString()
        }).eq('id', team.id);
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
            created_by: user?.user?.id,
            location,
            tasks,
            delivery_date: deliveryDate?.toISOString()
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
            <Label>Data de Entrega</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal mt-1.5",
                    !deliveryDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {deliveryDate ? format(deliveryDate, "PPP") : "Selecione uma data"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={deliveryDate}
                  onSelect={setDeliveryDate}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
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
