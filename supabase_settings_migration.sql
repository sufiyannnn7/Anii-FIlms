ALTER TABLE settings ADD COLUMN IF NOT EXISTS about_stats JSONB DEFAULT '[{"label": "Successful projects & campaigns delivered", "value": "40+"}]';
ALTER TABLE settings ADD COLUMN IF NOT EXISTS contact_heading TEXT DEFAULT 'Let''s Work Together';
ALTER TABLE settings ADD COLUMN IF NOT EXISTS contact_description TEXT DEFAULT 'I''m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.';
ALTER TABLE settings ADD COLUMN IF NOT EXISTS contact_cta TEXT DEFAULT 'Start a Conversation';
ALTER TABLE settings ADD COLUMN IF NOT EXISTS footer_text TEXT DEFAULT 'Cinematic storytelling meets strategic brand building.';
ALTER TABLE settings ADD COLUMN IF NOT EXISTS footer_copyright TEXT DEFAULT '© 2024 Anii Films. All rights reserved.';
ALTER TABLE settings ADD COLUMN IF NOT EXISTS hero_tagline TEXT DEFAULT '• FILMMAKER • MARKETER • STORYTELLER •';

-- Reload schema cache for PostgREST
NOTIFY pgrst, 'reload schema';
