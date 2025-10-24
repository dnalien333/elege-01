import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import Sidebar from "@/components/layout/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";

// Ensure leaflet markers load correctly in bundlers
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

type CoalitionSide = "left" | "right" | "center";

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
};

const demoResults: DemoResult[] = [
  {
    id: "sp-1",
    city: "São Paulo",
    state: "SP",
    candidate: "Maria Andrade",
    party: "PT",
    votes: 154_230,
    coalition: "left",
    coordinates: [-23.55052, -46.633308],
    status: "Eleito",
  },
  {
    id: "rj-1",
    city: "Rio de Janeiro",
    state: "RJ",
    candidate: "João Mendes",
    party: "PL",
    votes: 128_940,
    coalition: "right",
    coordinates: [-22.906847, -43.172897],
    status: "Eleito",
  },
  {
    id: "mg-1",
    city: "Belo Horizonte",
    state: "MG",
    candidate: "Fernanda Costa",
    party: "PSD",
    votes: 98_210,
    coalition: "center",
    coordinates: [-19.916681, -43.934493],
    status: "Suplente",
  },
  {
    id: "ba-1",
    city: "Salvador",
    state: "BA",
    candidate: "Carlos Santana",
    party: "MDB",
    votes: 86_500,
    coalition: "center",
    coordinates: [-12.977749, -38.50163],
    status: "Não eleito",
  },
  {
    id: "pr-1",
    city: "Curitiba",
    state: "PR",
    candidate: "Ana Paula",
    party: "PSDB",
    votes: 74_320,
    coalition: "right",
    coordinates: [-25.428954, -49.273251],
    status: "Suplente",
  },
];

const coalitionColors: Record<CoalitionSide, string> = {
  left: "#ef4444",
  right: "#3b82f6",
  center: "#9ca3af",
};

const statusColors: Record<DemoResult["status"], string> = {
  Eleito: "bg-emerald-500 text-white",
  Suplente: "bg-amber-500 text-white",
  "Não eleito": "bg-slate-400 text-white",
};

const Mapas = () => {
  const navigate = useNavigate();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      }
    });
  }, [navigate]);

  const totals = useMemo(() => {
    const totalVotes = demoResults.reduce((acc, result) => acc + result.votes, 0);
    const winners = demoResults.filter((result) => result.status === "Eleito").length;
    const suplentes = demoResults.filter((result) => result.status === "Suplente").length;
    return { totalVotes, winners, suplentes };
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar />
      <main className="flex-1 w-full p-6 lg:p-8 space-y-6 overflow-y-auto">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold">Panorama Eleitoral</h1>
          <p className="text-muted-foreground">
            Visualização simplificada dos principais resultados da última eleição municipal.
          </p>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          <section className="xl:col-span-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Resumo Rápido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total de votos analisados</span>
                  <span className="text-xl font-semibold">{totals.totalVotes.toLocaleString("pt-BR")}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Candidatos eleitos</span>
                  <span className="text-xl font-semibold">{totals.winners}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Suplentes</span>
                  <span className="text-xl font-semibold">{totals.suplentes}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Como ler o mapa</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>Cada ponto representa um município com dados da eleição simulada.</p>
                <p>As cores indicam o espectro da coligação:</p>
                <ul className="space-y-1 pl-4">
                  <li className="list-disc text-rose-500">Esquerda</li>
                  <li className="list-disc text-blue-500">Direita</li>
                  <li className="list-disc text-gray-500">Centro</li>
                </ul>
                <p>O tamanho do marcador é fixo para manter a leitura simples no protótipo.</p>
              </CardContent>
            </Card>
          </section>

          <section className="xl:col-span-8">
            <Card className="h-[600px]">
              <CardHeader>
                <CardTitle>Mapa Interativo</CardTitle>
              </CardHeader>
              <CardContent className="h-full">
                <MapContainer
                  center={[-15.77972, -47.92972]}
                  zoom={4}
                  className="h-full rounded-md"
                  scrollWheelZoom
                >
                  <TileLayer
                    attribution="&copy; OpenStreetMap contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {demoResults.map((result) => (
                    <CircleMarker
                      key={result.id}
                      center={result.coordinates}
                      radius={14}
                      pathOptions={{
                        color: "#ffffff",
                        weight: 1,
                        fillColor: coalitionColors[result.coalition],
                        fillOpacity: 0.85,
                      }}
                    >
                      <Popup>
                        <div className="space-y-1">
                          <p className="font-semibold">{result.candidate}</p>
                          <p className="text-sm text-muted-foreground">
                            {result.city} / {result.state}
                          </p>
                          <p className="text-sm">Partido: {result.party}</p>
                          <p className="text-sm font-medium">
                            {result.votes.toLocaleString("pt-BR")} votos
                          </p>
                          <Badge className={statusColors[result.status]}>{result.status}</Badge>
                        </div>
                      </Popup>
                    </CircleMarker>
                  ))}
                </MapContainer>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Mapas;
