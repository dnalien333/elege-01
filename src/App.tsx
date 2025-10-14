import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Cadastro from "./pages/Cadastro";
import Comunicacao from "./pages/Comunicacao";
import Assistente from "./pages/Assistente";
import AssistenteIA from "./pages/AssistenteIA";
import Colaboradores from "./pages/Colaboradores";
import GestaoEquipe from "./pages/GestaoEquipe";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cadastros" element={<Cadastro />} />
          <Route path="/comunicacao" element={<Comunicacao />} />
          <Route path="/assistente" element={<AssistenteIA />} />
          <Route path="/gestao-equipe" element={<GestaoEquipe />} />
          <Route path="/colaboradores" element={<Colaboradores />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
