// src/components/filters/FilterControls.tsx
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterControlsProps {
  ufs: string[];
  parties: string[];
  statuses: string[];
  onFilterChange: (filters: {
    uf: string;
    party: string;
    status: string;
    search: string;
  }) => void;
}

export const FilterControls = ({
  ufs,
  parties,
  statuses,
  onFilterChange,
}: FilterControlsProps) => {
  const [uf, setUf] = useState("");
  const [party, setParty] = useState("");
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");

  // Atualiza o componente pai quando qualquer filtro muda
  useEffect(() => {
    onFilterChange({ uf, party, status, search });
  }, [uf, party, status, search, onFilterChange]);

  const handleClear = () => {
    setUf("");
    setParty("");
    setStatus("");
    setSearch("");
  };

  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-end">
      <div className="flex-1">
        <label className="text-sm font-medium">UF</label>
        <Select value={uf} onValueChange={setUf}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Todas" />
          </SelectTrigger>
          {/* 👇 Apenas estilização ajustada */}
          <SelectContent className="z-[9999]" position="popper">
            <SelectItem value="all">Todas</SelectItem>
            {ufs.map((uf) => (
              <SelectItem key={uf} value={uf}>
                {uf}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1">
        <label className="text-sm font-medium">Partido</label>
        <Select value={party} onValueChange={setParty}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Todos" />
          </SelectTrigger>
          {/* 👇 Apenas estilização ajustada */}
          <SelectContent className="z-[9999]" position="popper">
            <SelectItem value="all">Todos</SelectItem>
            {parties.map((p) => (
              <SelectItem key={p} value={p}>
                {p}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1">
        <label className="text-sm font-medium">Status</label>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Todos" />
          </SelectTrigger>
          {/* 👇 Apenas estilização ajustada */}
          <SelectContent className="z-[9999]" position="popper">
            <SelectItem value="all">Todos</SelectItem>
            {statuses.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1">
        <label className="text-sm font-medium">Buscar candidato</label>
        <Input
          placeholder="Digite o nome..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Button variant="secondary" onClick={handleClear}>
        Limpar filtros
      </Button>
    </div>
  );
};

export default FilterControls;
