
-- Fix teams policies: drop restrictive, create permissive
DROP POLICY IF EXISTS "Users can manage teams in their campaigns" ON public.teams;
DROP POLICY IF EXISTS "Users can view teams in their campaigns" ON public.teams;

CREATE POLICY "Users can view teams in their campaigns"
ON public.teams FOR SELECT
TO authenticated
USING (campaign_id IN (SELECT id FROM campaigns WHERE owner_id = auth.uid()));

CREATE POLICY "Users can insert teams in their campaigns"
ON public.teams FOR INSERT
TO authenticated
WITH CHECK (campaign_id IN (SELECT id FROM campaigns WHERE owner_id = auth.uid()));

CREATE POLICY "Users can update teams in their campaigns"
ON public.teams FOR UPDATE
TO authenticated
USING (campaign_id IN (SELECT id FROM campaigns WHERE owner_id = auth.uid()));

CREATE POLICY "Users can delete teams in their campaigns"
ON public.teams FOR DELETE
TO authenticated
USING (campaign_id IN (SELECT id FROM campaigns WHERE owner_id = auth.uid()));

-- Also clean up the debug row
DELETE FROM public.teams WHERE name = 'debug_team_tmp';
