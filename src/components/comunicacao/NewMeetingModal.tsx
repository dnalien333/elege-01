import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Clock } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Meeting, User } from "@/mocks/comunicacao";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface NewMeetingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateMeeting: (meeting: Omit<Meeting, "id">) => void;
  initialSlot: { start: Date; end: Date } | null;
  users: User[];
}

const NewMeetingModal = ({
  open,
  onOpenChange,
  onCreateMeeting,
  initialSlot,
  users,
}: NewMeetingModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("10:00");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedAttendees, setSelectedAttendees] = useState<string[]>([]);

  useEffect(() => {
    if (initialSlot && open) {
      setStartDate(initialSlot.start);
      setStartTime(format(initialSlot.start, "HH:mm"));
      setEndTime(format(initialSlot.end, "HH:mm"));
    }
  }, [initialSlot, open]);

  const handleSubmit = () => {
    if (!title.trim()) {
      toast.error("Título é obrigatório");
      return;
    }

    if (!startDate) {
      toast.error("Data é obrigatória");
      return;
    }

    if (selectedAttendees.length === 0) {
      toast.error("Selecione pelo menos um participante");
      return;
    }

    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);

    const start = new Date(startDate);
    start.setHours(startHour, startMinute, 0, 0);

    const end = new Date(startDate);
    end.setHours(endHour, endMinute, 0, 0);

    if (end <= start) {
      toast.error("Horário de término deve ser após o horário de início");
      return;
    }

    const newMeeting: Omit<Meeting, "id"> = {
      title,
      description,
      start,
      end,
      attendees: selectedAttendees,
      location: location || undefined,
      notes: notes || undefined,
      color: "#22C55E",
    };

    onCreateMeeting(newMeeting);
    toast.success("Reunião criada com sucesso!");
    handleClose();
  };

  const handleClose = () => {
    setTitle("");
    setDescription("");
    setStartDate(new Date());
    setStartTime("09:00");
    setEndTime("10:00");
    setLocation("");
    setNotes("");
    setSelectedAttendees([]);
    onOpenChange(false);
  };

  const toggleAttendee = (userId: string) => {
    setSelectedAttendees((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const equipeUsers = users.filter((u) => u.role === "equipe");
  const colaboradorUsers = users.filter((u) => u.role === "colaborador");

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nova Reunião</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Title */}
          <div>
            <Label htmlFor="title">Título *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Reunião de Planejamento"
            />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva o objetivo da reunião"
              rows={3}
            />
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Data *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP", { locale: ptBR }) : "Selecione"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label htmlFor="start-time">Início *</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="start-time"
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="end-time">Término *</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="end-time"
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div>
            <Label htmlFor="location">Local / Link</Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Ex: Sala de Reuniões ou https://meet.google.com/..."
            />
          </div>

          {/* Attendees */}
          <div>
            <Label>Participantes * ({selectedAttendees.length} selecionados)</Label>
            <div className="mt-2 space-y-4 border rounded-lg p-4 max-h-60 overflow-y-auto">
              {/* Equipe */}
              <div>
                <h4 className="text-sm font-semibold mb-2">Equipe</h4>
                <div className="space-y-2">
                  {equipeUsers.map((user) => (
                    <div key={user.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={user.id}
                        checked={selectedAttendees.includes(user.id)}
                        onCheckedChange={() => toggleAttendee(user.id)}
                      />
                      <label
                        htmlFor={user.id}
                        className="flex items-center gap-2 cursor-pointer flex-1"
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.avatarUrl} />
                          <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{user.name}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Colaboradores */}
              <div>
                <h4 className="text-sm font-semibold mb-2">Colaboradores</h4>
                <div className="space-y-2">
                  {colaboradorUsers.map((user) => (
                    <div key={user.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={user.id}
                        checked={selectedAttendees.includes(user.id)}
                        onCheckedChange={() => toggleAttendee(user.id)}
                      />
                      <label
                        htmlFor={user.id}
                        className="flex items-center gap-2 cursor-pointer flex-1"
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.avatarUrl} />
                          <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{user.name}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <Label htmlFor="notes">Notas</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Notas adicionais ou lembretes"
              rows={2}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>Criar Reunião</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewMeetingModal;
