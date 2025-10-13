import Sidebar from "@/components/layout/Sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";

const Mapa = () => {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Mapas Geográficos
            </h1>
            <p className="text-muted-foreground">
              Em desenvolvimento
            </p>
          </div>

          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <MapPin className="w-16 h-16 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                Funcionalidade de mapas em breve
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Mapa;
