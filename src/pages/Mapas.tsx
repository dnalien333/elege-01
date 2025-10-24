import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { supabase } from '@/lib/supabase';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom colored markers
const createColoredIcon = (color: string) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="background-color: ${color}; width: 25px; height: 25px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>`,
    iconSize: [25, 25],
    iconAnchor: [12, 12],
  });
};

const greenIcon = createColoredIcon('#22C55E'); // Apoiador
const yellowIcon = createColoredIcon('#F59E0B'); // Indeciso
const redIcon = createColoredIcon('#EF4444'); // Opositor
const blueIcon = createColoredIcon('#3B82F6'); // Default

export default function Mapas() {
  const [voters, setVoters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVoters();
  }, []);

  const fetchVoters = async () => {
    try {
      const { data, error } = await supabase
        .from('voters')
        .select('*')
        .not('latitude', 'is', null)
        .not('longitude', 'is', null);

      if (error) throw error;
      setVoters(data || []);
    } catch (error) {
      console.error('Error fetching voters:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMarkerIcon = (tags: string) => {
    if (!tags) return blueIcon;
    const lowerTags = tags.toLowerCase();
    if (lowerTags.includes('apoiador')) return greenIcon;
    if (lowerTags.includes('indeciso')) return yellowIcon;
    if (lowerTags.includes('opositor')) return redIcon;
    return blueIcon;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">Carregando mapa...</div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="p-6 bg-white border-b">
        <h1 className="text-2xl font-bold">Mapas</h1>
        <p className="text-gray-600">Visualize eleitores no mapa</p>
      </div>

      <div className="flex-1 relative">
        <MapContainer
          center={[-23.5505, -46.6333]} // São Paulo
          zoom={11}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {voters.map((voter) => (
            <Marker
              key={voter.id}
              position={[voter.latitude, voter.longitude]}
              icon={getMarkerIcon(voter.tags)}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-bold">{voter.name}</h3>
                  <p className="text-sm text-gray-600">{voter.city}, {voter.state}</p>
                  {voter.tags && (
                    <div className="mt-2">
                      {voter.tags.split(',').map((tag, i) => (
                        <span key={i} className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mr-1">
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Legend */}
        <div className="absolute bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg z-[1000]">
          <h4 className="font-bold mb-2">Legenda</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-green-500"></div>
              <span className="text-sm">Apoiador</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
              <span className="text-sm">Indeciso</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-red-500"></div>
              <span className="text-sm">Opositor</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
