import { useState, useMemo, useEffect } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Map as MapIcon, Search, X, Users, Vote, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Sidebar from "@/components/layout/Sidebar";
import { mockElectionData, candidates, parties, MunicipalityData } from "@/data/mockElectionData";

const getColorByPercentage = (percentage: number): string => {
  if (percentage >= 50) return "#22c55e"; // green-500
  if (percentage >= 40) return "#84cc16"; // lime-500
  if (percentage >= 30) return "#eab308"; // yellow-500
  if (percentage >= 20) return "#f97316"; // orange-500
  return "#ef4444"; // red-500
};

const Mapas = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<string>("all");
  const [selectedParty, setSelectedParty] = useState<string>("all");
  const [selectedTurno, setSelectedTurno] = useState<1 | 2>(1);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const filteredData = useMemo(() => {
    return mockElectionData
      .map((municipality) => {
        const relevantVotes = municipality.votes.filter(
          (vote) =>
            vote.turno === selectedTurno &&
            (selectedCandidate === "all" || vote.candidate === selectedCandidate) &&
            (selectedParty === "all" || vote.party === selectedParty)
        );

        if (relevantVotes.length === 0) return null;

        const topVote = relevantVotes.reduce((prev, current) =>
          prev.percentage > current.percentage ? prev : current
        );

        return {
          ...municipality,
          topVote,
        };
      })
      .filter((item) => item !== null)
      .filter((item) =>
        searchQuery
          ? item!.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item!.state.toLowerCase().includes(searchQuery.toLowerCase())
          : true
      ) as (MunicipalityData & { topVote: MunicipalityData["votes"][0] })[];
  }, [selectedCandidate, selectedParty, selectedTurno, searchQuery]);

  const statistics = useMemo(() => {
    const totalMunicipalities = filteredData.length;
    const totalVotes = filteredData.reduce((sum, item) => sum + item.topVote.totalVotes, 0);
    const topMunicipalities = [...filteredData]
      .sort((a, b) => b.topVote.percentage - a.topVote.percentage)
      .slice(0, 5);

    return { totalMunicipalities, totalVotes, topMunicipalities };
  }, [filteredData]);

  const clearFilters = () => {
    setSelectedCandidate("all");
    setSelectedParty("all");
    setSelectedTurno(1);
    setSearchQuery("");
  };

  const hasActiveFilters = selectedCandidate !== "all" || selectedParty !== "all" || searchQuery !== "";

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar />
      
      <main className="flex-1 overflow-hidden">
        {/* Header */}
        <div className="border-b border-border bg-card">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-accent rounded-lg p-2">
                <MapIcon className="h-6 w-6 text-accent-foreground" />
              </div>
              <h1 className="text-3xl font-bold text-foreground">Mapa Eleitoral</h1>
            </div>
            <p className="text-sm text-muted-foreground">
              Visualização georreferenciada dos resultados eleitorais por município
            </p>
          </div>

          {/* Filters */}
          <div className="px-6 pb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Select value={selectedCandidate} onValueChange={setSelectedCandidate}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos os Candidatos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Candidatos</SelectItem>
                  {candidates.map((candidate) => (
                    <SelectItem key={candidate} value={candidate}>
                      {candidate}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedParty} onValueChange={setSelectedParty}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos os Partidos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Partidos</SelectItem>
                  {parties.map((party) => (
                    <SelectItem key={party} value={party}>
                      {party}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedTurno.toString()} onValueChange={(val) => setSelectedTurno(parseInt(val) as 1 | 2)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1º Turno</SelectItem>
                  <SelectItem value="2">2º Turno</SelectItem>
                </SelectContent>
              </Select>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar município..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-9"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            {hasActiveFilters && (
              <div className="mt-3 flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Filtros ativos:</span>
                {selectedCandidate !== "all" && (
                  <Badge variant="secondary">{selectedCandidate}</Badge>
                )}
                {selectedParty !== "all" && (
                  <Badge variant="secondary">{selectedParty}</Badge>
                )}
                {searchQuery && (
                  <Badge variant="secondary">"{searchQuery}"</Badge>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="h-7 text-xs"
                >
                  Limpar filtros
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex h-[calc(100vh-240px)] gap-4 p-6">
          {/* Statistics Sidebar */}
          <div className="w-80 space-y-4 overflow-y-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MapIcon className="h-5 w-5" />
                  Estatísticas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Municípios Exibidos</div>
                  <div className="text-2xl font-bold text-foreground flex items-center gap-2">
                    <MapIcon className="h-5 w-5 text-primary" />
                    {statistics.totalMunicipalities}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-muted-foreground mb-1">Total de Votos</div>
                  <div className="text-2xl font-bold text-foreground flex items-center gap-2">
                    <Vote className="h-5 w-5 text-primary" />
                    {statistics.totalVotes.toLocaleString("pt-BR")}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-muted-foreground mb-1">Turno Selecionado</div>
                  <Badge variant="outline" className="text-base">
                    {selectedTurno}º Turno
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Top 5 Municípios
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {statistics.topMunicipalities.map((municipality, index) => (
                    <div key={municipality.id} className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-foreground truncate">
                          {municipality.name} - {municipality.state}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {municipality.topVote.candidate} ({municipality.topVote.party})
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <Badge
                          style={{
                            backgroundColor: getColorByPercentage(municipality.topVote.percentage),
                            color: "white",
                          }}
                        >
                          {municipality.topVote.percentage}%
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Legenda de Cores</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "#22c55e" }} />
                    <span className="text-sm text-foreground">≥ 50% - Alta Aprovação</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "#84cc16" }} />
                    <span className="text-sm text-foreground">40-49% - Aprovação Boa</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "#eab308" }} />
                    <span className="text-sm text-foreground">30-39% - Aprovação Moderada</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "#f97316" }} />
                    <span className="text-sm text-foreground">20-29% - Aprovação Baixa</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "#ef4444" }} />
                    <span className="text-sm text-foreground">&lt; 20% - Aprovação Muito Baixa</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Map Container */}
          <div className="flex-1 bg-card rounded-lg border border-border overflow-hidden">
            {!isMounted ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center space-y-3">
                  <MapIcon className="h-12 w-12 text-muted-foreground mx-auto animate-pulse" />
                  <p className="text-muted-foreground">Carregando mapa...</p>
                </div>
              </div>
            ) : filteredData.length === 0 ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center space-y-3">
                  <MapIcon className="h-12 w-12 text-muted-foreground mx-auto" />
                  <p className="text-foreground font-medium">Nenhum município encontrado</p>
                  <p className="text-sm text-muted-foreground">
                    Ajuste os filtros para visualizar os dados
                  </p>
                  <Button onClick={clearFilters} variant="outline" size="sm">
                    Limpar filtros
                  </Button>
                </div>
              </div>
            ) : (
              <MapContainer
                center={[-14.235, -51.925]}
                zoom={5}
                style={{ height: "100%", width: "100%" }}
                scrollWheelZoom={true}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {filteredData.map((municipality) => (
                  <CircleMarker
                    key={municipality.id}
                    center={municipality.coordinates}
                    radius={Math.sqrt(municipality.topVote.totalVotes / 10000)}
                    fillColor={getColorByPercentage(municipality.topVote.percentage)}
                    color="#fff"
                    weight={2}
                    opacity={1}
                    fillOpacity={0.7}
                  >
                    <Popup>
                      <div className="p-2 min-w-[200px]">
                        <h3 className="font-bold text-base mb-1">
                          {municipality.name} - {municipality.state}
                        </h3>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="text-muted-foreground">Candidato:</span>{" "}
                            <span className="font-medium">{municipality.topVote.candidate}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Partido:</span>{" "}
                            <Badge variant="secondary">{municipality.topVote.party}</Badge>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Votos:</span>{" "}
                            <span className="font-medium">
                              {municipality.topVote.totalVotes.toLocaleString("pt-BR")}
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Percentual:</span>{" "}
                            <Badge
                              style={{
                                backgroundColor: getColorByPercentage(municipality.topVote.percentage),
                                color: "white",
                              }}
                            >
                              {municipality.topVote.percentage}%
                            </Badge>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Total de eleitores:</span>{" "}
                            <span className="font-medium">
                              {municipality.totalVoters.toLocaleString("pt-BR")}
                            </span>
                          </div>
                          <div className="pt-2 border-t border-border">
                            <div className="text-xs text-muted-foreground mb-1">Votação {selectedTurno}º Turno</div>
                            <div className="w-full bg-secondary rounded-full h-2">
                              <div
                                className="h-2 rounded-full"
                                style={{
                                  width: `${municipality.topVote.percentage}%`,
                                  backgroundColor: getColorByPercentage(municipality.topVote.percentage),
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Popup>
                  </CircleMarker>
                ))}
              </MapContainer>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Mapas;
