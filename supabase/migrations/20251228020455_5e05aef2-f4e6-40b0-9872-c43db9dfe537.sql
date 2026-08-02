-- Change category column from enum to text to allow custom categories
ALTER TABLE public.portfolio 
ALTER COLUMN category TYPE text USING category::text;

-- Set a default value for the text column
ALTER TABLE public.portfolio 
ALTER COLUMN category SET DEFAULT 'Editorial';

-- Drop the enum type since it's no longer needed
DROP TYPE IF EXISTS public.portfolio_category;