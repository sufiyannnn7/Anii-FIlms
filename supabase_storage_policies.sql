-- Ensure all required storage buckets exist and are set to public
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('thumbnails', 'thumbnails', true),
  ('hero-images', 'hero-images', true),
  ('gallery', 'gallery', true),
  ('videos', 'videos', true)
ON CONFLICT (id) DO NOTHING;

-- Enable Row Level Security on storage.objects if not already enabled
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

---------------------------------------------------------
-- RLS Policies for the 'thumbnails' bucket
---------------------------------------------------------
DROP POLICY IF EXISTS "Allow authenticated SELECT on thumbnails" ON storage.objects;
CREATE POLICY "Allow authenticated SELECT on thumbnails" 
ON storage.objects FOR SELECT 
TO authenticated 
USING (bucket_id = 'thumbnails');

DROP POLICY IF EXISTS "Allow authenticated INSERT on thumbnails" ON storage.objects;
CREATE POLICY "Allow authenticated INSERT on thumbnails" 
ON storage.objects FOR INSERT 
TO authenticated 
WITH CHECK (bucket_id = 'thumbnails');

DROP POLICY IF EXISTS "Allow authenticated UPDATE on thumbnails" ON storage.objects;
CREATE POLICY "Allow authenticated UPDATE on thumbnails" 
ON storage.objects FOR UPDATE 
TO authenticated 
USING (bucket_id = 'thumbnails')
WITH CHECK (bucket_id = 'thumbnails');

DROP POLICY IF EXISTS "Allow authenticated DELETE on thumbnails" ON storage.objects;
CREATE POLICY "Allow authenticated DELETE on thumbnails" 
ON storage.objects FOR DELETE 
TO authenticated 
USING (bucket_id = 'thumbnails');

---------------------------------------------------------
-- RLS Policies for the 'hero-images' bucket
---------------------------------------------------------
DROP POLICY IF EXISTS "Allow authenticated SELECT on hero-images" ON storage.objects;
CREATE POLICY "Allow authenticated SELECT on hero-images" 
ON storage.objects FOR SELECT 
TO authenticated 
USING (bucket_id = 'hero-images');

DROP POLICY IF EXISTS "Allow authenticated INSERT on hero-images" ON storage.objects;
CREATE POLICY "Allow authenticated INSERT on hero-images" 
ON storage.objects FOR INSERT 
TO authenticated 
WITH CHECK (bucket_id = 'hero-images');

DROP POLICY IF EXISTS "Allow authenticated UPDATE on hero-images" ON storage.objects;
CREATE POLICY "Allow authenticated UPDATE on hero-images" 
ON storage.objects FOR UPDATE 
TO authenticated 
USING (bucket_id = 'hero-images')
WITH CHECK (bucket_id = 'hero-images');

DROP POLICY IF EXISTS "Allow authenticated DELETE on hero-images" ON storage.objects;
CREATE POLICY "Allow authenticated DELETE on hero-images" 
ON storage.objects FOR DELETE 
TO authenticated 
USING (bucket_id = 'hero-images');

---------------------------------------------------------
-- RLS Policies for the 'gallery' bucket
---------------------------------------------------------
DROP POLICY IF EXISTS "Allow authenticated SELECT on gallery" ON storage.objects;
CREATE POLICY "Allow authenticated SELECT on gallery" 
ON storage.objects FOR SELECT 
TO authenticated 
USING (bucket_id = 'gallery');

DROP POLICY IF EXISTS "Allow authenticated INSERT on gallery" ON storage.objects;
CREATE POLICY "Allow authenticated INSERT on gallery" 
ON storage.objects FOR INSERT 
TO authenticated 
WITH CHECK (bucket_id = 'gallery');

DROP POLICY IF EXISTS "Allow authenticated UPDATE on gallery" ON storage.objects;
CREATE POLICY "Allow authenticated UPDATE on gallery" 
ON storage.objects FOR UPDATE 
TO authenticated 
USING (bucket_id = 'gallery')
WITH CHECK (bucket_id = 'gallery');

DROP POLICY IF EXISTS "Allow authenticated DELETE on gallery" ON storage.objects;
CREATE POLICY "Allow authenticated DELETE on gallery" 
ON storage.objects FOR DELETE 
TO authenticated 
USING (bucket_id = 'gallery');

---------------------------------------------------------
-- RLS Policies for the 'videos' bucket
---------------------------------------------------------
DROP POLICY IF EXISTS "Allow authenticated SELECT on videos" ON storage.objects;
CREATE POLICY "Allow authenticated SELECT on videos" 
ON storage.objects FOR SELECT 
TO authenticated 
USING (bucket_id = 'videos');

DROP POLICY IF EXISTS "Allow authenticated INSERT on videos" ON storage.objects;
CREATE POLICY "Allow authenticated INSERT on videos" 
ON storage.objects FOR INSERT 
TO authenticated 
WITH CHECK (bucket_id = 'videos');

DROP POLICY IF EXISTS "Allow authenticated UPDATE on videos" ON storage.objects;
CREATE POLICY "Allow authenticated UPDATE on videos" 
ON storage.objects FOR UPDATE 
TO authenticated 
USING (bucket_id = 'videos')
WITH CHECK (bucket_id = 'videos');

DROP POLICY IF EXISTS "Allow authenticated DELETE on videos" ON storage.objects;
CREATE POLICY "Allow authenticated DELETE on videos" 
ON storage.objects FOR DELETE 
TO authenticated 
USING (bucket_id = 'videos');
