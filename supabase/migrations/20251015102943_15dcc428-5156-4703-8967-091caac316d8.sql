-- Add missing columns to teams table for location, tasks, and delivery date
ALTER TABLE public.teams
ADD COLUMN IF NOT EXISTS location TEXT,
ADD COLUMN IF NOT EXISTS tasks TEXT,
ADD COLUMN IF NOT EXISTS delivery_date TIMESTAMP WITH TIME ZONE;

-- Add comment for documentation
COMMENT ON COLUMN public.teams.location IS 'Location where team operates';
COMMENT ON COLUMN public.teams.tasks IS 'Team tasks description (max 60 words recommended)';
COMMENT ON COLUMN public.teams.delivery_date IS 'Expected delivery/completion date for team tasks';