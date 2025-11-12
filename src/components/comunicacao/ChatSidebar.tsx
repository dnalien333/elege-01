import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Thread, User, Message } from "@/mocks/comunicacao";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface ChatSidebarProps {
  threads: Thread[];
  users: User[];
  messages: Message[];
  selectedThreadId: string | null;
  onSelectThread: (threadId: string) => void;
}

const ChatSidebar = ({
  threads,
  users,
  messages,
  selectedThreadId,
  onSelectThread,
}: ChatSidebarProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const getThreadParticipants = (thread: Thread) => {
    return users.filter((u) => thread.participantIds.includes(u.id));
  };

  const getThreadName = (thread: Thread) => {
    const participants = getThreadParticipants(thread);
    if (participants.length === 1) {
      return participants[0].name;
    }
    return participants.map((p) => p.name.split(" ")[0]).join(", ");
  };

  const getLastMessage = (thread: Thread) => {
    const threadMessages = messages.filter((m) => m.threadId === thread.id);
    if (threadMessages.length === 0) return null;
    return threadMessages[threadMessages.length - 1];
  };

  const filteredThreads = threads.filter((thread) => {
    const threadName = getThreadName(thread).toLowerCase();
    return threadName.includes(searchQuery.toLowerCase());
  });

  // Sort by last message time
  const sortedThreads = [...filteredThreads].sort((a, b) => {
    return b.lastMessageAt.getTime() - a.lastMessageAt.getTime();
  });

  // Group by role
  const equipeThreads = sortedThreads.filter((thread) => {
    const participants = getThreadParticipants(thread);
    return participants.some((p) => p.role === "equipe");
  });

  const colaboradorThreads = sortedThreads.filter((thread) => {
    const participants = getThreadParticipants(thread);
    return participants.every((p) => p.role === "colaborador");
  });

  const ThreadItem = ({ thread }: { thread: Thread }) => {
    const participants = getThreadParticipants(thread);
    const lastMessage = getLastMessage(thread);
    const isGroup = participants.length > 1;

    return (
      <div
        className={cn(
          "p-3 cursor-pointer hover:bg-accent transition-colors border-b",
          selectedThreadId === thread.id && "bg-accent"
        )}
        onClick={() => onSelectThread(thread.id)}
      >
        <div className="flex items-start gap-3">
          {/* Avatar */}
          <div className="relative">
            <Avatar className="h-12 w-12">
              <AvatarImage src={participants[0].avatarUrl} />
              <AvatarFallback>{participants[0].name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            {participants[0].online && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h4 className="text-sm font-semibold truncate">
                {getThreadName(thread)}
              </h4>
              {lastMessage && (
                <span className="text-xs text-muted-foreground">
                  {format(lastMessage.createdAt, "HH:mm")}
                </span>
              )}
            </div>
            {lastMessage && (
              <p className="text-sm text-muted-foreground truncate">
                {lastMessage.text}
              </p>
            )}
            <div className="flex items-center gap-2 mt-1">
              {isGroup && (
                <Badge variant="outline" className="text-xs">
                  Grupo
                </Badge>
              )}
              {thread.unreadCount > 0 && (
                <Badge className="text-xs bg-primary">
                  {thread.unreadCount}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full border-r bg-card">
      {/* Header */}
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold mb-3">Conversas</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar conversas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Thread List */}
      <ScrollArea className="flex-1">
        {/* Equipe Section */}
        {equipeThreads.length > 0 && (
          <div>
            <div className="px-4 py-2 bg-muted/50">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase">
                Equipe
              </h3>
            </div>
            {equipeThreads.map((thread) => (
              <ThreadItem key={thread.id} thread={thread} />
            ))}
          </div>
        )}

        {/* Colaboradores Section */}
        {colaboradorThreads.length > 0 && (
          <div>
            <div className="px-4 py-2 bg-muted/50">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase">
                Colaboradores
              </h3>
            </div>
            {colaboradorThreads.map((thread) => (
              <ThreadItem key={thread.id} thread={thread} />
            ))}
          </div>
        )}

        {sortedThreads.length === 0 && (
          <div className="p-4 text-center text-sm text-muted-foreground">
            Nenhuma conversa encontrada
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default ChatSidebar;
