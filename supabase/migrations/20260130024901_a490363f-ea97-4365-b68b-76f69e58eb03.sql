-- Create testimonials table for CMS
CREATE TABLE public.testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    name TEXT NOT NULL,
    role_or_company TEXT NOT NULL,
    testimonial_text TEXT NOT NULL,
    avatar_image TEXT,
    rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
    is_featured BOOLEAN NOT NULL DEFAULT false
);

-- Enable Row Level Security
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Public read access (anyone can view testimonials)
CREATE POLICY "Testimonials are publicly readable"
ON public.testimonials
FOR SELECT
TO anon, authenticated
USING (true);

-- Block all client-side inserts (managed via Lovable Cloud)
CREATE POLICY "No client-side testimonial inserts"
ON public.testimonials
FOR INSERT
TO anon, authenticated
WITH CHECK (false);

-- Block all client-side updates
CREATE POLICY "No client-side testimonial updates"
ON public.testimonials
FOR UPDATE
TO anon, authenticated
USING (false);

-- Block all client-side deletes
CREATE POLICY "No client-side testimonial deletes"
ON public.testimonials
FOR DELETE
TO anon, authenticated
USING (false);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_testimonials_updated_at
BEFORE UPDATE ON public.testimonials
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for testimonials
ALTER PUBLICATION supabase_realtime ADD TABLE public.testimonials;