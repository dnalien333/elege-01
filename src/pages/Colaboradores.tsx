import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Plus } from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import FilterSidebar from '@/components/eleitores/FilterSidebar';
import ColaboradorTable from '@/components/colaboradores/ColaboradorTable';
import ColaboradorModal from '@/components/colaboradores/ColaboradorModal';

export default function Colaboradores() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({ tags: [], city: '', state: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedColaborador, setSelectedColaborador] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate('/auth');
      }
    });
  }, [navigate]);

  const { data: colaboradores, isLoading } = useQuery({
    queryKey: ['colaboradores', filters],
    queryFn: async () => {
      let query = supabase.from('profiles').select('*').order('full_name');
      if (filters.tags.length) query = query.contains('tags', filters.tags);
      if (filters.city) query = query.ilike('city', `%${filters.city}%`);
      if (filters.state) query = query.eq('state', filters.state);
      const { data } = await query;
      return data;
    }
  });

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <div className="flex flex-1">
        <FilterSidebar 
          filters={filters} 
          setFilters={setFilters} 
        />
        <main className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">Colaboradores</h1>
              <p className="text-muted-foreground">Gerencie sua equipe de campanha</p>
            </div>
            <button
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
              onClick={() => {
                setSelectedColaborador(null);
                setIsModalOpen(true);
              }}
            >
              <Plus className="w-4 h-4" /> Novo Colaborador
            </button>
          </div>
          <ColaboradorTable
            colaboradores={colaboradores}
            isLoading={isLoading}
            onEdit={(c) => {
              setSelectedColaborador(c);
              setIsModalOpen(true);
            }}
          />
        </main>
      </div>
      <ColaboradorModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedColaborador(null);
        }}
        colaborador={selectedColaborador}
      />
    </div>
  );
}
