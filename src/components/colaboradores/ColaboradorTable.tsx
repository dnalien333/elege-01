import { Loader2, Edit } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface ColaboradorTableProps {
  colaboradores?: any[];
  isLoading: boolean;
  onEdit: (colaborador: any) => void;
}

export default function ColaboradorTable({ colaboradores, isLoading, onEdit }: ColaboradorTableProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!colaboradores || colaboradores.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        Nenhum colaborador encontrado
      </div>
    );
  }

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Telefone</TableHead>
            <TableHead>Cidade</TableHead>
            <TableHead>Função</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {colaboradores.map((colaborador) => (
            <TableRow key={colaborador.id}>
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
                {colaborador.tags?.slice(0, 2).map((tag: string, idx: number) => (
                  <Badge key={idx} variant="outline" className="mr-1">
                    {tag}
                  </Badge>
                ))}
                {colaborador.tags?.length > 2 && (
                  <Badge variant="outline">+{colaborador.tags.length - 2}</Badge>
                )}
              </TableCell>
              <TableCell className="text-right">
                <button
                  onClick={() => onEdit(colaborador)}
                  className="p-2 hover:bg-muted rounded-lg"
                >
                  <Edit className="w-4 h-4" />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
