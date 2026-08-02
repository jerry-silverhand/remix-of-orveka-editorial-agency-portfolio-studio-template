-- Add year column to portfolio table
ALTER TABLE public.portfolio 
ADD COLUMN year integer DEFAULT EXTRACT(YEAR FROM CURRENT_DATE)::integer;

-- Update existing records to use year from created_at
UPDATE public.portfolio 
SET year = EXTRACT(YEAR FROM created_at)::integer;