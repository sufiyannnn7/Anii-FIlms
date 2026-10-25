-- 1. Ensure all buckets are truly set to public
UPDATE storage.buckets 
SET public = true 
WHERE id IN ('thumbnails', 'hero-images', 'gallery', 'videos');

-- 2. Drop existing restricted SELECT policies
DROP POLICY IF EXISTS "Allow authenticated SELECT on thumbnails" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated SELECT on hero-images" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated SELECT on gallery" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated SELECT on videos" ON storage.objects;

-- 3. Create unrestricted SELECT policies for everyone (including anon / unauthenticated)
CREATE POLICY "Allow public SELECT on thumbnails" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'thumbnails');

CREATE POLICY "Allow public SELECT on hero-images" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'hero-images');

CREATE POLICY "Allow public SELECT on gallery" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'gallery');

CREATE POLICY "Allow public SELECT on videos" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'videos');
