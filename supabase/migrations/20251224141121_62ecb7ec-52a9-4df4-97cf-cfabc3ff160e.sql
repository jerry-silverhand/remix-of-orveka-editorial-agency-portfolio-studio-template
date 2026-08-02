-- Create portfolio_categories enum
CREATE TYPE portfolio_category AS ENUM ('fashion', 'editorial', 'portrait', 'commercial', 'lifestyle', 'fine_art');

-- Create portfolio table
CREATE TABLE public.portfolio (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category portfolio_category NOT NULL DEFAULT 'editorial',
  preview_image_1 TEXT NOT NULL,
  preview_image_2 TEXT,
  preview_image_3 TEXT,
  preview_image_4 TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create blog table
CREATE TABLE public.blog (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT CHECK (char_length(excerpt) <= 160),
  thumbnail_url TEXT,
  content TEXT,
  publish_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.portfolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog ENABLE ROW LEVEL SECURITY;

-- Create public read policies (content is publicly viewable)
CREATE POLICY "Portfolio is publicly viewable" 
ON public.portfolio 
FOR SELECT 
USING (true);

CREATE POLICY "Blog is publicly viewable" 
ON public.blog 
FOR SELECT 
USING (true);

-- Create function to auto-generate slug from title
CREATE OR REPLACE FUNCTION public.generate_slug(title TEXT)
RETURNS TEXT AS $$
BEGIN
  RETURN lower(regexp_replace(regexp_replace(title, '[^a-zA-Z0-9\s-]', '', 'g'), '\s+', '-', 'g'));
END;
$$ LANGUAGE plpgsql;

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_portfolio_updated_at
BEFORE UPDATE ON public.portfolio
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_blog_updated_at
BEFORE UPDATE ON public.blog
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create trigger to auto-generate slug if empty
CREATE OR REPLACE FUNCTION public.auto_generate_slug()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.slug IS NULL OR NEW.slug = '' THEN
    NEW.slug = public.generate_slug(NEW.title);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER auto_slug_portfolio
BEFORE INSERT OR UPDATE ON public.portfolio
FOR EACH ROW
EXECUTE FUNCTION public.auto_generate_slug();

CREATE TRIGGER auto_slug_blog
BEFORE INSERT OR UPDATE ON public.blog
FOR EACH ROW
EXECUTE FUNCTION public.auto_generate_slug();

-- Create indexes for performance
CREATE INDEX idx_portfolio_slug ON public.portfolio(slug);
CREATE INDEX idx_portfolio_category ON public.portfolio(category);
CREATE INDEX idx_blog_slug ON public.blog(slug);
CREATE INDEX idx_blog_publish_date ON public.blog(publish_date DESC);