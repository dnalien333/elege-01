import React, { useEffect, useMemo, useState, useCallback, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { CircleMarker, Popup, TileLayer, ZoomControl, LayersControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import Sidebar from "@/components/layout/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import FilterControls from "@/components/Filters/FilterControls.tsx"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

// Corrige ícones padrão do Leaflet
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Lazy load MapContainer
const MapContainer = React.lazy(() =>
  import("react-leaflet").then((m) => ({ default: m.MapContainer }))
);

// Tipos
type CoalitionSide = "left" | "right" | "center" | "center-left" | "center-right";

type DemoResult = {
  id: string;
  city: string;
  state: string;
  candidate: string;
  party: string;
  votes: number;
  coalition: CoalitionSide;
  coordinates: [number, number];
  status: "Eleito" | "Suplente" | "Não eleito";
  voters: number;
  percentage: number;
};

// Mock de dados
import { votacaoMock } from "../data/mocks/votacaoMock.js";

const demoResults: DemoResult[] = votacaoMock.map((item, index) => ({
  id: `${item.SG_UF.toLowerCase()}-${item.NR_CANDIDATO}-${index}`,
  city: item.NM_MUNICIPIO,
  state: item.SG_UF,
  candidate: item.NM_URNA_CANDIDATO,
  party: item.SG_PARTIDO,
  votes: item.QT_VOTOS_NOMINAIS,
  coalition: (item.COALITION || "center") as CoalitionSide,
  coordinates: [item.LATITUDE, item.LONGITUDE],
  status: item.DS_SIT_TOT_TURNO,
  voters: item.QT_ELEITORES || 10000,
  percentage: (item.QT_VOTOS_NOMINAIS / (item.QT_ELEITORES || 10000)) * 100,
}));

// Cores das coligações
const coalitionColors: Record<CoalitionSide, string> = {
  left: "#ef4444",
  right: "#3b82f6",
  center: "#9ca3af",
  "center-left": "#d54630",
  "center-right": "#10b981",
};

// Cores status
const statusColors: Record<DemoResult["status"], string> = {
  Eleito: "bg-emerald-500 text-white",
  Suplente: "bg-amber-500 text-white",
  "Não eleito": "bg-slate-400 text-white",
};

// Define as cores de acordo com o espectro ideológico da coligação
const getColorByCoalition = (coalition: string) => {
  const colors: Record<string, string> = {
    "left": "#ef4444",              // vermelho
    "far-left": "#dc2626",          // vermelho escuro
    "center-left": "#f5550b",       // laranja
    "center": "#5b5d39",            // cinza
    "center-right": "#45b910",      // verde
    "right": "#3b82f6",             // azul
    "far-right": "#1e40af",         // azul escuro
    "green": "#22c55e",             // verde-claro
    "liberal": "#8b5cf6",           // roxo
    "conservative": "#0f172a",      // azul petróleo
    "socialist": "#e11d48",         // rosa
    "progressive": "#6366f1",       // roxo claro
  };

  // cor padrão (caso não encontre o espectro)
  return colors[coalition?.toLowerCase()] || "#6b7280";
};


// Função que aplica deslocamento para evitar sobreposição
const applyJitterToCoordinates = (results: DemoResult[]): DemoResult[] => {
  const coordGroups: Record<string, DemoResult[]> = {};

  // Agrupa por coordenada
  results.forEach((r) => {
    const key = `${r.coordinates[0]},${r.coordinates[1]}`;
    if (!coordGroups[key]) coordGroups[key] = [];
    coordGroups[key].push(r);
  });

  // Cria novo array com deslocamentos
  const adjustedResults: DemoResult[] = [];

  Object.values(coordGroups).forEach((group) => {
    if (group.length === 1) {
      adjustedResults.push(group[0]);
    } else {
      const angleStep = (2 * Math.PI) / group.length;
      const radius = 0.05; // quanto maior, mais afastados os pontos (ajuste se precisar)

      group.forEach((r, i) => {
        const [lat, lng] = r.coordinates;
        const jitteredLat = lat + radius * Math.cos(i * angleStep);
        const jitteredLng = lng + radius * Math.sin(i * angleStep);
        adjustedResults.push({ ...r, coordinates: [jitteredLat, jitteredLng] });
      });
    }
  });

  return adjustedResults;
};

const Mapas = () => {
  const navigate = useNavigate();
  const [isMounted, setIsMounted] = useState(false);

  // Filtros
  const [filters, setFilters] = useState({
    uf: "",
    party: "",
    status: "",
    search: "",
  });

  const handleFilterChange = useCallback((newFilters: typeof filters) => {
    setFilters(newFilters);
  }, []);

  // Verifica sessão
  useEffect(() => {
    setIsMounted(true);
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate("/auth");
    });
  }, [navigate]);

  // Dados filtrados 
const filteredResults = useMemo(() => {
  const baseFiltered = demoResults.filter((r) => {
    const matchUF = filters.uf ? r.state === filters.uf : true;
    const matchParty = filters.party ? r.party === filters.party : true;
    const matchStatus = filters.status ? r.status === filters.status : true;
    const matchSearch = filters.search
      ? r.candidate.toLowerCase().includes(filters.search.toLowerCase())
      : true;
    return matchUF && matchParty && matchStatus && matchSearch;
  });

  return applyJitterToCoordinates(baseFiltered);
}, [filters]);


  // Totais para painel lateral
  const totals = useMemo(() => {
    const totalVotes = filteredResults.reduce((acc, r) => acc + r.votes, 0);
    const winners = filteredResults.filter((r) => r.status === "Eleito").length;
    const suplentes = filteredResults.filter((r) => r.status === "Suplente").length;
    return { totalVotes, winners, suplentes };
  }, [filteredResults]);

  if (!isMounted) return null;

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar />
      <main className="flex-1 w-full p-6 lg:p-8 space-y-6">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold">Panorama Eleitoral</h1>
          <p className="text-muted-foreground">
            Visualização interativa dos resultados eleitorais simulados.
          </p>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          <section className="xl:col-span-4 space-y-4">
            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Resumo Rápido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 pt-0">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Total de votos</span>
                  <strong className="text-foreground">{totals.totalVotes.toLocaleString("pt-BR")}</strong>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Eleitos</span>
                  <strong className="text-foreground">{totals.winners}</strong>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Suplentes</span>
                  <strong className="text-foreground">{totals.suplentes}</strong>
                </div>
              </CardContent>
            </Card>

            <Card>
              <Collapsible defaultOpen={false}>
                <CollapsibleTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-between p-6 hover:bg-accent/50"
                  >
                    <CardTitle className="text-lg">Como ler o mapa</CardTitle>
                    <ChevronDown className="h-5 w-5 transition-transform duration-200 data-[state=open]:rotate-180" />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="space-y-3 text-sm text-muted-foreground pt-0">
                    <p>Cada ponto representa um município com dados da eleição simulada.</p>
                    <p>As cores indicam o espectro da coligação:</p>
                    <ul className="space-y-1 pl-4">
                      <li className="list-disc" style={{ color: "#ef4444" }}>
                        Esquerda (PT, PSOL, PC do B, REDE)
                      </li>
                      <li className="list-disc" style={{ color: "#d54630" }}>
                        Centro-esquerda (PDT, PSB, Solidariedade)
                      </li>
                      <li className="list-disc" style={{ color: "#9ca3af" }}>
                        Centro (MDB, PSD, AVANTE, CIDADANIA)
                      </li>
                      <li className="list-disc" style={{ color: "#10b981" }}>
                        Centro-direita (UNIÃO, PODE, PP, PRD)
                      </li>
                      <li className="list-disc" style={{ color: "#3b82f6" }}>
                        Direita (PL, NOVO, PRTB)
                      </li>
                    </ul>
                    <p>O tamanho do marcador é fixo para manter a leitura simples no protótipo.</p>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          </section>

          {/* Mapa */}
          <section className="xl:col-span-8 space-y-4">
            {/* Filtros */}
            <FilterControls
              ufs={[...new Set(demoResults.map((r) => r.state))].sort()}
              parties={[...new Set(demoResults.map((r) => r.party))].sort()}
              statuses={[...new Set(demoResults.map((r) => r.status))]}
              onFilterChange={handleFilterChange}
            />

            {/* Mapa */}
            <Card className="h-[calc(100vh-180px)]">
              <CardHeader>
                <CardTitle>Mapa Interativo</CardTitle>
              </CardHeader>
              <CardContent className="h-full">
                <Suspense fallback={<p>Carregando mapa...</p>}>
                  <MapContainer
                    center={[-14.235, -51.925]}
                    zoom={5}
                    scrollWheelZoom
                    zoomControl={false}
                    className="h-full rounded-md"
                  >
                    <ZoomControl position="topright" />
                    <LayersControl position="topleft">
                      <LayersControl.BaseLayer checked name="Ruas">
                        <TileLayer
                          attribution="&copy; OpenStreetMap contributors"
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                      </LayersControl.BaseLayer>
                      <LayersControl.BaseLayer name="Satélite">
                        <TileLayer
                          attribution="&copy; Esri"
                          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                        />
                      </LayersControl.BaseLayer>
                      <LayersControl.BaseLayer name="Terreno">
                        <TileLayer
                          attribution="&copy; OpenTopoMap"
                          url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
                        />
                      </LayersControl.BaseLayer>
                    </LayersControl>
                  {filteredResults.map((result) => (
                    <CircleMarker
                      key={result.id}
                      center={result.coordinates}
                      radius={10}
                      pathOptions={{
                        color: "#fff",
                        weight: 1,
                        fillColor: getColorByCoalition(result.coalition),
                        fillOpacity: 0.9,
                      }}
                    >
                        <Popup>
                          <div className="space-y-1">
                            <p className="font-semibold">
                              {result.city} / {result.state}
                            </p>
                            <p className="text-sm">{result.candidate} ({result.party})</p>
                            <p className="text-sm">{result.votes.toLocaleString("pt-BR")} votos</p>
                            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-green-500"
                                style={{ width: `${result.percentage}%` }}
                              />
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {result.percentage.toFixed(1)}% dos votos válidos
                            </p>
                            <Badge className={statusColors[result.status]}>
                              {result.status}
                            </Badge>
                            <p className="text-xs text-muted-foreground">
                              {result.voters.toLocaleString()} eleitores
                            </p>
                          </div>
                        </Popup>
                      </CircleMarker>
                    ))}
                  </MapContainer>
                </Suspense>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Mapas;
