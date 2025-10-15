import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Sidebar from "@/components/layout/Sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Users, UserCog, Upload, Download } from "lucide-react";
import { toast } from "sonner";
import { exportToCSV, parseCSV, readFileAsText } from "@/lib/csvUtils";
import FilterSidebar from "@/components/eleitores/FilterSidebar";
import VoterTable from "@/components/eleitores/VoterTable";
import VoterModal from "@/components/eleitores/VoterModal";
import ColaboradorTable from "@/components/colaboradores/ColaboradorTable";
import ColaboradorModal from "@/components/colaboradores/ColaboradorModal";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const Cadastro = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState({});
  const [colaboradorFilters, setColaboradorFilters] = useState({ tags: [], city: '', state: '' });
  const [page, setPage] = useState(1);
  const [voterSearchTerm, setVoterSearchTerm] = useState("");
  const [colaboradorSearchTerm, setColaboradorSearchTerm] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openColaboradorModal, setOpenColaboradorModal] = useState(false);
  const [editingVoter, setEditingVoter] = useState(null);
  const [selectedColaborador, setSelectedColaborador] = useState(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [currentCampaignId, setCurrentCampaignId] = useState<string | null>(null);
  const voterFileInputRef = useRef<HTMLInputElement>(null);
  const colaboradorFileInputRef = useRef<HTMLInputElement>(null);

  const { data: campaigns } = useQuery({
    queryKey: ["campaigns"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("campaigns")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUserId(session.user.id);
      }
    });
  }, [navigate]);

  useEffect(() => {
    if (campaigns && campaigns.length > 0 && !currentCampaignId) {
      setCurrentCampaignId(campaigns[0].id);
    }
  }, [campaigns, currentCampaignId]);

  const { data: colaboradores, isLoading: isLoadingColaboradores } = useQuery({
    queryKey: ['colaboradores', colaboradorFilters, currentCampaignId, colaboradorSearchTerm],
    queryFn: async () => {
      if (!currentCampaignId) return [];
      let query = supabase
        .from('colaboradores')
        .select('*')
        .eq('campaign_id', currentCampaignId)
        .order('full_name');
      if (colaboradorFilters.tags?.length) query = query.contains('tags', colaboradorFilters.tags);
      if (colaboradorFilters.city) query = query.ilike('city', `%${colaboradorFilters.city}%`);
      if (colaboradorFilters.state) query = query.eq('state', colaboradorFilters.state);
      if (colaboradorSearchTerm) {
        query = query.or(
          `full_name.ilike.%${colaboradorSearchTerm}%,email.ilike.%${colaboradorSearchTerm}%,phone.ilike.%${colaboradorSearchTerm}%`
        );
      }
      const { data } = await query;
      return data;
    },
    enabled: !!currentCampaignId,
  });

  const handleImportVoters = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !currentCampaignId) return;

    try {
      const csvText = await readFileAsText(file);
      const rows = parseCSV(csvText);

      if (rows.length === 0) {
        toast.error('Arquivo CSV vazio');
        return;
      }

      const votersToInsert = rows.map(row => ({
        full_name: row.nome || row.full_name,
        email: row.email,
        phone: row.telefone || row.phone,
        city: row.cidade || row.city,
        state: row.estado || row.state,
        electoral_section: row.seção_eleitoral || row.electoral_section,
        tags: Array.isArray(row.tags) ? row.tags : [],
        notes: row.notas || row.notes,
        campaign_id: currentCampaignId
      }));

      const { error } = await supabase
        .from('voters')
        .insert(votersToInsert);

      if (error) throw error;

      toast.success(`${votersToInsert.length} eleitor(es) importado(s) com sucesso`);
      e.target.value = '';
    } catch (error: any) {
      toast.error(`Erro ao importar: ${error.message}`);
    }
  };

  const deleteVoter = useMutation({
    mutationFn: async (voterId: string) => {
      const { error } = await supabase.from('voters').delete().eq('id', voterId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['voters'] });
      toast.success('Eleitor excluído com sucesso');
    },
    onError: () => {
      toast.error('Erro ao excluir eleitor');
    }
  });

  const handleDeleteVoter = (voter: any) => {
    if (confirm(`Tem certeza que deseja excluir "${voter.full_name}"?`)) {
      deleteVoter.mutate(voter.id);
    }
  };

  const handleExportColaboradores = () => {
    if (!colaboradores || colaboradores.length === 0) {
      toast.error('Nenhum colaborador para exportar');
      return;
    }

    const headers = ['Nome', 'Email', 'Telefone', 'Cidade', 'Estado', 'Função', 'Tags', 'Notas'];
    const mappedData = colaboradores.map((c: any) => ({
      nome: c.full_name,
      email: c.email,
      telefone: c.phone,
      cidade: c.city,
      estado: c.state,
      função: c.role,
      tags: c.tags,
      notas: c.notes
    }));

    const filename = `colaboradores_${new Date().toISOString().split('T')[0]}.csv`;
    exportToCSV(mappedData, filename, headers);
    toast.success(`${colaboradores.length} colaborador(es) exportado(s)`);
  };

  const handleImportColaboradores = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !currentCampaignId) return;

    try {
      const csvText = await readFileAsText(file);
      const rows = parseCSV(csvText);

      if (rows.length === 0) {
        toast.error('Arquivo CSV vazio');
        return;
      }

      const colaboradoresToInsert = rows.map(row => ({
        full_name: row.nome || row.full_name,
        email: row.email,
        phone: row.telefone || row.phone,
        city: row.cidade || row.city,
        state: row.estado || row.state,
        role: row.função || row.role || 'colaborador',
        tags: Array.isArray(row.tags) ? row.tags : [],
        notes: row.notas || row.notes,
        campaign_id: currentCampaignId
      }));

      const { error } = await supabase
        .from('colaboradores')
        .insert(colaboradoresToInsert);

      if (error) throw error;

      toast.success(`${colaboradoresToInsert.length} colaborador(es) importado(s) com sucesso`);
      e.target.value = '';
    } catch (error: any) {
      toast.error(`Erro ao importar: ${error.message}`);
    }
  };

  const deleteColaborador = useMutation({
    mutationFn: async (colaboradorId: string) => {
      const { error } = await supabase.from('colaboradores').delete().eq('id', colaboradorId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['colaboradores'] });
      toast.success('Colaborador excluído com sucesso');
    },
    onError: () => {
      toast.error('Erro ao excluir colaborador');
    }
  });

  const handleDeleteColaborador = (colaborador: any) => {
    if (confirm(`Tem certeza que deseja excluir "${colaborador.full_name}"?`)) {
      deleteColaborador.mutate(colaborador.id);
    }
  };

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Cadastros
            </h1>
            <p className="text-muted-foreground">
              Gerencie eleitores e colaboradores da sua campanha
            </p>
          </div>

          <Tabs defaultValue="eleitores" className="w-full">
            <TabsList>
              <TabsTrigger value="eleitores" className="gap-2">
                <Users className="h-4 w-4" />
                Eleitores
              </TabsTrigger>
              <TabsTrigger value="colaboradores" className="gap-2">
                <UserCog className="h-4 w-4" />
                Colaboradores
              </TabsTrigger>
            </TabsList>

            <TabsContent value="eleitores" className="mt-6">
              <div className="space-y-4">
                <div className="flex justify-end">
                  <input
                    ref={voterFileInputRef}
                    type="file"
                    accept=".csv"
                    onChange={handleImportVoters}
                    className="hidden"
                  />
                  <Button 
                    variant="outline"
                    onClick={() => voterFileInputRef.current?.click()}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Importar CSV
                  </Button>
                </div>
                <div className="flex gap-6 h-full">
                  <div className="w-72">
                  <FilterSidebar
                    filters={filters}
                    setFilters={setFilters}
                    currentCampaignId={currentCampaignId || undefined}
                    searchTerm={voterSearchTerm}
                    setSearchTerm={setVoterSearchTerm}
                  />
                </div>
                <div className="flex-1">
                  <VoterTable
                    filters={filters}
                    page={page}
                    onEdit={(v) => { setEditingVoter(v); setOpenModal(true) }}
                    onDelete={handleDeleteVoter}
                    currentCampaignId={currentCampaignId || undefined}
                    searchTerm={voterSearchTerm}
                  />
                </div>
              </div>
              </div>

              {openModal && (
                <VoterModal
                  voter={editingVoter}
                  onClose={() => { setOpenModal(false); setEditingVoter(null) }}
                  currentCampaignId={currentCampaignId || undefined}
                  currentUserId={userId || undefined}
                />
              )}
            </TabsContent>

            <TabsContent value="colaboradores" className="mt-6">
              <div className="flex gap-6 h-full">
                <div className="w-72">
                  <FilterSidebar
                    filters={colaboradorFilters}
                    setFilters={setColaboradorFilters}
                    searchTerm={colaboradorSearchTerm}
                    setSearchTerm={setColaboradorSearchTerm}
                  />
                </div>
                <div className="flex-1 space-y-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">Colaboradores</h2>
                    <div className="flex gap-2">
                      <input
                        ref={colaboradorFileInputRef}
                        type="file"
                        accept=".csv"
                        onChange={handleImportColaboradores}
                        className="hidden"
                      />
                      <Button 
                        variant="outline"
                        onClick={() => colaboradorFileInputRef.current?.click()}
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Importar CSV
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={handleExportColaboradores}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Exportar CSV
                      </Button>
                      <Button onClick={() => setOpenColaboradorModal(true)}>
                        Novo Colaborador
                      </Button>
                    </div>
                  </div>
                  <ColaboradorTable
                    colaboradores={colaboradores}
                    isLoading={isLoadingColaboradores}
                    onEdit={(c) => {
                      setSelectedColaborador(c);
                      setOpenColaboradorModal(true);
                    }}
                    onDelete={handleDeleteColaborador}
                  />
                </div>
              </div>

              {openColaboradorModal && (
                <ColaboradorModal
                  isOpen={openColaboradorModal}
                  onClose={() => {
                    setOpenColaboradorModal(false);
                    setSelectedColaborador(null);
                  }}
                  colaborador={selectedColaborador}
                  currentCampaignId={currentCampaignId || undefined}
                />
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Cadastro;
