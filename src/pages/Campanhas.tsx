import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Sidebar from "@/components/layout/Sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Flag, Calendar } from "lucide-react";
import { toast } from "sonner";

interface Campaign {
  id: string;
  name: string;
  candidate_name: string;
  party: string | null;
  election_year: number;
  created_at: string;
}

const Campanhas = () => {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    candidate_name: "",
    party: "",
    election_year: 2026,
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      } else {
        loadCampaigns();
      }
    });
  }, [navigate]);

  const loadCampaigns = async () => {
    try {
      const { data, error } = await supabase
        .from("campaigns")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setCampaigns(data || []);
    } catch (error) {
      console.error("Error loading campaigns:", error);
      toast.error("Erro ao carregar campanhas");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não autenticado");

      const { error } = await supabase.from("campaigns").insert({
        ...formData,
        owner_id: user.id,
      });

      if (error) throw error;

      toast.success("Campanha criada com sucesso!");
      setIsOpen(false);
      setFormData({ name: "", candidate_name: "", party: "", election_year: 2026 });
      loadCampaigns();
    } catch (error: any) {
      console.error("Error creating campaign:", error);
      toast.error(error.message || "Erro ao criar campanha");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Campanhas Eleitorais
              </h1>
              <p className="text-muted-foreground">
                Gerencie todas as suas campanhas
              </p>
            </div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Nova Campanha
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Criar Nova Campanha</DialogTitle>
                  <DialogDescription>
                    Preencha os dados da campanha eleitoral
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome da Campanha</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ex: Campanha 2026"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="candidate">Nome do Candidato</Label>
                    <Input
                      id="candidate"
                      value={formData.candidate_name}
                      onChange={(e) => setFormData({ ...formData, candidate_name: e.target.value })}
                      placeholder="Nome completo"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="party">Partido</Label>
                    <Input
                      id="party"
                      value={formData.party}
                      onChange={(e) => setFormData({ ...formData, party: e.target.value })}
                      placeholder="Sigla do partido"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="year">Ano Eleitoral</Label>
                    <Input
                      id="year"
                      type="number"
                      value={formData.election_year}
                      onChange={(e) => setFormData({ ...formData, election_year: parseInt(e.target.value) })}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Criando..." : "Criar Campanha"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {campaigns.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Flag className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Nenhuma campanha criada</h3>
                <p className="text-muted-foreground text-center mb-4">
                  Comece criando sua primeira campanha eleitoral
                </p>
                <Button onClick={() => setIsOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Criar Campanha
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {campaigns.map((campaign) => (
                <Card key={campaign.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <Flag className="h-8 w-8 text-primary" />
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <CardTitle className="mt-4">{campaign.name}</CardTitle>
                    <CardDescription>
                      {campaign.candidate_name}
                      {campaign.party && ` - ${campaign.party}`}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Ano: {campaign.election_year}</span>
                      <Button variant="ghost" size="sm">
                        Ver Detalhes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Campanhas;
