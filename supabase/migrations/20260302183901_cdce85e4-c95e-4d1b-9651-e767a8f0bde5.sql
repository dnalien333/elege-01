
-- =============================================
-- FIX ALL RLS POLICIES: RESTRICTIVE -> PERMISSIVE
-- =============================================

-- 1. TEAMS
DROP POLICY IF EXISTS "Users can view teams in their campaigns" ON public.teams;
DROP POLICY IF EXISTS "Users can insert teams in their campaigns" ON public.teams;
DROP POLICY IF EXISTS "Users can update teams in their campaigns" ON public.teams;
DROP POLICY IF EXISTS "Users can delete teams in their campaigns" ON public.teams;

CREATE POLICY "Users can view teams in their campaigns" ON public.teams AS PERMISSIVE FOR SELECT TO authenticated
USING (campaign_id IN (SELECT id FROM campaigns WHERE owner_id = auth.uid()));
CREATE POLICY "Users can insert teams in their campaigns" ON public.teams AS PERMISSIVE FOR INSERT TO authenticated
WITH CHECK (campaign_id IN (SELECT id FROM campaigns WHERE owner_id = auth.uid()));
CREATE POLICY "Users can update teams in their campaigns" ON public.teams AS PERMISSIVE FOR UPDATE TO authenticated
USING (campaign_id IN (SELECT id FROM campaigns WHERE owner_id = auth.uid()));
CREATE POLICY "Users can delete teams in their campaigns" ON public.teams AS PERMISSIVE FOR DELETE TO authenticated
USING (campaign_id IN (SELECT id FROM campaigns WHERE owner_id = auth.uid()));

-- 2. TEAM_MEMBERS
DROP POLICY IF EXISTS "Users can view team members in their campaigns" ON public.team_members;
DROP POLICY IF EXISTS "Users can create team members in their campaigns" ON public.team_members;
DROP POLICY IF EXISTS "Users can update team members in their campaigns" ON public.team_members;
DROP POLICY IF EXISTS "Users can delete team members in their campaigns" ON public.team_members;

CREATE POLICY "Users can view team members in their campaigns" ON public.team_members AS PERMISSIVE FOR SELECT TO authenticated
USING (team_id IN (SELECT t.id FROM teams t JOIN campaigns c ON t.campaign_id = c.id WHERE c.owner_id = auth.uid()));
CREATE POLICY "Users can create team members in their campaigns" ON public.team_members AS PERMISSIVE FOR INSERT TO authenticated
WITH CHECK (team_id IN (SELECT t.id FROM teams t JOIN campaigns c ON t.campaign_id = c.id WHERE c.owner_id = auth.uid()));
CREATE POLICY "Users can update team members in their campaigns" ON public.team_members AS PERMISSIVE FOR UPDATE TO authenticated
USING (team_id IN (SELECT t.id FROM teams t JOIN campaigns c ON t.campaign_id = c.id WHERE c.owner_id = auth.uid()));
CREATE POLICY "Users can delete team members in their campaigns" ON public.team_members AS PERMISSIVE FOR DELETE TO authenticated
USING (team_id IN (SELECT t.id FROM teams t JOIN campaigns c ON t.campaign_id = c.id WHERE c.owner_id = auth.uid()));

-- 3. CAMPAIGNS
DROP POLICY IF EXISTS "Users can view own campaigns" ON public.campaigns;
DROP POLICY IF EXISTS "Users can create campaigns" ON public.campaigns;
DROP POLICY IF EXISTS "Campaign owners can update" ON public.campaigns;
DROP POLICY IF EXISTS "Campaign owners can delete" ON public.campaigns;

CREATE POLICY "Users can view own campaigns" ON public.campaigns AS PERMISSIVE FOR SELECT TO authenticated
USING (owner_id = auth.uid());
CREATE POLICY "Users can create campaigns" ON public.campaigns AS PERMISSIVE FOR INSERT TO authenticated
WITH CHECK (owner_id = auth.uid());
CREATE POLICY "Campaign owners can update" ON public.campaigns AS PERMISSIVE FOR UPDATE TO authenticated
USING (owner_id = auth.uid());
CREATE POLICY "Campaign owners can delete" ON public.campaigns AS PERMISSIVE FOR DELETE TO authenticated
USING (owner_id = auth.uid());

-- 4. VOTERS
DROP POLICY IF EXISTS "Users can view campaign voters" ON public.voters;
DROP POLICY IF EXISTS "Users can insert voters" ON public.voters;
DROP POLICY IF EXISTS "Users can update campaign voters" ON public.voters;
DROP POLICY IF EXISTS "Users can delete campaign voters" ON public.voters;

CREATE POLICY "Users can view campaign voters" ON public.voters AS PERMISSIVE FOR SELECT TO authenticated
USING (EXISTS (SELECT 1 FROM campaigns c WHERE c.id = voters.campaign_id AND c.owner_id = auth.uid()));
CREATE POLICY "Users can insert voters" ON public.voters AS PERMISSIVE FOR INSERT TO authenticated
WITH CHECK (EXISTS (SELECT 1 FROM campaigns c WHERE c.id = voters.campaign_id AND c.owner_id = auth.uid()));
CREATE POLICY "Users can update campaign voters" ON public.voters AS PERMISSIVE FOR UPDATE TO authenticated
USING (EXISTS (SELECT 1 FROM campaigns c WHERE c.id = voters.campaign_id AND c.owner_id = auth.uid()));
CREATE POLICY "Users can delete campaign voters" ON public.voters AS PERMISSIVE FOR DELETE TO authenticated
USING (EXISTS (SELECT 1 FROM campaigns c WHERE c.id = voters.campaign_id AND c.owner_id = auth.uid()));

-- 5. COLABORADORES
DROP POLICY IF EXISTS "Users can view campaign colaboradores" ON public.colaboradores;
DROP POLICY IF EXISTS "Users can insert colaboradores" ON public.colaboradores;
DROP POLICY IF EXISTS "Users can update campaign colaboradores" ON public.colaboradores;
DROP POLICY IF EXISTS "Users can delete campaign colaboradores" ON public.colaboradores;

CREATE POLICY "Users can view campaign colaboradores" ON public.colaboradores AS PERMISSIVE FOR SELECT TO authenticated
USING (campaign_id IN (SELECT id FROM campaigns WHERE owner_id = auth.uid()));
CREATE POLICY "Users can insert colaboradores" ON public.colaboradores AS PERMISSIVE FOR INSERT TO authenticated
WITH CHECK (campaign_id IN (SELECT id FROM campaigns WHERE owner_id = auth.uid()));
CREATE POLICY "Users can update campaign colaboradores" ON public.colaboradores AS PERMISSIVE FOR UPDATE TO authenticated
USING (campaign_id IN (SELECT id FROM campaigns WHERE owner_id = auth.uid()));
CREATE POLICY "Users can delete campaign colaboradores" ON public.colaboradores AS PERMISSIVE FOR DELETE TO authenticated
USING (campaign_id IN (SELECT id FROM campaigns WHERE owner_id = auth.uid()));

-- 6. ACTIVITIES
DROP POLICY IF EXISTS "Users can view activities in their campaigns" ON public.activities;
DROP POLICY IF EXISTS "Users can create activities in their campaigns" ON public.activities;
DROP POLICY IF EXISTS "Users can update activities in their campaigns" ON public.activities;

CREATE POLICY "Users can view activities in their campaigns" ON public.activities AS PERMISSIVE FOR SELECT TO authenticated
USING (campaign_id IN (SELECT id FROM campaigns WHERE owner_id = auth.uid()));
CREATE POLICY "Users can create activities in their campaigns" ON public.activities AS PERMISSIVE FOR INSERT TO authenticated
WITH CHECK (campaign_id IN (SELECT id FROM campaigns WHERE owner_id = auth.uid()));
CREATE POLICY "Users can update activities in their campaigns" ON public.activities AS PERMISSIVE FOR UPDATE TO authenticated
USING (campaign_id IN (SELECT id FROM campaigns WHERE owner_id = auth.uid()));

-- 7. DEMANDS
DROP POLICY IF EXISTS "Users can view demands in their campaigns" ON public.demands;
DROP POLICY IF EXISTS "Users can create demands in their campaigns" ON public.demands;
DROP POLICY IF EXISTS "Users can update demands in their campaigns" ON public.demands;
DROP POLICY IF EXISTS "Users can delete demands in their campaigns" ON public.demands;

CREATE POLICY "Users can view demands in their campaigns" ON public.demands AS PERMISSIVE FOR SELECT TO authenticated
USING (campaign_id IN (SELECT id FROM campaigns WHERE owner_id = auth.uid()));
CREATE POLICY "Users can create demands in their campaigns" ON public.demands AS PERMISSIVE FOR INSERT TO authenticated
WITH CHECK (campaign_id IN (SELECT id FROM campaigns WHERE owner_id = auth.uid()));
CREATE POLICY "Users can update demands in their campaigns" ON public.demands AS PERMISSIVE FOR UPDATE TO authenticated
USING (campaign_id IN (SELECT id FROM campaigns WHERE owner_id = auth.uid()));
CREATE POLICY "Users can delete demands in their campaigns" ON public.demands AS PERMISSIVE FOR DELETE TO authenticated
USING (campaign_id IN (SELECT id FROM campaigns WHERE owner_id = auth.uid()));

-- 8. DEMAND_HISTORY
DROP POLICY IF EXISTS "Users can view history in their campaigns" ON public.demand_history;
DROP POLICY IF EXISTS "Users can create history in their campaigns" ON public.demand_history;

CREATE POLICY "Users can view history in their campaigns" ON public.demand_history AS PERMISSIVE FOR SELECT TO authenticated
USING (demand_id IN (SELECT d.id FROM demands d JOIN campaigns c ON d.campaign_id = c.id WHERE c.owner_id = auth.uid()));
CREATE POLICY "Users can create history in their campaigns" ON public.demand_history AS PERMISSIVE FOR INSERT TO authenticated
WITH CHECK (demand_id IN (SELECT d.id FROM demands d JOIN campaigns c ON d.campaign_id = c.id WHERE c.owner_id = auth.uid()));

-- 9. DEMAND_COMMENTS
DROP POLICY IF EXISTS "Users can view comments in their campaigns" ON public.demand_comments;
DROP POLICY IF EXISTS "Users can create comments in their campaigns" ON public.demand_comments;

CREATE POLICY "Users can view comments in their campaigns" ON public.demand_comments AS PERMISSIVE FOR SELECT TO authenticated
USING (demand_id IN (SELECT d.id FROM demands d JOIN campaigns c ON d.campaign_id = c.id WHERE c.owner_id = auth.uid()));
CREATE POLICY "Users can create comments in their campaigns" ON public.demand_comments AS PERMISSIVE FOR INSERT TO authenticated
WITH CHECK (demand_id IN (SELECT d.id FROM demands d JOIN campaigns c ON d.campaign_id = c.id WHERE c.owner_id = auth.uid()));

-- 10. DEMAND_WATCHERS
DROP POLICY IF EXISTS "Users can manage watchers in their campaigns" ON public.demand_watchers;

CREATE POLICY "Users can manage watchers in their campaigns" ON public.demand_watchers AS PERMISSIVE FOR ALL TO authenticated
USING (demand_id IN (SELECT d.id FROM demands d JOIN campaigns c ON d.campaign_id = c.id WHERE c.owner_id = auth.uid()));

-- 11. DEMAND_REMINDERS
DROP POLICY IF EXISTS "Users can manage reminders in their campaigns" ON public.demand_reminders;

CREATE POLICY "Users can manage reminders in their campaigns" ON public.demand_reminders AS PERMISSIVE FOR ALL TO authenticated
USING (demand_id IN (SELECT d.id FROM demands d JOIN campaigns c ON d.campaign_id = c.id WHERE c.owner_id = auth.uid()));

-- 12. COMMUNICATIONS
DROP POLICY IF EXISTS "Users can view campaign communications" ON public.communications;
DROP POLICY IF EXISTS "Users can create communications" ON public.communications;
DROP POLICY IF EXISTS "Users can update communications" ON public.communications;

CREATE POLICY "Users can view campaign communications" ON public.communications AS PERMISSIVE FOR SELECT TO authenticated
USING (EXISTS (SELECT 1 FROM campaigns c WHERE c.id = communications.campaign_id AND c.owner_id = auth.uid()));
CREATE POLICY "Users can create communications" ON public.communications AS PERMISSIVE FOR INSERT TO authenticated
WITH CHECK (EXISTS (SELECT 1 FROM campaigns c WHERE c.id = communications.campaign_id AND c.owner_id = auth.uid()));
CREATE POLICY "Users can update communications" ON public.communications AS PERMISSIVE FOR UPDATE TO authenticated
USING (EXISTS (SELECT 1 FROM campaigns c WHERE c.id = communications.campaign_id AND c.owner_id = auth.uid()));

-- 13. SEGMENTS
DROP POLICY IF EXISTS "Users can view campaign segments" ON public.segments;
DROP POLICY IF EXISTS "Users can create segments" ON public.segments;
DROP POLICY IF EXISTS "Users can update segments" ON public.segments;
DROP POLICY IF EXISTS "Users can delete segments" ON public.segments;

CREATE POLICY "Users can view campaign segments" ON public.segments AS PERMISSIVE FOR SELECT TO authenticated
USING (EXISTS (SELECT 1 FROM campaigns c WHERE c.id = segments.campaign_id AND c.owner_id = auth.uid()));
CREATE POLICY "Users can create segments" ON public.segments AS PERMISSIVE FOR INSERT TO authenticated
WITH CHECK (EXISTS (SELECT 1 FROM campaigns c WHERE c.id = segments.campaign_id AND c.owner_id = auth.uid()));
CREATE POLICY "Users can update segments" ON public.segments AS PERMISSIVE FOR UPDATE TO authenticated
USING (EXISTS (SELECT 1 FROM campaigns c WHERE c.id = segments.campaign_id AND c.owner_id = auth.uid()));
CREATE POLICY "Users can delete segments" ON public.segments AS PERMISSIVE FOR DELETE TO authenticated
USING (EXISTS (SELECT 1 FROM campaigns c WHERE c.id = segments.campaign_id AND c.owner_id = auth.uid()));

-- 14. CHAT_HISTORY
DROP POLICY IF EXISTS "Users can view their own chat history" ON public.chat_history;
DROP POLICY IF EXISTS "Users can create their own chat history" ON public.chat_history;

CREATE POLICY "Users can view their own chat history" ON public.chat_history AS PERMISSIVE FOR SELECT TO authenticated
USING (user_id = auth.uid());
CREATE POLICY "Users can create their own chat history" ON public.chat_history AS PERMISSIVE FOR INSERT TO authenticated
WITH CHECK (user_id = auth.uid());

-- 15. LGPD_CONSENTS
DROP POLICY IF EXISTS "Users can view own consents" ON public.lgpd_consents;
DROP POLICY IF EXISTS "Users can create consents" ON public.lgpd_consents;

CREATE POLICY "Users can view own consents" ON public.lgpd_consents AS PERMISSIVE FOR SELECT TO authenticated
USING (user_id = auth.uid());
CREATE POLICY "Users can create consents" ON public.lgpd_consents AS PERMISSIVE FOR INSERT TO authenticated
WITH CHECK (user_id = auth.uid());

-- 16. SAVED_FILTERS
DROP POLICY IF EXISTS "Users can manage their own saved filters" ON public.saved_filters;

CREATE POLICY "Users can manage their own saved filters" ON public.saved_filters AS PERMISSIVE FOR ALL TO authenticated
USING (user_id = auth.uid());

-- 17. AUDIT_LOGS
DROP POLICY IF EXISTS "Users can view own audit logs" ON public.audit_logs;

CREATE POLICY "Users can view own audit logs" ON public.audit_logs AS PERMISSIVE FOR SELECT TO authenticated
USING (user_id = auth.uid());

-- 18. TSE_RESULTS
DROP POLICY IF EXISTS "Anyone can view TSE results" ON public.tse_results;
DROP POLICY IF EXISTS "Only admins can insert TSE results" ON public.tse_results;
DROP POLICY IF EXISTS "Only admins can update TSE results" ON public.tse_results;

CREATE POLICY "Anyone can view TSE results" ON public.tse_results AS PERMISSIVE FOR SELECT TO authenticated
USING (true);
CREATE POLICY "Only admins can insert TSE results" ON public.tse_results AS PERMISSIVE FOR INSERT TO authenticated
WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));
CREATE POLICY "Only admins can update TSE results" ON public.tse_results AS PERMISSIVE FOR UPDATE TO authenticated
USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

-- 19. PROFILES
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

CREATE POLICY "Users can view own profile" ON public.profiles AS PERMISSIVE FOR SELECT TO authenticated
USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles AS PERMISSIVE FOR UPDATE TO authenticated
USING (auth.uid() = id);

-- 20. TEAM_ACTIONS
DROP POLICY IF EXISTS "Users can view team actions in their campaigns" ON public.team_actions;
DROP POLICY IF EXISTS "Users can create team actions in their campaigns" ON public.team_actions;
DROP POLICY IF EXISTS "Users can update team actions in their campaigns" ON public.team_actions;
DROP POLICY IF EXISTS "Users can delete team actions in their campaigns" ON public.team_actions;

CREATE POLICY "Users can view team actions in their campaigns" ON public.team_actions AS PERMISSIVE FOR SELECT TO authenticated
USING (team_id IN (SELECT t.id FROM teams t JOIN campaigns c ON t.campaign_id = c.id WHERE c.owner_id = auth.uid()));
CREATE POLICY "Users can create team actions in their campaigns" ON public.team_actions AS PERMISSIVE FOR INSERT TO authenticated
WITH CHECK (team_id IN (SELECT t.id FROM teams t JOIN campaigns c ON t.campaign_id = c.id WHERE c.owner_id = auth.uid()));
CREATE POLICY "Users can update team actions in their campaigns" ON public.team_actions AS PERMISSIVE FOR UPDATE TO authenticated
USING (team_id IN (SELECT t.id FROM teams t JOIN campaigns c ON t.campaign_id = c.id WHERE c.owner_id = auth.uid()));
CREATE POLICY "Users can delete team actions in their campaigns" ON public.team_actions AS PERMISSIVE FOR DELETE TO authenticated
USING (team_id IN (SELECT t.id FROM teams t JOIN campaigns c ON t.campaign_id = c.id WHERE c.owner_id = auth.uid()));
