-- 1. Fix Categories RLS policies and sequence permissions
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public SELECT on categories" ON public.categories;
CREATE POLICY "Allow public SELECT on categories" 
ON public.categories FOR SELECT 
TO public 
USING (true);

DROP POLICY IF EXISTS "Allow authenticated ALL on categories" ON public.categories;
DROP POLICY IF EXISTS "Allow authenticated INSERT on categories" ON public.categories;
DROP POLICY IF EXISTS "Allow authenticated UPDATE on categories" ON public.categories;
DROP POLICY IF EXISTS "Allow authenticated DELETE on categories" ON public.categories;

CREATE POLICY "Allow authenticated INSERT on categories" ON public.categories FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated UPDATE on categories" ON public.categories FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated DELETE on categories" ON public.categories FOR DELETE TO authenticated USING (true);

GRANT ALL ON TABLE public.categories TO authenticated;
GRANT USAGE, SELECT, UPDATE ON SEQUENCE public.categories_id_seq TO authenticated;

-- 2. Add aspect ratio, creative info, client, services and credits columns to projects
ALTER TABLE public.projects
ADD COLUMN IF NOT EXISTS aspect_ratio TEXT DEFAULT 'Auto',
ADD COLUMN IF NOT EXISTS challenge TEXT NULL,
ADD COLUMN IF NOT EXISTS creative_process TEXT NULL,
ADD COLUMN IF NOT EXISTS "creativeProcess" TEXT NULL,
ADD COLUMN IF NOT EXISTS client TEXT NULL,
ADD COLUMN IF NOT EXISTS services TEXT NULL,
ADD COLUMN IF NOT EXISTS credits TEXT NULL;
