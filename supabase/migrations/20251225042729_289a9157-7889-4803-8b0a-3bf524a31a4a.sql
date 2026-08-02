-- Add read_time column to blog table
ALTER TABLE public.blog ADD COLUMN read_time integer DEFAULT 5;