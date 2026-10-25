import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/admin/Sidebar';
import Topbar from '@/components/admin/Topbar';
import { ArrowLeft, Save, Upload, FileText, Check, Image as ImageIcon, AlertCircle, X, Shield, Globe, Home, User, Mail, Share2 } from 'lucide-react';
import { Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { DEFAULT_SETTINGS, SiteSettings } from '@/lib/settings';
import { useQueryClient } from '@tanstack/react-query';
import { BannerImageUpload } from '@/components/admin/BannerImageUpload';
import { HomeCardEditor } from '@/components/admin/HomeCardEditor';

type TabType = 'general' | 'homepage' | 'about' | 'contact' | 'socials' | 'seo' | 'banners';

export default function Settings() {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<TabType>('general');
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Settings State fields
  const [brandName, setBrandName] = useState(DEFAULT_SETTINGS.brand_name);
  const [tagline, setTagline] = useState(DEFAULT_SETTINGS.tagline);
  
  const [heroTitle, setHeroTitle] = useState(DEFAULT_SETTINGS.hero_title);
  const [heroSubtitle, setHeroSubtitle] = useState(DEFAULT_SETTINGS.hero_subtitle);
  const [heroCtaText, setHeroCtaText] = useState(DEFAULT_SETTINGS.hero_cta_text);
  const [heroDisplayName, setHeroDisplayName] = useState(DEFAULT_SETTINGS.hero_display_name || '');
  
  const [aboutHeading, setAboutHeading] = useState(DEFAULT_SETTINGS.about_heading);
  const [aboutDescription, setAboutDescription] = useState(DEFAULT_SETTINGS.about_description);
  
  const [contactEmail, setContactEmail] = useState(DEFAULT_SETTINGS.contact_email);
  const [contactPhone, setContactPhone] = useState(DEFAULT_SETTINGS.contact_phone);
  const [contactAddress, setContactAddress] = useState(DEFAULT_SETTINGS.contact_address);
  const [mapsLink, setMapsLink] = useState(DEFAULT_SETTINGS.maps_link);
  
  const [instagramUrl, setInstagramUrl] = useState(DEFAULT_SETTINGS.instagram_url);
  const [linkedinUrl, setLinkedinUrl] = useState(DEFAULT_SETTINGS.linkedin_url);
  const [youtubeUrl, setYoutubeUrl] = useState(DEFAULT_SETTINGS.youtube_url);
  const [behanceUrl, setBehanceUrl] = useState(DEFAULT_SETTINGS.behance_url);
  const [vimeoUrl, setVimeoUrl] = useState(DEFAULT_SETTINGS.vimeo_url);
  
  const [metaTitle, setMetaTitle] = useState(DEFAULT_SETTINGS.meta_title);
  const [metaDescription, setMetaDescription] = useState(DEFAULT_SETTINGS.meta_description);

  // Filmmaking Banner custom states
  const [filmmakingTitle, setFilmmakingTitle] = useState(DEFAULT_SETTINGS.filmmaking_title);
  const [filmmakingDescription, setFilmmakingDescription] = useState(DEFAULT_SETTINGS.filmmaking_description);
  const [filmmakingBannerUrl, setFilmmakingBannerUrl] = useState(DEFAULT_SETTINGS.filmmaking_banner_url || '');
  const [filmmakingBannerDesktopUrl, setFilmmakingBannerDesktopUrl] = useState(DEFAULT_SETTINGS.filmmaking_banner_desktop_url || '');
  const [filmmakingBannerMobileUrl, setFilmmakingBannerMobileUrl] = useState(DEFAULT_SETTINGS.filmmaking_banner_mobile_url || '');
  const [filmmakingBannerOpacity, setFilmmakingBannerOpacity] = useState(DEFAULT_SETTINGS.filmmaking_banner_opacity);
  const [filmmakingBannerHeight, setFilmmakingBannerHeight] = useState(DEFAULT_SETTINGS.filmmaking_banner_height);
  const [filmmakingBannerPosition, setFilmmakingBannerPosition] = useState(DEFAULT_SETTINGS.filmmaking_banner_position);
  const [filmmakingBannerBlur, setFilmmakingBannerBlur] = useState(DEFAULT_SETTINGS.filmmaking_banner_blur);

  // Marketing Banner custom states
  const [marketingTitle, setMarketingTitle] = useState(DEFAULT_SETTINGS.marketing_title);
  const [marketingDescription, setMarketingDescription] = useState(DEFAULT_SETTINGS.marketing_description);
  const [marketingBannerUrl, setMarketingBannerUrl] = useState(DEFAULT_SETTINGS.marketing_banner_url || '');
  const [marketingBannerDesktopUrl, setMarketingBannerDesktopUrl] = useState(DEFAULT_SETTINGS.marketing_banner_desktop_url || '');
  const [marketingBannerMobileUrl, setMarketingBannerMobileUrl] = useState(DEFAULT_SETTINGS.marketing_banner_mobile_url || '');
  const [marketingBannerOpacity, setMarketingBannerOpacity] = useState(DEFAULT_SETTINGS.marketing_banner_opacity);
  const [marketingBannerHeight, setMarketingBannerHeight] = useState(DEFAULT_SETTINGS.marketing_banner_height);
  const [marketingBannerPosition, setMarketingBannerPosition] = useState(DEFAULT_SETTINGS.marketing_banner_position);
  const [marketingBannerBlur, setMarketingBannerBlur] = useState(DEFAULT_SETTINGS.marketing_banner_blur);

  // Homepage Banner custom states
  const [homepageBannerDesktopUrl, setHomepageBannerDesktopUrl] = useState(DEFAULT_SETTINGS.homepage_banner_desktop_url || '');
  const [homepageBannerMobileUrl, setHomepageBannerMobileUrl] = useState(DEFAULT_SETTINGS.homepage_banner_mobile_url || '');
  const [homepageBannerOpacity, setHomepageBannerOpacity] = useState(DEFAULT_SETTINGS.homepage_banner_opacity);
  const [homepageBannerBlur, setHomepageBannerBlur] = useState(DEFAULT_SETTINGS.homepage_banner_blur);


  // New States
  const [heroTagline, setHeroTagline] = useState(DEFAULT_SETTINGS.hero_tagline);
  const [contactHeading, setContactHeading] = useState(DEFAULT_SETTINGS.contact_heading);
  const [contactDescription, setContactDescription] = useState(DEFAULT_SETTINGS.contact_description);
  const [contactCta, setContactCta] = useState(DEFAULT_SETTINGS.contact_cta);
  const [footerText, setFooterText] = useState(DEFAULT_SETTINGS.footer_text);
  const [footerCopyright, setFooterCopyright] = useState(DEFAULT_SETTINGS.footer_copyright);
  const [aboutStats, setAboutStats] = useState(DEFAULT_SETTINGS.about_stats);

  // Asset URLs
  const [logoUrl, setLogoUrl] = useState(DEFAULT_SETTINGS.logo_url || '');
  const [faviconUrl, setFaviconUrl] = useState(DEFAULT_SETTINGS.favicon_url || '');
  const [heroBgUrl, setHeroBgUrl] = useState(DEFAULT_SETTINGS.hero_bg_url || '');
  const [profilePhotoUrl, setProfilePhotoUrl] = useState(DEFAULT_SETTINGS.profile_photo_url || '');
  const [resumeUrl, setResumeUrl] = useState(DEFAULT_SETTINGS.resume_url || '');
  const [ogImageUrl, setOgImageUrl] = useState(DEFAULT_SETTINGS.og_image_url || '');
  
  // Home Cards Config
  const [homeCardsConfig, setHomeCardsConfig] = useState(DEFAULT_SETTINGS.home_cards_config);

// Load existing configuration
  useEffect(() => {
    async function loadSettings() {
      try {
        const { data, error: fetchError } = await supabase
          .from('site_settings')
          .select('*')
          .eq('id', 1)
          .maybeSingle();

        if (fetchError) throw fetchError;
        
        if (data) {
          setBrandName(data.brand_name || DEFAULT_SETTINGS.brand_name);
          setTagline(data.tagline || DEFAULT_SETTINGS.tagline);
          setHeroTitle(data.hero_title || DEFAULT_SETTINGS.hero_title);
          setHeroSubtitle(data.hero_subtitle || DEFAULT_SETTINGS.hero_subtitle);
          setHeroCtaText(data.hero_cta_text || DEFAULT_SETTINGS.hero_cta_text);
          setHeroDisplayName(data.hero_display_name || '');
          setAboutHeading(data.about_heading || DEFAULT_SETTINGS.about_heading);
          setAboutDescription(data.about_description || DEFAULT_SETTINGS.about_description);
          setContactEmail(data.contact_email || DEFAULT_SETTINGS.contact_email);
          setContactPhone(data.contact_phone || DEFAULT_SETTINGS.contact_phone);
          setContactAddress(data.contact_address || DEFAULT_SETTINGS.contact_address);
          setMapsLink(data.maps_link || DEFAULT_SETTINGS.maps_link);
          setInstagramUrl(data.instagram_url || DEFAULT_SETTINGS.instagram_url);
          setLinkedinUrl(data.linkedin_url || DEFAULT_SETTINGS.linkedin_url);
          setYoutubeUrl(data.youtube_url || DEFAULT_SETTINGS.youtube_url);
          setBehanceUrl(data.behance_url || DEFAULT_SETTINGS.behance_url);
          setVimeoUrl(data.vimeo_url || DEFAULT_SETTINGS.vimeo_url);
           setMetaTitle(data.meta_title || DEFAULT_SETTINGS.meta_title);
          setMetaDescription(data.meta_description || DEFAULT_SETTINGS.meta_description);
          setHeroTagline(data.hero_tagline || DEFAULT_SETTINGS.hero_tagline);
          setContactHeading(data.contact_heading || DEFAULT_SETTINGS.contact_heading);
          setContactDescription(data.contact_description || DEFAULT_SETTINGS.contact_description);
          setContactCta(data.contact_cta || DEFAULT_SETTINGS.contact_cta);
          setFooterText(data.footer_text || DEFAULT_SETTINGS.footer_text);
          setFooterCopyright(data.footer_copyright || DEFAULT_SETTINGS.footer_copyright);
          if (data.about_stats) setAboutStats(data.about_stats);

          // Custom banners & section values
          setFilmmakingTitle(data.filmmaking_title || DEFAULT_SETTINGS.filmmaking_title);
          setFilmmakingDescription(data.filmmaking_description || DEFAULT_SETTINGS.filmmaking_description);
          setFilmmakingBannerUrl(data.filmmaking_banner_url || '');
          setFilmmakingBannerDesktopUrl(data.filmmaking_banner_desktop_url || '');
          setFilmmakingBannerMobileUrl(data.filmmaking_banner_mobile_url || '');
          setFilmmakingBannerOpacity(data.filmmaking_banner_opacity !== undefined && data.filmmaking_banner_opacity !== null ? data.filmmaking_banner_opacity : DEFAULT_SETTINGS.filmmaking_banner_opacity);
          setFilmmakingBannerHeight(data.filmmaking_banner_height || DEFAULT_SETTINGS.filmmaking_banner_height);
          setFilmmakingBannerPosition(data.filmmaking_banner_position || DEFAULT_SETTINGS.filmmaking_banner_position);
          setFilmmakingBannerBlur(data.filmmaking_banner_blur !== undefined && data.filmmaking_banner_blur !== null ? data.filmmaking_banner_blur : DEFAULT_SETTINGS.filmmaking_banner_blur);

          setMarketingTitle(data.marketing_title || DEFAULT_SETTINGS.marketing_title);
          setMarketingDescription(data.marketing_description || DEFAULT_SETTINGS.marketing_description);
          setMarketingBannerUrl(data.marketing_banner_url || '');
          setMarketingBannerDesktopUrl(data.marketing_banner_desktop_url || '');
          setMarketingBannerMobileUrl(data.marketing_banner_mobile_url || '');
          setMarketingBannerOpacity(data.marketing_banner_opacity !== undefined && data.marketing_banner_opacity !== null ? data.marketing_banner_opacity : DEFAULT_SETTINGS.marketing_banner_opacity);
          setMarketingBannerHeight(data.marketing_banner_height || DEFAULT_SETTINGS.marketing_banner_height);
          setMarketingBannerPosition(data.marketing_banner_position || DEFAULT_SETTINGS.marketing_banner_position);
          setMarketingBannerBlur(data.marketing_banner_blur !== undefined && data.marketing_banner_blur !== null ? data.marketing_banner_blur : DEFAULT_SETTINGS.marketing_banner_blur);

          setHomepageBannerDesktopUrl(data.homepage_banner_desktop_url || '');
          setHomepageBannerMobileUrl(data.homepage_banner_mobile_url || '');
          setHomepageBannerOpacity(data.homepage_banner_opacity !== undefined && data.homepage_banner_opacity !== null ? data.homepage_banner_opacity : DEFAULT_SETTINGS.homepage_banner_opacity);
          setHomepageBannerBlur(data.homepage_banner_blur !== undefined && data.homepage_banner_blur !== null ? data.homepage_banner_blur : DEFAULT_SETTINGS.homepage_banner_blur);

          setLogoUrl(data.logo_url || '');
          setFaviconUrl(data.favicon_url || '');
          setHeroBgUrl(data.hero_bg_url || '');
          setProfilePhotoUrl(data.profile_photo_url || '');
          setResumeUrl(data.resume_url || '');
          setOgImageUrl(data.og_image_url || '');
          setHomeCardsConfig(data.home_cards_config || DEFAULT_SETTINGS.home_cards_config);
        }
      } catch (err: any) {
        console.error('Error loading settings:', err);
        setError(`Failed to load settings: ${err.message}`);
      } finally {
        setFetchLoading(false);
      }
    }

    loadSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // All fields are optional


       // Upsert record ID = 1
      const settingsData = {
        id: 1,
        brand_name: brandName,
        tagline,
        hero_title: heroTitle,
        hero_subtitle: heroSubtitle,
        hero_cta_text: heroCtaText,
        hero_display_name: heroDisplayName || null,
        about_heading: aboutHeading,
        about_description: aboutDescription,
        contact_email: contactEmail,
        contact_phone: contactPhone,
        contact_address: contactAddress,
        maps_link: mapsLink,
        instagram_url: instagramUrl,
        linkedin_url: linkedinUrl,
        youtube_url: youtubeUrl,
        behance_url: behanceUrl,
        vimeo_url: vimeoUrl,
        meta_title: metaTitle,
        meta_description: metaDescription,
        hero_tagline: heroTagline,
        contact_heading: contactHeading,
        contact_description: contactDescription,
        contact_cta: contactCta,
        footer_text: footerText,
        footer_copyright: footerCopyright,
        about_stats: aboutStats,
        logo_url: logoUrl,
        favicon_url: faviconUrl,
        hero_bg_url: heroBgUrl,
        profile_photo_url: profilePhotoUrl,
        resume_url: resumeUrl,
        og_image_url: ogImageUrl,
        home_cards_config: homeCardsConfig,

        // Custom banners & section values
        filmmaking_title: filmmakingTitle,
        filmmaking_description: filmmakingDescription,
        filmmaking_banner_url: filmmakingBannerUrl || null,
        filmmaking_banner_desktop_url: filmmakingBannerDesktopUrl || null,
        filmmaking_banner_mobile_url: filmmakingBannerMobileUrl || null,
        filmmaking_banner_opacity: Number(filmmakingBannerOpacity),
        filmmaking_banner_height: filmmakingBannerHeight,
        filmmaking_banner_position: filmmakingBannerPosition,
        filmmaking_banner_blur: Number(filmmakingBannerBlur),

        marketing_title: marketingTitle,
        marketing_description: marketingDescription,
        marketing_banner_url: marketingBannerUrl || null,
        marketing_banner_desktop_url: marketingBannerDesktopUrl || null,
        marketing_banner_mobile_url: marketingBannerMobileUrl || null,
        marketing_banner_opacity: Number(marketingBannerOpacity),
        marketing_banner_height: marketingBannerHeight,
        marketing_banner_position: marketingBannerPosition,
        marketing_banner_blur: Number(marketingBannerBlur),

        homepage_banner_desktop_url: homepageBannerDesktopUrl || null,
        homepage_banner_mobile_url: homepageBannerMobileUrl || null,
        homepage_banner_opacity: Number(homepageBannerOpacity),
        homepage_banner_blur: Number(homepageBannerBlur),

        updated_at: new Date().toISOString()
      };

      const { error: saveError } = await supabase
        .from('site_settings')
        .upsert(settingsData);

      if (saveError) throw saveError;

      setSuccess(true);
      // Invalidate cached settings so public pages update instantly
      await queryClient.invalidateQueries({ queryKey: ['site-settings'] });

      // Scroll top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setError(err.message || 'Failed to save settings.');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Shield },
    { id: 'homepage', label: 'Homepage', icon: Home },
    { id: 'about', label: 'About Info', icon: User },
    { id: 'contact', label: 'Contact', icon: Mail },
    { id: 'socials', label: 'Socials', icon: Share2 },
    { id: 'banners', label: 'Banners & Sections', icon: ImageIcon },
    { id: 'seo', label: 'SEO tags', icon: Globe },
  ] as const;

  return (
    <div className="min-h-screen bg-[#f4f3ee] text-foreground flex relative">
      <div className="fixed inset-0 z-0 noise-overlay mix-blend-overlay pointer-events-none"></div>

      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 z-10 relative">
        <Topbar title="Site Settings" />

        <main className="flex-1 p-8 overflow-y-auto max-w-4xl w-full mx-auto text-left">
          
          <div className="mb-10">
            <h1 className="font-display text-4xl text-foreground mb-2 leading-tight">
              Site Settings CMS
            </h1>
            <p className="text-sm text-foreground/50 font-light">
              Customize brand headers, timelines, contact addresses, and search engine metadata configurations.
            </p>
          </div>

          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 rounded-xl mb-8 flex items-center gap-3.5 text-sm font-semibold shadow-sm"
            >
              <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5" />
              </div>
              <span>Success! Site settings updated and published globally.</span>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 bg-destructive/10 border border-destructive/20 text-destructive rounded-xl mb-8 flex items-center gap-3.5 text-sm font-semibold shadow-sm"
            >
              <div className="w-6 h-6 rounded-full bg-destructive text-white flex items-center justify-center shrink-0">
                <AlertCircle className="w-3.5 h-3.5" />
              </div>
              <span>{error}</span>
            </motion.div>
          )}

          {fetchLoading ? (
            <div className="glass border border-foreground/10 bg-card/65 rounded-xl p-20 flex flex-col items-center justify-center gap-4">
              <div className="w-8 h-8 border-2 border-foreground/10 border-t-primary rounded-full animate-spin"></div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-foreground/50 font-semibold animate-pulse">Loading current configurations...</span>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {/* Tab selector bar */}
              <div className="flex overflow-x-auto gap-2 p-1 bg-foreground/5 rounded-lg border border-foreground/10 hide-scrollbar">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-5 py-2.5 rounded-md text-[10px] uppercase tracking-wider font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                        isActive
                          ? 'bg-card text-foreground shadow-sm'
                          : 'text-foreground/50 hover:text-foreground hover:bg-foreground/5'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              <form onSubmit={handleSubmit} className="glass border border-foreground/10 bg-card/65 rounded-xl p-8 sm:p-10 shadow-sm flex flex-col gap-8 text-left">
                
                {/* 1. GENERAL TAB */}
                {activeTab === 'general' && (
                  <div className="flex flex-col gap-6 animate-fade-in text-left">
                    <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-foreground/60 border-b border-foreground/10 pb-2 text-left">General Brand Settings</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
                      <div className="flex flex-col gap-1.5 text-left">
                        <label className="text-[9px] uppercase tracking-[0.2em] text-foreground/60 font-bold">Portfolio / Brand Name</label>
                        <input
                          type="text"
                          value={brandName}
                          onChange={(e) => setBrandName(e.target.value)}
                          placeholder="Anii Films"
                          className="bg-transparent border-b border-foreground/15 focus:border-primary outline-none py-2 text-sm text-foreground"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5 text-left">
                        <label className="text-[9px] uppercase tracking-[0.2em] text-foreground/60 font-bold">Brand Tagline</label>
                        <input
                          type="text"
                          value={tagline}
                          onChange={(e) => setTagline(e.target.value)}
                          placeholder="Strategic Marketing Meets Cinematic Storytelling"
                          className="bg-transparent border-b border-foreground/15 focus:border-primary outline-none py-2 text-sm text-foreground"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-4 text-left">
                      {/* Logo file */}
                      <BannerImageUpload 
                        label="Brand Logo" 
                        value={logoUrl} 
                        onChange={setLogoUrl} 
                        bucket="thumbnails" 
                        aspectRatio="aspect-square w-20 h-20"
                      />
{/* Favicon file */}
                      <BannerImageUpload 
                        label="Browser Tab Favicon" 
                        value={faviconUrl} 
                        onChange={setFaviconUrl} 
                        bucket="thumbnails" 
                        aspectRatio="aspect-square w-20 h-20"
                      />
                    </div>
                  </div>
                )}

                {/* 2. HOMEPAGE TAB */}
                {activeTab === 'homepage' && (
                  <div className="flex flex-col gap-6 animate-fade-in text-left">
                    <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-foreground/60 border-b border-foreground/10 pb-2 text-left">Homepage Hero Configuration</h3>
                    
                    <div className="flex flex-col gap-1.5 text-left">
                      <label className="text-[9px] uppercase tracking-[0.2em] text-foreground/60 font-bold">Hero Title (Use \n for line breaks)</label>
                      <textarea
                        rows={2}
                        value={heroTitle}
                        onChange={(e) => setHeroTitle(e.target.value)}
                        placeholder="Stories that move people. \nStrategy that moves markets."
                        className="bg-transparent border-b border-foreground/15 focus:border-primary outline-none py-2 text-sm text-foreground resize-none"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5 text-left">
                      <label className="text-[9px] uppercase tracking-[0.2em] text-foreground/60 font-bold">Hero Display Name (Optional overlay name in Hero)</label>
                      <input
                        type="text"
                        value={heroDisplayName}
                        onChange={(e) => setHeroDisplayName(e.target.value)}
                        placeholder="Anii Films"
                        className="bg-transparent border-b border-foreground/15 focus:border-primary outline-none py-2 text-sm text-foreground"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5 text-left">
                      <label className="text-[9px] uppercase tracking-[0.2em] text-foreground/60 font-bold">Hero Subtitle</label>
                      <input
                        type="text"
                        value={heroSubtitle}
                        onChange={(e) => setHeroSubtitle(e.target.value)}
                        placeholder="A portfolio at the intersection of cinema and consumer insight."
                        className="bg-transparent border-b border-foreground/15 focus:border-primary outline-none py-2 text-sm text-foreground"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-end text-left">
                      <div className="flex flex-col gap-1.5 text-left">
                        <label className="text-[9px] uppercase tracking-[0.2em] text-foreground/60 font-bold">CTA Button Text</label>
                        <input
                          type="text"
                          value={heroCtaText}
                          onChange={(e) => setHeroCtaText(e.target.value)}
                          placeholder="Explore Projects"
                          className="bg-transparent border-b border-foreground/15 focus:border-primary outline-none py-2 text-sm text-foreground"
                        />
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <BannerImageUpload 
                          label="Hero Background Image (Optional override)" 
                          value={heroBgUrl} 
                          onChange={setHeroBgUrl} 
                          bucket="hero-images" 
                          aspectRatio="aspect-[21/9]"
                        />
                      </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-foreground/10 text-left">
                      <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-foreground/60 border-b border-foreground/10 pb-2 text-left mb-4">Homepage Portfolio Cards</h3>
                      
                      {homeCardsConfig && (
                        <>
                          <HomeCardEditor 
                            title="Filmmaking Card" 
                            config={homeCardsConfig.filmmaking} 
                            onChange={(filmmaking) => setHomeCardsConfig({ ...homeCardsConfig, filmmaking })} 
                          />
                          <HomeCardEditor 
                            title="Marketing Card" 
                            config={homeCardsConfig.marketing} 
                            onChange={(marketing) => setHomeCardsConfig({ ...homeCardsConfig, marketing })} 
                          />
                        </>
                      )}
                    </div>
                  </div>
                )}

                {/* 3. ABOUT TAB */}
                {activeTab === 'about' && (
                  <div className="flex flex-col gap-6 animate-fade-in text-left">
                    <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-foreground/60 border-b border-foreground/10 pb-2 text-left">About CMS Settings</h3>
                    
                    <div className="flex flex-col gap-1.5 text-left">
                      <label className="text-[9px] uppercase tracking-[0.2em] text-foreground/60 font-bold">About Section Heading</label>
                      <input
                        type="text"
                        value={aboutHeading}
                        onChange={(e) => setAboutHeading(e.target.value)}
                        placeholder="Strategic Marketing Meets Cinematic Storytelling"
                        className="bg-transparent border-b border-foreground/15 focus:border-primary outline-none py-2 text-sm text-foreground"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5 text-left">
                      <label className="text-[9px] uppercase tracking-[0.2em] text-foreground/60 font-bold">About Description Biography</label>
                      <textarea
                        rows={4}
                        value={aboutDescription}
                        onChange={(e) => setAboutDescription(e.target.value)}
                        placeholder="Driven by curiosity..."
                        className="bg-transparent border-b border-foreground/15 focus:border-primary outline-none py-2 text-sm text-foreground resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-4 text-left">
                      {/* Profile Photo */}
                      <BannerImageUpload 
                        label="Profile Photo Image" 
                        value={profilePhotoUrl} 
                        onChange={setProfilePhotoUrl} 
                        bucket="thumbnails" 
                        aspectRatio="aspect-square w-28 h-28"
                      />

                      {/* CV / Resume upload */}
                      <BannerImageUpload 
                        label="Resume (PDF/DOC/Image)" 
                        value={resumeUrl} 
                        onChange={setResumeUrl} 
                        bucket="gallery" 
                        aspectRatio="aspect-[3/4] max-w-[120px]"
                      />
                    </div>
                    
                    <div className="flex flex-col gap-4 mt-6 pt-6 border-t border-foreground/10 text-left">
                      <div className="flex items-center justify-between">
                        <label className="text-[9px] uppercase tracking-[0.2em] text-foreground/60 font-bold">About Stats (e.g. 40+ Projects)</label>
                        <button
                          type="button"
                          onClick={() => setAboutStats([...(aboutStats || []), { value: '', label: '' }])}
                          className="text-[10px] uppercase font-bold text-primary hover:text-primary/80 tracking-wider"
                        >
                          + Add Stat
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {(aboutStats || []).map((stat, idx) => (
                          <div key={idx} className="flex flex-col gap-2 p-4 rounded bg-foreground/5 border border-foreground/10">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-[9px] uppercase tracking-wider font-bold text-foreground/40">Stat {idx + 1}</span>
                              <button
                                type="button"
                                onClick={() => {
                                  const newStats = [...aboutStats];
                                  newStats.splice(idx, 1);
                                  setAboutStats(newStats);
                                }}
                                className="text-red-500 hover:text-red-600"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                            <input
                              type="text"
                              value={stat.value}
                              onChange={(e) => {
                                const newStats = [...aboutStats];
                                newStats[idx].value = e.target.value;
                                setAboutStats(newStats);
                              }}
                              placeholder="e.g. 40+"
                              className="bg-transparent border-b border-foreground/15 focus:border-primary outline-none py-1.5 text-sm font-display text-foreground"
                            />
                            <input
                              type="text"
                              value={stat.label}
                              onChange={(e) => {
                                const newStats = [...aboutStats];
                                newStats[idx].label = e.target.value;
                                setAboutStats(newStats);
                              }}
                              placeholder="e.g. Successful projects"
                              className="bg-transparent border-b border-foreground/15 focus:border-primary outline-none py-1.5 text-xs text-foreground/70"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. CONTACT TAB */}
                {activeTab === 'contact' && (
                  <div className="flex flex-col gap-6 animate-fade-in text-left">
                    <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-foreground/60 border-b border-foreground/10 pb-2 text-left">Contact Panel Channels</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
                      <div className="flex flex-col gap-1.5 text-left">
                        <label className="text-[9px] uppercase tracking-[0.2em] text-foreground/60 font-bold">Gmail / Email Address</label>
                        <input
                          type="email"
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          placeholder="you@email.com"
                          className="bg-transparent border-b border-foreground/15 focus:border-primary outline-none py-2 text-sm text-foreground"
                        />
                      </div>
                      
                      <div className="flex flex-col gap-1.5 text-left">
                        <label className="text-[9px] uppercase tracking-[0.2em] text-foreground/60 font-bold">WhatsApp / Phone No.</label>
                        <input
                          type="text"
                          value={contactPhone}
                          onChange={(e) => setContactPhone(e.target.value)}
                          placeholder="+91 91722 55729"
                          className="bg-transparent border-b border-foreground/15 focus:border-primary outline-none py-2 text-sm text-foreground"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5 text-left">
                        <label className="text-[9px] uppercase tracking-[0.2em] text-foreground/60 font-bold">Office / Residence Address</label>
                        <input
                          type="text"
                          value={contactAddress}
                          onChange={(e) => setContactAddress(e.target.value)}
                          placeholder="Mumbai, India"
                          className="bg-transparent border-b border-foreground/15 focus:border-primary outline-none py-2 text-sm text-foreground"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5 text-left">
                        <label className="text-[9px] uppercase tracking-[0.2em] text-foreground/60 font-bold">Google Maps Coordinate Link</label>
                        <input
                          type="text"
                          value={mapsLink}
                          onChange={(e) => setMapsLink(e.target.value)}
                          placeholder="https://maps.google.com"
                          className="bg-transparent border-b border-foreground/15 focus:border-primary outline-none py-2 text-sm text-foreground"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 5. SOCIALS TAB */}
                {activeTab === 'socials' && (
                  <div className="flex flex-col gap-6 animate-fade-in text-left">
                    <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-foreground/60 border-b border-foreground/10 pb-2 text-left">Social Media URLs</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
                      <div className="flex flex-col gap-1.5 text-left">
                        <label className="text-[9px] uppercase tracking-[0.2em] text-foreground/60 font-bold">Instagram Profile Link</label>
                        <input
                          type="text"
                          value={instagramUrl}
                          onChange={(e) => setInstagramUrl(e.target.value)}
                          placeholder="https://instagram.com/_aniifilms"
                          className="bg-transparent border-b border-foreground/15 focus:border-primary outline-none py-2 text-sm text-foreground"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5 text-left">
                        <label className="text-[9px] uppercase tracking-[0.2em] text-foreground/60 font-bold">LinkedIn Profile Link</label>
                        <input
                          type="text"
                          value={linkedinUrl}
                          onChange={(e) => setLinkedinUrl(e.target.value)}
                          placeholder="https://linkedin.com"
                          className="bg-transparent border-b border-foreground/15 focus:border-primary outline-none py-2 text-sm text-foreground"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5 text-left">
                        <label className="text-[9px] uppercase tracking-[0.2em] text-foreground/60 font-bold">YouTube Channel Link</label>
                        <input
                          type="text"
                          value={youtubeUrl}
                          onChange={(e) => setYoutubeUrl(e.target.value)}
                          placeholder="https://youtube.com"
                          className="bg-transparent border-b border-foreground/15 focus:border-primary outline-none py-2 text-sm text-foreground"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5 text-left">
                        <label className="text-[9px] uppercase tracking-[0.2em] text-foreground/60 font-bold">Behance Profile Link</label>
                        <input
                          type="text"
                          value={behanceUrl}
                          onChange={(e) => setBehanceUrl(e.target.value)}
                          placeholder="https://behance.net"
                          className="bg-transparent border-b border-foreground/15 focus:border-primary outline-none py-2 text-sm text-foreground"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5 text-left">
                        <label className="text-[9px] uppercase tracking-[0.2em] text-foreground/60 font-bold">Vimeo Profile Link</label>
                        <input
                          type="text"
                          value={vimeoUrl}
                          onChange={(e) => setVimeoUrl(e.target.value)}
                          placeholder="https://vimeo.com"
                          className="bg-transparent border-b border-foreground/15 focus:border-primary outline-none py-2 text-sm text-foreground"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 6. SEO TAB */}
                {activeTab === 'seo' && (
                  <div className="flex flex-col gap-6 animate-fade-in text-left">
                    <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-foreground/60 border-b border-foreground/10 pb-2 text-left">SEO & Head Metadata Tags</h3>
                    
                    <div className="flex flex-col gap-1.5 text-left">
                      <label className="text-[9px] uppercase tracking-[0.2em] text-foreground/60 font-bold">Meta Title Tag</label>
                      <input
                        type="text"
                        value={metaTitle}
                        onChange={(e) => setMetaTitle(e.target.value)}
                        placeholder="Anii Films | Portfolio"
                        className="bg-transparent border-b border-foreground/15 focus:border-primary outline-none py-2 text-sm text-foreground"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5 text-left">
                      <label className="text-[9px] uppercase tracking-[0.2em] text-foreground/60 font-bold">Meta Description Tag</label>
                      <textarea
                        rows={3}
                        value={metaDescription}
                        onChange={(e) => setMetaDescription(e.target.value)}
                        placeholder="Strategic Marketing Meets Cinematic Storytelling. Explore projects and campaigns."
                        className="bg-transparent border-b border-foreground/15 focus:border-primary outline-none py-2 text-sm text-foreground resize-none"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <BannerImageUpload 
                        label="Open Graph Image (Social preview)" 
                        value={ogImageUrl} 
                        onChange={setOgImageUrl} 
                        bucket="thumbnails" 
                        aspectRatio="aspect-[1200/630] max-w-sm"
                      />
                    </div>
                  </div>
                )}

                {/* 7. BANNERS & SECTIONS TAB */}
                {activeTab === 'banners' && (
                  <div className="flex flex-col gap-10 animate-fade-in text-left">
                    
                    {/* Homepage Hero Custom Banner */}
                    <div className="flex flex-col gap-6">
                      <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-foreground/60 border-b border-foreground/10 pb-2 text-left">Homepage Hero Custom Override</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
                        <BannerImageUpload 
                          label="Desktop Banner Image"
                          value={homepageBannerDesktopUrl}
                          onChange={setHomepageBannerDesktopUrl}
                        />
                        <BannerImageUpload 
                          label="Mobile Banner Image (Optional)"
                          value={homepageBannerMobileUrl}
                          onChange={setHomepageBannerMobileUrl}
                        />
                        <div className="flex flex-col gap-1.5 text-left">
                          <label className="text-[9px] uppercase tracking-[0.2em] text-foreground/60 font-bold">Overlay Opacity (0–100%)</label>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={homepageBannerOpacity}
                            onChange={(e) => setHomepageBannerOpacity(Number(e.target.value))}
                            className="bg-transparent border-b border-foreground/15 focus:border-primary outline-none py-2 text-sm text-foreground"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5 text-left">
                          <label className="text-[9px] uppercase tracking-[0.2em] text-foreground/60 font-bold">Banner Blur Radius (px)</label>
                          <input
                            type="number"
                            min="0"
                            max="50"
                            value={homepageBannerBlur}
                            onChange={(e) => setHomepageBannerBlur(Number(e.target.value))}
                            className="bg-transparent border-b border-foreground/15 focus:border-primary outline-none py-2 text-sm text-foreground"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Filmmaking Section */}
                    <div className="flex flex-col gap-6">
                      <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-foreground/60 border-b border-foreground/10 pb-2 text-left">Filmmaking Section & Banner</h3>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
                        <div className="flex flex-col gap-1.5 text-left">
                          <label className="text-[9px] uppercase tracking-[0.2em] text-foreground/60 font-bold">Filmmaking Title</label>
                          <input
                            type="text"
                            value={filmmakingTitle}
                            onChange={(e) => setFilmmakingTitle(e.target.value)}
                            placeholder="Filmmaking"
                            className="bg-transparent border-b border-foreground/15 focus:border-primary outline-none py-2 text-sm text-foreground"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5 text-left">
                          <label className="text-[9px] uppercase tracking-[0.2em] text-foreground/60 font-bold">Filmmaking Description</label>
                          <input
                            type="text"
                            value={filmmakingDescription}
                            onChange={(e) => setFilmmakingDescription(e.target.value)}
                            placeholder="Bridging the gap..."
                            className="bg-transparent border-b border-foreground/15 focus:border-primary outline-none py-2 text-sm text-foreground"
                          />
                        </div>
                        
                        <BannerImageUpload 
                          label="Default Banner Image"
                          value={filmmakingBannerUrl}
                          onChange={setFilmmakingBannerUrl}
                        />
                        <BannerImageUpload 
                          label="Desktop Only Override (Optional)"
                          value={filmmakingBannerDesktopUrl}
                          onChange={setFilmmakingBannerDesktopUrl}
                        />
                        <BannerImageUpload 
                          label="Mobile Only Override (Optional)"
                          value={filmmakingBannerMobileUrl}
                          onChange={setFilmmakingBannerMobileUrl}
                        />

                        <div className="flex flex-col gap-1.5 text-left">
                          <label className="text-[9px] uppercase tracking-[0.2em] text-foreground/60 font-bold">Overlay Opacity (0–100%)</label>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={filmmakingBannerOpacity}
                            onChange={(e) => setFilmmakingBannerOpacity(Number(e.target.value))}
                            className="bg-transparent border-b border-foreground/15 focus:border-primary outline-none py-2 text-sm text-foreground"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5 text-left">
                          <label className="text-[9px] uppercase tracking-[0.2em] text-foreground/60 font-bold">Banner Height (e.g., 50vh, 400px)</label>
                          <input
                            type="text"
                            value={filmmakingBannerHeight}
                            onChange={(e) => setFilmmakingBannerHeight(e.target.value)}
                            placeholder="50vh"
                            className="bg-transparent border-b border-foreground/15 focus:border-primary outline-none py-2 text-sm text-foreground"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5 text-left">
                          <label className="text-[9px] uppercase tracking-[0.2em] text-foreground/60 font-bold">Banner Position (e.g., center, top)</label>
                          <input
                            type="text"
                            value={filmmakingBannerPosition}
                            onChange={(e) => setFilmmakingBannerPosition(e.target.value)}
                            placeholder="center"
                            className="bg-transparent border-b border-foreground/15 focus:border-primary outline-none py-2 text-sm text-foreground"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5 text-left col-span-2">
                          <label className="text-[9px] uppercase tracking-[0.2em] text-foreground/60 font-bold">Banner Blur Radius (px)</label>
                          <input
                            type="number"
                            min="0"
                            max="50"
                            value={filmmakingBannerBlur}
                            onChange={(e) => setFilmmakingBannerBlur(Number(e.target.value))}
                            className="bg-transparent border-b border-foreground/15 focus:border-primary outline-none py-2 text-sm text-foreground"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Marketing Section */}
                    <div className="flex flex-col gap-6">
                      <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-foreground/60 border-b border-foreground/10 pb-2 text-left">Marketing Section & Banner</h3>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
                        <div className="flex flex-col gap-1.5 text-left">
                          <label className="text-[9px] uppercase tracking-[0.2em] text-foreground/60 font-bold">Marketing Title</label>
                          <input
                            type="text"
                            value={marketingTitle}
                            onChange={(e) => setMarketingTitle(e.target.value)}
                            placeholder="Marketing"
                            className="bg-transparent border-b border-foreground/15 focus:border-primary outline-none py-2 text-sm text-foreground"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5 text-left">
                          <label className="text-[9px] uppercase tracking-[0.2em] text-foreground/60 font-bold">Marketing Description</label>
                          <input
                            type="text"
                            value={marketingDescription}
                            onChange={(e) => setMarketingDescription(e.target.value)}
                            placeholder="Strategic planning..."
                            className="bg-transparent border-b border-foreground/15 focus:border-primary outline-none py-2 text-sm text-foreground"
                          />
                        </div>
                        
                        <BannerImageUpload 
                          label="Default Banner Image"
                          value={marketingBannerUrl}
                          onChange={setMarketingBannerUrl}
                        />
                        <BannerImageUpload 
                          label="Desktop Only Override (Optional)"
                          value={marketingBannerDesktopUrl}
                          onChange={setMarketingBannerDesktopUrl}
                        />
                        <BannerImageUpload 
                          label="Mobile Only Override (Optional)"
                          value={marketingBannerMobileUrl}
                          onChange={setMarketingBannerMobileUrl}
                        />

                        <div className="flex flex-col gap-1.5 text-left">
                          <label className="text-[9px] uppercase tracking-[0.2em] text-foreground/60 font-bold">Overlay Opacity (0–100%)</label>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={marketingBannerOpacity}
                            onChange={(e) => setMarketingBannerOpacity(Number(e.target.value))}
                            className="bg-transparent border-b border-foreground/15 focus:border-primary outline-none py-2 text-sm text-foreground"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5 text-left">
                          <label className="text-[9px] uppercase tracking-[0.2em] text-foreground/60 font-bold">Banner Height (e.g., 50vh, 400px)</label>
                          <input
                            type="text"
                            value={marketingBannerHeight}
                            onChange={(e) => setMarketingBannerHeight(e.target.value)}
                            placeholder="50vh"
                            className="bg-transparent border-b border-foreground/15 focus:border-primary outline-none py-2 text-sm text-foreground"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5 text-left">
                          <label className="text-[9px] uppercase tracking-[0.2em] text-foreground/60 font-bold">Banner Position (e.g., center, top)</label>
                          <input
                            type="text"
                            value={marketingBannerPosition}
                            onChange={(e) => setMarketingBannerPosition(e.target.value)}
                            placeholder="center"
                            className="bg-transparent border-b border-foreground/15 focus:border-primary outline-none py-2 text-sm text-foreground"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5 text-left col-span-2">
                          <label className="text-[9px] uppercase tracking-[0.2em] text-foreground/60 font-bold">Banner Blur Radius (px)</label>
                          <input
                            type="number"
                            min="0"
                            max="50"
                            value={marketingBannerBlur}
                            onChange={(e) => setMarketingBannerBlur(Number(e.target.value))}
                            className="bg-transparent border-b border-foreground/15 focus:border-primary outline-none py-2 text-sm text-foreground"
                          />
                        </div>
                      </div>
                    </div>

                  </div>
                )}

                {/* Save Submit Button */}
                <div className="border-t border-foreground/10 pt-8 flex items-center justify-end">
                  <motion.button
                    type="submit"
                    disabled={loading || fetchLoading}
                    whileHover={{ scale: loading || fetchLoading ? 1 : 1.01 }}
                    whileTap={{ scale: loading || fetchLoading ? 1 : 0.99 }}
                    className="flex items-center justify-center gap-2.5 px-8 py-4 bg-primary hover:bg-primary/95 text-primary-foreground font-semibold tracking-widest uppercase text-[10px] rounded-md shadow-md transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-primary-foreground/20 border-t-primary-foreground rounded-full animate-spin"></div>
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-3.5 h-3.5" />
                        <span>Save Settings</span>
                      </>
                    )}
                  </motion.button>
                </div>

              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
