-- Fix foreign key constraint for demands.assigned_to
-- Change from referencing profiles to referencing colaboradores

ALTER TABLE public.demands
DROP CONSTRAINT IF EXISTS demands_assigned_to_fkey;

ALTER TABLE public.demands
ADD CONSTRAINT demands_assigned_to_fkey 
FOREIGN KEY (assigned_to) 
REFERENCES public.colaboradores(id)
ON DELETE SET NULL;