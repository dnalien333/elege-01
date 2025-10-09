import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Sparkles, Send, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Sidebar from '@/components/layout/Sidebar';

export default function AssistenteIA() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [currentCampaignId, setCurrentCampaignId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/auth');
        return;
      }
      setCurrentUserId(session.user.id);
      
      const { data: campaigns } = await supabase
        .from('campaigns')
        .select('id')
        .limit(1);
      if (campaigns && campaigns.length > 0) {
        setCurrentCampaignId(campaigns[0].id);
      }
    };
    initAuth();
  }, [navigate]);

  const { data: chatHistory } = useQuery({
    queryKey: ['chat-history', currentUserId],
    queryFn: async () => {
      if (!currentUserId) return [];
      const { data } = await supabase
        .from('chat_history')
        .select('*')
        .eq('user_id', currentUserId)
        .order('created_at', { ascending: true })
        .limit(50);
      return data?.map((msg) => ({ role: msg.role, content: msg.message })) || [];
    },
    enabled: !!currentUserId
  });

  useEffect(() => {
    if (chatHistory) setMessages(chatHistory);
  }, [chatHistory]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !currentUserId || !currentCampaignId) return;
    
    const userMessage = input.trim();
    setInput('');
    const newMessages = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);
    
    await supabase.from('chat_history').insert({
      user_id: currentUserId,
      campaign_id: currentCampaignId,
      message: userMessage,
      role: 'user'
    });

    setIsLoading(true);
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        toast.error('API Key do Gemini não configurada');
        setIsLoading(false);
        return;
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      
      const chat = model.startChat({
        history: messages.map((msg) => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }]
        }))
      });
      
      const result = await chat.sendMessage(userMessage);
      const response = result.response.text();
      
      setMessages((prev) => [...prev, { role: 'assistant', content: response }]);
      await supabase.from('chat_history').insert({
        user_id: currentUserId,
        campaign_id: currentCampaignId,
        message: response,
        role: 'assistant'
      });
    } catch (error) {
      toast.error('Erro ao processar mensagem');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = async () => {
    if (!currentUserId) return;
    if (confirm('Deseja limpar todo o histórico de conversas?')) {
      await supabase.from('chat_history').delete().eq('user_id', currentUserId);
      setMessages([]);
      queryClient.invalidateQueries({ queryKey: ['chat-history'] });
      toast.success('Histórico limpo');
    }
  };

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <div className="flex flex-1 h-screen">
        <div className="w-64 border-r bg-muted/50 p-4 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold">Histórico</h2>
            <button
              className="text-sm text-muted-foreground hover:text-foreground"
              onClick={handleClearHistory}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-2">
            {messages
              .filter((m) => m.role === 'user')
              .slice(-10)
              .reverse()
              .map((msg, idx) => (
                <div
                  key={idx}
                  className="p-2 bg-card rounded-lg text-sm truncate border"
                  title={msg.content}
                >
                  {msg.content}
                </div>
              ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <Sparkles className="w-16 h-16 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Assistente IA</h3>
                <p className="text-muted-foreground max-w-md">
                  Olá! Sou seu assistente de campanha. Posso ajudar com estratégias, criação de conteúdo, análise de dados e muito mais.
                </p>
              </div>
            ) : (
              messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-2xl px-4 py-3 rounded-2xl ${
                      msg.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted px-4 py-3 rounded-2xl">
                  <Loader2 className="w-5 h-5 animate-spin" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t p-4">
            <div className="max-w-4xl mx-auto flex gap-2">
              <input
                type="text"
                className="flex-1 px-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Digite sua mensagem..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                disabled={isLoading}
              />
              <button
                className="px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 disabled:opacity-50"
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
