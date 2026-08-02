-- Add explicit RLS policies to fully secure contact_submissions table
-- The Edge Function uses service role key which bypasses RLS,
-- so these policies block direct database access

-- Block all direct INSERTs (only Edge Function with service role can insert)
CREATE POLICY "No direct inserts allowed" 
ON public.contact_submissions 
FOR INSERT 
WITH CHECK (false);

-- Block all UPDATEs (admins can only view, not modify submissions)
CREATE POLICY "No updates allowed" 
ON public.contact_submissions 
FOR UPDATE 
USING (false);

-- Only admins can delete contact submissions
CREATE POLICY "Only admins can delete contact submissions" 
ON public.contact_submissions 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));