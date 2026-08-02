-- Create site_settings table for configurable integrations
CREATE TABLE public.site_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  setting_key TEXT NOT NULL UNIQUE,
  setting_value TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Public read access (anyone can view settings)
CREATE POLICY "Site settings are publicly readable" 
ON public.site_settings 
FOR SELECT 
USING (true);

-- Only admins can modify settings (using correct function signature)
CREATE POLICY "Admins can manage site settings" 
ON public.site_settings 
FOR ALL 
USING (public.has_role(auth.uid(), 'admin'));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_site_settings_updated_at
BEFORE UPDATE ON public.site_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default Cal.com demo URL
INSERT INTO public.site_settings (setting_key, setting_value, description)
VALUES ('cal_com_url', 'demo', 'Cal.com calendar link for booking section. Use your Cal.com username or full calendar path.');