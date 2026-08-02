-- Fix user_roles RLS: Remove ability for users to see their own roles via direct table access
-- This prevents admin enumeration attacks
DROP POLICY IF EXISTS "Admins can view all user roles" ON public.user_roles;

-- Create stricter policy: Only admins can view ANY roles
CREATE POLICY "Only admins can view user roles" 
ON public.user_roles 
FOR SELECT 
USING (public.has_role(auth.uid(), 'admin'::app_role));