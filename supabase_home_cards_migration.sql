-- Add JSONB column for homepage cards configuration
ALTER TABLE public.site_settings
ADD COLUMN IF NOT EXISTS home_cards_config JSONB DEFAULT '{}'::jsonb;

-- Pre-seed this column with the default configuration if needed
UPDATE public.site_settings
SET home_cards_config = '{
  "filmmaking": {
    "title": "Filmmaking",
    "subtitle": "Videography • Cinematography",
    "description": "Explore Projects",
    "bg_image": null,
    "desktop_bg_image": null,
    "mobile_bg_image": null,
    "overlay_opacity": 40,
    "overlay_color": "#000000",
    "text_color": "#ffffff",
    "button_text": "Explore Projects",
    "button_link": "/filmmaking",
    "card_height": "aspect-[4/3.5]",
    "border_radius": "rounded-xl",
    "text_alignment": "left",
    "card_order": 1,
    "show_card": true,
    "hover_animation": "zoom-shadow"
  },
  "marketing": {
    "title": "Marketing",
    "subtitle": "Brand Identity • Social Strategy",
    "description": "Explore Campaigns",
    "bg_image": null,
    "desktop_bg_image": null,
    "mobile_bg_image": null,
    "overlay_opacity": 40,
    "overlay_color": "#000000",
    "text_color": "#ffffff",
    "button_text": "Explore Campaigns",
    "button_link": "/marketing",
    "card_height": "aspect-[4/3.5]",
    "border_radius": "rounded-xl",
    "text_alignment": "left",
    "card_order": 2,
    "show_card": true,
    "hover_animation": "zoom-shadow"
  }
}'::jsonb
WHERE id = 1 AND (home_cards_config IS NULL OR home_cards_config = '{}'::jsonb);
