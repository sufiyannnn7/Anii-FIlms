-- 1. Create the project_videos table
CREATE TABLE IF NOT EXISTS public.project_videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  source_type TEXT NOT NULL, -- 'upload', 'youtube', 'vimeo'
  video_url TEXT,
  youtube_id TEXT,
  vimeo_id TEXT,
  storage_url TEXT,
  thumbnail_url TEXT,
  aspect_ratio TEXT DEFAULT 'Auto',
  display_order INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 2. Enable Row Level Security
ALTER TABLE public.project_videos ENABLE ROW LEVEL SECURITY;

-- 3. Define Policies
-- Public Read Access
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'project_videos' AND schemaname = 'public' AND policyname = 'Public Access for project_videos'
  ) THEN
    CREATE POLICY "Public Access for project_videos"
    ON public.project_videos FOR SELECT
    USING (true);
  END IF;
END $$;

-- Authenticated Users Full Access
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'project_videos' AND schemaname = 'public' AND policyname = 'Authenticated users have full access to project_videos'
  ) THEN
    CREATE POLICY "Authenticated users have full access to project_videos"
    ON public.project_videos FOR ALL
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');
  END IF;
END $$;
