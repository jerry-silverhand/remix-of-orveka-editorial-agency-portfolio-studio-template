-- Allow only admins to insert portfolio items
CREATE POLICY "Admins can insert portfolio items"
ON public.portfolio
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Allow only admins to update portfolio items
CREATE POLICY "Admins can update portfolio items"
ON public.portfolio
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Allow only admins to delete portfolio items
CREATE POLICY "Admins can delete portfolio items"
ON public.portfolio
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));