-- Create the has_role security definer function
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Drop existing restrictive policies on contact_submissions
DROP POLICY IF EXISTS "No direct contact deletes" ON public.contact_submissions;
DROP POLICY IF EXISTS "No direct contact inserts" ON public.contact_submissions;
DROP POLICY IF EXISTS "No direct contact selects" ON public.contact_submissions;
DROP POLICY IF EXISTS "No direct contact updates" ON public.contact_submissions;

-- Create positive RLS policies that explicitly grant admin-only access
-- Admins can view all contact submissions
CREATE POLICY "Admins can view contact submissions"
ON public.contact_submissions
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::public.app_role));

-- Admins can delete contact submissions
CREATE POLICY "Admins can delete contact submissions"
ON public.contact_submissions
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::public.app_role));

-- Block all direct inserts (must go through edge function)
CREATE POLICY "No direct contact inserts"
ON public.contact_submissions
FOR INSERT
TO authenticated, anon
WITH CHECK (false);

-- Block all updates (contact submissions are immutable)
CREATE POLICY "No direct contact updates"
ON public.contact_submissions
FOR UPDATE
TO authenticated, anon
USING (false);