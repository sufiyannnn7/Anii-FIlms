-- Add Video Management columns to the projects table safely
ALTER TABLE public.projects
ADD COLUMN IF NOT EXISTS video_type TEXT DEFAULT 'none',
ADD COLUMN IF NOT EXISTS video_url TEXT NULL,
ADD COLUMN IF NOT EXISTS youtube_id TEXT NULL,
ADD COLUMN IF NOT EXISTS vimeo_id TEXT NULL,
ADD COLUMN IF NOT EXISTS video_thumbnail TEXT NULL;

-- Create the "videos" bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'videos', 
  'videos', 
  true, 
  104857600, -- 100MB limit
  ARRAY['video/mp4', 'video/quicktime', 'video/webm']
)
ON CONFLICT (id) DO NOTHING;

-- Policies for "videos" bucket
-- Public Read Access
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'objects' AND schemaname = 'storage' AND policyname = 'Public Access to videos bucket'
  ) THEN
    CREATE POLICY "Public Access to videos bucket"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'videos');
  END IF;
END $$;

-- Authenticated Upload Access
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'objects' AND schemaname = 'storage' AND policyname = 'Authenticated users can upload videos'
  ) THEN
    CREATE POLICY "Authenticated users can upload videos"
    ON storage.objects FOR INSERT
    WITH CHECK (bucket_id = 'videos' AND auth.role() = 'authenticated');
  END IF;
END $$;

-- Authenticated Update Access
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'objects' AND schemaname = 'storage' AND policyname = 'Authenticated users can update videos'
  ) THEN
    CREATE POLICY "Authenticated users can update videos"
    ON storage.objects FOR UPDATE
    USING (bucket_id = 'videos' AND auth.role() = 'authenticated');
  END IF;
END $$;

-- Authenticated Delete Access
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'objects' AND schemaname = 'storage' AND policyname = 'Authenticated users can delete videos'
  ) THEN
    CREATE POLICY "Authenticated users can delete videos"
    ON storage.objects FOR DELETE
    USING (bucket_id = 'videos' AND auth.role() = 'authenticated');
  END IF;
END $$;
