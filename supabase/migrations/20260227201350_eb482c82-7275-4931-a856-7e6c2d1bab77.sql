
-- Fix 1: Restrict audit_logs INSERT to a SECURITY DEFINER function only
DROP POLICY IF EXISTS "System can insert audit logs" ON public.audit_logs;

CREATE OR REPLACE FUNCTION public.insert_audit_log(
  p_action TEXT,
  p_entity_type TEXT DEFAULT NULL,
  p_entity_id UUID DEFAULT NULL,
  p_details JSONB DEFAULT '{}'::jsonb,
  p_campaign_id UUID DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO audit_logs (user_id, action, entity_type, entity_id, details, campaign_id, ip_address)
  VALUES (auth.uid(), p_action, p_entity_type, p_entity_id, p_details, p_campaign_id, inet_client_addr());
END;
$$;

-- Fix 2: Remove overly permissive tse_results INSERT/UPDATE policies
DROP POLICY IF EXISTS "Authenticated users can insert TSE results" ON public.tse_results;
DROP POLICY IF EXISTS "Authenticated users can update TSE results" ON public.tse_results;

-- Only admins can write TSE results
CREATE POLICY "Only admins can insert TSE results"
  ON public.tse_results FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role = 'admin'
    )
  );

CREATE POLICY "Only admins can update TSE results"
  ON public.tse_results FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role = 'admin'
    )
  );
