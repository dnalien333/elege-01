import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import Sidebar from "@/components/layout/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Printer, MapPin, Users } from "lucide-react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default markers
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const Mapa = () => {
  const navigate = useNavigate();
  const [currentCampaignId, setCurrentCampaignId] = useState<string | null>(null);
  const [selectedSegments, setSelectedSegments] = useState<string[]>([]);
  const [showVoters, setShowVoters] = useState(true);
  const [showColaboradores, setShowColaboradores] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      } else {
        // Get first campaign
        supabase
          .from("campaigns")
          .select("id")
          .eq("owner_id", session.user.id)
          .limit(1)
          .single()
          .then(({ data }) => {
            if (data) {
              setCurrentCampaignId(data.id);
            }
          });
      }
    });
  }, [navigate]);

  const { data: segments } = useQuery({
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

  const { data: voters, isLoading: loadingVoters } = useQuery({
    queryKey: ["voters-map", currentCampaignId, selectedSegments],
    queryFn: async () => {
      if (!currentCampaignId) return [];
      let query = supabase
        .from("voters")
        .select("*")
        .eq("campaign_id", currentCampaignId);

      if (selectedSegments.length > 0) {
        const segment = segments?.find((s) => s.id === selectedSegments[0]);
        if (segment?.filters) {
          const filters = segment.filters as any;
          if (filters.tags?.length > 0) {
            query = query.contains("tags", filters.tags);
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
      // Filter only voters with valid coordinates
      return (data || []).filter((v) => {
        const prefs = v.preferences as any;
        return prefs?.latitude && prefs?.longitude;
      });
    },
    enabled: !!currentCampaignId && showVoters,
  });

  const { data: colaboradores, isLoading: loadingColaboradores } = useQuery({
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
    enabled: !!currentCampaignId && showColaboradores,
  });

  const getMarkerColor = (tags: string[] | null, isColaborador: boolean = false): string => {
    if (isColaborador) return "#eab308"; // yellow for colaboradores
    if (!tags || tags.length === 0) return "#94a3b8"; // gray default
    if (tags.includes("Apoiador")) return "#22c55e"; // green for apoiadores
    return "#3b82f6"; // blue default
  };

  const handlePrintMap = () => {
    window.print();
  };

  const toggleSegment = (segmentId: string) => {
    setSelectedSegments((prev) =>
      prev.includes(segmentId)
        ? prev.filter((id) => id !== segmentId)
        : [segmentId]
    );
  };

  const isLoading = loadingVoters || loadingColaboradores;

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Mapas Geográficos
            </h1>
            <p className="text-muted-foreground">
              Visualize eleitores e colaboradores no mapa
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Filter Sidebar */}
            <Card className="lg:col-span-1 h-fit no-print">
              <CardHeader>
                <CardTitle className="text-lg">Filtros e Legendas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Layer toggles */}
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold">Camadas</h3>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="show-voters"
                      checked={showVoters}
                      onCheckedChange={(checked) => setShowVoters(checked as boolean)}
                    />
                    <Label htmlFor="show-voters" className="cursor-pointer">
                      Eleitores
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="show-colaboradores"
                      checked={showColaboradores}
                      onCheckedChange={(checked) => setShowColaboradores(checked as boolean)}
                    />
                    <Label htmlFor="show-colaboradores" className="cursor-pointer">
                      Colaboradores
                    </Label>
                  </div>
                </div>

                {/* Segments */}
                {segments && segments.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold">Segmentos</h3>
                    {segments.map((segment) => (
                      <div key={segment.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={segment.id}
                          checked={selectedSegments.includes(segment.id)}
                          onCheckedChange={() => toggleSegment(segment.id)}
                        />
                        <Label htmlFor={segment.id} className="cursor-pointer">
                          {segment.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                )}

                {/* Legend */}
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold">Legenda</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-[#22c55e]" />
                      <span>Apoiador</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-[#eab308]" />
                      <span>Colaborador</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-[#3b82f6]" />
                      <span>Eleitor</span>
                    </div>
                  </div>
                </div>

                <Button onClick={handlePrintMap} className="w-full" variant="outline">
                  <Printer className="w-4 h-4 mr-2" />
                  Imprimir Mapa
                </Button>
              </CardContent>
            </Card>

            {/* Map */}
            <div className="lg:col-span-3">
              <Card>
                <CardContent className="p-0">
                  {isLoading ? (
                    <div className="h-[600px] flex items-center justify-center">
                      <p className="text-muted-foreground">Carregando mapa...</p>
                    </div>
                  ) : (
                    <div className="h-[600px] rounded-lg overflow-hidden map-container">
                      <MapContainer
                        center={[-23.5505, -46.6333]}
                        zoom={10}
                        style={{ height: "100%", width: "100%" }}
                      >
                        <TileLayer
                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        {/* Voter markers */}
                        {showVoters && voters?.map((voter) => {
                          const prefs = voter.preferences as any;
                          const lat = prefs?.latitude;
                          const lng = prefs?.longitude;
                          if (!lat || !lng) return null;

                          return (
                            <CircleMarker
                              key={`voter-${voter.id}`}
                              center={[lat, lng]}
                              radius={8}
                              fillColor={getMarkerColor(voter.tags)}
                              color="#fff"
                              weight={2}
                              opacity={1}
                              fillOpacity={0.8}
                            >
                              <Popup>
                                <div className="space-y-1">
                                  <p className="font-semibold">{voter.full_name}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {voter.city}, {voter.state}
                                  </p>
                                  {voter.tags && voter.tags.length > 0 && (
                                    <p className="text-xs">
                                      Tags: {voter.tags.join(", ")}
                                    </p>
                                  )}
                                </div>
                              </Popup>
                            </CircleMarker>
                          );
                        })}

                        {/* Colaborador markers */}
                        {showColaboradores && colaboradores?.map((colab) => {
                          // Generate random coordinates near São Paulo if not available
                          const lat = -23.5505 + (Math.random() - 0.5) * 0.5;
                          const lng = -46.6333 + (Math.random() - 0.5) * 0.5;

                          return (
                            <CircleMarker
                              key={`colab-${colab.id}`}
                              center={[lat, lng]}
                              radius={8}
                              fillColor={getMarkerColor(null, true)}
                              color="#fff"
                              weight={2}
                              opacity={1}
                              fillOpacity={0.8}
                            >
                              <Popup>
                                <div className="space-y-1">
                                  <p className="font-semibold">{colab.full_name}</p>
                                  <p className="text-sm text-muted-foreground">
                                    Colaborador - {colab.role}
                                  </p>
                                  {colab.city && colab.state && (
                                    <p className="text-sm text-muted-foreground">
                                      {colab.city}, {colab.state}
                                    </p>
                                  )}
                                  {colab.phone && (
                                    <p className="text-xs">{colab.phone}</p>
                                  )}
                                </div>
                              </Popup>
                            </CircleMarker>
                          );
                        })}
                      </MapContainer>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Mapa;
