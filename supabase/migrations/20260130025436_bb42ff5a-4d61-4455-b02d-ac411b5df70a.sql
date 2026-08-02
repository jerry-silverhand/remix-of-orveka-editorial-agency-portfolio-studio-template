-- Rename avatar_image to avatar_url for clarity
ALTER TABLE public.testimonials RENAME COLUMN avatar_image TO avatar_url;