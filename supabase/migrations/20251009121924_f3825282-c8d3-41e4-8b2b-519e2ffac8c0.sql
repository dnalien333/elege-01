-- 1) teams
CREATE TABLE IF NOT EXISTS teams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id uuid REFERENCES campaigns(id) ON DELETE CASCADE,
  name text NOT NULL,
  leader_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  created_by uuid REFERENCES profiles(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
CREATE INDEX idx_teams_campaign ON teams(campaign_id);
CREATE INDEX idx_teams_leader ON teams(leader_id);
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view teams in their campaigns"
  ON teams FOR SELECT
  USING (campaign_id IN (SELECT id FROM campaigns WHERE owner_id = auth.uid()));
CREATE POLICY "Users can manage teams in their campaigns"
  ON teams FOR ALL
  USING (campaign_id IN (SELECT id FROM campaigns WHERE owner_id = auth.uid()));

-- 2) team_members
CREATE TABLE IF NOT EXISTS team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id uuid REFERENCES teams(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  role text DEFAULT 'member' CHECK (role IN ('leader', 'member')),
  created_at timestamptz DEFAULT now(),
  UNIQUE(team_id, user_id)
);
CREATE INDEX idx_team_members_team ON team_members(team_id);
CREATE INDEX idx_team_members_user ON team_members(user_id);
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view team members in their campaigns"
  ON team_members FOR SELECT
  USING (
    team_id IN (
      SELECT t.id FROM teams t
      JOIN campaigns c ON t.campaign_id = c.id
      WHERE c.owner_id = auth.uid()
    )
  );

-- 3) team_actions
CREATE TABLE IF NOT EXISTS team_actions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id uuid REFERENCES teams(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  action_type text NOT NULL CHECK (action_type IN ('canvassing', 'event', 'meeting', 'phonebank', 'other')),
  location_name text,
  latitude decimal(10, 8),
  longitude decimal(11, 8),
  scheduled_date timestamptz,
  status text DEFAULT 'planned' CHECK (status IN ('planned', 'in_progress', 'completed', 'cancelled')),
  created_by uuid REFERENCES profiles(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
CREATE INDEX idx_team_actions_team ON team_actions(team_id);
CREATE INDEX idx_team_actions_location ON team_actions(latitude, longitude);
ALTER TABLE team_actions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view team actions in their campaigns"
  ON team_actions FOR SELECT
  USING (
    team_id IN (
      SELECT t.id FROM teams t
      JOIN campaigns c ON t.campaign_id = c.id
      WHERE c.owner_id = auth.uid()
    )
  );

-- 4) chat_history
CREATE TABLE IF NOT EXISTS chat_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  campaign_id uuid REFERENCES campaigns(id) ON DELETE CASCADE,
  message text NOT NULL,
  role text NOT NULL CHECK (role IN ('user', 'assistant')),
  created_at timestamptz DEFAULT now()
);
CREATE INDEX idx_chat_history_user ON chat_history(user_id, created_at DESC);
ALTER TABLE chat_history ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own chat history"
  ON chat_history FOR SELECT
  USING (user_id = auth.uid());
CREATE POLICY "Users can create their own chat history"
  ON chat_history FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- 5) update voters: remove lat/lng
ALTER TABLE voters DROP COLUMN IF EXISTS latitude;
ALTER TABLE voters DROP COLUMN IF EXISTS longitude;

-- 6) update profiles for colaboradores
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS phone text,
ADD COLUMN IF NOT EXISTS city text,
ADD COLUMN IF NOT EXISTS state text,
ADD COLUMN IF NOT EXISTS tags text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS notes text;
CREATE INDEX IF NOT EXISTS idx_profiles_tags ON profiles USING GIN(tags);