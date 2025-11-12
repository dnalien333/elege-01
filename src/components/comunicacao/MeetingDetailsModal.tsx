import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Meeting, User } from "@/mocks/comunicacao";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, FileText, Pencil, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface MeetingDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  meeting: Meeting;
  users: User[];
  onEdit: () => void;
  onDelete: () => void;
}

const MeetingDetailsModal = ({
  open,
  onOpenChange,
  meeting,
  users,
  onEdit,
  onDelete,
}: MeetingDetailsModalProps) => {
  const attendeeUsers = users.filter((u) => meeting.attendees.includes(u.id));
  const equipeAttendees = attendeeUsers.filter((u) => u.role === "equipe");
  const colaboradorAttendees = attendeeUsers.filter((u) => u.role === "colaborador");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{meeting.title}</span>
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: meeting.color || "#22C55E" }}
            />
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Description */}
          {meeting.description && (
            <div>
              <p className="text-sm text-muted-foreground">{meeting.description}</p>
            </div>
          )}

          {/* Date and Time */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{format(meeting.start, "PPP", { locale: ptBR })}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>
                {format(meeting.start, "HH:mm")} - {format(meeting.end, "HH:mm")}
              </span>
            </div>
          </div>

          {/* Location */}
          {meeting.location && (
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="break-all">{meeting.location}</span>
            </div>
          )}

          {/* Notes */}
          {meeting.notes && (
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm font-medium">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span>Notas</span>
              </div>
              <p className="text-sm text-muted-foreground ml-6">{meeting.notes}</p>
            </div>
          )}

          {/* Attendees */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">
              Participantes ({attendeeUsers.length})
            </h4>

            {/* Equipe */}
            {equipeAttendees.length > 0 && (
              <div>
                <Badge variant="secondary" className="mb-2">
                  Equipe
                </Badge>
                <div className="space-y-2">
                  {equipeAttendees.map((user) => (
                    <div key={user.id} className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatarUrl} />
                        <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Colaboradores */}
            {colaboradorAttendees.length > 0 && (
              <div>
                <Badge variant="secondary" className="mb-2">
                  Colaboradores
                </Badge>
                <div className="space-y-2">
                  {colaboradorAttendees.map((user) => (
                    <div key={user.id} className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatarUrl} />
                        <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm">
                <Trash2 className="h-4 w-4 mr-2" />
                Cancelar Reunião
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Cancelar Reunião</AlertDialogTitle>
                <AlertDialogDescription>
                  Tem certeza que deseja cancelar esta reunião? Esta ação não pode ser
                  desfeita.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Voltar</AlertDialogCancel>
                <AlertDialogAction onClick={onDelete}>Sim, cancelar</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Button onClick={onEdit} size="sm">
            <Pencil className="h-4 w-4 mr-2" />
            Editar Reunião
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingDetailsModal;
