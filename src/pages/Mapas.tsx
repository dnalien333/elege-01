"use client";

import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Sidebar from "@/components/layout/Sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { HeatLegend } from "@/components/map/HeatLegend";
import { StatsSidebar } from "@/components/map/StatsSidebar";
import { VotesByCandidateChart } from "@/components/charts/VotesByCandidateChart";
import { VotesByPartyChart } from "@/components/charts/VotesByPartyChart";
import { WinnersTable } from "@/components/tables/WinnersTable";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { toast } from "sonner";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet icon paths
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface LeafletComponents {
  MapContainer: typeof import("react-leaflet").MapContainer;
  TileLayer: typeof import("react-leaflet").TileLayer;
  CircleMarker: typeof import("react-leaflet").CircleMarker;
  Popup: typeof import("react-leaflet").Popup;
}

type ViewMode = "coalition" | "party" | "candidate" | "winners";

interface TSEResult {
  id: string;
  year: number;
  state: string;
  city: string;
  latitude: number;
  longitude: number;
  candidate_name: string;
  party: string;
  votes: number;
  coalition_side: string;
  elected: boolean;
  substitute: boolean;
}

interface FilterState {
  year: number;
  state: string;
  coalitionSides: string[];
  parties: string[];
  candidateSearch: string;
}

interface CandidateAggregate {
  candidate_name: string;
  party: string;
  coalition_side: string;
  total_votes: number;
}

interface PartyAggregate {
  party: string;
  coalition_side: string;
  total_votes: number;
}

interface WinnerAggregate extends CandidateAggregate {
  elected: boolean;
  substitute: boolean;
  state: string;
}

const getColorByCoalition = (side: string) => {
  switch (side) {
    case 'left': return '#ef4444';
    case 'right': return '#3b82f6';
    case 'center': return '#9ca3af';
    default: return '#6b7280';
  }
};

const getColorByParty = (party: string) => {
  const colors: Record<string, string> = {
    'PT': '#e11d48',
    'PSOL': '#f97316',
    'PDT': '#eab308',
    'PL': '#3b82f6',
    'REPUBLICANOS': '#6366f1',
    'UB': '#8b5cf6',
    'PSDB': '#06b6d4',
    'MDB': '#14b8a6',
  };
  return colors[party] || '#6b7280';
};

const getColorByElected = (elected: boolean, substitute: boolean) => {
  if (elected) return '#22c55e';
  if (substitute) return '#eab308';
  return '#9ca3af';
};

export default function Mapas() {
  const navigate = useNavigate();
  const [isMounted, setIsMounted] = useState(false);
  const [leafletComponents, setLeafletComponents] = useState<LeafletComponents | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("coalition");
  const [filters, setFilters] = useState<FilterState>({
    year: 2022,
    state: "all",
    coalitionSides: [],
    parties: [],
    candidateSearch: "",
  });

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

  useEffect(() => {
    let isActive = true;

    const loadLeaflet = async () => {
      try {
        const module = await import("react-leaflet");
        if (isActive) {
          setLeafletComponents({
            MapContainer: module.MapContainer,
            TileLayer: module.TileLayer,
            CircleMarker: module.CircleMarker,
            Popup: module.Popup,
          });
        }
      } catch (err) {
        console.error("Erro ao carregar componentes do mapa:", err);
        toast.error("Não foi possível carregar o mapa");
      }
    };

    if (typeof window !== "undefined") {
      loadLeaflet();
    }

    return () => {
      isActive = false;
    };
  }, []);

  // Fetch TSE results
  const { data: results = [], isLoading, error, refetch } = useQuery({
    queryKey: ["tse-results", filters],
    queryFn: async () => {
      let query = supabase
        .from("tse_results")
        .select("*")
        .eq("year", filters.year);

      if (filters.state !== "all") {
        query = query.eq("state", filters.state);
      }

      if (filters.candidateSearch) {
        query = query.ilike("candidate_name", `%${filters.candidateSearch}%`);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching TSE results:", error);
        toast.error("Erro ao carregar dados eleitorais");
        return [];
      }

      return data as TSEResult[];
    },
  });

  // Get available states and parties
  const availableStates = useMemo(() =>
    Array.from(new Set(results.map(r => r.state))).sort(),
    [results]
  );

  const availableParties = useMemo(() =>
    Array.from(new Set(results.map(r => r.party))).sort(),
    [results]
  );

  // Calculate statistics
  const stats = useMemo(() => {
    const totalVotes = results.reduce((sum, r) => sum + r.votes, 0);
    const leftVotes = results.filter(r => r.coalition_side === 'left').reduce((sum, r) => sum + r.votes, 0);
    const rightVotes = results.filter(r => r.coalition_side === 'right').reduce((sum, r) => sum + r.votes, 0);
    const centerVotes = results.filter(r => r.coalition_side === 'center').reduce((sum, r) => sum + r.votes, 0);
    const totalCandidates = new Set(results.map(r => r.candidate_name)).size;
    const elected = results.filter(r => r.elected).length;

    return {
      totalVotes,
      leftVotes,
      rightVotes,
      centerVotes,
      totalCandidates,
      elected
    };
  }, [results]);

  // Aggregate data for charts
  const candidateVotes = useMemo(() => {
    const aggregated = results.reduce<Record<string, CandidateAggregate>>((acc, result) => {
      const key = result.candidate_name;
      if (!acc[key]) {
        acc[key] = {
          candidate_name: result.candidate_name,
          party: result.party,
          coalition_side: result.coalition_side,
          total_votes: 0,
        };
      }
      acc[key].total_votes += result.votes;
      return acc;
    }, {});

    return Object.values(aggregated).sort((a, b) => b.total_votes - a.total_votes);
  }, [results]);

  const partyVotes = useMemo(() => {
    const aggregated = results.reduce<Record<string, PartyAggregate>>((acc, result) => {
      const key = result.party;
      if (!acc[key]) {
        acc[key] = {
          party: result.party,
          coalition_side: result.coalition_side,
          total_votes: 0,
        };
      }
      acc[key].total_votes += result.votes;
      return acc;
    }, {});

    return Object.values(aggregated).sort((a, b) => b.total_votes - a.total_votes);
  }, [results]);

  const winnersData = useMemo(() => {
    const aggregated = results
      .filter((result) => result.elected || result.substitute)
      .reduce<Record<string, WinnerAggregate>>((acc, result) => {
        const key = result.candidate_name;
        if (!acc[key]) {
          acc[key] = {
            candidate_name: result.candidate_name,
            party: result.party,
            coalition_side: result.coalition_side,
            total_votes: 0,
            elected: false,
            substitute: false,
            state: result.state,
          };
        }
        acc[key].total_votes += result.votes;
        acc[key].elected = acc[key].elected || result.elected;
        acc[key].substitute = acc[key].substitute || result.substitute;
        return acc;
      }, {});

    return Object.values(aggregated).sort((a, b) => b.total_votes - a.total_votes);
  }, [results]);

  const getMarkerColor = (result: TSEResult) => {
    switch (viewMode) {
      case "coalition":
        return getColorByCoalition(result.coalition_side);
      case "party":
        return getColorByParty(result.party);
      case "winners":
        return getColorByElected(result.elected, result.substitute);
      case "candidate":
        return getColorByParty(result.party);
      default:
        return '#6b7280';
    }
  };

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
              Visualização georreferenciada dos resultados das eleições TSE
            </p>
          </div>

          {/* Main Content: Map + Sidebars */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Sidebar - Stats & Filters */}
            <div className="lg:col-span-3">
              <StatsSidebar
                filters={filters}
                onFilterChange={(newFilters) => setFilters({ ...filters, ...newFilters })}
                stats={stats}
                availableStates={availableStates}
                availableParties={availableParties}
                onReseedData={() => {
                  refetch();
                  toast.success("Dados recarregados com sucesso!");
                }}
              />
            </div>

            {/* Map */}
            <div className="lg:col-span-7">
              <div className="h-[700px] rounded-lg overflow-hidden border bg-card">
                {isLoading || !leafletComponents ? (
                  <div className="flex items-center justify-center h-full">
                    <Skeleton className="w-full h-full" />
                  </div>
                ) : (
                  <leafletComponents.MapContainer
                    center={[-14.235, -51.925]}
                    zoom={4}
                    style={{ height: "100%", width: "100%" }}
                    className="z-0"
                  >
                    <leafletComponents.TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {results.map((result) => (
                      <leafletComponents.CircleMarker
                        key={result.id}
                        center={[result.latitude, result.longitude]}
                        radius={6}
                        fillColor={getMarkerColor(result)}
                        color="#fff"
                        weight={1}
                        opacity={1}
                        fillOpacity={0.7}
                      >
                        <leafletComponents.Popup>
                          <div className="space-y-1">
                            <p className="font-bold">{result.candidate_name}</p>
                            <p className="text-sm">{result.party} - {result.coalition_side}</p>
                            <p className="text-sm">{result.city}, {result.state}</p>
                            <p className="text-sm font-semibold">
                              {result.votes.toLocaleString()} votos
                            </p>
                            {result.elected && <p className="text-xs text-green-600">✓ Eleito</p>}
                            {result.substitute && <p className="text-xs text-yellow-600">✓ Suplente</p>}
                          </div>
                        </leafletComponents.Popup>
                      </leafletComponents.CircleMarker>
                    ))}
                  </leafletComponents.MapContainer>
                )}
              </div>
            </div>

            {/* Right Sidebar - Legend */}
            <div className="lg:col-span-2">
              <HeatLegend viewMode={viewMode} onViewModeChange={setViewMode} />
            </div>
          </div>

          {/* Analytical Sections */}
          <div className="space-y-4">
            <Collapsible defaultOpen>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-card rounded-lg border hover:bg-accent">
                <h2 className="text-2xl font-bold">Votos por Candidato</h2>
                <ChevronDown className="h-5 w-5" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="mt-4">
                  <VotesByCandidateChart data={candidateVotes} />
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible defaultOpen>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-card rounded-lg border hover:bg-accent">
                <h2 className="text-2xl font-bold">Votos por Partido</h2>
                <ChevronDown className="h-5 w-5" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="mt-4">
                  <VotesByPartyChart data={partyVotes} />
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible defaultOpen>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-card rounded-lg border hover:bg-accent">
                <h2 className="text-2xl font-bold">Eleitos e Suplentes</h2>
                <ChevronDown className="h-5 w-5" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="mt-4">
                  <WinnersTable data={winnersData} />
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>
      </main>
    </div>
  );
}
