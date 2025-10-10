import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useQueryClient } from '@tanstack/react-query';

const schema = z.object({
  full_name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.string().email('Email inválido').optional().or(z.literal('')),
  phone: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  tags: z.string().optional(),
  role: z.enum(['admin', 'coordinator', 'collaborator']),
  notes: z.string().optional()
});

type ColaboradorFormData = z.infer<typeof schema>;

interface ColaboradorModalProps {
  isOpen: boolean;
  onClose: () => void;
  colaborador?: any;
  currentCampaignId?: string;
}

export default function ColaboradorModal({ isOpen, onClose, colaborador, currentCampaignId }: ColaboradorModalProps) {
  const queryClient = useQueryClient();
  
  const form = useForm<ColaboradorFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      full_name: '',
      email: '',
      phone: '',
      city: '',
      state: '',
      tags: '',
      role: 'collaborator',
      notes: ''
    }
  });

  useEffect(() => {
    if (colaborador) {
      form.reset({
        full_name: colaborador.full_name || '',
        email: colaborador.email || '',
        phone: colaborador.phone || '',
        city: colaborador.city || '',
        state: colaborador.state || '',
        tags: colaborador.tags?.join(', ') || '',
        role: colaborador.role || 'collaborator',
        notes: colaborador.notes || ''
      });
    } else {
      form.reset({
        full_name: '',
        email: '',
        phone: '',
        city: '',
        state: '',
        tags: '',
        role: 'collaborator',
        notes: ''
      });
    }
  }, [colaborador, form]);

  const onSubmit = async (data: ColaboradorFormData) => {
    try {
      if (!currentCampaignId) {
        toast.error('Nenhuma campanha selecionada');
        return;
      }

      const tagsArray = data.tags
        ? data.tags.split(',').map(t => t.trim()).filter(Boolean)
        : [];

      const payload = {
        full_name: data.full_name,
        email: data.email || null,
        phone: data.phone || null,
        city: data.city || null,
        state: data.state || null,
        tags: tagsArray,
        role: data.role,
        notes: data.notes || null
      };

      if (colaborador) {
        const { error } = await supabase
          .from('colaboradores')
          .update(payload)
          .eq('id', colaborador.id);
        
        if (error) throw error;
        toast.success('Colaborador atualizado com sucesso');
      } else {
        const { error } = await supabase
          .from('colaboradores')
          .insert([{
            ...payload,
            campaign_id: currentCampaignId
          }]);
        
        if (error) throw error;
        toast.success('Colaborador criado com sucesso');
      }

      queryClient.invalidateQueries({ queryKey: ['colaboradores'] });
      onClose();
      form.reset();
    } catch (error) {
      toast.error('Erro ao salvar colaborador');
      console.error(error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{colaborador ? 'Editar Colaborador' : 'Novo Colaborador'}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome Completo</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="João Silva" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" placeholder="joao@email.com" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="(11) 99999-9999" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cidade</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="São Paulo" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estado</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="SP" maxLength={2} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Função</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a função" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="collaborator">Colaborador</SelectItem>
                      <SelectItem value="coordinator">Coordenador</SelectItem>
                      <SelectItem value="admin">Administrador</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags (separadas por vírgula)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="liderança, comunicação, digital" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Observações</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Anotações sobre o colaborador..." rows={3} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <button type="button" className="px-4 py-2 border rounded-lg hover:bg-muted" onClick={onClose}>
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
              >
                Salvar
              </button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
