import { useState } from 'react';
import { Loader2, MoreVertical, Edit, Trash2, Eye, UserCog } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

interface ColaboradorTableProps {
  colaboradores?: any[];
  isLoading: boolean;
  onEdit: (colaborador: any) => void;
  onDelete: (colaborador: any) => void;
}

export default function ColaboradorTable({ colaboradores, isLoading, onEdit, onDelete }: ColaboradorTableProps) {
  const [sortField, setSortField] = useState<string>('full_name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedColaboradores = colaboradores ? [...colaboradores].sort((a, b) => {
    const aVal = a[sortField] || '';
    const bVal = b[sortField] || '';
    const comparison = aVal.toString().localeCompare(bVal.toString());
    return sortDirection === 'asc' ? comparison : -comparison;
  }) : [];

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!colaboradores || colaboradores.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <UserCog className="w-16 h-16 text-muted mb-4" />
        <h3 className="text-lg font-semibold">Nenhum colaborador encontrado</h3>
        <p className="text-muted-foreground mt-2">
          Adicione seu primeiro colaborador para começar
        </p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead 
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => handleSort('full_name')}
            >
              Nome {sortField === 'full_name' && (sortDirection === 'asc' ? '↑' : '↓')}
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => handleSort('email')}
            >
              Email {sortField === 'email' && (sortDirection === 'asc' ? '↑' : '↓')}
            </TableHead>
            <TableHead>Telefone</TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => handleSort('city')}
            >
              Cidade {sortField === 'city' && (sortDirection === 'asc' ? '↑' : '↓')}
            </TableHead>
            <TableHead>Função</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedColaboradores.map((colaborador) => (
            <TableRow key={colaborador.id} className="hover:bg-muted/30 transition-colors">
              <TableCell className="font-medium">{colaborador.full_name}</TableCell>
              <TableCell>{colaborador.email || '-'}</TableCell>
              <TableCell>{colaborador.phone || '-'}</TableCell>
              <TableCell>{colaborador.city || '-'}</TableCell>
              <TableCell>
                <Badge variant={colaborador.role === 'admin' ? 'default' : 'secondary'}>
                  {colaborador.role === 'admin' ? 'Admin' : colaborador.role === 'coordinator' ? 'Coordenador' : 'Colaborador'}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex gap-1 flex-wrap">
                  {colaborador.tags?.slice(0, 2).map((tag: string, idx: number) => (
                    <Badge key={idx} variant="outline" className="mr-1">
                      {tag}
                    </Badge>
                  ))}
                  {colaborador.tags?.length > 2 && (
                    <Badge variant="outline">+{colaborador.tags.length - 2}</Badge>
                  )}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem disabled>
                      <Eye className="w-4 h-4 mr-2" />
                      Ver Detalhes
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onEdit(colaborador)}>
                      <Edit className="w-4 h-4 mr-2" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => onDelete(colaborador)}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Excluir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
