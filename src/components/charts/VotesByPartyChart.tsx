import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface PartyVote {
  party: string;
  total_votes: number;
  coalition_side: string;
}

interface VotesByPartyChartProps {
  data: PartyVote[];
}

const PARTY_COLORS: Record<string, string> = {
  'PT': '#e11d48',
  'PSOL': '#f97316',
  'PDT': '#eab308',
  'PL': '#3b82f6',
  'REPUBLICANOS': '#6366f1',
  'UB': '#8b5cf6',
  'PSDB': '#06b6d4',
  'MDB': '#14b8a6',
};

export function VotesByPartyChart({ data }: VotesByPartyChartProps) {
  const chartData = data.map((item, index) => ({
    name: item.party,
    value: item.total_votes,
    fill: PARTY_COLORS[item.party] || `hsl(${index * 40}, 70%, 50%)`
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribuição de Votos por Partido</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={120}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
