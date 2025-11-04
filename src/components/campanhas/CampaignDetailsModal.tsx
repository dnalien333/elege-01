import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface CampaignDetailsModalProps {
  campaign: any;
  onClose: () => void;
}

export default function CampaignDetailsModal({ campaign, onClose }: CampaignDetailsModalProps) {
  if (!campaign) return null;

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Detalhes da Campanha</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">{campaign.name}</h3>
            <Badge>{campaign.election_year}</Badge>
          </div>

          {campaign.description && (
            <div>
              <p className="text-sm text-muted-foreground mb-2">Descrição</p>
              <p className="text-sm whitespace-pre-wrap p-3 bg-muted rounded-md">
                {campaign.description}
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Ano da Eleição</p>
              <p className="font-medium">{campaign.election_year}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Data de Criação</p>
              <p className="font-medium">
                {campaign.created_at ? new Date(campaign.created_at).toLocaleDateString('pt-BR') : "-"}
              </p>
            </div>
          </div>

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
