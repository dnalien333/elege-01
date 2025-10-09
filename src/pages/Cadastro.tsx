import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Sidebar from "@/components/layout/Sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, UserCog } from "lucide-react";
import FilterSidebar from "@/components/eleitores/FilterSidebar";
import VoterTable from "@/components/eleitores/VoterTable";
import VoterModal from "@/components/eleitores/VoterModal";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";

const Cadastro = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [editingVoter, setEditingVoter] = useState(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [currentCampaignId, setCurrentCampaignId] = useState<string | null>(null);

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
              <div className="flex gap-6 h-full">
                <div className="w-72">
                  <FilterSidebar
                    filters={filters}
                    setFilters={setFilters}
                    currentCampaignId={currentCampaignId || undefined}
                  />
                </div>
                <div className="flex-1">
                  <VoterTable
                    filters={filters}
                    page={page}
                    onEdit={(v) => { setEditingVoter(v); setOpenModal(true) }}
                    currentCampaignId={currentCampaignId || undefined}
                  />
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
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <UserCog className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Gestão de equipe</h3>
                  <p className="text-muted-foreground text-center">
                    Adicione e gerencie colaboradores e suas permissões
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Cadastro;
