import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Loader2, Users, AlertCircle } from "lucide-react";

interface VoterTableProps {
  filters: any;
  page?: number;
  onEdit: (voter: any) => void;
  currentCampaignId?: string;
}

export default function VoterTable({ filters, page = 1, onEdit, currentCampaignId }: VoterTableProps) {
  const [selectedVoters, setSelectedVoters] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const queryClient = useQueryClient();

  const { data: voters = [], isLoading, error, refetch } = useQuery({
    queryKey: ["voters", currentCampaignId, filters, page, searchTerm],
    queryFn: async () => {
      let query = supabase
        .from("voters")
        .select("*")
        .eq("campaign_id", currentCampaignId)
        .order("created_at", { ascending: false })
        .range((page - 1) * 50, page * 50 - 1);

      if (filters?.tags?.length) {
        query = query.contains("tags", filters.tags);
      }
      if (filters?.city) {
        query = query.ilike("city", `%${filters.city}%`);
      }
      if (filters?.state) {
        query = query.eq("state", filters.state);
      }
      if (searchTerm) {
        query = query.or(
          `full_name.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%,phone.ilike.%${searchTerm}%`
        );
      }

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    },
    enabled: !!currentCampaignId,
  });

  const bulkAddTagMutation = useMutation({
    mutationFn: async (tag: string) => {
      await Promise.all(
        selectedVoters.map(async (voterId) => {
          const voter = voters.find((v: any) => v.id === voterId);
          if (voter) {
            const newTags = Array.from(new Set([...(voter.tags || []), tag]));
            await supabase.from("voters").update({ tags: newTags }).eq("id", voterId);
          }
        })
      );
    },
    onSuccess: (_, tag) => {
      toast.success(`Tag "${tag}" adicionada a ${selectedVoters.length} eleitores`);
      queryClient.invalidateQueries({ queryKey: ["voters"] });
      setSelectedVoters([]);
    },
  });

  const handleToggleVoter = (voterId: string) => {
    setSelectedVoters((prev) =>
      prev.includes(voterId) ? prev.filter((id) => id !== voterId) : [...prev, voterId]
    );
  };

  const handleBulkAddTag = () => {
    const tag = prompt("Digite a tag para adicionar:");
    if (tag) {
      bulkAddTagMutation.mutate(tag.trim());
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <AlertCircle className="w-16 h-16 text-destructive mb-4" />
        <h3 className="text-lg font-semibold">Algo deu errado</h3>
        <p className="text-muted-foreground mt-2">{error.message}</p>
        <Button className="mt-4" variant="outline" onClick={() => refetch()}>
          Tentar Novamente
        </Button>
      </div>
    );
  }

  if (!voters || voters.length === 0) {
    const hasFilters = filters?.tags?.length || filters?.city || filters?.state || searchTerm;
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <Users className="w-16 h-16 text-muted mb-4" />
        <h3 className="text-lg font-semibold">Nenhum eleitor encontrado</h3>
        <p className="text-muted-foreground mt-2">
          {hasFilters ? "Tente ajustar seus filtros" : "Adicione seu primeiro eleitor para começar"}
        </p>
        {!hasFilters && (
          <Button className="mt-4" onClick={() => onEdit(null)}>
            Adicionar Eleitor
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center gap-4">
        <Input
          placeholder="Buscar por nome, email ou telefone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
        <Button onClick={() => onEdit(null)}>+ Novo Eleitor</Button>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12"></TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Cidade</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>Último Contato</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {voters.map((voter: any) => (
              <TableRow key={voter.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedVoters.includes(voter.id)}
                    onCheckedChange={() => handleToggleVoter(voter.id)}
                  />
                </TableCell>
                <TableCell className="font-medium">{voter.full_name}</TableCell>
                <TableCell>{voter.city || "-"}</TableCell>
                <TableCell>{voter.state || "-"}</TableCell>
                <TableCell>
                  <div className="flex gap-1 flex-wrap">
                    {(voter.tags || []).slice(0, 2).map((tag: string) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                    {voter.tags?.length > 2 && (
                      <Badge variant="outline">+{voter.tags.length - 2}</Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  {voter.last_contact_date
                    ? new Date(voter.last_contact_date).toLocaleDateString()
                    : "-"}
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" onClick={() => onEdit(voter)}>
                    Editar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {selectedVoters.length > 0 && (
        <div className="flex gap-2 items-center">
          <span className="text-sm text-muted-foreground">
            {selectedVoters.length} selecionado(s)
          </span>
          <Button variant="outline" size="sm" onClick={handleBulkAddTag}>
            Adicionar Tag
          </Button>
          <Button variant="outline" size="sm">
            Remover Tag
          </Button>
          <Button variant="outline" size="sm">
            Exportar CSV
          </Button>
        </div>
      )}
    </div>
  );
}
