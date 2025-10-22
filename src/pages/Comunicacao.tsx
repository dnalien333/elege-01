import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, MessageSquare, Send, Users, TrendingUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import Sidebar from "@/components/layout/Sidebar";
import NewCommunicationModal from "@/components/comunicacao/NewCommunicationModal";
import CommunicationHistory from "@/components/comunicacao/CommunicationHistory";
import CommunicationStats from "@/components/comunicacao/CommunicationStats";

const Comunicacao = () => {
  const navigate = useNavigate();
  const [showNewModal, setShowNewModal] = useState(false);
  const [currentCampaignId, setCurrentCampaignId] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }

      // Get user's campaign
      const { data: campaigns } = await supabase
        .from("campaigns")
        .select("id")
        .eq("owner_id", session.user.id)
        .single();

      if (campaigns) {
        setCurrentCampaignId(campaigns.id);
      }
    };

    checkAuth();
  }, [navigate]);

  // Fetch communications
  const { data: communications, refetch } = useQuery({
    queryKey: ["communications", currentCampaignId],
    queryFn: async () => {
      if (!currentCampaignId) return [];

      const { data, error } = await supabase
        .from("communications")
        .select(`
          *,
          segments (
            name,
            voter_count
          )
        `)
        .eq("campaign_id", currentCampaignId)
        .order("created_at", { ascending: false });

      if (error) {
        toast.error("Erro ao carregar comunicações");
        throw error;
      }

      return data || [];
    },
    enabled: !!currentCampaignId,
  });

  // Fetch segments for stats
  const { data: segments } = useQuery({
    queryKey: ["segments", currentCampaignId],
    queryFn: async () => {
      if (!currentCampaignId) return [];

      const { data, error } = await supabase
        .from("segments")
        .select("*")
        .eq("campaign_id", currentCampaignId);

      if (error) throw error;
      return data || [];
    },
    enabled: !!currentCampaignId,
  });

  const handleNewCommunication = () => {
    if (!currentCampaignId) {
      toast.error("Nenhuma campanha encontrada");
      return;
    }
    setShowNewModal(true);
  };

  const totalSent = communications?.reduce((acc, comm) => acc + (comm.sent_count || 0), 0) || 0;
  const totalSegments = segments?.length || 0;
  const totalVoters = segments?.reduce((acc, seg) => acc + (seg.voter_count || 0), 0) || 0;

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar />
      <main className="flex-1 w-full p-6 lg:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Comunicações
              </h1>
              <p className="text-muted-foreground">
                Gerencie suas mensagens e campanhas de comunicação
              </p>
            </div>
            <Button
              onClick={handleNewCommunication}
              disabled={!currentCampaignId}
              size="lg"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nova Comunicação
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Mensagens Enviadas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Send className="w-4 h-4 text-primary" />
                  <span className="text-2xl font-bold">{totalSent}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Comunicações
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-primary" />
                  <span className="text-2xl font-bold">{communications?.length || 0}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Segmentos Ativos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="text-2xl font-bold">{totalSegments}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total de Eleitores
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <span className="text-2xl font-bold">{totalVoters}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Communication Stats */}
          <CommunicationStats communications={communications || []} />

          {/* Communication History */}
          <CommunicationHistory
            communications={communications || []}
            onRefetch={refetch}
          />
        </div>
      </main>

      {/* New Communication Modal */}
      {showNewModal && currentCampaignId && (
        <NewCommunicationModal
          open={showNewModal}
          onOpenChange={setShowNewModal}
          campaignId={currentCampaignId}
          onSuccess={refetch}
        />
      )}
    </div>
  );
};

export default Comunicacao;
