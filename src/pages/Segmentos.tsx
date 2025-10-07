import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Sidebar from "@/components/layout/Sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Filter } from "lucide-react";
import { toast } from "sonner";

interface Segment {
  id: string;
  name: string;
  description: string | null;
  voter_count: number;
  created_at: string;
}

const Segmentos = () => {
  const navigate = useNavigate();
  const [segments, setSegments] = useState<Segment[]>([]);
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    campaign_id: "",
    name: "",
    description: "",
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      } else {
        loadCampaigns();
        loadSegments();
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
      if (data && data.length > 0) {
        setFormData(prev => ({ ...prev, campaign_id: data[0].id }));
      }
    } catch (error) {
      console.error("Error loading campaigns:", error);
    }
  };

  const loadSegments = async () => {
    try {
      const { data, error } = await supabase
        .from("segments")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setSegments(data || []);
    } catch (error) {
      console.error("Error loading segments:", error);
      toast.error("Erro ao carregar segmentos");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não autenticado");

      const { error } = await supabase.from("segments").insert({
        ...formData,
        created_by: user.id,
        filter_criteria: {},
        voter_count: 0,
      });

      if (error) throw error;

      toast.success("Segmento criado com sucesso!");
      setIsOpen(false);
      setFormData({
        campaign_id: campaigns[0]?.id || "",
        name: "",
        description: "",
      });
      loadSegments();
    } catch (error: any) {
      console.error("Error creating segment:", error);
      toast.error(error.message || "Erro ao criar segmento");
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
                Segmentação
              </h1>
              <p className="text-muted-foreground">
                Organize seus eleitores em grupos específicos
              </p>
            </div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button disabled={campaigns.length === 0}>
                  <Plus className="mr-2 h-4 w-4" />
                  Novo Segmento
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Criar Novo Segmento</DialogTitle>
                  <DialogDescription>
                    Defina critérios para agrupar eleitores
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome do Segmento</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ex: Jovens de 18-25 anos"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Descreva os critérios deste segmento"
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Criando..." : "Criar Segmento"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {campaigns.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Filter className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Crie uma campanha primeiro</h3>
                <p className="text-muted-foreground text-center mb-4">
                  Você precisa ter uma campanha para criar segmentos
                </p>
                <Button onClick={() => navigate("/campanhas")}>
                  Criar Campanha
                </Button>
              </CardContent>
            </Card>
          ) : segments.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Filter className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Nenhum segmento criado</h3>
                <p className="text-muted-foreground text-center mb-4">
                  Crie segmentos para organizar melhor sua base de eleitores
                </p>
                <Button onClick={() => setIsOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Criar Primeiro Segmento
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {segments.map((segment) => (
                <Card key={segment.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Filter className="h-8 w-8 text-primary mb-2" />
                    <CardTitle>{segment.name}</CardTitle>
                    <CardDescription>
                      {segment.description || "Sem descrição"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">
                        {segment.voter_count}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        eleitores
                      </span>
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

export default Segmentos;
