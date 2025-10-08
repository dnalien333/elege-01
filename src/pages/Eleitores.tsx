import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Sidebar from "@/components/layout/Sidebar";
import FilterSidebar from "@/components/eleitores/FilterSidebar";
import VoterTable from "@/components/eleitores/VoterTable";
import VoterModal from "@/components/eleitores/VoterModal";

const Eleitores = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [editingVoter, setEditingVoter] = useState<any>(null);
  const [currentCampaignId, setCurrentCampaignId] = useState<string>("");
  const [currentUserId, setCurrentUserId] = useState<string>("");

  useEffect(() => {
    const initializeData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }

      setCurrentUserId(session.user.id);

      // Get first campaign for the user
      const { data: campaigns } = await supabase
        .from("campaigns")
        .select("id")
        .eq("owner_id", session.user.id)
        .limit(1);

      if (campaigns && campaigns.length > 0) {
        setCurrentCampaignId(campaigns[0].id);
      }
    };

    initializeData();
  }, [navigate]);

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Eleitores</h1>
            <p className="text-muted-foreground">
              Gerencie e segmente sua base de eleitores
            </p>
          </div>

          <div className="flex gap-6">
            <div className="w-72 shrink-0">
              <FilterSidebar
                filters={filters}
                setFilters={setFilters}
                currentCampaignId={currentCampaignId}
              />
            </div>
            <div className="flex-1">
              <VoterTable
                filters={filters}
                page={page}
                onEdit={(v) => {
                  setEditingVoter(v);
                  setOpenModal(true);
                }}
                currentCampaignId={currentCampaignId}
              />
            </div>
          </div>
        </div>
      </main>

      {openModal && (
        <VoterModal
          voter={editingVoter}
          onClose={() => {
            setOpenModal(false);
            setEditingVoter(null);
          }}
          currentCampaignId={currentCampaignId}
          currentUserId={currentUserId}
        />
      )}
    </div>
  );
};

export default Eleitores;
