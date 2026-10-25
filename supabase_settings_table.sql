-- Create public.site_settings table for portfolio-wide configurations
CREATE TABLE IF NOT EXISTS public.site_settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  brand_name TEXT NOT NULL,
  logo_url TEXT,
  favicon_url TEXT,
  tagline TEXT,
  hero_title TEXT,
  hero_subtitle TEXT,
  hero_bg_url TEXT,
  hero_cta_text TEXT,
  about_heading TEXT,
  about_description TEXT,
  profile_photo_url TEXT,
  resume_url TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  contact_address TEXT,
  maps_link TEXT,
  instagram_url TEXT,
  linkedin_url TEXT,
  youtube_url TEXT,
  behance_url TEXT,
  vimeo_url TEXT,
  meta_title TEXT,
  meta_description TEXT,
  og_image_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Allow public read access (SELECT)
DROP POLICY IF EXISTS "Allow public SELECT on site_settings" ON public.site_settings;
CREATE POLICY "Allow public SELECT on site_settings" 
ON public.site_settings FOR SELECT 
TO public 
USING (true);

-- Allow authenticated admins write access (ALL)
DROP POLICY IF EXISTS "Allow authenticated ALL on site_settings" ON public.site_settings;
CREATE POLICY "Allow authenticated ALL on site_settings" 
ON public.site_settings FOR ALL 
TO authenticated 
USING (true)
WITH CHECK (true);

-- Seed the single rows if they do not exist
INSERT INTO public.site_settings (
  id, brand_name, tagline, 
  hero_title, hero_subtitle, hero_cta_text, 
  about_heading, about_description, 
  contact_email, contact_phone, contact_address, 
  instagram_url, linkedin_url, youtube_url, behance_url, vimeo_url, 
  meta_title, meta_description
) VALUES (
  1, 'Anii Films', 'Strategic Marketing Meets Cinematic Storytelling',
  'Stories that move people. \nStrategy that moves markets.', 'A portfolio at the intersection of cinema and consumer insight.', 'Explore Projects',
  'Strategic Marketing Meets Cinematic Storytelling', 'Driven by curiosity and built through creativity, I''m passionate about marketing, branding, and building ideas that connect with people. Alongside strategy and digital storytelling, I explore filmmaking, cinematography, and editing to create visuals that combine aesthetics, emotion, and purpose while constantly evolving both creatively and strategically.',
  'aniket24007@gmail.com', '+919172255729', 'Mumbai, India',
  'https://instagram.com/_aniifilms', 'https://linkedin.com', 'https://youtube.com', 'https://behance.net', 'https://vimeo.com',
  'Anii Films | Portfolio', 'Strategic Marketing Meets Cinematic Storytelling. Explore projects and campaigns.'
) ON CONFLICT (id) DO NOTHING;
