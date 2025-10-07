import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Sidebar from "@/components/layout/Sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Users, Search } from "lucide-react";
import { toast } from "sonner";

interface Voter {
  id: string;
  full_name: string;
  email: string | null;
  phone: string | null;
  city: string | null;
  state: string | null;
  tags: string[];
}

const Cadastro = () => {
  const navigate = useNavigate();
  const [voters, setVoters] = useState<Voter[]>([]);
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    campaign_id: "",
    full_name: "",
    email: "",
    phone: "",
    city: "",
    state: "",
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      } else {
        loadCampaigns();
        loadVoters();
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

  const loadVoters = async () => {
    try {
      const { data, error } = await supabase
        .from("voters")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setVoters(data || []);
    } catch (error) {
      console.error("Error loading voters:", error);
      toast.error("Erro ao carregar cadastros");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.from("voters").insert({
        ...formData,
        tags: [],
        preferences: {},
      });

      if (error) throw error;

      toast.success("Cadastro criado com sucesso!");
      setIsOpen(false);
      setFormData({
        campaign_id: campaigns[0]?.id || "",
        full_name: "",
        email: "",
        phone: "",
        city: "",
        state: "",
      });
      loadVoters();
    } catch (error: any) {
      console.error("Error creating voter:", error);
      toast.error(error.message || "Erro ao criar cadastro");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredVoters = voters.filter(voter =>
    voter.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    voter.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    voter.city?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Cadastro de Eleitores
              </h1>
              <p className="text-muted-foreground">
                Gerencie sua base de contatos
              </p>
            </div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button disabled={campaigns.length === 0}>
                  <Plus className="mr-2 h-4 w-4" />
                  Novo Cadastro
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Novo Cadastro</DialogTitle>
                  <DialogDescription>
                    Adicione um novo eleitor à base de dados
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Nome Completo</Label>
                    <Input
                      id="fullName"
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">Cidade</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">Estado</Label>
                      <Input
                        id="state"
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        maxLength={2}
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Salvando..." : "Salvar Cadastro"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {campaigns.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Users className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Crie uma campanha primeiro</h3>
                <p className="text-muted-foreground text-center mb-4">
                  Você precisa ter pelo menos uma campanha ativa para cadastrar eleitores
                </p>
                <Button onClick={() => navigate("/campanhas")}>
                  Criar Campanha
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Cadastros</CardTitle>
                <CardDescription>
                  {voters.length} eleitor(es) cadastrado(s)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar por nome, email ou cidade..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                {filteredVoters.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    Nenhum cadastro encontrado
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Telefone</TableHead>
                        <TableHead>Localização</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredVoters.map((voter) => (
                        <TableRow key={voter.id}>
                          <TableCell className="font-medium">{voter.full_name}</TableCell>
                          <TableCell>{voter.email || "-"}</TableCell>
                          <TableCell>{voter.phone || "-"}</TableCell>
                          <TableCell>
                            {voter.city && voter.state
                              ? `${voter.city}, ${voter.state}`
                              : voter.city || voter.state || "-"}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default Cadastro;
