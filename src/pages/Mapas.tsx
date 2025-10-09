import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { MapContainer, TileLayer, CircleMarker, Marker, Popup, useMap } from 'react-leaflet';
import { Icon, LatLngBounds } from 'leaflet';
import { Loader2, Printer, MapPin } from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import 'leaflet/dist/leaflet.css';

// Component to handle map bounds updates
function MapBoundsUpdater({ bounds }: { bounds: LatLngBounds | null }) {
  const map = useMap();
  
  useEffect(() => {
    if (bounds) {
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [bounds, map]);
  
  return null;
}

export default function Mapas() {
  const navigate = useNavigate();
  const [mapType, setMapType] = useState<'electoral' | 'teams' | 'actions'>('electoral');
  const [selectedSegment, setSelectedSegment] = useState<string>('');
  const [currentCampaignId, setCurrentCampaignId] = useState<string>('');
  const [mapBounds, setMapBounds] = useState<LatLngBounds | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate('/auth');
      } else {
        // Get first campaign
        supabase
          .from('campaigns')
          .select('id')
          .eq('owner_id', session.user.id)
          .limit(1)
          .single()
          .then(({ data }) => {
            if (data) setCurrentCampaignId(data.id);
          });
      }
    });
  }, [navigate]);

  const { data: segments } = useQuery({
    queryKey: ['segments', currentCampaignId],
    queryFn: async () => {
      if (!currentCampaignId) return [];
      const { data } = await supabase
        .from('segments')
        .select('*')
        .eq('campaign_id', currentCampaignId);
      return data || [];
    },
    enabled: !!currentCampaignId
  });

  const { data: voters, isLoading: loadingVoters } = useQuery({
    queryKey: ['map-voters', currentCampaignId, selectedSegment],
    queryFn: async () => {
      if (!currentCampaignId) return [];
      let query = supabase
        .from('voters')
        .select('*')
        .eq('campaign_id', currentCampaignId);

      if (selectedSegment) {
        const segment = segments?.find(s => s.id === selectedSegment);
        if (segment?.filter_criteria) {
          const filters = segment.filter_criteria as any;
          if (filters.tags?.length) query = query.contains('tags', filters.tags);
          if (filters.city) query = query.ilike('city', `%${filters.city}%`);
          if (filters.state) query = query.eq('state', filters.state);
        }
      }

      const { data } = await query;
      return data || [];
    },
    enabled: !!currentCampaignId && mapType === 'electoral'
  });

  const { data: teams, isLoading: loadingTeams } = useQuery({
    queryKey: ['map-teams', currentCampaignId],
    queryFn: async () => {
      if (!currentCampaignId) return [];
      const { data } = await supabase
        .from('teams')
        .select(`
          *,
          leader:profiles!leader_id(full_name),
          members:team_members(id)
        `)
        .eq('campaign_id', currentCampaignId);
      return data || [];
    },
    enabled: !!currentCampaignId && mapType === 'teams'
  });

  const { data: actions, isLoading: loadingActions } = useQuery({
    queryKey: ['map-actions', currentCampaignId],
    queryFn: async () => {
      if (!currentCampaignId) return [];
      const { data } = await supabase
        .from('team_actions')
        .select(`
          *,
          team:teams(name)
        `)
        .not('latitude', 'is', null)
        .not('longitude', 'is', null);
      return data || [];
    },
    enabled: !!currentCampaignId && mapType === 'actions'
  });

  const getMarkerColor = (tags: string[]) => {
    if (tags?.includes('apoiador')) return '#10b981';
    if (tags?.includes('indeciso')) return '#f59e0b';
    if (tags?.includes('opositor')) return '#ef4444';
    return '#3b82f6';
  };

  const createCustomIcon = (color: string) => {
    return new Icon({
      iconUrl: `data:image/svg+xml;base64,${btoa(`
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="${color}">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
      `)}`,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    });
  };

  const handlePrintMap = () => {
    window.print();
  };

  const defaultCenter: [number, number] = [-15.7801, -47.9292]; // Brasília
  const defaultZoom = 4;

  // Calculate map bounds based on data
  useEffect(() => {
    const bounds = new LatLngBounds([]);
    let hasPoints = false;

    if (mapType === 'electoral' && voters?.length) {
      voters.forEach(() => {
        const lat = -15.7801 + (Math.random() - 0.5) * 20;
        const lng = -47.9292 + (Math.random() - 0.5) * 20;
        bounds.extend([lat, lng]);
        hasPoints = true;
      });
    } else if (mapType === 'teams' && teams?.length) {
      teams.forEach(() => {
        const lat = -15.7801 + (Math.random() - 0.5) * 10;
        const lng = -47.9292 + (Math.random() - 0.5) * 10;
        bounds.extend([lat, lng]);
        hasPoints = true;
      });
    } else if (mapType === 'actions' && actions?.length) {
      actions.forEach((action) => {
        if (action.latitude && action.longitude) {
          bounds.extend([Number(action.latitude), Number(action.longitude)]);
          hasPoints = true;
        }
      });
    }

    setMapBounds(hasPoints ? bounds : null);
  }, [mapType, voters, teams, actions]);

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <div className="border-b bg-background p-4">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-2xl font-bold">Mapas</h1>
            <div className="flex items-center gap-4">
              <Select value={mapType} onValueChange={(v: any) => setMapType(v)}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Tipo de Mapa" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electoral">Mapa Eleitoral</SelectItem>
                  <SelectItem value="teams">Equipes</SelectItem>
                  <SelectItem value="actions">Ações</SelectItem>
                </SelectContent>
              </Select>

              {mapType === 'electoral' && (
                <Select value={selectedSegment} onValueChange={setSelectedSegment}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Selecione Segmento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todos</SelectItem>
                    {segments?.map(segment => (
                      <SelectItem key={segment.id} value={segment.id}>
                        {segment.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              <Button variant="outline" onClick={handlePrintMap} className="gap-2">
                <Printer className="w-4 h-4" />
                Imprimir Mapa
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1 relative">
          {(loadingVoters || loadingTeams || loadingActions) ? (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <MapContainer
              center={defaultCenter}
              zoom={defaultZoom}
              className="h-full w-full"
              scrollWheelZoom={true}
              style={{ minHeight: '600px' }}
            >
              <>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MapBoundsUpdater bounds={mapBounds} />
                
                {mapType === 'electoral' && voters?.map((voter) => {
                  const lat = -15.7801 + (Math.random() - 0.5) * 20;
                  const lng = -47.9292 + (Math.random() - 0.5) * 20;
                  
                  return (
                    <CircleMarker
                      key={voter.id}
                      center={[lat, lng]}
                      radius={8}
                      fillColor={getMarkerColor(voter.tags || [])}
                      fillOpacity={0.7}
                      color="#fff"
                      weight={2}
                    >
                      <Popup>
                        <div className="p-2">
                          <h3 className="font-semibold">{voter.full_name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {voter.city}, {voter.state}
                          </p>
                          {voter.tags?.length > 0 && (
                            <div className="flex gap-1 mt-2">
                              {voter.tags.map((tag: string, i: number) => (
                                <span key={i} className="text-xs bg-muted px-2 py-1 rounded">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </Popup>
                    </CircleMarker>
                  );
                })}

                {mapType === 'teams' && teams?.map((team) => {
                  const lat = -15.7801 + (Math.random() - 0.5) * 10;
                  const lng = -47.9292 + (Math.random() - 0.5) * 10;
                  
                  return (
                    <Marker
                      key={team.id}
                      position={[lat, lng]}
                      icon={createCustomIcon('#3b82f6')}
                    >
                      <Popup>
                        <div className="p-2">
                          <h3 className="font-semibold">{team.name}</h3>
                          {team.leader && (
                            <p className="text-sm">Líder: {team.leader.full_name}</p>
                          )}
                          <p className="text-sm text-muted-foreground">
                            {team.members?.length || 0} membros
                          </p>
                        </div>
                      </Popup>
                    </Marker>
                  );
                })}

                {mapType === 'actions' && actions?.map((action) => (
                  <Marker
                    key={action.id}
                    position={[Number(action.latitude), Number(action.longitude)]}
                    icon={createCustomIcon('#f59e0b')}
                  >
                    <Popup>
                      <div className="p-2">
                        <h3 className="font-semibold">{action.title}</h3>
                        <p className="text-sm">{action.team?.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {action.location_name}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {action.action_type} - {action.status}
                        </p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </>
            </MapContainer>
          )}
        </div>

        {/* Legend */}
        <div className="border-t bg-background p-4 flex items-center gap-6 flex-wrap print:hidden">
          <span className="text-sm font-medium">Legenda:</span>
          {mapType === 'electoral' && (
            <>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#10b981' }} />
                <span className="text-sm">Apoiador</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#f59e0b' }} />
                <span className="text-sm">Indeciso</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#ef4444' }} />
                <span className="text-sm">Opositor</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#3b82f6' }} />
                <span className="text-sm">Outros</span>
              </div>
            </>
          )}
          {mapType === 'teams' && (
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-sm">Localização de Equipes</span>
            </div>
          )}
          {mapType === 'actions' && (
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" style={{ color: '#f59e0b' }} />
              <span className="text-sm">Ações de Campo</span>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
