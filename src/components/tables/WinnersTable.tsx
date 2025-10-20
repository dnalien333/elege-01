import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle } from "lucide-react";

interface Winner {
  candidate_name: string;
  party: string;
  state: string;
  total_votes: number;
  elected: boolean;
  substitute: boolean;
  coalition_side: string;
}

interface WinnersTableProps {
  data: Winner[];
}

const getCoalitionBadgeColor = (side: string) => {
  switch (side) {
    case 'left': return '#ef4444';
    case 'right': return '#3b82f6';
    case 'center': return '#9ca3af';
    default: return '#6b7280';
  }
};

export function WinnersTable({ data }: WinnersTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Eleitos e Suplentes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Candidato</TableHead>
                <TableHead>Partido</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Votos</TableHead>
                <TableHead className="text-center">Eleito</TableHead>
                <TableHead className="text-center">Suplente</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground">
                    Nenhum resultado encontrado
                  </TableCell>
                </TableRow>
              ) : (
                data.map((winner, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{winner.candidate_name}</TableCell>
                    <TableCell>
                      <Badge style={{ backgroundColor: getCoalitionBadgeColor(winner.coalition_side), color: 'white' }}>
                        {winner.party}
                      </Badge>
                    </TableCell>
                    <TableCell>{winner.state}</TableCell>
                    <TableCell className="text-right">{winner.total_votes.toLocaleString()}</TableCell>
                    <TableCell className="text-center">
                      {winner.elected ? (
                        <CheckCircle2 className="h-5 w-5 text-green-600 mx-auto" />
                      ) : (
                        <XCircle className="h-5 w-5 text-gray-400 mx-auto" />
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {winner.substitute ? (
                        <CheckCircle2 className="h-5 w-5 text-yellow-600 mx-auto" />
                      ) : (
                        <XCircle className="h-5 w-5 text-gray-400 mx-auto" />
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
