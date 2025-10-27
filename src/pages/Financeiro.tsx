import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Plus, TrendingUp, TrendingDown, DollarSign, AlertCircle, FileText } from "lucide-react";
import { toast } from "sonner";

export default function Financeiro() {
  const navigate = useNavigate();
  const [showNewModal, setShowNewModal] = useState(false);
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
      }
    };
    checkAuth();
  }, [navigate]);

  // Mock financial data
  const mockTransactions = [
    { id: 1, date: "2025-10-20", type: "Receita", category: "Doações", description: "Doação online", value: 500, receipt: true },
    { id: 2, date: "2025-10-18", type: "Despesa", category: "Marketing", description: "Impressão de banners", value: -1200, receipt: true },
    { id: 3, date: "2025-10-15", type: "Receita", category: "Eventos", description: "Rifa beneficente", value: 1000, receipt: false },
    { id: 4, date: "2025-10-12", type: "Despesa", category: "Materiais", description: "Camisetas", value: -300, receipt: true },
    { id: 5, date: "2025-10-10", type: "Despesa", category: "Eventos", description: "Coffee break reunião", value: -800, receipt: true },
    { id: 6, date: "2025-10-08", type: "Receita", category: "Doações", description: "Doação presencial", value: 2000, receipt: true },
    { id: 7, date: "2025-10-05", type: "Despesa", category: "Transporte", description: "Combustível", value: -450, receipt: true },
  ];

  const chartData = [
    { month: "Mai", receitas: 8000, despesas: 5000 },
    { month: "Jun", receitas: 10000, despesas: 6500 },
    { month: "Jul", receitas: 12000, despesas: 7800 },
    { month: "Ago", receitas: 15000, despesas: 9200 },
    { month: "Set", receitas: 18000, despesas: 11000 },
    { month: "Out", receitas: 20000, despesas: 12500 },
  ];

  const totalReceitas = 20000;
  const totalDespesas = 12500;
  const saldo = totalReceitas - totalDespesas;

  const filteredTransactions = mockTransactions.filter(t => {
    if (typeFilter !== "all" && t.type !== typeFilter) return false;
    if (categoryFilter !== "all" && t.category !== categoryFilter) return false;
    return true;
  });

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <main className="flex-1 p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Gestão Financeira</h1>
              <p className="text-muted-foreground">Controle de receitas e despesas</p>
            </div>
            <Dialog open={showNewModal} onOpenChange={setShowNewModal}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Transação
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Nova Transação</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Tipo</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="receita">Receita</SelectItem>
                        <SelectItem value="despesa">Despesa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Categoria</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="doacoes">Doações</SelectItem>
                        <SelectItem value="eventos">Eventos</SelectItem>
                        <SelectItem value="materiais">Materiais</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="transporte">Transporte</SelectItem>
                        <SelectItem value="outros">Outros</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Data</Label>
                    <Input type="date" />
                  </div>
                  <div>
                    <Label>Valor (R$)</Label>
                    <Input type="number" placeholder="0,00" step="0.01" />
                  </div>
                  <div>
                    <Label>Descrição</Label>
                    <Textarea placeholder="Detalhes da transação..." />
                  </div>
                  <div>
                    <Label>Comprovante (opcional)</Label>
                    <Input type="file" accept="image/*,.pdf" />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setShowNewModal(false)}>Cancelar</Button>
                    <Button onClick={() => {
                      toast.success("Transação registrada com sucesso!");
                      setShowNewModal(false);
                    }}>Salvar</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Warning Banner */}
          <Card className="border-yellow-200 bg-yellow-50 dark:bg-yellow-950 dark:border-yellow-800">
            <CardContent className="flex items-center gap-3 p-4">
              <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                Mantenha todos os comprovantes para prestação de contas eleitoral.
              </p>
            </CardContent>
          </Card>

          {/* Summary Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-l-4 border-l-green-500">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Receitas</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">
                  R$ {totalReceitas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-red-500">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Despesas</CardTitle>
                <TrendingDown className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-red-600">
                  R$ {totalDespesas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-500">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Saldo</CardTitle>
                <DollarSign className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">
                  R$ {saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Receitas vs Despesas</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value: number) => `R$ ${value.toLocaleString('pt-BR')}`}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="receitas" stroke="#22C55E" strokeWidth={2} name="Receitas" />
                  <Line type="monotone" dataKey="despesas" stroke="#EF4444" strokeWidth={2} name="Despesas" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Transactions Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Transações</CardTitle>
                <div className="flex gap-2">
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="Receita">Receita</SelectItem>
                      <SelectItem value="Despesa">Despesa</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      <SelectItem value="Doações">Doações</SelectItem>
                      <SelectItem value="Eventos">Eventos</SelectItem>
                      <SelectItem value="Materiais">Materiais</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Transporte">Transporte</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Comprovante</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{new Date(transaction.date).toLocaleDateString('pt-BR')}</TableCell>
                      <TableCell>
                        <Badge className={transaction.type === "Receita" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                          {transaction.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{transaction.category}</TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell className={transaction.type === "Receita" ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                        {transaction.type === "Receita" ? "+" : ""}R$ {Math.abs(transaction.value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </TableCell>
                      <TableCell>
                        {transaction.receipt ? (
                          <FileText className="h-4 w-4 text-green-600" />
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
