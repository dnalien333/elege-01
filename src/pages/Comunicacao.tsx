import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Plus, Calendar as CalendarIcon, MessageSquare } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CalendarView from "@/components/comunicacao/CalendarView";
import ChatSidebar from "@/components/comunicacao/ChatSidebar";
import ChatWindow from "@/components/comunicacao/ChatWindow";
import NewMeetingModal from "@/components/comunicacao/NewMeetingModal";
import {
  mockMeetings,
  mockThreads,
  mockMessages,
  mockUsers,
  Meeting,
  Thread,
  Message,
} from "@/mocks/comunicacao";
import { toast } from "sonner";

const Comunicacao = () => {
  const [meetings, setMeetings] = useState<Meeting[]>(mockMeetings);
  const [threads, setThreads] = useState<Thread[]>(mockThreads);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);
  const [showNewMeetingModal, setShowNewMeetingModal] = useState(false);

  // Mock current user (Ana Silva from equipe)
  const currentUserId = "user-1";

  const handleCreateMeeting = (newMeeting: Omit<Meeting, "id">) => {
    const meeting: Meeting = {
      ...newMeeting,
      id: `meeting-${Date.now()}`,
    };
    setMeetings([...meetings, meeting]);
  };

  const handleUpdateMeeting = (id: string, updatedMeeting: Partial<Meeting>) => {
    setMeetings(
      meetings.map((m) => (m.id === id ? { ...m, ...updatedMeeting } : m))
    );
  };

  const handleDeleteMeeting = (id: string) => {
    setMeetings(meetings.filter((m) => m.id !== id));
    toast.success("Reunião cancelada com sucesso");
  };

  const handleSendMessage = (threadId: string, text: string) => {
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      threadId,
      senderId: currentUserId,
      text,
      createdAt: new Date(),
      status: "sent",
    };

    setMessages([...messages, newMessage]);

    // Update thread's last message time
    setThreads(
      threads.map((t) =>
        t.id === threadId ? { ...t, lastMessageAt: new Date() } : t
      )
    );

    // Simulate message delivery after 1s
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === newMessage.id ? { ...m, status: "delivered" } : m
        )
      );
    }, 1000);

    // Simulate message read after 3s
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === newMessage.id ? { ...m, status: "read" } : m
        )
      );
    }, 3000);
  };

  const selectedThread = threads.find((t) => t.id === selectedThreadId);
  const threadMessages = messages.filter((m) => m.threadId === selectedThreadId);

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar />
      <main className="flex-1 w-full p-6 lg:p-8 overflow-y-auto">
        <div className="max-w-[1800px] mx-auto space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Comunicação
              </h1>
              <p className="text-muted-foreground">
                Gerencie reuniões e conversas com equipe e colaboradores
              </p>
            </div>
            <Button onClick={() => setShowNewMeetingModal(true)} size="lg">
              <Plus className="w-4 h-4 mr-2" />
              Nova Reunião
            </Button>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="calendar" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="calendar">
                <CalendarIcon className="w-4 h-4 mr-2" />
                Calendário
              </TabsTrigger>
              <TabsTrigger value="chat">
                <MessageSquare className="w-4 h-4 mr-2" />
                Conversas
              </TabsTrigger>
            </TabsList>

            <TabsContent value="calendar" className="mt-6">
              <CalendarView
                meetings={meetings}
                onCreateMeeting={handleCreateMeeting}
                onUpdateMeeting={handleUpdateMeeting}
                onDeleteMeeting={handleDeleteMeeting}
              />
            </TabsContent>

            <TabsContent value="chat" className="mt-6">
              <div className="border rounded-lg overflow-hidden" style={{ height: "700px" }}>
                <div className="flex h-full">
                  {/* Chat Sidebar */}
                  <div className="w-80 flex-shrink-0">
                    <ChatSidebar
                      threads={threads}
                      users={mockUsers}
                      messages={messages}
                      selectedThreadId={selectedThreadId}
                      onSelectThread={setSelectedThreadId}
                    />
                  </div>

                  {/* Chat Window */}
                  <div className="flex-1">
                    {selectedThread ? (
                      <ChatWindow
                        thread={selectedThread}
                        messages={threadMessages}
                        users={mockUsers}
                        currentUserId={currentUserId}
                        onSendMessage={handleSendMessage}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full bg-muted/20">
                        <div className="text-center space-y-2">
                          <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground" />
                          <p className="text-muted-foreground">
                            Selecione uma conversa para começar
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* New Meeting Modal */}
      <NewMeetingModal
        open={showNewMeetingModal}
        onOpenChange={setShowNewMeetingModal}
        onCreateMeeting={handleCreateMeeting}
        initialSlot={null}
        users={mockUsers}
      />
    </div>
  );
};

export default Comunicacao;
