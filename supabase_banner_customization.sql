-- 1. Site Settings banner customization columns
ALTER TABLE public.site_settings
ADD COLUMN IF NOT EXISTS filmmaking_banner_url TEXT NULL,
ADD COLUMN IF NOT EXISTS filmmaking_banner_desktop_url TEXT NULL,
ADD COLUMN IF NOT EXISTS filmmaking_banner_mobile_url TEXT NULL,
ADD COLUMN IF NOT EXISTS filmmaking_banner_opacity INTEGER DEFAULT 40,
ADD COLUMN IF NOT EXISTS filmmaking_banner_height TEXT DEFAULT '50vh',
ADD COLUMN IF NOT EXISTS filmmaking_banner_position TEXT DEFAULT 'center',
ADD COLUMN IF NOT EXISTS filmmaking_banner_blur INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS filmmaking_title TEXT DEFAULT 'Filmmaking',
ADD COLUMN IF NOT EXISTS filmmaking_description TEXT DEFAULT 'Bridging the gap between cinema and commercial narrative.',

ADD COLUMN IF NOT EXISTS marketing_banner_url TEXT NULL,
ADD COLUMN IF NOT EXISTS marketing_banner_desktop_url TEXT NULL,
ADD COLUMN IF NOT EXISTS marketing_banner_mobile_url TEXT NULL,
ADD COLUMN IF NOT EXISTS marketing_banner_opacity INTEGER DEFAULT 40,
ADD COLUMN IF NOT EXISTS marketing_banner_height TEXT DEFAULT '50vh',
ADD COLUMN IF NOT EXISTS marketing_banner_position TEXT DEFAULT 'center',
ADD COLUMN IF NOT EXISTS marketing_banner_blur INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS marketing_title TEXT DEFAULT 'Marketing',
ADD COLUMN IF NOT EXISTS marketing_description TEXT DEFAULT 'Strategic planning aligned with customer insights.',

ADD COLUMN IF NOT EXISTS homepage_banner_desktop_url TEXT NULL,
ADD COLUMN IF NOT EXISTS homepage_banner_mobile_url TEXT NULL,
ADD COLUMN IF NOT EXISTS homepage_banner_opacity INTEGER DEFAULT 6,
ADD COLUMN IF NOT EXISTS homepage_banner_blur INTEGER DEFAULT 0;

-- 2. Projects display order and SEO columns
ALTER TABLE public.projects
ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS seo_title TEXT NULL,
ADD COLUMN IF NOT EXISTS seo_description TEXT NULL;
