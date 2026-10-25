-- Add hero_display_name nullable column to site_settings table
ALTER TABLE public.site_settings
ADD COLUMN IF NOT EXISTS hero_display_name TEXT NULL;
