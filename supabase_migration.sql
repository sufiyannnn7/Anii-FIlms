-- Migration: Add missing text and image asset columns to public.projects table
ALTER TABLE public.projects 
ADD COLUMN IF NOT EXISTS slug TEXT,
ADD COLUMN IF NOT EXISTS short_description TEXT,
ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'Draft',
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
ADD COLUMN IF NOT EXISTS thumbnail_url TEXT,
ADD COLUMN IF NOT EXISTS hero_url TEXT,
ADD COLUMN IF NOT EXISTS gallery_urls TEXT[];

-- Optional: Populate default values for any pre-existing rows in the table
UPDATE public.projects SET slug = LOWER(REGEXP_REPLACE(title, '[^a-zA-Z0-9\s]', '', 'g')) WHERE slug IS NULL;
UPDATE public.projects SET slug = REPLACE(slug, ' ', '-') WHERE slug IS NULL;
UPDATE public.projects SET slug = slug || '-' || id WHERE slug IS NULL;
UPDATE public.projects SET short_description = '' WHERE short_description IS NULL;
UPDATE public.projects SET gallery_urls = '{}' WHERE gallery_urls IS NULL;
