import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface CandidateVote {
  candidate_name: string;
  party: string;
  total_votes: number;
  coalition_side: string;
}

interface VotesByCandidateChartProps {
  data: CandidateVote[];
}

const getColorByCoalition = (side: string) => {
  switch (side) {
    case 'left': return '#ef4444';
    case 'right': return '#3b82f6';
    case 'center': return '#9ca3af';
    default: return '#6b7280';
  }
};

export function VotesByCandidateChart({ data }: VotesByCandidateChartProps) {
  const chartData = data.slice(0, 10).map(item => ({
    name: `${item.candidate_name} (${item.party})`,
    votos: item.total_votes,
    fill: getColorByCoalition(item.coalition_side)
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top 10 Candidatos por Votos</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={200} />
            <Tooltip />
            <Legend />
            <Bar dataKey="votos" name="Votos" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
