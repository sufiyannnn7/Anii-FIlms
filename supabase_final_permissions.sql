-- Grant basic table privileges to Supabase roles
GRANT ALL ON TABLE public.project_videos TO postgres, service_role, authenticated;
GRANT SELECT ON TABLE public.project_videos TO anon;

-- Ensure RLS is enabled
ALTER TABLE public.project_videos ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Enable full access for authenticated users" ON public.project_videos;
DROP POLICY IF EXISTS "Public read access for project_videos" ON public.project_videos;
DROP POLICY IF EXISTS "Authenticated users have full access to project_videos" ON public.project_videos;
DROP POLICY IF EXISTS "Public Access for project_videos" ON public.project_videos;

-- Recreate policies
CREATE POLICY "Enable full access for authenticated users" 
ON public.project_videos 
AS PERMISSIVE FOR ALL TO authenticated 
USING (true) WITH CHECK (true);

CREATE POLICY "Public read access for project_videos" 
ON public.project_videos 
AS PERMISSIVE FOR SELECT TO anon, public 
USING (true);

NOTIFY pgrst, 'reload schema';
