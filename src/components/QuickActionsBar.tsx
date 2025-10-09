import { useState } from 'react';
import { Plus, ChevronDown, Users, UserPlus, FileDown, FileUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface QuickActionsBarProps {
  openAddVoterModal?: () => void;
  openAddColaboradorModal?: () => void;
}

export const QuickActionsBar = ({ openAddVoterModal, openAddColaboradorModal }: QuickActionsBarProps) => {
  const [showAddMenu, setShowAddMenu] = useState(false);
  const navigate = useNavigate();
  
  return (
    <div className="sticky top-0 z-10 bg-background border-b shadow-sm">
      <div className="px-6 py-3 flex items-center gap-4">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase">Ações Rápidas</h2>
        <div className="relative">
          <button
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
            onClick={() => setShowAddMenu(!showAddMenu)}
          >
            <Plus className="w-4 h-4" /> Novo Cadastro <ChevronDown className="w-4 h-4" />
          </button>
          {showAddMenu && (
            <div className="absolute top-full left-0 mt-1 w-48 bg-background border rounded-lg shadow-lg">
              <button 
                className="w-full px-4 py-2 text-left hover:bg-muted flex items-center gap-2" 
                onClick={() => { 
                  if (openAddVoterModal) openAddVoterModal(); 
                  setShowAddMenu(false);
                }}
              >
                <Users className="w-4 h-4" /> Novo Eleitor
              </button>
              <button 
                className="w-full px-4 py-2 text-left hover:bg-muted flex items-center gap-2" 
                onClick={() => { 
                  if (openAddColaboradorModal) openAddColaboradorModal(); 
                  setShowAddMenu(false);
                }}
              >
                <UserPlus className="w-4 h-4" /> Novo Colaborador
              </button>
            </div>
          )}
        </div>
        <button 
          className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-muted" 
          onClick={() => navigate('/cadastros')}
        >
          <FileDown className="w-4 h-4" /> Importar CSV
        </button>
        <button 
          className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-muted" 
          onClick={() => navigate('/cadastros')}
        >
          <FileUp className="w-4 h-4" /> Exportar CSV
        </button>
      </div>
    </div>
  );
};
