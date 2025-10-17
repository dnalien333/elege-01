import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { MessageCircle, Send, Clock, Users, BarChart3, CheckCheck } from "lucide-react";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import Sidebar from "@/components/layout/Sidebar";
import { supabase } from "@/integrations/supabase/client";

interface Voter {
  id: number;
  name: string;
  city: string;
  state: string;
  segment: string;
  phone: string;
}

interface Segment {
  id: string;
  name: string;
  count: number;
  greeting: string;
}

const mockVoters: Voter[] = [
  { id: 1, name: "João Silva", city: "São Paulo", state: "SP", segment: "Apoiadores", phone: "11999999001" },
  { id: 2, name: "Maria Santos", city: "Rio de Janeiro", state: "RJ", segment: "Indecisos", phone: "21999999002" },
  { id: 3, name: "Pedro Oliveira", city: "Belo Horizonte", state: "MG", segment: "Voluntários", phone: "31999999003" },
  { id: 4, name: "Ana Costa", city: "Salvador", state: "BA", segment: "Apoiadores", phone: "71999999004" },
  { id: 5, name: "Carlos Souza", city: "Brasília", state: "DF", segment: "Indecisos", phone: "61999999005" },
  { id: 6, name: "Julia Ferreira", city: "Curitiba", state: "PR", segment: "Voluntários", phone: "41999999006" },
  { id: 7, name: "Roberto Lima", city: "Recife", state: "PE", segment: "Apoiadores", phone: "81999999007" },
  { id: 8, name: "Fernanda Alves", city: "Porto Alegre", state: "RS", segment: "Indecisos", phone: "51999999008" },
  { id: 9, name: "Lucas Martins", city: "Fortaleza", state: "CE", segment: "Voluntários", phone: "85999999009" },
  { id: 10, name: "Patricia Rocha", city: "Manaus", state: "AM", segment: "Apoiadores", phone: "92999999010" },
];

const mockSegments: Segment[] = [
  { id: "apoiadores", name: "Apoiadores", count: 50, greeting: "Vamos vencer juntos! 🎉" },
  { id: "indecisos", name: "Indecisos", count: 30, greeting: "Tire suas dúvidas sobre nossa campanha" },
  { id: "voluntarios", name: "Voluntários", count: 20, greeting: "Obrigado por fazer parte da equipe! 💪" },
];

const Comunicacao = () => {
  const navigate = useNavigate();
  const [isMounted, setIsMounted] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState<Segment | null>(null);
  const [messageTemplate, setMessageTemplate] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [previewMessages, setPreviewMessages] = useState<string[]>([]);

  useEffect(() => {
    setIsMounted(true);
    
    // Check authentication
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      }
    });
  }, [navigate]);

  useEffect(() => {
    if (selectedSegment && messageTemplate) {
      generatePreview();
    }
  }, [messageTemplate, selectedSegment]);

  const generatePreview = () => {
    const segmentVoters = mockVoters.filter(v => 
      v.segment.toLowerCase() === selectedSegment?.name.toLowerCase()
    ).slice(0, 3);

    const previews = segmentVoters.map(voter => {
      return messageTemplate
        .replace(/\[Nome\]/g, voter.name)
        .replace(/\[Cidade\]/g, voter.city)
        .replace(/\[Estado\]/g, voter.state)
        .replace(/\[Partido\]/g, "Nossa Campanha");
    });

    setPreviewMessages(previews);
  };

  const insertMergeTag = (tag: string) => {
    setMessageTemplate(prev => prev + `[${tag}]`);
  };

  const handleSendMessage = async () => {
    if (!selectedSegment) {
      toast.error("Por favor, selecione um segmento");
      return;
    }
    if (!messageTemplate.trim()) {
      toast.error("Digite uma mensagem para enviar");
      return;
    }

    setIsSending(true);
    
    // Simulate sending delay
    setTimeout(() => {
      setIsSending(false);
      toast.success(`Mensagem enviada para ${selectedSegment.count} eleitores via WhatsApp! ✅`);
      setMessageTemplate("");
      setPreviewMessages([]);
    }, 2000);
  };

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <main className="flex-1 p-8 w-full">
        <div className="max-w-[1600px] mx-auto w-full space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Comunicações Automatizadas
            </h1>
            <p className="text-muted-foreground">
              Envie mensagens personalizadas via WhatsApp para seus segmentos
            </p>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Section - Message Composer */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Selecionar Segmento
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Select
                    onValueChange={(value) => {
                      const segment = mockSegments.find(s => s.id === value);
                      setSelectedSegment(segment || null);
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="-- Escolha um segmento --" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockSegments.map((segment) => (
                        <SelectItem key={segment.id} value={segment.id}>
                          {segment.name} ({segment.count} eleitores)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedSegment && (
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Esta mensagem será enviada para {selectedSegment.count} eleitores
                    </p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    Modelo de Mensagem
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => insertMergeTag("Nome")}
                    >
                      [Nome]
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => insertMergeTag("Cidade")}
                    >
                      [Cidade]
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => insertMergeTag("Estado")}
                    >
                      [Estado]
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => insertMergeTag("Partido")}
                    >
                      [Partido]
                    </Button>
                  </div>

                  <Textarea
                    value={messageTemplate}
                    onChange={(e) => setMessageTemplate(e.target.value)}
                    placeholder="Olá [Nome], junte-se à campanha em [Cidade]!"
                    rows={12}
                    maxLength={500}
                    disabled={isSending}
                  />
                  
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>{messageTemplate.length}/500 caracteres</span>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      onClick={handleSendMessage}
                      disabled={!selectedSegment || !messageTemplate.trim() || isSending}
                      className="bg-[#25D366] hover:bg-[#128C7E] text-white"
                    >
                      {isSending ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Enviar WhatsApp
                        </>
                      )}
                    </Button>
                    <Button variant="outline" disabled={isSending}>
                      <Clock className="w-4 h-4 mr-2" />
                      Agendar Envio
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Section - WhatsApp Preview & Stats */}
            <div className="lg:col-span-1 space-y-6">
              {/* Stats Card */}
              <Card className="bg-gradient-to-br from-[#25D366]/10 to-[#128C7E]/10 border-[#25D366]/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-[#128C7E]">
                    <BarChart3 className="w-5 h-5" />
                    Estatísticas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Mensagens Hoje</span>
                    <span className="text-2xl font-bold text-foreground">120</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Taxa de Resposta</span>
                    <span className="text-2xl font-bold text-[#25D366]">85%</span>
                  </div>
                </CardContent>
              </Card>

              {/* WhatsApp Preview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-[#25D366]" />
                    Preview WhatsApp
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-[#e5ddd5] rounded-lg p-4 min-h-[400px] relative" style={{
                    backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxyZWN0IHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsbD0iI2U1ZGRkNSIvPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9IiNkNWNkYzUiIHN0cm9rZS13aWR0aD0iMC41Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')"
                  }}>
                    {/* Header */}
                    <div className="bg-[#128C7E] text-white p-3 -m-4 mb-4 rounded-t-lg flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-semibold">
                          {selectedSegment?.name || "Selecione um segmento"}
                        </div>
                        <div className="text-xs text-white/80">online</div>
                      </div>
                    </div>

                    {/* Messages */}
                    <div className="space-y-3 pt-4">
                      {previewMessages.length > 0 ? (
                        previewMessages.map((msg, idx) => (
                          <div key={idx} className="flex justify-end">
                            <div className="bg-[#dcf8c6] rounded-lg p-3 max-w-[80%] shadow-sm">
                              <p className="text-sm text-gray-800 whitespace-pre-wrap">{msg}</p>
                              <div className="flex items-center justify-end gap-1 mt-1">
                                <span className="text-xs text-gray-600">
                                  {new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                                </span>
                                <CheckCheck className="w-4 h-4 text-blue-500" />
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center text-muted-foreground py-12">
                          <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-30" />
                          <p className="text-sm">Digite uma mensagem para ver o preview</p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* WhatsApp Floating Widget */}
      {isMounted && (
        <FloatingWhatsApp
          phoneNumber="5511999999999"
          accountName="Electoral AI Platform"
          statusMessage="Online"
          chatMessage={selectedSegment?.greeting || "Olá! Como posso ajudar com sua campanha?"}
          placeholder="Digite sua mensagem..."
          avatar="/placeholder.svg"
          allowClickAway
          allowEsc
        />
      )}
    </div>
  );
};

export default Comunicacao;
