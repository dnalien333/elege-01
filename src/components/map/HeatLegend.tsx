import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

type ViewMode = "coalition" | "party" | "candidate" | "winners";

interface HeatLegendProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

export function HeatLegend({ viewMode, onViewModeChange }: HeatLegendProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Visualização</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && onViewModeChange(value as ViewMode)}>
          <ToggleGroupItem value="coalition" className="flex-1">
            Esquerda vs Direita
          </ToggleGroupItem>
          <ToggleGroupItem value="party" className="flex-1">
            Por Partido
          </ToggleGroupItem>
        </ToggleGroup>
        
        <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && onViewModeChange(value as ViewMode)}>
          <ToggleGroupItem value="candidate" className="flex-1">
            Por Candidato
          </ToggleGroupItem>
          <ToggleGroupItem value="winners" className="flex-1">
            Eleitos
          </ToggleGroupItem>
        </ToggleGroup>

        <div className="space-y-2 pt-4 border-t">
          <p className="text-sm font-medium">Legenda de Cores</p>
          {viewMode === "coalition" && (
            <>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-[#ef4444]" />
                <span className="text-sm">Esquerda (PT, PSOL, PDT)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-[#3b82f6]" />
                <span className="text-sm">Direita (PL, REPUBLICANOS, UB)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-[#9ca3af]" />
                <span className="text-sm">Centro (PSDB, MDB)</span>
              </div>
            </>
          )}
          {viewMode === "party" && (
            <>
              <div className="flex items-center gap-2">
                <Badge style={{ backgroundColor: "#e11d48" }}>PT</Badge>
                <Badge style={{ backgroundColor: "#f97316" }}>PSOL</Badge>
                <Badge style={{ backgroundColor: "#eab308" }}>PDT</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Badge style={{ backgroundColor: "#3b82f6" }}>PL</Badge>
                <Badge style={{ backgroundColor: "#6366f1" }}>REPUBLICANOS</Badge>
                <Badge style={{ backgroundColor: "#8b5cf6" }}>UB</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Badge style={{ backgroundColor: "#06b6d4" }}>PSDB</Badge>
                <Badge style={{ backgroundColor: "#14b8a6" }}>MDB</Badge>
              </div>
            </>
          )}
          {viewMode === "winners" && (
            <>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-[#22c55e]" />
                <span className="text-sm">Eleitos</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-[#eab308]" />
                <span className="text-sm">Suplentes</span>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
