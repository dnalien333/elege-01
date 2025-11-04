import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface ColaboradorDetailsModalProps {
  colaborador: any;
  onClose: () => void;
}

export default function ColaboradorDetailsModal({ colaborador, onClose }: ColaboradorDetailsModalProps) {
  if (!colaborador) return null;

  const getRoleLabel = (role: string) => {
    const roles: Record<string, string> = {
      admin: "Administrador",
      coordinator: "Coordenador",
      collaborator: "Colaborador",
    };
    return roles[role] || role;
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Detalhes do Colaborador</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-xl">
                {colaborador.full_name?.[0] || "?"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-semibold">{colaborador.full_name}</h3>
              <Badge variant={colaborador.role === 'admin' ? 'default' : 'secondary'}>
                {getRoleLabel(colaborador.role)}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Email</p>
              <p className="font-medium">{colaborador.email || "-"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Telefone</p>
              <p className="font-medium">{colaborador.phone || "-"}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Cidade</p>
              <p className="font-medium">{colaborador.city || "-"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Estado</p>
              <p className="font-medium">{colaborador.state || "-"}</p>
            </div>
          </div>

          {colaborador.tags && colaborador.tags.length > 0 && (
            <div>
              <p className="text-sm text-muted-foreground mb-2">Tags</p>
              <div className="flex gap-2 flex-wrap">
                {colaborador.tags.map((tag: string, idx: number) => (
                  <Badge key={idx} variant="outline">{tag}</Badge>
                ))}
              </div>
            </div>
          )}

          {colaborador.notes && (
            <div>
              <p className="text-sm text-muted-foreground mb-2">Observações</p>
              <p className="text-sm whitespace-pre-wrap p-3 bg-muted rounded-md">
                {colaborador.notes}
              </p>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Fechar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
