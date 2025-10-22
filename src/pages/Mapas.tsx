import { useState, useEffect, useMemo } from "react";
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
import { ChevronDown, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { lazy, Suspense } from "react";

// Lazy load map component
const MapView = lazy(() => import("@/components/map/MapView"));

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

export default function Mapas() {
  const navigate = useNavigate();
  const [isMounted, setIsMounted] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("coalition");
  const [filters, setFilters] = useState<FilterState>({
    year: 2022,
    state: "all",
    coalitionSides: [],
    parties: [],
    candidateSearch: ""
  });

  // Check authentication
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }
      setIsMounted(true);
    };
    
    checkAuth();
  }, [navigate]);

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
        throw error;
      }

      return (data as TSEResult[]) || [];
    },
    enabled: isMounted,
  });

  const availableStates = useMemo(
    () => Array.from(new Set(results.map(r => r.state))).sort(),
    [results]
  );

  const availableParties = useMemo(
    () => Array.from(new Set(results.map(r => r.party))).sort(),
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

  if (!isMounted) {
    return (
      <div className="flex min-h-screen w-full">
        <Sidebar />
        <main className="flex-1 p-8 w-full">
          <div className="flex items-center justify-center h-full">
            <Skeleton className="w-full h-[700px]" />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <main className="flex-1 p-8 w-full">
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Mapas de Calor Eleitoral</h1>
            <p className="text-muted-foreground">
              Visualização geográfica dos resultados eleitorais do TSE
            </p>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-4 bg-destructive/10 text-destructive rounded-lg">
              <AlertCircle className="h-5 w-5" />
              <p>Erro ao carregar dados. Tente novamente.</p>
            </div>
          )}

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
                {isLoading ? (
                  <div className="flex items-center justify-center h-full">
                    <Skeleton className="w-full h-full" />
                  </div>
                ) : (
                  <Suspense fallback={<Skeleton className="w-full h-full" />}>
                    <MapView results={results} viewMode={viewMode} />
                  </Suspense>
                )}
              </div>
            </div>

            {/* Right Sidebar - Legend & Controls */}
            <div className="lg:col-span-2">
              <HeatLegend viewMode={viewMode} onViewModeChange={setViewMode} />
            </div>
          </div>

          {/* Analytics Sections */}
          <div className="space-y-6">
            <Collapsible defaultOpen>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-card rounded-lg hover:bg-accent">
                <h2 className="text-2xl font-bold">Votos por Candidato</h2>
                <ChevronDown className="h-5 w-5" />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-4">
                <VotesByCandidateChart data={candidateVotes} />
              </CollapsibleContent>
            </Collapsible>

            <Collapsible defaultOpen>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-card rounded-lg hover:bg-accent">
                <h2 className="text-2xl font-bold">Votos por Partido</h2>
                <ChevronDown className="h-5 w-5" />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-4">
                <VotesByPartyChart data={partyVotes} />
              </CollapsibleContent>
            </Collapsible>

            <Collapsible defaultOpen>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-card rounded-lg hover:bg-accent">
                <h2 className="text-2xl font-bold">Eleitos e Suplentes</h2>
                <ChevronDown className="h-5 w-5" />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-4">
                <WinnersTable data={winnersData} />
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>
      </main>
    </div>
  );
}
