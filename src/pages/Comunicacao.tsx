import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Sidebar from "@/components/layout/Sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

const Comunicacao = () => {
  const navigate = useNavigate();
  const [communications, setCommunications] = useState<any[]>([]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      } else {
        loadCommunications();
      }
    });
  }, [navigate]);

  const loadCommunications = async () => {
    try {
      const { data, error } = await supabase
        .from("communications")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setCommunications(data || []);
    } catch (error) {
      console.error("Error loading communications:", error);
    }
  };

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Comunicação
            </h1>
            <p className="text-muted-foreground">
              Gerencie e envie comunicações para seus eleitores
            </p>
          </div>

          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Em desenvolvimento</h3>
              <p className="text-muted-foreground text-center">
                Este módulo permite criar e gerenciar comunicações com seus eleitores
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Comunicacao;
