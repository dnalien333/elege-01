import { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Printer } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const Mapa = () => {
  const navigate = useNavigate();
  const [currentCampaignId, setCurrentCampaignId] = useState<string | null>(null);
  const [selectedSegments, setSelectedSegments] = useState<string[]>(["all"]);
  const [searchTerm, setSearchTerm] = useState("");
  const [listType, setListType] = useState("pessoas");

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }

      const { data: campaigns } = await supabase
        .from("campaigns")
        .select("id")
        .limit(1)
        .single();

      if (campaigns) {
        setCurrentCampaignId(campaigns.id);
      }
    };

    checkAuth();
  }, [navigate]);

  const { data: segments = [] } = useQuery({
    queryKey: ["saved-filters", currentCampaignId],
    queryFn: async () => {
      if (!currentCampaignId) return [];
      const { data, error } = await supabase
        .from("saved_filters")
        .select("*")
        .eq("campaign_id", currentCampaignId);
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!currentCampaignId,
  });

  const { data: voters = [] } = useQuery({
    queryKey: ["voters-map", currentCampaignId, selectedSegments],
    queryFn: async () => {
      if (!currentCampaignId) return [];
      
      let query = supabase
        .from("voters")
        .select("*")
        .eq("campaign_id", currentCampaignId);

      if (!selectedSegments.includes("all") && selectedSegments.length > 0) {
        const segment = segments.find(s => selectedSegments.includes(s.id));
        if (segment?.filters) {
          const filters = segment.filters as any;
          if (filters.tags?.length > 0) {
            query = query.overlaps("tags", filters.tags);
          }
          if (filters.city) {
            query = query.eq("city", filters.city);
          }
          if (filters.state) {
            query = query.eq("state", filters.state);
          }
        }
      }

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    },
    enabled: !!currentCampaignId,
  });

  const { data: colaboradores = [] } = useQuery({
    queryKey: ["colaboradores-map", currentCampaignId],
    queryFn: async () => {
      if (!currentCampaignId) return [];
      const { data, error } = await supabase
        .from("colaboradores")
        .select("*")
        .eq("campaign_id", currentCampaignId);
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!currentCampaignId && listType === "pessoas",
  });

  const handleSegmentToggle = (segmentId: string) => {
    if (segmentId === "all") {
      setSelectedSegments(["all"]);
    } else {
      setSelectedSegments(prev => {
        const filtered = prev.filter(s => s !== "all");
        if (filtered.includes(segmentId)) {
          const newSelection = filtered.filter(s => s !== segmentId);
          return newSelection.length === 0 ? ["all"] : newSelection;
        } else {
          return [...filtered, segmentId];
        }
      });
    }
  };

  const getMarkerColor = (tags: string[] = [], isColaborador = false) => {
    if (isColaborador) return "#fbbf24"; // yellow for colaboradores
    if (tags.includes("Apoiador")) return "#22c55e"; // green
    return "#3b82f6"; // blue
  };

  const getRandomCoord = (base: number, range: number) => {
    return base + (Math.random() - 0.5) * range;
  };

  const filteredSegments = segments.filter(seg => 
    seg.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePrint = () => {
    window.print();
  };

  if (!currentCampaignId) {
    return null;
  }

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <div className="flex-1 flex">
        {/* Filter Sidebar */}
        <div className="w-72 bg-card border-r border-border p-4 space-y-4 no-print">
          <Select value={listType} onValueChange={setListType}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pessoas">Lista de pessoas</SelectItem>
              <SelectItem value="segmentos">Segmentos</SelectItem>
            </SelectContent>
          </Select>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar listas"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2 p-2 hover:bg-accent rounded-md cursor-pointer">
              <Checkbox
                id="all"
                checked={selectedSegments.includes("all")}
                onCheckedChange={() => handleSegmentToggle("all")}
              />
              <label htmlFor="all" className="text-sm font-medium cursor-pointer flex-1">
                Todas as Pessoas
              </label>
            </div>

            {filteredSegments.map((segment) => (
              <div key={segment.id} className="flex items-center space-x-2 p-2 hover:bg-accent rounded-md cursor-pointer">
                <Checkbox
                  id={segment.id}
                  checked={selectedSegments.includes(segment.id)}
                  onCheckedChange={() => handleSegmentToggle(segment.id)}
                />
                <label htmlFor={segment.id} className="text-sm cursor-pointer flex-1">
                  {segment.name}
                </label>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-border space-y-2">
            <div className="text-sm font-medium mb-2">Legenda</div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-[#22c55e]"></div>
              <span className="text-sm">Apoiadores</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-[#3b82f6]"></div>
              <span className="text-sm">Eleitores</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-[#fbbf24]"></div>
              <span className="text-sm">Colaboradores</span>
            </div>
          </div>

          <Button onClick={handlePrint} className="w-full" variant="outline">
            <Printer className="h-4 w-4 mr-2" />
            Imprimir Mapa
          </Button>
        </div>

        {/* Map Container */}
        <div className="flex-1 relative">
          <MapContainer
            center={[-23.5505, -46.6333]} // São Paulo coordinates
            zoom={10}
            className="h-full w-full"
            style={{ background: "#f0f0f0" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Voters */}
            {voters.map((voter) => {
              const lat = (voter.preferences as any)?.latitude || getRandomCoord(-23.5505, 0.2);
              const lng = (voter.preferences as any)?.longitude || getRandomCoord(-46.6333, 0.2);
              
              return (
                <CircleMarker
                  key={voter.id}
                  center={[lat, lng]}
                  radius={8}
                  fillColor={getMarkerColor(voter.tags || [])}
                  color="#fff"
                  weight={2}
                  opacity={1}
                  fillOpacity={0.8}
                >
                  <Popup>
                    <div className="text-sm">
                      <div className="font-semibold">{voter.full_name}</div>
                      <div className="text-muted-foreground">{voter.city}, {voter.state}</div>
                      {voter.tags && voter.tags.length > 0 && (
                        <div className="mt-1">
                          {voter.tags.map(tag => (
                            <span key={tag} className="inline-block bg-primary/10 text-primary px-2 py-0.5 rounded text-xs mr-1">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </Popup>
                </CircleMarker>
              );
            })}

            {/* Colaboradores */}
            {colaboradores.map((colab) => {
              const lat = getRandomCoord(-23.5505, 0.2);
              const lng = getRandomCoord(-46.6333, 0.2);
              
              return (
                <CircleMarker
                  key={colab.id}
                  center={[lat, lng]}
                  radius={8}
                  fillColor={getMarkerColor([], true)}
                  color="#fff"
                  weight={2}
                  opacity={1}
                  fillOpacity={0.8}
                >
                  <Popup>
                    <div className="text-sm">
                      <div className="font-semibold">{colab.full_name}</div>
                      <div className="text-muted-foreground">{colab.role}</div>
                      <div className="text-muted-foreground">{colab.city}, {colab.state}</div>
                    </div>
                  </Popup>
                </CircleMarker>
              );
            })}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Mapa;
