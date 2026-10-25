import { useQuery } from '@tanstack/react-query';
import { supabase } from './supabase';

export interface SiteSettings {
  id?: number;
  brand_name: string;
  logo_url: string | null;
  favicon_url: string | null;
  tagline: string;
  
  hero_title: string;
  hero_subtitle: string;
  hero_bg_url: string | null;
  hero_cta_text: string;
  hero_display_name: string | null;
  hero_tagline: string;
  about_stats: { label: string; value: string }[];
  contact_heading: string;
  contact_description: string;
  contact_cta: string;
  footer_text: string;
  footer_copyright: string;
  
  about_heading: string;
  about_description: string;
  profile_photo_url: string | null;
  resume_url: string | null;
  
  contact_email: string;
  contact_phone: string;
  contact_address: string;
  maps_link: string;
  
  instagram_url: string;
  linkedin_url: string;
  youtube_url: string;
  behance_url: string;
  vimeo_url: string;
  
  meta_title: string;
  meta_description: string;
  og_image_url: string | null;

  filmmaking_banner_url: string | null;
  filmmaking_banner_desktop_url: string | null;
  filmmaking_banner_mobile_url: string | null;
  filmmaking_banner_opacity: number;
  filmmaking_banner_height: string;
  filmmaking_banner_position: string;
  filmmaking_banner_blur: number;
  filmmaking_title: string;
  filmmaking_description: string;

  marketing_banner_url: string | null;
  marketing_banner_desktop_url: string | null;
  marketing_banner_mobile_url: string | null;
  marketing_banner_opacity: number;
  marketing_banner_height: string;
  marketing_banner_position: string;
  marketing_banner_blur: number;
  marketing_title: string;
  marketing_description: string;

  homepage_banner_desktop_url: string | null;
  homepage_banner_mobile_url: string | null;
  homepage_banner_opacity: number;
  homepage_banner_blur: number;

  home_cards_config: {
    filmmaking: {
      title: string;
      title_color: string;
      subtitle: string;
      description: string;
      bg_image: string | null;
      desktop_bg_image: string | null;
      mobile_bg_image: string | null;
      overlay_opacity: number;
      overlay_color: string;
      text_color: string;
      button_text: string;
      button_link: string;
      card_height: string;
      border_radius: string;
      text_alignment: string;
      card_order: number;
      show_card: boolean;
      hover_animation: string;
    };
    marketing: {
      title: string;
      title_color: string;
      subtitle: string;
      description: string;
      bg_image: string | null;
      desktop_bg_image: string | null;
      mobile_bg_image: string | null;
      overlay_opacity: number;
      overlay_color: string;
      text_color: string;
      button_text: string;
      button_link: string;
      card_height: string;
      border_radius: string;
      text_alignment: string;
      card_order: number;
      show_card: boolean;
      hover_animation: string;
    };
  } | null;
}

export const DEFAULT_SETTINGS: SiteSettings = {
  brand_name: '',
  logo_url: null,
  favicon_url: null,
  tagline: 'Strategic Marketing Meets Cinematic Storytelling',
  
  hero_title: 'Stories that move people.\nStrategy that moves \nmarkets.',
  hero_subtitle: 'A portfolio at the intersection of cinema and consumer insight.',
  hero_bg_url: null,
  hero_cta_text: 'Explore Projects',
  hero_display_name: null,
  hero_tagline: '• FILMMAKER • MARKETER • STORYTELLER •',
  about_stats: [{ value: '40+', label: 'Successful projects & campaigns delivered' }],
  contact_heading: 'Let\'s Work Together',
  contact_description: 'I\'m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.',
  contact_cta: 'Start a Conversation',
  footer_text: 'Cinematic storytelling meets strategic brand building.',
  footer_copyright: '© 2024 Anii Films. All rights reserved.',
  
  about_heading: 'Strategic Marketing Meets Cinematic Storytelling',
  about_description: "Driven by curiosity and built through creativity, I'm passionate about marketing, branding, and building ideas that connect with people. Alongside strategy and digital storytelling, I explore filmmaking, cinematography, and editing to create visuals that combine aesthetics, emotion, and purpose while constantly evolving both creatively and strategically.",
  profile_photo_url: null,
  resume_url: null,
  
  contact_email: 'aniket24007@gmail.com',
  contact_phone: '+919172255729',
  contact_address: 'Mumbai, India',
  maps_link: 'https://maps.google.com',
  
  instagram_url: 'https://instagram.com/_aniifilms',
  linkedin_url: 'https://linkedin.com',
  youtube_url: 'https://youtube.com',
  behance_url: 'https://behance.net',
  vimeo_url: 'https://vimeo.com',
  
  meta_title: 'Anii Films | Portfolio',
  meta_description: 'Strategic Marketing Meets Cinematic Storytelling. Explore projects and campaigns.',
  og_image_url: null,

  filmmaking_banner_url: null,
  filmmaking_banner_desktop_url: null,
  filmmaking_banner_mobile_url: null,
  filmmaking_banner_opacity: 40,
  filmmaking_banner_height: '50vh',
  filmmaking_banner_position: 'center',
  filmmaking_banner_blur: 0,
  filmmaking_title: 'Filmmaking',
  filmmaking_description: 'Bridging the gap between cinema and commercial narrative.',

  marketing_banner_url: null,
  marketing_banner_desktop_url: null,
  marketing_banner_mobile_url: null,
  marketing_banner_opacity: 40,
  marketing_banner_height: '50vh',
  marketing_banner_position: 'center',
  marketing_banner_blur: 0,
  marketing_title: 'Marketing',
  marketing_description: 'Strategic planning aligned with customer insights.',

  homepage_banner_desktop_url: null,
  homepage_banner_mobile_url: null,
  homepage_banner_opacity: 6,
  homepage_banner_blur: 0,
  
  home_cards_config: {
    filmmaking: {
      title: 'Filmmaking',
      title_color: '#ffffff',
      subtitle: 'Videography • Cinematography',
      description: 'Explore Projects',
      bg_image: null,
      desktop_bg_image: null,
      mobile_bg_image: null,
      overlay_opacity: 40,
      overlay_color: '#000000',
      text_color: '#ffffff',
      button_text: 'Explore Projects',
      button_link: '/filmmaking',
      card_height: 'aspect-[4/3.5]',
      border_radius: 'rounded-xl',
      text_alignment: 'left',
      card_order: 1,
      show_card: true,
      hover_animation: 'zoom-shadow'
    },
    marketing: {
      title: 'Marketing',
      title_color: '#ffffff',
      subtitle: 'Brand Identity • Social Strategy',
      description: 'Explore Campaigns',
      bg_image: null,
      desktop_bg_image: null,
      mobile_bg_image: null,
      overlay_opacity: 40,
      overlay_color: '#000000',
      text_color: '#ffffff',
      button_text: 'Explore Campaigns',
      button_link: '/marketing',
      card_height: 'aspect-[4/3.5]',
      border_radius: 'rounded-xl',
      text_alignment: 'left',
      card_order: 2,
      show_card: true,
      hover_animation: 'zoom-shadow'
    }
  }
};

export function useSiteSettings() {
  return useQuery<SiteSettings>({
    queryKey: ['site-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .eq('id', 1)
        .maybeSingle();

      if (error) {
        console.error('Error fetching site settings:', error);
        return DEFAULT_SETTINGS;
      }

      if (!data) {
        return DEFAULT_SETTINGS;
      }

      return {
        ...DEFAULT_SETTINGS,
        ...data
      };
    },
    staleTime: 30 * 1000, // Cache for 30 seconds
  });
}
