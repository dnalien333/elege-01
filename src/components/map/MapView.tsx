import { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import { Skeleton } from "@/components/ui/skeleton";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

type ViewMode = "coalition" | "party" | "candidate" | "winners";

interface TSEResult {
  id: string;
  latitude: number;
  longitude: number;
  candidate_name: string;
  party: string;
  votes: number;
  coalition_side: string;
  elected: boolean;
  substitute: boolean;
  city: string;
  state: string;
}

interface MapViewProps {
  results: TSEResult[];
  viewMode: ViewMode;
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
  if (substitute) return '#f59e0b';
  return '#6b7280';
};

export default function MapView({ results, viewMode }: MapViewProps) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

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

  if (!isReady) {
    return <Skeleton className="w-full h-full" />;
  }

  if (results.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        Nenhum resultado encontrado para os filtros selecionados
      </div>
    );
  }

  return (
    <MapContainer
      center={[-14.235, -51.925]}
      zoom={4}
      style={{ height: "100%", width: "100%" }}
      className="z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {results.map((result) => (
        <CircleMarker
          key={result.id}
          center={[result.latitude, result.longitude]}
          radius={6}
          fillColor={getMarkerColor(result)}
          color="#fff"
          weight={1}
          opacity={1}
          fillOpacity={0.7}
        >
          <Popup>
            <div className="space-y-1">
              <p className="font-bold">{result.candidate_name}</p>
              <p className="text-sm">{result.party} - {result.coalition_side}</p>
              <p className="text-sm">Votos: {result.votes.toLocaleString()}</p>
              <p className="text-sm">
                {result.city}, {result.state}
              </p>
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
