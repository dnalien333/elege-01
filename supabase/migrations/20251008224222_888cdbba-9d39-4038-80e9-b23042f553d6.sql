-- 1) Extend voters table with new fields
ALTER TABLE voters 
ADD COLUMN IF NOT EXISTS tags text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS latitude decimal(10, 8),
ADD COLUMN IF NOT EXISTS longitude decimal(11, 8),
ADD COLUMN IF NOT EXISTS assigned_to uuid REFERENCES profiles(id),
ADD COLUMN IF NOT EXISTS last_contact_date timestamptz,
ADD COLUMN IF NOT EXISTS notes text;

CREATE INDEX IF NOT EXISTS idx_voters_tags ON voters USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_voters_city ON voters(city);
CREATE INDEX IF NOT EXISTS idx_voters_state ON voters(state);

-- 2) Create activities table for voter interaction logging
CREATE TABLE IF NOT EXISTS activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  voter_id uuid REFERENCES voters(id) ON DELETE CASCADE,
  campaign_id uuid REFERENCES campaigns(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  activity_type text NOT NULL CHECK (activity_type IN ('call', 'visit', 'event', 'note', 'donation')),
  title text NOT NULL,
  description text,
  activity_date timestamptz NOT NULL DEFAULT now(),
  status text DEFAULT 'completed' CHECK (status IN ('planned', 'completed', 'cancelled')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_activities_voter ON activities(voter_id);
CREATE INDEX IF NOT EXISTS idx_activities_campaign ON activities(campaign_id);
CREATE INDEX IF NOT EXISTS idx_activities_date ON activities(activity_date DESC);
CREATE INDEX IF NOT EXISTS idx_activities_user ON activities(user_id);

ALTER TABLE activities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view activities in their campaigns"
  ON activities FOR SELECT
  USING (
    campaign_id IN (
      SELECT id FROM campaigns WHERE owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can create activities in their campaigns"
  ON activities FOR INSERT
  WITH CHECK (
    campaign_id IN (
      SELECT id FROM campaigns WHERE owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can update activities in their campaigns"
  ON activities FOR UPDATE
  USING (
    campaign_id IN (
      SELECT id FROM campaigns WHERE owner_id = auth.uid()
    )
  );

-- 3) Create saved_filters table for segment management
CREATE TABLE IF NOT EXISTS saved_filters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  campaign_id uuid REFERENCES campaigns(id) ON DELETE CASCADE,
  name text NOT NULL,
  filters jsonb NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_saved_filters_user ON saved_filters(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_filters_campaign ON saved_filters(campaign_id);

ALTER TABLE saved_filters ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own saved filters"
  ON saved_filters FOR ALL
  USING (user_id = auth.uid());

-- 4) Add trigger for activities updated_at
CREATE TRIGGER update_activities_updated_at
  BEFORE UPDATE ON activities
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER update_saved_filters_updated_at
  BEFORE UPDATE ON saved_filters
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();