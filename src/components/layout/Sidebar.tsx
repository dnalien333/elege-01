import { NavLink, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  Filter, 
  MessageSquare, 
  Bot, 
  Map, 
  Flag,
  UserCog,
  Settings,
  LogOut,
  Vote
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Logout realizado com sucesso!");
      navigate("/auth");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      toast.error("Erro ao fazer logout");
    }
  };

  const navItems = [
    { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/campanhas", icon: Flag, label: "Campanhas" },
    { to: "/cadastro", icon: Users, label: "Cadastros" },
    { to: "/segmentos", icon: Filter, label: "Segmentos" },
    { to: "/comunicacao", icon: MessageSquare, label: "Comunicação" },
    { to: "/assistente", icon: Bot, label: "Assistente IA" },
    { to: "/mapa", icon: Map, label: "Mapa Eleitoral" },
    { to: "/colaboradores", icon: UserCog, label: "Colaboradores" },
    { to: "/configuracoes", icon: Settings, label: "Configurações" },
  ];

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="bg-accent rounded-lg p-2">
            <Vote className="h-6 w-6 text-accent-foreground" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-sidebar-foreground">
              Plataforma
            </h2>
            <p className="text-xs text-sidebar-foreground/80">
              Eleitoral 2026
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                "text-sidebar-foreground hover:bg-sidebar-accent",
                isActive && "bg-sidebar-accent font-medium"
              )
            }
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <Button
          variant="ghost"
          className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5 mr-3" />
          Sair
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
