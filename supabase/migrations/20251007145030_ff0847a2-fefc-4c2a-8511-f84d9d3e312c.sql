-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create profiles table (extends auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'collaborator' CHECK (role IN ('admin', 'coordinator', 'collaborator')),
  cpf_encrypted TEXT,
  avatar_url TEXT,
  lgpd_consent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create campaigns table
CREATE TABLE campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  candidate_name TEXT NOT NULL,
  party TEXT,
  election_year INTEGER DEFAULT 2026,
  owner_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create voters table
CREATE TABLE voters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  cpf_encrypted TEXT,
  phone TEXT,
  email TEXT,
  state TEXT,
  city TEXT,
  electoral_section TEXT,
  tags TEXT[] DEFAULT '{}',
  preferences JSONB DEFAULT '{}',
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_voters_campaign ON voters(campaign_id);
CREATE INDEX idx_voters_tags ON voters USING GIN(tags);

-- Create segments table
CREATE TABLE segments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  filter_criteria JSONB NOT NULL DEFAULT '{}',
  voter_count INTEGER DEFAULT 0,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create communications table
CREATE TABLE communications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
  segment_id UUID REFERENCES segments(id),
  message_template TEXT NOT NULL,
  tone TEXT CHECK (tone IN ('formal', 'friendly', 'motivational')),
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'approved', 'sent')),
  sent_count INTEGER DEFAULT 0,
  created_by UUID REFERENCES profiles(id),
  approved_by UUID REFERENCES profiles(id),
  sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create audit_logs table
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  campaign_id UUID REFERENCES campaigns(id),
  action TEXT NOT NULL,
  entity_type TEXT,
  entity_id UUID,
  details JSONB DEFAULT '{}',
  ip_address INET,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_campaign ON audit_logs(campaign_id);

-- Create lgpd_consents table
CREATE TABLE lgpd_consents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  consent_text TEXT NOT NULL,
  consent_version TEXT NOT NULL DEFAULT '1.0',
  ip_address INET,
  user_agent TEXT,
  consented_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE voters ENABLE ROW LEVEL SECURITY;
ALTER TABLE segments ENABLE ROW LEVEL SECURITY;
ALTER TABLE communications ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE lgpd_consents ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for campaigns
CREATE POLICY "Users can view own campaigns" ON campaigns
  FOR SELECT USING (
    owner_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid() AND p.role IN ('admin', 'coordinator')
    )
  );

CREATE POLICY "Users can create campaigns" ON campaigns
  FOR INSERT WITH CHECK (owner_id = auth.uid());

CREATE POLICY "Campaign owners can update" ON campaigns
  FOR UPDATE USING (owner_id = auth.uid());

CREATE POLICY "Campaign owners can delete" ON campaigns
  FOR DELETE USING (owner_id = auth.uid());

-- RLS Policies for voters
CREATE POLICY "Users can view campaign voters" ON voters
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM campaigns c
      WHERE c.id = campaign_id AND c.owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert voters" ON voters
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM campaigns c
      WHERE c.id = campaign_id AND c.owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can update campaign voters" ON voters
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM campaigns c
      WHERE c.id = campaign_id AND c.owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete campaign voters" ON voters
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM campaigns c
      WHERE c.id = campaign_id AND c.owner_id = auth.uid()
    )
  );

-- RLS Policies for segments
CREATE POLICY "Users can view campaign segments" ON segments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM campaigns c
      WHERE c.id = campaign_id AND c.owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can create segments" ON segments
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM campaigns c
      WHERE c.id = campaign_id AND c.owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can update segments" ON segments
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM campaigns c
      WHERE c.id = campaign_id AND c.owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete segments" ON segments
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM campaigns c
      WHERE c.id = campaign_id AND c.owner_id = auth.uid()
    )
  );

-- RLS Policies for communications
CREATE POLICY "Users can view campaign communications" ON communications
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM campaigns c
      WHERE c.id = campaign_id AND c.owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can create communications" ON communications
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM campaigns c
      WHERE c.id = campaign_id AND c.owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can update communications" ON communications
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM campaigns c
      WHERE c.id = campaign_id AND c.owner_id = auth.uid()
    )
  );

-- RLS Policies for audit_logs
CREATE POLICY "Users can view own audit logs" ON audit_logs
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "System can insert audit logs" ON audit_logs
  FOR INSERT WITH CHECK (true);

-- RLS Policies for lgpd_consents
CREATE POLICY "Users can view own consents" ON lgpd_consents
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can create consents" ON lgpd_consents
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- Function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Usuário'),
    'collaborator'
  );
  RETURN NEW;
END;
$$;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Triggers for updated_at
CREATE TRIGGER set_updated_at_profiles
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_campaigns
  BEFORE UPDATE ON campaigns
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_voters
  BEFORE UPDATE ON voters
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();