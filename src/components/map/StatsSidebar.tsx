import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, BarChart3, RefreshCw } from "lucide-react";

interface FilterState {
  year: number;
  state: string;
  coalitionSides: string[];
  parties: string[];
  candidateSearch: string;
}

interface StatsData {
  totalVotes: number;
  leftVotes: number;
  rightVotes: number;
  centerVotes: number;
  totalCandidates: number;
  elected: number;
}

interface StatsSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
  stats: StatsData;
  availableStates: string[];
  availableParties: string[];
  onReseedData?: () => void;
}

export function StatsSidebar({ 
  filters, 
  onFilterChange, 
  stats, 
  availableStates, 
  availableParties,
  onReseedData 
}: StatsSidebarProps) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <BarChart3 className="h-5 w-5" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Ano da Eleição</label>
            <Select 
              value={filters.year.toString()} 
              onValueChange={(value) => onFilterChange({ year: parseInt(value) })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2022">2022</SelectItem>
                <SelectItem value="2020">2020</SelectItem>
                <SelectItem value="2018">2018</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Estado</label>
            <Select 
              value={filters.state} 
              onValueChange={(value) => onFilterChange({ state: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Todos os estados" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os estados</SelectItem>
                {availableStates.map(state => (
                  <SelectItem key={state} value={state}>{state}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Buscar Candidato</label>
            <Input
              placeholder="Nome do candidato..."
              value={filters.candidateSearch}
              onChange={(e) => onFilterChange({ candidateSearch: e.target.value })}
            />
          </div>

          {onReseedData && (
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={onReseedData}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Recarregar Dados
            </Button>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Users className="h-5 w-5" />
            Estatísticas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Total de Votos</p>
            <p className="text-3xl font-bold">{stats.totalVotes.toLocaleString()}</p>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">Por Coligação:</p>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Badge style={{ backgroundColor: "#ef4444", color: "white" }}>
                  Esquerda
                </Badge>
                <span className="font-semibold">{stats.leftVotes.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <Badge style={{ backgroundColor: "#3b82f6", color: "white" }}>
                  Direita
                </Badge>
                <span className="font-semibold">{stats.rightVotes.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <Badge style={{ backgroundColor: "#9ca3af", color: "white" }}>
                  Centro
                </Badge>
                <span className="font-semibold">{stats.centerVotes.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">Candidatos</span>
              <span className="font-semibold">{stats.totalCandidates}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Eleitos</span>
              <span className="font-semibold text-green-600">{stats.elected}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
