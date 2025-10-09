import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

interface FilterSidebarProps {
  filters: any;
  setFilters: (filters: any) => void;
  currentCampaignId?: string;
}

export default function FilterSidebar({ filters, setFilters, currentCampaignId }: FilterSidebarProps) {
  const [selectedTags, setSelectedTags] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const queryClient = useQueryClient();

  const { data: segments = [] } = useQuery({
    queryKey: ["saved-filters", currentCampaignId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("saved_filters")
        .select("*")
        .eq("campaign_id", currentCampaignId)
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!currentCampaignId,
  });

  const saveSegmentMutation = useMutation({
    mutationFn: async (name: string) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase.from("saved_filters").insert({
        user_id: user.id,
        campaign_id: currentCampaignId,
        name,
        filters: { 
          tags: selectedTags ? selectedTags.split(",").map(t => t.trim()).filter(Boolean) : [], 
          city: selectedCity, 
          state: selectedState 
        },
      });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["saved-filters"] });
      toast.success("Segmento salvo com sucesso!");
    },
    onError: (error) => {
      toast.error("Erro ao salvar segmento: " + error.message);
    },
  });

  const handleLoadSegment = (segmentId: string) => {
    const segment = segments.find((s: any) => s.id === segmentId);
    if (segment?.filters) {
      const filters = segment.filters as any;
      const tags = filters.tags || [];
      setSelectedTags(Array.isArray(tags) ? tags.join(", ") : "");
      setSelectedCity(filters.city || "");
      setSelectedState(filters.state || "");
      setFilters(filters);
    }
  };

  const handleSaveSegment = () => {
    const name = prompt("Digite um nome para este segmento:");
    if (!name) return;
    saveSegmentMutation.mutate(name);
  };

  const handleApplyFilters = () => {
    const tags = selectedTags ? selectedTags.split(",").map(t => t.trim()).filter(Boolean) : [];
    setFilters({ tags, city: selectedCity, state: selectedState === "all" ? "" : selectedState });
  };

  const handleClearFilters = () => {
    setSelectedTags("");
    setSelectedCity("");
    setSelectedState("");
    setFilters({});
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">Filtros</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium">Segmentos Salvos</Label>
          <Select onValueChange={handleLoadSegment}>
            <SelectTrigger>
              <SelectValue placeholder="-- Escolher --" />
            </SelectTrigger>
            <SelectContent>
              {segments.map((s: any) => (
                <SelectItem key={s.id} value={s.id}>
                  {s.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Tags</Label>
          <Input
            value={selectedTags}
            onChange={(e) => setSelectedTags(e.target.value)}
            placeholder="tags separadas por vírgula"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Cidade</Label>
          <Input
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            placeholder="Nome da cidade"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Estado</Label>
          <Select value={selectedState} onValueChange={setSelectedState}>
            <SelectTrigger>
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="AC">AC</SelectItem>
              <SelectItem value="AL">AL</SelectItem>
              <SelectItem value="AP">AP</SelectItem>
              <SelectItem value="AM">AM</SelectItem>
              <SelectItem value="BA">BA</SelectItem>
              <SelectItem value="CE">CE</SelectItem>
              <SelectItem value="DF">DF</SelectItem>
              <SelectItem value="ES">ES</SelectItem>
              <SelectItem value="GO">GO</SelectItem>
              <SelectItem value="MA">MA</SelectItem>
              <SelectItem value="MT">MT</SelectItem>
              <SelectItem value="MS">MS</SelectItem>
              <SelectItem value="MG">MG</SelectItem>
              <SelectItem value="PA">PA</SelectItem>
              <SelectItem value="PB">PB</SelectItem>
              <SelectItem value="PR">PR</SelectItem>
              <SelectItem value="PE">PE</SelectItem>
              <SelectItem value="PI">PI</SelectItem>
              <SelectItem value="RJ">RJ</SelectItem>
              <SelectItem value="RN">RN</SelectItem>
              <SelectItem value="RS">RS</SelectItem>
              <SelectItem value="RO">RO</SelectItem>
              <SelectItem value="RR">RR</SelectItem>
              <SelectItem value="SC">SC</SelectItem>
              <SelectItem value="SP">SP</SelectItem>
              <SelectItem value="SE">SE</SelectItem>
              <SelectItem value="TO">TO</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2 pt-2">
          <Button onClick={handleApplyFilters} className="w-full">
            Aplicar Filtros
          </Button>
          <Button onClick={handleClearFilters} variant="outline" className="w-full">
            Limpar
          </Button>
        </div>

        <div className="pt-2">
          <Button
            onClick={handleSaveSegment}
            variant="secondary"
            className="w-full"
            disabled={!selectedTags && !selectedCity && !selectedState}
          >
            Salvar Segmento
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
