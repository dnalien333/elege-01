import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Campanhas from "./pages/Campanhas";
import Cadastro from "./pages/Cadastro";
import Segmentos from "./pages/Segmentos";
import Comunicacao from "./pages/Comunicacao";
import Assistente from "./pages/Assistente";
import Mapa from "./pages/Mapa";
import Colaboradores from "./pages/Colaboradores";
import Configuracoes from "./pages/Configuracoes";
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
          <Route path="/campanhas" element={<Campanhas />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/segmentos" element={<Segmentos />} />
          <Route path="/comunicacao" element={<Comunicacao />} />
          <Route path="/assistente" element={<Assistente />} />
          <Route path="/mapa" element={<Mapa />} />
          <Route path="/colaboradores" element={<Colaboradores />} />
          <Route path="/configuracoes" element={<Configuracoes />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
