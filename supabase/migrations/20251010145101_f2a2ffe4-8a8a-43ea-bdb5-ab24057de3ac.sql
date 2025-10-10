-- Create colaboradores table (similar to voters, but for team collaborators)
CREATE TABLE public.colaboradores (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  campaign_id UUID REFERENCES public.campaigns(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  city TEXT,
  state TEXT,
  role TEXT DEFAULT 'colaborador',
  tags TEXT[] DEFAULT '{}',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.colaboradores ENABLE ROW LEVEL SECURITY;

-- RLS Policies for colaboradores (similar to voters)
CREATE POLICY "Users can view campaign colaboradores"
ON public.colaboradores
FOR SELECT
TO authenticated
USING (
  campaign_id IN (
    SELECT id FROM campaigns WHERE owner_id = auth.uid()
  )
);

CREATE POLICY "Users can insert colaboradores"
ON public.colaboradores
FOR INSERT
TO authenticated
WITH CHECK (
  campaign_id IN (
    SELECT id FROM campaigns WHERE owner_id = auth.uid()
  )
);

CREATE POLICY "Users can update campaign colaboradores"
ON public.colaboradores
FOR UPDATE
TO authenticated
USING (
  campaign_id IN (
    SELECT id FROM campaigns WHERE owner_id = auth.uid()
  )
);

CREATE POLICY "Users can delete campaign colaboradores"
ON public.colaboradores
FOR DELETE
TO authenticated
USING (
  campaign_id IN (
    SELECT id FROM campaigns WHERE owner_id = auth.uid()
  )
);

-- Add updated_at trigger
CREATE TRIGGER update_colaboradores_updated_at
BEFORE UPDATE ON public.colaboradores
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- Create indexes for better performance
CREATE INDEX idx_colaboradores_campaign_id ON public.colaboradores(campaign_id);
CREATE INDEX idx_colaboradores_city ON public.colaboradores(city);
CREATE INDEX idx_colaboradores_state ON public.colaboradores(state);
CREATE INDEX idx_colaboradores_tags ON public.colaboradores USING GIN(tags);