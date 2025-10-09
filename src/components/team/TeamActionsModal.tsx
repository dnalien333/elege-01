import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

interface TeamActionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  team?: any;
}

export default function TeamActionsModal({ isOpen, onClose, team }: TeamActionsModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [actionType, setActionType] = useState('canvassing');
  const [locationName, setLocationName] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');

  const handleSave = async () => {
    try {
      const { data: user } = await supabase.auth.getUser();
      
      await supabase.from('team_actions').insert({
        team_id: team.id,
        title,
        description,
        action_type: actionType,
        location_name: locationName,
        scheduled_date: scheduledDate || null,
        created_by: user?.user?.id
      });

      toast.success('Ação adicionada com sucesso');
      setTitle('');
      setDescription('');
      setActionType('canvassing');
      setLocationName('');
      setScheduledDate('');
      onClose();
    } catch (error) {
      toast.error('Erro ao adicionar ação');
      console.error(error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Nova Ação - {team?.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Título</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Panfletagem no Centro"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Descrição</label>
            <textarea
              className="w-full px-3 py-2 border rounded-lg"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva a ação..."
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Tipo de Ação</label>
            <select
              className="w-full px-3 py-2 border rounded-lg"
              value={actionType}
              onChange={(e) => setActionType(e.target.value)}
            >
              <option value="canvassing">Panfletagem</option>
              <option value="event">Evento</option>
              <option value="meeting">Reunião</option>
              <option value="phonebank">Ligações</option>
              <option value="other">Outro</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Local</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg"
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
              placeholder="Ex: Praça Central"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Data Programada</label>
            <input
              type="datetime-local"
              className="w-full px-3 py-2 border rounded-lg"
              value={scheduledDate}
              onChange={(e) => setScheduledDate(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <button className="px-4 py-2 border rounded-lg hover:bg-muted" onClick={onClose}>
            Cancelar
          </button>
          <button
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
            onClick={handleSave}
            disabled={!title}
          >
            Adicionar
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
