import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface VoterDetailsModalProps {
  voter: any;
  onClose: () => void;
}

export default function VoterDetailsModal({ voter, onClose }: VoterDetailsModalProps) {
  if (!voter) return null;

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Detalhes do Eleitor</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-xl">
                {voter.full_name?.[0] || "?"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-semibold">{voter.full_name}</h3>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Email</p>
              <p className="font-medium">{voter.email || "-"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Telefone</p>
              <p className="font-medium">{voter.phone || "-"}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Cidade</p>
              <p className="font-medium">{voter.city || "-"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Estado</p>
              <p className="font-medium">{voter.state || "-"}</p>
            </div>
          </div>

          {voter.tags && voter.tags.length > 0 && (
            <div>
              <p className="text-sm text-muted-foreground mb-2">Tags</p>
              <div className="flex gap-2 flex-wrap">
                {voter.tags.map((tag: string, idx: number) => (
                  <Badge key={idx} variant="outline">{tag}</Badge>
                ))}
              </div>
            </div>
          )}

          {voter.notes && (
            <div>
              <p className="text-sm text-muted-foreground mb-2">Notas</p>
              <p className="text-sm whitespace-pre-wrap p-3 bg-muted rounded-md">
                {voter.notes}
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
