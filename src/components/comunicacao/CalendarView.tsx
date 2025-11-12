import { useState, useCallback } from "react";
import { Calendar, momentLocalizer, View } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Meeting, mockUsers } from "@/mocks/comunicacao";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import NewMeetingModal from "./NewMeetingModal";
import MeetingDetailsModal from "./MeetingDetailsModal";
import EditMeetingModal from "./EditMeetingModal";

moment.locale("pt-br");
const localizer = momentLocalizer(moment);

interface CalendarViewProps {
  meetings: Meeting[];
  onCreateMeeting: (meeting: Omit<Meeting, "id">) => void;
  onUpdateMeeting: (id: string, meeting: Partial<Meeting>) => void;
  onDeleteMeeting: (id: string) => void;
}

const CalendarView = ({
  meetings,
  onCreateMeeting,
  onUpdateMeeting,
  onDeleteMeeting,
}: CalendarViewProps) => {
  const [view, setView] = useState<View>("month");
  const [date, setDate] = useState(new Date());
  const [showNewModal, setShowNewModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<{ start: Date; end: Date } | null>(null);

  const handleSelectSlot = useCallback((slotInfo: { start: Date; end: Date }) => {
    setSelectedSlot(slotInfo);
    setShowNewModal(true);
  }, []);

  const handleSelectEvent = useCallback((event: Meeting) => {
    setSelectedMeeting(event);
    setShowDetailsModal(true);
  }, []);

  const handleNavigate = (newDate: Date) => {
    setDate(newDate);
  };

  const handleViewChange = (newView: View) => {
    setView(newView);
  };

  const navigateToday = () => {
    setDate(new Date());
  };

  const navigatePrev = () => {
    if (view === "month") {
      setDate(moment(date).subtract(1, "month").toDate());
    } else if (view === "week") {
      setDate(moment(date).subtract(1, "week").toDate());
    } else {
      setDate(moment(date).subtract(1, "day").toDate());
    }
  };

  const navigateNext = () => {
    if (view === "month") {
      setDate(moment(date).add(1, "month").toDate());
    } else if (view === "week") {
      setDate(moment(date).add(1, "week").toDate());
    } else {
      setDate(moment(date).add(1, "day").toDate());
    }
  };

  const handleEdit = () => {
    setShowDetailsModal(false);
    setShowEditModal(true);
  };

  const handleDelete = () => {
    if (selectedMeeting) {
      onDeleteMeeting(selectedMeeting.id);
      setShowDetailsModal(false);
      setSelectedMeeting(null);
    }
  };

  const eventStyleGetter = (event: Meeting) => {
    return {
      style: {
        backgroundColor: event.color || "#22C55E",
        borderRadius: "4px",
        opacity: 0.9,
        color: "white",
        border: "0px",
        display: "block",
      },
    };
  };

  const formats = {
    monthHeaderFormat: (date: Date) => moment(date).format("MMMM YYYY"),
    dayHeaderFormat: (date: Date) => moment(date).format("dddd, DD/MM"),
    dayRangeHeaderFormat: ({ start, end }: { start: Date; end: Date }) =>
      `${moment(start).format("DD MMM")} - ${moment(end).format("DD MMM YYYY")}`,
  };

  return (
    <div className="space-y-4">
      {/* Calendar Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={navigatePrev}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" onClick={navigateToday}>
            <CalendarIcon className="h-4 w-4 mr-2" />
            Hoje
          </Button>
          <Button variant="outline" size="icon" onClick={navigateNext}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-semibold ml-4">
            {moment(date).format("MMMM YYYY")}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={view === "month" ? "default" : "outline"}
            size="sm"
            onClick={() => handleViewChange("month")}
          >
            Mês
          </Button>
          <Button
            variant={view === "week" ? "default" : "outline"}
            size="sm"
            onClick={() => handleViewChange("week")}
          >
            Semana
          </Button>
          <Button
            variant={view === "day" ? "default" : "outline"}
            size="sm"
            onClick={() => handleViewChange("day")}
          >
            Dia
          </Button>
        </div>
      </div>

      {/* Calendar */}
      <div className="bg-card rounded-lg border p-4" style={{ height: "600px" }}>
        <Calendar
          localizer={localizer}
          events={meetings}
          startAccessor="start"
          endAccessor="end"
          titleAccessor="title"
          view={view}
          onView={handleViewChange}
          date={date}
          onNavigate={handleNavigate}
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          selectable
          eventPropGetter={eventStyleGetter}
          formats={formats}
          messages={{
            next: "Próximo",
            previous: "Anterior",
            today: "Hoje",
            month: "Mês",
            week: "Semana",
            day: "Dia",
            agenda: "Agenda",
            date: "Data",
            time: "Hora",
            event: "Reunião",
            noEventsInRange: "Não há reuniões neste período.",
            showMore: (total) => `+ ${total} mais`,
          }}
          style={{ height: "100%" }}
        />
      </div>

      {/* Modals */}
      <NewMeetingModal
        open={showNewModal}
        onOpenChange={setShowNewModal}
        onCreateMeeting={onCreateMeeting}
        initialSlot={selectedSlot}
        users={mockUsers}
      />

      {selectedMeeting && (
        <>
          <MeetingDetailsModal
            open={showDetailsModal}
            onOpenChange={setShowDetailsModal}
            meeting={selectedMeeting}
            users={mockUsers}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          <EditMeetingModal
            open={showEditModal}
            onOpenChange={setShowEditModal}
            meeting={selectedMeeting}
            onUpdateMeeting={onUpdateMeeting}
            users={mockUsers}
          />
        </>
      )}
    </div>
  );
};

export default CalendarView;
