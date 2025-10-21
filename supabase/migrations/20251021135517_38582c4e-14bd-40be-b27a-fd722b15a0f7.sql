-- Create enum types for demands
CREATE TYPE demand_status AS ENUM (
  'unassigned',
  'pending',
  'in_progress',
  'awaiting_response',
  'completed',
  'archived'
);

CREATE TYPE demand_priority AS ENUM (
  'low',
  'medium',
  'high',
  'critical'
);

CREATE TYPE demand_urgency AS ENUM (
  'low',
  'medium',
  'high',
  'critical'
);

CREATE TYPE demand_channel AS ENUM (
  'whatsapp',
  'instagram',
  'facebook',
  'phone',
  'email',
  'in_person',
  'website',
  'gabinete'
);

-- Create demands table
CREATE TABLE public.demands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
  voter_id UUID REFERENCES voters(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  action_needed TEXT,
  next_steps TEXT,
  channel demand_channel NOT NULL,
  status demand_status DEFAULT 'unassigned' NOT NULL,
  priority demand_priority DEFAULT 'medium' NOT NULL,
  urgency demand_urgency DEFAULT 'medium' NOT NULL,
  assigned_to UUID REFERENCES profiles(id) ON DELETE SET NULL,
  deadline TIMESTAMP WITH TIME ZONE,
  contact_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  tags TEXT[] DEFAULT '{}',
  attachments JSONB DEFAULT '[]',
  is_public BOOLEAN DEFAULT false,
  created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Create demand_history table for tracking changes
CREATE TABLE public.demand_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  demand_id UUID REFERENCES demands(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  field_changed TEXT,
  old_value TEXT,
  new_value TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create demand_watchers table for notifications
CREATE TABLE public.demand_watchers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  demand_id UUID REFERENCES demands(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(demand_id, user_id)
);

-- Create demand_reminders table
CREATE TABLE public.demand_reminders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  demand_id UUID REFERENCES demands(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  remind_at TIMESTAMP WITH TIME ZONE NOT NULL,
  is_sent BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create demand_comments table
CREATE TABLE public.demand_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  demand_id UUID REFERENCES demands(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  comment TEXT NOT NULL,
  is_internal BOOLEAN DEFAULT false,
  attachments JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX idx_demands_campaign_id ON demands(campaign_id);
CREATE INDEX idx_demands_voter_id ON demands(voter_id);
CREATE INDEX idx_demands_assigned_to ON demands(assigned_to);
CREATE INDEX idx_demands_status ON demands(status);
CREATE INDEX idx_demands_deadline ON demands(deadline);
CREATE INDEX idx_demands_created_at ON demands(created_at);
CREATE INDEX idx_demand_history_demand_id ON demand_history(demand_id);
CREATE INDEX idx_demand_watchers_demand_id ON demand_watchers(demand_id);
CREATE INDEX idx_demand_watchers_user_id ON demand_watchers(user_id);
CREATE INDEX idx_demand_reminders_demand_id ON demand_reminders(demand_id);
CREATE INDEX idx_demand_comments_demand_id ON demand_comments(demand_id);

-- Enable Row Level Security
ALTER TABLE demands ENABLE ROW LEVEL SECURITY;
ALTER TABLE demand_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE demand_watchers ENABLE ROW LEVEL SECURITY;
ALTER TABLE demand_reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE demand_comments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for demands
CREATE POLICY "Users can view demands in their campaigns"
  ON demands FOR SELECT
  USING (
    campaign_id IN (
      SELECT id FROM campaigns WHERE owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can create demands in their campaigns"
  ON demands FOR INSERT
  WITH CHECK (
    campaign_id IN (
      SELECT id FROM campaigns WHERE owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can update demands in their campaigns"
  ON demands FOR UPDATE
  USING (
    campaign_id IN (
      SELECT id FROM campaigns WHERE owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete demands in their campaigns"
  ON demands FOR DELETE
  USING (
    campaign_id IN (
      SELECT id FROM campaigns WHERE owner_id = auth.uid()
    )
  );

-- RLS Policies for demand_history
CREATE POLICY "Users can view history in their campaigns"
  ON demand_history FOR SELECT
  USING (
    demand_id IN (
      SELECT d.id FROM demands d
      JOIN campaigns c ON d.campaign_id = c.id
      WHERE c.owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can create history in their campaigns"
  ON demand_history FOR INSERT
  WITH CHECK (
    demand_id IN (
      SELECT d.id FROM demands d
      JOIN campaigns c ON d.campaign_id = c.id
      WHERE c.owner_id = auth.uid()
    )
  );

-- RLS Policies for demand_watchers
CREATE POLICY "Users can manage watchers in their campaigns"
  ON demand_watchers FOR ALL
  USING (
    demand_id IN (
      SELECT d.id FROM demands d
      JOIN campaigns c ON d.campaign_id = c.id
      WHERE c.owner_id = auth.uid()
    )
  );

-- RLS Policies for demand_reminders
CREATE POLICY "Users can manage reminders in their campaigns"
  ON demand_reminders FOR ALL
  USING (
    demand_id IN (
      SELECT d.id FROM demands d
      JOIN campaigns c ON d.campaign_id = c.id
      WHERE c.owner_id = auth.uid()
    )
  );

-- RLS Policies for demand_comments
CREATE POLICY "Users can view comments in their campaigns"
  ON demand_comments FOR SELECT
  USING (
    demand_id IN (
      SELECT d.id FROM demands d
      JOIN campaigns c ON d.campaign_id = c.id
      WHERE c.owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can create comments in their campaigns"
  ON demand_comments FOR INSERT
  WITH CHECK (
    demand_id IN (
      SELECT d.id FROM demands d
      JOIN campaigns c ON d.campaign_id = c.id
      WHERE c.owner_id = auth.uid()
    )
  );

-- Trigger to update updated_at timestamp
CREATE TRIGGER update_demands_updated_at
  BEFORE UPDATE ON demands
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER update_demand_comments_updated_at
  BEFORE UPDATE ON demand_comments
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();