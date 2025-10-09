import { MoreVertical } from 'lucide-react';

interface TeamCardProps {
  team: any;
  onEdit: () => void;
  onAddActions: () => void;
}

const TeamCard = ({ team, onEdit, onAddActions }: TeamCardProps) => {
  const leader = team.members?.find((m: any) => m.role === 'leader')?.user || team.leader;
  const members = team.members?.filter((m: any) => m.role === 'member') || [];

  return (
    <div className="bg-card border rounded-lg p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold">{team.name}</h3>
        <button className="text-muted-foreground hover:text-foreground" onClick={onEdit}>
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-xs text-muted-foreground uppercase mb-2">Líder</p>
          {leader ? (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                {leader.avatar_url ? (
                  <img src={leader.avatar_url} className="w-8 h-8 rounded-full" alt={leader.full_name} />
                ) : (
                  <span className="text-sm font-medium text-primary">{leader.full_name?.charAt(0)}</span>
                )}
              </div>
              <span className="text-sm font-medium">{leader.full_name}</span>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Nenhum líder atribuído</p>
          )}
        </div>

        <div>
          <p className="text-xs text-muted-foreground uppercase mb-2">Colaboradores ({members.length})</p>
          <div className="flex -space-x-2">
            {members.slice(0, 5).map((member: any) => (
              <div 
                key={member.id} 
                className="w-8 h-8 rounded-full bg-muted border-2 border-background flex items-center justify-center" 
                title={member.user.full_name}
              >
                {member.user.avatar_url ? (
                  <img src={member.user.avatar_url} className="w-8 h-8 rounded-full" alt={member.user.full_name} />
                ) : (
                  <span className="text-xs font-medium">{member.user.full_name?.charAt(0)}</span>
                )}
              </div>
            ))}
            {members.length > 5 && (
              <div className="w-8 h-8 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                <span className="text-xs font-medium">+{members.length - 5}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <button 
        className="w-full mt-4 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 font-medium" 
        onClick={onAddActions}
      >
        Novas Ações
      </button>
    </div>
  );
};

export default TeamCard;
