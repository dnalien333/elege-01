import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Sidebar from "@/components/layout/Sidebar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, Users, Filter } from "lucide-react";
import { toast } from "sonner";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";

// Types
interface Voter {
  id: string;
  full_name: string;
  latitude?: number;
  longitude?: number;
  city?: string;
  state?: string;
  tags?: string[];
  campaign_id?: string;
}

// Tag color mapping
const getTagColor = (tags: string[] | undefined): string => {
  if (!tags || tags.length === 0) return "#9CA3AF"; // gray
  
  const tag = tags[0]?.toLowerCase();
  switch (tag) {
    case "apoiador":
      return "#22C55E"; // green
    case "indeciso":
      return "#EAB308"; // yellow
    case "voluntário":
    case "voluntario":
      return "#3B82F6"; // blue
    case "opositor":
      return "#EF4444"; // red
    default:
      return "#9CA3AF"; // gray
  }
};

const getTagLabel = (color: string): string => {
  switch (color) {
    case "#22C55E":
      return "Apoiador";
    case "#EAB308":
      return "Indeciso";
    case "#3B82F6":
      return "Voluntário";
    case "#EF4444":
      return "Opositor";
    default:
      return "Sem tag";
  }
};

// Mock data generator
const generateMockVoters = (): Voter[] => {
  const states = ["SP", "RJ", "MG", "BA", "PR", "RS", "PE", "CE", "PA", "SC"];
  const cities = [
    "São Paulo", "Rio de Janeiro", "Belo Horizonte", "Salvador", "Curitiba",
    "Porto Alegre", "Recife", "Fortaleza", "Belém", "Florianópolis"
  ];
  const tags = ["apoiador", "indeciso", "voluntário", "opositor"];
  const names = [
    "João Silva", "Maria Santos", "Pedro Oliveira", "Ana Costa", "Carlos Souza",
    "Juliana Lima", "Roberto Alves", "Fernanda Rocha", "Lucas Martins", "Patricia Ferreira"
  ];

  const voters: Voter[] = [];
  for (let i = 0; i < 50; i++) {
    const stateIndex = Math.floor(Math.random() * states.length);
    voters.push({
      id: `mock-${i}`,
      full_name: names[Math.floor(Math.random() * names.length)] + ` ${i}`,
      latitude: -33 + Math.random() * 28, // Brazil latitude range
      longitude: -73.5 + Math.random() * 35, // Brazil longitude range
      city: cities[stateIndex],
      state: states[stateIndex],
      tags: [tags[Math.floor(Math.random() * tags.length)]],
      campaign_id: "mock-campaign"
    });
  }
  return voters;
};

export default function Mapas() {
  const navigate = useNavigate();
  const [isMounted, setIsMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [selectedState, setSelectedState] = useState<string>("all");

  // Check authentication
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
      }
    };
    checkAuth();
    setIsMounted(true);
  }, [navigate]);

  // Fetch voters from Supabase
  const { data: voters = [], isLoading, error } = useQuery({
    queryKey: ["voters"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("voters")
        .select("id, full_name, city, state, tags, campaign_id");
      
      if (error) {
        console.error("Error fetching voters:", error);
      }

      // Always use mock data for demo (voters table doesn't have lat/long)
      toast.info("Usando dados de demonstração");
      return generateMockVoters();
    },
  });

  // Filter voters
  const filteredVoters = useMemo(() => {
    return voters.filter((voter) => {
      const matchesSearch = 
        searchQuery === "" ||
        voter.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        voter.city?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTag = 
        selectedTag === "all" ||
        voter.tags?.some(tag => tag.toLowerCase() === selectedTag.toLowerCase());

      const matchesState = 
        selectedState === "all" ||
        voter.state === selectedState;

      return matchesSearch && matchesTag && matchesState;
    });
  }, [voters, searchQuery, selectedTag, selectedState]);

  // Calculate statistics
  const stats = useMemo(() => {
    const total = filteredVoters.length;
    const byTag = filteredVoters.reduce((acc, voter) => {
      const tag = voter.tags?.[0]?.toLowerCase() || "sem tag";
      acc[tag] = (acc[tag] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return { total, byTag };
  }, [filteredVoters]);

  // Get unique states and tags
  const uniqueStates = useMemo(() => 
    Array.from(new Set(voters.map(v => v.state).filter(Boolean))).sort(),
    [voters]
  );

  const uniqueTags = useMemo(() => 
    Array.from(new Set(voters.flatMap(v => v.tags || []))).sort(),
    [voters]
  );

  if (!isMounted) {
    return null;
  }

  if (error) {
    return (
      <div className="flex min-h-screen w-full">
        <Sidebar />
        <main className="flex-1 p-8 w-full">
          <div className="text-center text-destructive">
            Erro ao carregar dados. Por favor, tente novamente.
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <main className="flex-1 p-8 w-full overflow-auto">
        <div className="w-full space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Mapas de Calor Eleitoral
            </h1>
            <p className="text-muted-foreground">
              Visualização georreferenciada dos eleitores por localização e tags
            </p>
          </div>

          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filtrar Eleitores
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Input
                    placeholder="Buscar por nome ou cidade..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div>
                  <Select value={selectedTag} onValueChange={setSelectedTag}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todas as tags" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas as tags</SelectItem>
                      {uniqueTags.map(tag => (
                        <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Select value={selectedState} onValueChange={setSelectedState}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todos os estados" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os estados</SelectItem>
                      {uniqueStates.map(state => (
                        <SelectItem key={state} value={state}>{state}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Content: Map + Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Stats Sidebar */}
            <div className="lg:col-span-1 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Users className="h-5 w-5" />
                    Estatísticas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Total de Eleitores</p>
                    <p className="text-3xl font-bold">{stats.total}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Por Tag:</p>
                    {Object.entries(stats.byTag).map(([tag, count]) => (
                      <div key={tag} className="flex justify-between items-center">
                        <Badge 
                          style={{ 
                            backgroundColor: getTagColor([tag]),
                            color: "white"
                          }}
                        >
                          {tag}
                        </Badge>
                        <span className="font-semibold">{count}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Color Legend */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <MapPin className="h-5 w-5" />
                    Legenda
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {["#22C55E", "#EAB308", "#3B82F6", "#EF4444", "#9CA3AF"].map(color => (
                    <div key={color} className="flex items-center gap-2">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: color }}
                      />
                      <span className="text-sm">{getTagLabel(color)}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Map */}
            <div className="lg:col-span-3">
              <Card className="h-[700px]">
                <CardContent className="p-0 h-full">
                  {isLoading ? (
                    <div className="flex items-center justify-center h-full">
                      <Skeleton className="w-full h-full" />
                    </div>
                  ) : (
                    <MapContainer
                      key="voter-map"
                      center={[-14.235, -51.925]}
                      zoom={4}
                      style={{ height: "100%", width: "100%" }}
                      className="rounded-lg"
                    >
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      {filteredVoters
                        .filter(voter => voter.latitude && voter.longitude)
                        .map((voter) => (
                          <CircleMarker
                            key={voter.id}
                            center={[voter.latitude!, voter.longitude!]}
                            radius={8}
                            fillColor={getTagColor(voter.tags)}
                            color="#fff"
                            weight={2}
                            opacity={1}
                            fillOpacity={0.8}
                          >
                            <Popup>
                              <div className="space-y-1">
                                <p className="font-bold">{voter.full_name}</p>
                                <p className="text-sm">
                                  {voter.city}, {voter.state}
                                </p>
                                {voter.tags && voter.tags.length > 0 && (
                                  <div className="flex gap-1 flex-wrap">
                                    {voter.tags.map((tag, i) => (
                                      <Badge 
                                        key={i}
                                        variant="outline"
                                        className="text-xs"
                                      >
                                        {tag}
                                      </Badge>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </Popup>
                          </CircleMarker>
                        ))}
                    </MapContainer>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
