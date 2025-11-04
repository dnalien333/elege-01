-- Remove urgency column from demands table
ALTER TABLE demands DROP COLUMN IF EXISTS urgency;

-- Drop the demand_urgency enum type if it exists and is no longer used
DROP TYPE IF EXISTS demand_urgency;