import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Message, User, Thread, messageTemplates } from "@/mocks/comunicacao";
import { format } from "date-fns";
import { Send, Smile, Paperclip, MoreVertical, Check, CheckCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface ChatWindowProps {
  thread: Thread;
  messages: Message[];
  users: User[];
  currentUserId: string;
  onSendMessage: (threadId: string, text: string) => void;
}

const ChatWindow = ({
  thread,
  messages,
  users,
  currentUserId,
  onSendMessage,
}: ChatWindowProps) => {
  const [messageText, setMessageText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const threadParticipants = users.filter((u) => thread.participantIds.includes(u.id));
  const otherParticipants = threadParticipants.filter((u) => u.id !== currentUserId);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!messageText.trim()) return;

    onSendMessage(thread.id, messageText);
    setMessageText("");

    // Simulate typing indicator
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleTemplateSelect = (template: string) => {
    setMessageText(template);
  };

  const getThreadName = () => {
    if (otherParticipants.length === 0) return "Você";
    if (otherParticipants.length === 1) return otherParticipants[0].name;
    return otherParticipants.map((p) => p.name.split(" ")[0]).join(", ");
  };

  const MessageBubble = ({ message }: { message: Message }) => {
    const isOwn = message.senderId === currentUserId;
    const sender = users.find((u) => u.id === message.senderId);

    return (
      <div className={cn("flex gap-2 mb-4", isOwn && "flex-row-reverse")}>
        {!isOwn && (
          <Avatar className="h-8 w-8">
            <AvatarImage src={sender?.avatarUrl} />
            <AvatarFallback>{sender?.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
        )}

        <div className={cn("flex flex-col gap-1", isOwn && "items-end")}>
          {!isOwn && threadParticipants.length > 2 && (
            <span className="text-xs text-muted-foreground ml-2">{sender?.name}</span>
          )}
          <div
            className={cn(
              "rounded-lg px-4 py-2 max-w-sm break-words",
              isOwn
                ? "bg-primary text-primary-foreground"
                : "bg-muted"
            )}
          >
            <p className="text-sm">{message.text}</p>
          </div>
          <div className={cn("flex items-center gap-1 px-2", isOwn && "flex-row-reverse")}>
            <span className="text-xs text-muted-foreground">
              {format(message.createdAt, "HH:mm")}
            </span>
            {isOwn && (
              <div>
                {message.status === "read" && (
                  <CheckCheck className="h-3 w-3 text-blue-500" />
                )}
                {message.status === "delivered" && (
                  <CheckCheck className="h-3 w-3 text-muted-foreground" />
                )}
                {message.status === "sent" && (
                  <Check className="h-3 w-3 text-muted-foreground" />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between bg-card">
        <div className="flex items-center gap-3">
          {otherParticipants.length === 1 ? (
            <>
              <div className="relative">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={otherParticipants[0].avatarUrl} />
                  <AvatarFallback>
                    {otherParticipants[0].name.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                {otherParticipants[0].online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                )}
              </div>
              <div>
                <h3 className="font-semibold">{otherParticipants[0].name}</h3>
                <p className="text-xs text-muted-foreground">
                  {otherParticipants[0].online ? "Online" : "Offline"}
                </p>
              </div>
            </>
          ) : (
            <div>
              <h3 className="font-semibold">{getThreadName()}</h3>
              <p className="text-xs text-muted-foreground">
                {threadParticipants.length} participantes
              </p>
            </div>
          )}
        </div>

        <Button variant="ghost" size="icon">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}

        {isTyping && (
          <div className="flex gap-2 mb-4">
            <Avatar className="h-8 w-8">
              <AvatarImage src={otherParticipants[0]?.avatarUrl} />
              <AvatarFallback>{otherParticipants[0]?.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="bg-muted rounded-lg px-4 py-2">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t bg-card">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" title="Emoji (em breve)">
            <Smile className="h-5 w-5" />
          </Button>

          <Button variant="ghost" size="icon" title="Anexo (simulado)">
            <Paperclip className="h-5 w-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Modelos
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-80">
              <DropdownMenuLabel>Modelos de Mensagem</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {messageTemplates.map((template) => (
                <DropdownMenuItem
                  key={template.id}
                  onClick={() => handleTemplateSelect(template.text)}
                  className="flex flex-col items-start gap-1"
                >
                  <span className="font-medium">{template.name}</span>
                  <span className="text-xs text-muted-foreground line-clamp-2">
                    {template.text}
                  </span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Input
            placeholder="Digite sua mensagem..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />

          <Button onClick={handleSendMessage} size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
