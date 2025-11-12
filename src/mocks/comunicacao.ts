export interface User {
  id: string;
  name: string;
  role: "equipe" | "colaborador";
  avatarUrl: string;
  phone: string;
  email: string;
  online?: boolean;
}

export interface Meeting {
  id: string;
  title: string;
  description: string;
  start: Date;
  end: Date;
  attendees: string[]; // user IDs
  location?: string;
  notes?: string;
  color?: string;
}

export interface Thread {
  id: string;
  participantIds: string[];
  lastMessageAt: Date;
  unreadCount: number;
}

export interface Message {
  id: string;
  threadId: string;
  senderId: string;
  text: string;
  createdAt: Date;
  status: "sent" | "delivered" | "read";
}

// Mock users
export const mockUsers: User[] = [
  {
    id: "user-1",
    name: "Ana Silva",
    role: "equipe",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana",
    phone: "+55 11 98765-4321",
    email: "ana.silva@campaign.com",
    online: true,
  },
  {
    id: "user-2",
    name: "Carlos Mendes",
    role: "equipe",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
    phone: "+55 11 98765-4322",
    email: "carlos.mendes@campaign.com",
    online: false,
  },
  {
    id: "user-3",
    name: "Beatriz Costa",
    role: "equipe",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Beatriz",
    phone: "+55 11 98765-4323",
    email: "beatriz.costa@campaign.com",
    online: true,
  },
  {
    id: "user-4",
    name: "João Santos",
    role: "colaborador",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Joao",
    phone: "+55 11 97654-3210",
    email: "joao.santos@email.com",
    online: true,
  },
  {
    id: "user-5",
    name: "Maria Oliveira",
    role: "colaborador",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
    phone: "+55 11 97654-3211",
    email: "maria.oliveira@email.com",
    online: false,
  },
  {
    id: "user-6",
    name: "Pedro Alves",
    role: "colaborador",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro",
    phone: "+55 11 97654-3212",
    email: "pedro.alves@email.com",
    online: true,
  },
  {
    id: "user-7",
    name: "Lucia Ferreira",
    role: "colaborador",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lucia",
    phone: "+55 11 97654-3213",
    email: "lucia.ferreira@email.com",
    online: false,
  },
  {
    id: "user-8",
    name: "Ricardo Lima",
    role: "colaborador",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ricardo",
    phone: "+55 11 97654-3214",
    email: "ricardo.lima@email.com",
    online: true,
  },
];

// Mock meetings
export const mockMeetings: Meeting[] = [
  {
    id: "meeting-1",
    title: "Reunião de Planejamento Semanal",
    description: "Revisão das metas da semana e distribuição de tarefas",
    start: new Date(2025, 0, 15, 9, 0),
    end: new Date(2025, 0, 15, 10, 0),
    attendees: ["user-1", "user-2", "user-3"],
    location: "Sala de Reuniões",
    notes: "Trazer relatório de atividades",
    color: "#22C55E",
  },
  {
    id: "meeting-2",
    title: "Treinamento de Colaboradores",
    description: "Sessão de capacitação sobre novas estratégias",
    start: new Date(2025, 0, 16, 14, 0),
    end: new Date(2025, 0, 16, 16, 0),
    attendees: ["user-1", "user-4", "user-5", "user-6", "user-7"],
    location: "https://meet.google.com/abc-defg-hij",
    notes: "Material será enviado por email",
    color: "#3B82F6",
  },
  {
    id: "meeting-3",
    title: "Alinhamento com João Santos",
    description: "Discussão sobre cadastros da região norte",
    start: new Date(2025, 0, 17, 10, 30),
    end: new Date(2025, 0, 17, 11, 0),
    attendees: ["user-1", "user-4"],
    location: "Cafeteria Central",
    color: "#8B5CF6",
  },
  {
    id: "meeting-4",
    title: "Revisão de Metas Mensais",
    description: "Análise do progresso e ajustes necessários",
    start: new Date(2025, 0, 20, 15, 0),
    end: new Date(2025, 0, 20, 16, 30),
    attendees: ["user-1", "user-2", "user-3"],
    location: "Escritório Principal",
    notes: "Preparar apresentação com dados",
    color: "#F59E0B",
  },
  {
    id: "meeting-5",
    title: "Encontro com Maria e Pedro",
    description: "Coordenação de atividades da zona sul",
    start: new Date(2025, 0, 18, 11, 0),
    end: new Date(2025, 0, 18, 12, 0),
    attendees: ["user-2", "user-5", "user-6"],
    location: "https://zoom.us/j/123456789",
    color: "#EC4899",
  },
  {
    id: "meeting-6",
    title: "Coffee Meeting - Lucia",
    description: "Conversa informal sobre engajamento",
    start: new Date(2025, 0, 19, 9, 30),
    end: new Date(2025, 0, 19, 10, 0),
    attendees: ["user-3", "user-7"],
    location: "Café da Esquina",
    color: "#06B6D4",
  },
  {
    id: "meeting-7",
    title: "Estratégia de Comunicação",
    description: "Planejamento de campanhas de comunicação",
    start: new Date(2025, 0, 22, 13, 0),
    end: new Date(2025, 0, 22, 14, 30),
    attendees: ["user-1", "user-2", "user-3", "user-8"],
    location: "Sala de Reuniões",
    notes: "Ricardo trará ideias de redes sociais",
    color: "#22C55E",
  },
];

// Mock threads
export const mockThreads: Thread[] = [
  {
    id: "thread-1",
    participantIds: ["user-1", "user-4"],
    lastMessageAt: new Date(2025, 0, 12, 16, 45),
    unreadCount: 2,
  },
  {
    id: "thread-2",
    participantIds: ["user-1", "user-5"],
    lastMessageAt: new Date(2025, 0, 12, 14, 20),
    unreadCount: 0,
  },
  {
    id: "thread-3",
    participantIds: ["user-2", "user-6"],
    lastMessageAt: new Date(2025, 0, 12, 11, 30),
    unreadCount: 1,
  },
  {
    id: "thread-4",
    participantIds: ["user-1", "user-2", "user-3"],
    lastMessageAt: new Date(2025, 0, 12, 9, 15),
    unreadCount: 0,
  },
  {
    id: "thread-5",
    participantIds: ["user-3", "user-7"],
    lastMessageAt: new Date(2025, 0, 11, 18, 0),
    unreadCount: 0,
  },
  {
    id: "thread-6",
    participantIds: ["user-1", "user-8"],
    lastMessageAt: new Date(2025, 0, 11, 15, 30),
    unreadCount: 3,
  },
];

// Mock messages
export const mockMessages: Message[] = [
  // Thread 1 (user-1, user-4)
  {
    id: "msg-1",
    threadId: "thread-1",
    senderId: "user-4",
    text: "Oi Ana! Tudo bem? Gostaria de confirmar a reunião de amanhã.",
    createdAt: new Date(2025, 0, 12, 16, 40),
    status: "read",
  },
  {
    id: "msg-2",
    threadId: "thread-1",
    senderId: "user-1",
    text: "Oi João! Sim, confirmado para amanhã às 10h30. Vai ser na cafeteria central.",
    createdAt: new Date(2025, 0, 12, 16, 42),
    status: "read",
  },
  {
    id: "msg-3",
    threadId: "thread-1",
    senderId: "user-4",
    text: "Perfeito! Você precisa que eu leve algum material específico?",
    createdAt: new Date(2025, 0, 12, 16, 45),
    status: "delivered",
  },
  {
    id: "msg-4",
    threadId: "thread-1",
    senderId: "user-4",
    text: "Estou com os relatórios dos cadastros da região norte aqui.",
    createdAt: new Date(2025, 0, 12, 16, 45),
    status: "delivered",
  },

  // Thread 2 (user-1, user-5)
  {
    id: "msg-5",
    threadId: "thread-2",
    senderId: "user-1",
    text: "Maria, como estão os cadastros da sua área?",
    createdAt: new Date(2025, 0, 12, 14, 10),
    status: "read",
  },
  {
    id: "msg-6",
    threadId: "thread-2",
    senderId: "user-5",
    text: "Oi Ana! Estamos com bom progresso. Já conseguimos 47 novos cadastros essa semana.",
    createdAt: new Date(2025, 0, 12, 14, 15),
    status: "read",
  },
  {
    id: "msg-7",
    threadId: "thread-2",
    senderId: "user-1",
    text: "Excelente! Continue assim. Se precisar de ajuda, só avisar.",
    createdAt: new Date(2025, 0, 12, 14, 20),
    status: "read",
  },

  // Thread 3 (user-2, user-6)
  {
    id: "msg-8",
    threadId: "thread-3",
    senderId: "user-6",
    text: "Carlos, vi que você marcou uma reunião. Podemos antecipar para terça?",
    createdAt: new Date(2025, 0, 12, 11, 25),
    status: "read",
  },
  {
    id: "msg-9",
    threadId: "thread-3",
    senderId: "user-2",
    text: "Oi Pedro! Deixa eu verificar minha agenda e te confirmo em alguns minutos.",
    createdAt: new Date(2025, 0, 12, 11, 30),
    status: "sent",
  },

  // Thread 4 (user-1, user-2, user-3) - Grupo Equipe
  {
    id: "msg-10",
    threadId: "thread-4",
    senderId: "user-1",
    text: "Pessoal, não esqueçam da reunião de planejamento semanal amanhã às 9h!",
    createdAt: new Date(2025, 0, 12, 9, 10),
    status: "read",
  },
  {
    id: "msg-11",
    threadId: "thread-4",
    senderId: "user-2",
    text: "Confirmado! Vou preparar o relatório de atividades.",
    createdAt: new Date(2025, 0, 12, 9, 12),
    status: "read",
  },
  {
    id: "msg-12",
    threadId: "thread-4",
    senderId: "user-3",
    text: "Eu também estarei lá. Vou trazer as atualizações do treinamento.",
    createdAt: new Date(2025, 0, 12, 9, 15),
    status: "read",
  },

  // Thread 5 (user-3, user-7)
  {
    id: "msg-13",
    threadId: "thread-5",
    senderId: "user-3",
    text: "Lucia, obrigada pelo feedback sobre o último treinamento!",
    createdAt: new Date(2025, 0, 11, 17, 50),
    status: "read",
  },
  {
    id: "msg-14",
    threadId: "thread-5",
    senderId: "user-7",
    text: "De nada, Beatriz! Foi muito produtivo. Estou aplicando tudo que aprendi.",
    createdAt: new Date(2025, 0, 11, 18, 0),
    status: "read",
  },

  // Thread 6 (user-1, user-8)
  {
    id: "msg-15",
    threadId: "thread-6",
    senderId: "user-8",
    text: "Ana, tenho algumas ideias para a estratégia de redes sociais.",
    createdAt: new Date(2025, 0, 11, 15, 20),
    status: "read",
  },
  {
    id: "msg-16",
    threadId: "thread-6",
    senderId: "user-8",
    text: "Podemos conversar sobre isso na próxima reunião?",
    createdAt: new Date(2025, 0, 11, 15, 25),
    status: "read",
  },
  {
    id: "msg-17",
    threadId: "thread-6",
    senderId: "user-8",
    text: "Acho que conseguimos aumentar bastante o engajamento com algumas mudanças.",
    createdAt: new Date(2025, 0, 11, 15, 30),
    status: "delivered",
  },
];

// Message templates
export const messageTemplates = [
  {
    id: "template-1",
    name: "Confirmação de Reunião",
    text: "Olá! Gostaria de confirmar nossa reunião para [data] às [horário]. Confirma?",
  },
  {
    id: "template-2",
    name: "Seguinte Reunião",
    text: "Seguindo nosso último encontro, gostaria de agendar uma nova conversa para discutir os próximos passos.",
  },
  {
    id: "template-3",
    name: "Lembrete de Evento",
    text: "Lembrete: Não esqueça do nosso evento/reunião hoje às [horário]. Nos vemos lá!",
  },
  {
    id: "template-4",
    name: "Solicitação de Feedback",
    text: "Olá! Você poderia me dar um feedback sobre [assunto]? Sua opinião é muito importante para nós.",
  },
  {
    id: "template-5",
    name: "Atualização de Status",
    text: "Olá! Passando para atualizar você sobre o andamento de [projeto/tarefa]. Tudo está progredindo conforme o planejado.",
  },
];
