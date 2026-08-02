-- Drop the existing public INSERT policy
DROP POLICY IF EXISTS "Anyone can submit contact form" ON public.contact_submissions;

-- Add database constraints for additional protection
ALTER TABLE public.contact_submissions
  ADD CONSTRAINT contact_name_length CHECK (char_length(name) > 0 AND char_length(name) <= 200),
  ADD CONSTRAINT contact_email_format CHECK (email ~* '^[^\s@]+@[^\s@]+\.[^\s@]+$'),
  ADD CONSTRAINT contact_email_length CHECK (char_length(email) <= 254),
  ADD CONSTRAINT contact_subject_length CHECK (char_length(subject) > 0 AND char_length(subject) <= 500),
  ADD CONSTRAINT contact_message_length CHECK (char_length(message) > 0 AND char_length(message) <= 10000);