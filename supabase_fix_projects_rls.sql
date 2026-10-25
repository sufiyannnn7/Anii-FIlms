-- 1. Ensure RLS is enabled
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- 2. Drop any existing restrictive SELECT policies on projects (optional but safe)
DROP POLICY IF EXISTS "Allow public SELECT on projects" ON public.projects;
DROP POLICY IF EXISTS "Allow authenticated SELECT on projects" ON public.projects;

-- 3. Create a truly public SELECT policy for projects so Incognito/unauthenticated users can see them
CREATE POLICY "Allow public SELECT on projects" 
ON public.projects FOR SELECT 
USING (true);

-- 4. Do the same for project_videos just in case
ALTER TABLE public.project_videos ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public Access for project_videos" ON public.project_videos;
DROP POLICY IF EXISTS "Allow public SELECT on project_videos" ON public.project_videos;

CREATE POLICY "Allow public SELECT on project_videos" 
ON public.project_videos FOR SELECT 
USING (true);
