-- Comprehensive schema synchronization
-- Adds missing columns to the `projects` table safely

DO $$ 
BEGIN
    -- Ensure year exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='projects' AND column_name='year') THEN
        ALTER TABLE public.projects ADD COLUMN year TEXT;
    END IF;

    -- Ensure client exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='projects' AND column_name='client') THEN
        ALTER TABLE public.projects ADD COLUMN client TEXT;
    END IF;

    -- Ensure services exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='projects' AND column_name='services') THEN
        ALTER TABLE public.projects ADD COLUMN services TEXT;
    END IF;

    -- Ensure credits exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='projects' AND column_name='credits') THEN
        ALTER TABLE public.projects ADD COLUMN credits TEXT;
    END IF;

    -- Ensure challenge exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='projects' AND column_name='challenge') THEN
        ALTER TABLE public.projects ADD COLUMN challenge TEXT;
    END IF;

    -- Ensure creative_process exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='projects' AND column_name='creative_process') THEN
        ALTER TABLE public.projects ADD COLUMN creative_process TEXT;
    END IF;

    -- Ensure display_order exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='projects' AND column_name='display_order') THEN
        ALTER TABLE public.projects ADD COLUMN display_order INTEGER DEFAULT 0;
    END IF;

    -- Ensure seo_title exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='projects' AND column_name='seo_title') THEN
        ALTER TABLE public.projects ADD COLUMN seo_title TEXT;
    END IF;

    -- Ensure seo_description exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='projects' AND column_name='seo_description') THEN
        ALTER TABLE public.projects ADD COLUMN seo_description TEXT;
    END IF;

    -- Ensure video_type exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='projects' AND column_name='video_type') THEN
        ALTER TABLE public.projects ADD COLUMN video_type TEXT DEFAULT 'none';
    END IF;

    -- Ensure video_url exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='projects' AND column_name='video_url') THEN
        ALTER TABLE public.projects ADD COLUMN video_url TEXT;
    END IF;

    -- Ensure youtube_id exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='projects' AND column_name='youtube_id') THEN
        ALTER TABLE public.projects ADD COLUMN youtube_id TEXT;
    END IF;

    -- Ensure vimeo_id exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='projects' AND column_name='vimeo_id') THEN
        ALTER TABLE public.projects ADD COLUMN vimeo_id TEXT;
    END IF;

    -- Ensure video_thumbnail exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='projects' AND column_name='video_thumbnail') THEN
        ALTER TABLE public.projects ADD COLUMN video_thumbnail TEXT;
    END IF;
    
    -- Force Supabase cache reload
    NOTIFY pgrst, 'reload schema';
END $$;
