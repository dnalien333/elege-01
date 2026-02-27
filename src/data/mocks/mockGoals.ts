export interface Goal {
  id: number;
  title: string;
  category: string;
  current: number;
  target: number;
  deadline: string;
  status: "completed" | "on_track" | "delayed";
  team: string | null;
}

export const mockGoals: Goal[] = [
  {
    id: 1,
    title: "Cadastrar 100 novos eleitores",
    category: "Cadastros",
    current: 47,
    target: 100,
    deadline: "2025-11-30",
    status: "on_track",
    team: "Equipe Centro",
  },
  {
    id: 2,
    title: "Realizar 50 visitas domiciliares",
    category: "Engajamento",
    current: 32,
    target: 50,
    deadline: "2025-10-25",
    status: "on_track",
    team: "Equipe Zona Norte",
  },
  {
    id: 3,
    title: "Organizar 3 eventos comunitários",
    category: "Eventos",
    current: 3,
    target: 3,
    deadline: "2025-10-15",
    status: "completed",
    team: "Equipe Digital",
  },
  {
    id: 4,
    title: "Arrecadar R$ 10.000",
    category: "Financeiro",
    current: 6500,
    target: 10000,
    deadline: "2025-11-15",
    status: "on_track",
    team: null,
  },
  {
    id: 5,
    title: "Conquistar 200 apoiadores",
    category: "Cadastros",
    current: 156,
    target: 200,
    deadline: "2025-11-05",
    status: "on_track",
    team: "Equipe Zona Sul",
  },
];

export function getGoalStats(goals: Goal[]) {
  const completed = goals.filter((g) => g.status === "completed").length;
  const total = goals.length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  return { completed, total, percentage };
}
