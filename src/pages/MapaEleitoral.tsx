import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { supabase } from "@/integrations/supabase/client";
import Sidebar from "@/components/layout/Sidebar";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

// Fix for default marker icons in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const MapaEleitoral = () => {
  const navigate = useNavigate();
  const [selectedSegment, setSelectedSegment] = useState<any>(null);
  const [currentCampaignId, setCurrentCampaignId] = useState<string>("");

  useEffect(() => {
    const initializeData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }

      // Get first campaign for the user
      const { data: campaigns } = await supabase
        .from("campaigns")
        .select("id")
        .eq("owner_id", session.user.id)
        .limit(1);

      if (campaigns && campaigns.length > 0) {
        setCurrentCampaignId(campaigns[0].id);
      }
    };

    initializeData();
  }, [navigate]);

  const { data: segments = [] } = useQuery({
    queryKey: ["saved-filters", currentCampaignId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("saved_filters")
        .select("*")
        .eq("campaign_id", currentCampaignId);

      if (error) throw error;
      return data || [];
    },
    enabled: !!currentCampaignId,
  });

  const { data: voters = [], isLoading } = useQuery({
    queryKey: ["map-voters", selectedSegment],
    queryFn: async () => {
      if (!selectedSegment) return [];

      let query = supabase
        .from("voters")
        .select("*")
        .eq("campaign_id", currentCampaignId)
        .not("latitude", "is", null)
        .not("longitude", "is", null);

      const filters = selectedSegment.filters as any;
      if (filters.tags && Array.isArray(filters.tags) && filters.tags.length > 0) {
        query = query.contains("tags", filters.tags);
      }
      if (filters.city) {
        query = query.ilike("city", `%${filters.city}%`);
      }
      if (filters.state) {
        query = query.eq("state", filters.state);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    },
    enabled: !!selectedSegment && !!currentCampaignId,
  });

  const getMarkerColor = (tags: string[] = []) => {
    if (tags.includes("apoiador")) return "#22c55e";
    if (tags.includes("indeciso")) return "#eab308";
    if (tags.includes("voluntário")) return "#3b82f6";
    if (tags.includes("opositor")) return "#ef4444";
    return "#6b7280";
  };

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <div className="p-6 bg-background border-b">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-foreground mb-4">Mapa Eleitoral</h1>
            
            <div className="max-w-md space-y-2">
              <Label className="text-sm font-medium">Selecione um Segmento</Label>
              <Select
                onValueChange={(value) => {
                  const seg = segments.find((s: any) => s.id === value);
                  setSelectedSegment(seg);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="-- Escolha um segmento --" />
                </SelectTrigger>
                <SelectContent>
                  {segments.map((s: any) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {voters.length > 0 && (
                <p className="text-sm text-muted-foreground">
                  {voters.length} eleitor(es) com localização neste segmento
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1 relative">
          {!selectedSegment ? (
            <div className="absolute inset-0 flex items-center justify-center bg-muted/30">
              <Card>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground">
                    Selecione um segmento para visualizar os eleitores no mapa
                  </p>
                </CardContent>
              </Card>
            </div>
          ) : isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <MapContainer
              center={[-14.235, -51.925]}
              zoom={4}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {voters
                .filter((v: any) => v.latitude && v.longitude)
                .map((voter: any) => (
                  <CircleMarker
                    key={voter.id}
                    center={[parseFloat(voter.latitude), parseFloat(voter.longitude)]}
                    radius={8}
                    fillColor={getMarkerColor(voter.tags)}
                    fillOpacity={0.8}
                    stroke
                    weight={2}
                    color="#fff"
                  >
                    <Popup>
                      <div className="p-2">
                        <h3 className="font-semibold">{voter.full_name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {voter.city}, {voter.state}
                        </p>
                        {voter.tags && voter.tags.length > 0 && (
                          <div className="flex gap-1 mt-2 flex-wrap">
                            {voter.tags.map((tag: string) => (
                              <span
                                key={tag}
                                className="px-2 py-1 text-xs bg-secondary rounded"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </Popup>
                  </CircleMarker>
                ))}
            </MapContainer>
          )}
        </div>
      </main>
    </div>
  );
};

export default MapaEleitoral;
