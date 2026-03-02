
-- Drop existing restrictive policies on teams
DROP POLICY IF EXISTS "Users can view teams in their campaigns" ON public.teams;
DROP POLICY IF EXISTS "Users can insert teams in their campaigns" ON public.teams;
DROP POLICY IF EXISTS "Users can update teams in their campaigns" ON public.teams;
DROP POLICY IF EXISTS "Users can delete teams in their campaigns" ON public.teams;

-- Recreate as PERMISSIVE (AS PERMISSIVE before FOR)
CREATE POLICY "Users can view teams in their campaigns"
ON public.teams AS PERMISSIVE FOR SELECT TO authenticated
USING (campaign_id IN (SELECT id FROM campaigns WHERE owner_id = auth.uid()));

CREATE POLICY "Users can insert teams in their campaigns"
ON public.teams AS PERMISSIVE FOR INSERT TO authenticated
WITH CHECK (campaign_id IN (SELECT id FROM campaigns WHERE owner_id = auth.uid()));

CREATE POLICY "Users can update teams in their campaigns"
ON public.teams AS PERMISSIVE FOR UPDATE TO authenticated
USING (campaign_id IN (SELECT id FROM campaigns WHERE owner_id = auth.uid()));

CREATE POLICY "Users can delete teams in their campaigns"
ON public.teams AS PERMISSIVE FOR DELETE TO authenticated
USING (campaign_id IN (SELECT id FROM campaigns WHERE owner_id = auth.uid()));

-- Fix team_members
DROP POLICY IF EXISTS "Users can view team members in their campaigns" ON public.team_members;
DROP POLICY IF EXISTS "Users can create team members in their campaigns" ON public.team_members;
DROP POLICY IF EXISTS "Users can update team members in their campaigns" ON public.team_members;
DROP POLICY IF EXISTS "Users can delete team members in their campaigns" ON public.team_members;

CREATE POLICY "Users can view team members in their campaigns"
ON public.team_members AS PERMISSIVE FOR SELECT TO authenticated
USING (team_id IN (SELECT t.id FROM teams t JOIN campaigns c ON t.campaign_id = c.id WHERE c.owner_id = auth.uid()));

CREATE POLICY "Users can create team members in their campaigns"
ON public.team_members AS PERMISSIVE FOR INSERT TO authenticated
WITH CHECK (team_id IN (SELECT t.id FROM teams t JOIN campaigns c ON t.campaign_id = c.id WHERE c.owner_id = auth.uid()));

CREATE POLICY "Users can update team members in their campaigns"
ON public.team_members AS PERMISSIVE FOR UPDATE TO authenticated
USING (team_id IN (SELECT t.id FROM teams t JOIN campaigns c ON t.campaign_id = c.id WHERE c.owner_id = auth.uid()));

CREATE POLICY "Users can delete team members in their campaigns"
ON public.team_members AS PERMISSIVE FOR DELETE TO authenticated
USING (team_id IN (SELECT t.id FROM teams t JOIN campaigns c ON t.campaign_id = c.id WHERE c.owner_id = auth.uid()));

-- Fix campaigns
DROP POLICY IF EXISTS "Users can view own campaigns" ON public.campaigns;
DROP POLICY IF EXISTS "Users can create campaigns" ON public.campaigns;
DROP POLICY IF EXISTS "Campaign owners can update" ON public.campaigns;
DROP POLICY IF EXISTS "Campaign owners can delete" ON public.campaigns;

CREATE POLICY "Users can view own campaigns"
ON public.campaigns AS PERMISSIVE FOR SELECT TO authenticated
USING (owner_id = auth.uid());

CREATE POLICY "Users can create campaigns"
ON public.campaigns AS PERMISSIVE FOR INSERT TO authenticated
WITH CHECK (owner_id = auth.uid());

CREATE POLICY "Campaign owners can update"
ON public.campaigns AS PERMISSIVE FOR UPDATE TO authenticated
USING (owner_id = auth.uid());

CREATE POLICY "Campaign owners can delete"
ON public.campaigns AS PERMISSIVE FOR DELETE TO authenticated
USING (owner_id = auth.uid());
