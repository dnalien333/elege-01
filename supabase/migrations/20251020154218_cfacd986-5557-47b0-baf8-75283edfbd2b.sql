-- Create TSE results table for Brazilian election data simulation
CREATE TABLE IF NOT EXISTS public.tse_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  year INTEGER NOT NULL,
  state TEXT NOT NULL,
  city TEXT NOT NULL,
  zone TEXT,
  section TEXT,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  candidate_name TEXT NOT NULL,
  party TEXT NOT NULL,
  votes INTEGER NOT NULL DEFAULT 0,
  coalition_side TEXT CHECK (coalition_side IN ('left', 'right', 'center')),
  elected BOOLEAN DEFAULT FALSE,
  substitute BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_tse_results_year ON public.tse_results(year);
CREATE INDEX IF NOT EXISTS idx_tse_results_state ON public.tse_results(state);
CREATE INDEX IF NOT EXISTS idx_tse_results_party ON public.tse_results(party);
CREATE INDEX IF NOT EXISTS idx_tse_results_coalition_side ON public.tse_results(coalition_side);
CREATE INDEX IF NOT EXISTS idx_tse_results_location ON public.tse_results(latitude, longitude);

-- Enable RLS
ALTER TABLE public.tse_results ENABLE ROW LEVEL SECURITY;

-- Allow all users to view TSE results (public data)
CREATE POLICY "Anyone can view TSE results"
  ON public.tse_results
  FOR SELECT
  USING (true);

-- Only authenticated users can insert/update TSE results
CREATE POLICY "Authenticated users can insert TSE results"
  ON public.tse_results
  FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update TSE results"
  ON public.tse_results
  FOR UPDATE
  USING (auth.uid() IS NOT NULL);

-- Insert mock TSE data for demonstration (2022 election simulation)
INSERT INTO public.tse_results (year, state, city, zone, section, latitude, longitude, candidate_name, party, votes, coalition_side, elected, substitute)
SELECT 
  2022 as year,
  state,
  city,
  LPAD((random() * 100)::int::text, 3, '0') as zone,
  LPAD((random() * 500)::int::text, 4, '0') as section,
  latitude,
  longitude,
  candidate_name,
  party,
  (1000 + random() * 9000)::int as votes,
  coalition_side,
  (random() < 0.1)::boolean as elected,
  (random() < 0.05)::boolean as substitute
FROM (
  SELECT 
    unnest(ARRAY['SP', 'RJ', 'MG', 'BA', 'PR', 'RS', 'PE', 'CE', 'PA', 'SC', 'GO', 'MA', 'ES', 'PB', 'RN', 'AL', 'PI', 'MT', 'MS', 'SE', 'RO', 'TO', 'AC', 'AM', 'AP', 'RR', 'DF']) as state
) states
CROSS JOIN (
  SELECT 
    CASE 
      WHEN n <= 10 THEN 'São Paulo'
      WHEN n <= 20 THEN 'Rio de Janeiro'
      WHEN n <= 30 THEN 'Belo Horizonte'
      WHEN n <= 40 THEN 'Salvador'
      WHEN n <= 50 THEN 'Curitiba'
      WHEN n <= 60 THEN 'Porto Alegre'
      WHEN n <= 70 THEN 'Recife'
      WHEN n <= 80 THEN 'Fortaleza'
      WHEN n <= 90 THEN 'Brasília'
      ELSE 'Manaus'
    END as city,
    -33 + random() * 28 as latitude,
    -73.5 + random() * 35 as longitude,
    n
  FROM generate_series(1, 100) as n
) cities
CROSS JOIN (
  VALUES 
    ('Luiz Inácio Lula da Silva', 'PT', 'left'),
    ('Fernando Haddad', 'PT', 'left'),
    ('Guilherme Boulos', 'PSOL', 'left'),
    ('Ciro Gomes', 'PDT', 'left'),
    ('Jair Bolsonaro', 'PL', 'right'),
    ('Tarcísio de Freitas', 'REPUBLICANOS', 'right'),
    ('Ronaldo Caiado', 'UB', 'right'),
    ('Eduardo Leite', 'PSDB', 'center'),
    ('João Doria', 'PSDB', 'center'),
    ('Simone Tebet', 'MDB', 'center')
) candidates(candidate_name, party, coalition_side)
LIMIT 300;