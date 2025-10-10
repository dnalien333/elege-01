-- Add assigned_to field to team_actions
ALTER TABLE public.team_actions
ADD COLUMN IF NOT EXISTS assigned_to uuid REFERENCES public.profiles(id);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_team_actions_assigned_to ON public.team_actions(assigned_to);
CREATE INDEX IF NOT EXISTS idx_team_actions_team_id ON public.team_actions(team_id);
CREATE INDEX IF NOT EXISTS idx_team_actions_status ON public.team_actions(status);

-- Fix RLS policies for team_actions
DROP POLICY IF EXISTS "Users can view team actions in their campaigns" ON public.team_actions;

CREATE POLICY "Users can view team actions in their campaigns"
ON public.team_actions
FOR SELECT
TO authenticated
USING (
  team_id IN (
    SELECT t.id
    FROM teams t
    JOIN campaigns c ON t.campaign_id = c.id
    WHERE c.owner_id = auth.uid()
  )
);

CREATE POLICY "Users can create team actions in their campaigns"
ON public.team_actions
FOR INSERT
TO authenticated
WITH CHECK (
  team_id IN (
    SELECT t.id
    FROM teams t
    JOIN campaigns c ON t.campaign_id = c.id
    WHERE c.owner_id = auth.uid()
  )
);

CREATE POLICY "Users can update team actions in their campaigns"
ON public.team_actions
FOR UPDATE
TO authenticated
USING (
  team_id IN (
    SELECT t.id
    FROM teams t
    JOIN campaigns c ON t.campaign_id = c.id
    WHERE c.owner_id = auth.uid()
  )
);

CREATE POLICY "Users can delete team actions in their campaigns"
ON public.team_actions
FOR DELETE
TO authenticated
USING (
  team_id IN (
    SELECT t.id
    FROM teams t
    JOIN campaigns c ON t.campaign_id = c.id
    WHERE c.owner_id = auth.uid()
  )
);

-- Fix RLS policies for team_members
DROP POLICY IF EXISTS "Users can view team members in their campaigns" ON public.team_members;

CREATE POLICY "Users can view team members in their campaigns"
ON public.team_members
FOR SELECT
TO authenticated
USING (
  team_id IN (
    SELECT t.id
    FROM teams t
    JOIN campaigns c ON t.campaign_id = c.id
    WHERE c.owner_id = auth.uid()
  )
);

CREATE POLICY "Users can create team members in their campaigns"
ON public.team_members
FOR INSERT
TO authenticated
WITH CHECK (
  team_id IN (
    SELECT t.id
    FROM teams t
    JOIN campaigns c ON t.campaign_id = c.id
    WHERE c.owner_id = auth.uid()
  )
);

CREATE POLICY "Users can update team members in their campaigns"
ON public.team_members
FOR UPDATE
TO authenticated
USING (
  team_id IN (
    SELECT t.id
    FROM teams t
    JOIN campaigns c ON t.campaign_id = c.id
    WHERE c.owner_id = auth.uid()
  )
);

CREATE POLICY "Users can delete team members in their campaigns"
ON public.team_members
FOR DELETE
TO authenticated
USING (
  team_id IN (
    SELECT t.id
    FROM teams t
    JOIN campaigns c ON t.campaign_id = c.id
    WHERE c.owner_id = auth.uid()
  )
);