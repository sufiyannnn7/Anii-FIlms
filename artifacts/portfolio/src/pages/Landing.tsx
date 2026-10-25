import React, { useState } from 'react';
import { AnimatedPage } from '@/components/ui/AnimatedPage';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { GoldDust } from '@/components/effects/GoldDust';
import { TiltCard } from '@/components/effects/TiltCard';
import { Send, ArrowRight, Sparkles, Lightbulb, Compass, Share2, FileText } from 'lucide-react';
import { useSiteSettings } from '@/lib/settings';
import { ContactForm } from '@/components/sections/ContactForm';
import { InteractiveAboutSection } from '@/components/sections/InteractiveAboutSection';

export default function Landing() {
  const { data: settings } = useSiteSettings();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const hasSettings = !!settings;
  const brandName = settings?.brand_name || 'Anii Films';
  const tagline = settings?.tagline || 'Strategic Marketing Meets Cinematic Storytelling';
  const logoUrl = settings?.logo_url;
  const email = settings?.contact_email || 'aniket24007@gmail.com';
  const instagram = settings?.instagram_url || 'https://instagram.com/_aniifilms';
  const whatsapp = settings?.contact_phone 
    ? `https://wa.me/${settings.contact_phone.replace(/\D/g, '')}` 
    : 'https://wa.me/919172255729';

  const showLogo = hasSettings ? !!settings.logo_url : true;
  const showHeroName = hasSettings ? !!settings.hero_display_name : false;
  const showHeroTitle = !hasSettings || !!settings.hero_title;
  const showHeroSubtitle = !hasSettings || !!settings.hero_subtitle;
  const showHeroCta = !hasSettings || !!settings.hero_cta_text;
  
  const showAboutSection = !hasSettings || !!settings.about_heading || !!settings.about_description || !!settings.profile_photo_url || !!settings.resume_url;
  const showAboutHeading = !hasSettings || !!settings.about_heading;
  const showAboutBio = !hasSettings || !!settings.about_description;
  const showProfilePhoto = !hasSettings || !!settings.profile_photo_url;
  const showResume = !hasSettings || !!settings.resume_url;

  const showEmail = !hasSettings || !!settings.contact_email;
  const showInstagram = !hasSettings || !!settings.instagram_url;
  const showWhatsapp = !hasSettings || !!settings.contact_phone;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;

    const lines = [
      `Hey, I'm ${form.name} 👋`,
      `Email: ${form.email}`,
      form.message && `Project details: ${form.message}`,
      `I want to start a genuine creative conversation.`,
    ].filter(Boolean);

    const messageText = encodeURIComponent(lines.join('\n'));
    const rawPhone = settings?.contact_phone || '919172255729';
    const phoneDigits = rawPhone.replace(/\D/g, '');
    window.open(`https://wa.me/${phoneDigits}?text=${messageText}`, '_blank', 'noreferrer');

    setSent(true);
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <AnimatedPage className="bg-[#f4f3ee] text-foreground relative w-full overflow-x-hidden">
      {/* Noise Overlay */}
      <div className="fixed inset-0 z-[60] noise-overlay mix-blend-overlay pointer-events-none"></div>

      {/* Floating Parallax 3D Petals & Leaves Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        <GoldDust count={40} />
      </div>

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[100dvh] flex flex-col justify-between pt-36 pb-12 px-6 overflow-hidden">
        {/* Hero Background Override */}
        {(() => {
          const bgUrl = settings?.homepage_banner_desktop_url || settings?.hero_bg_url;
          const mobileBgUrl = settings?.homepage_banner_mobile_url || bgUrl;
          const opacity = (settings?.homepage_banner_opacity !== undefined && settings?.homepage_banner_opacity !== null ? settings.homepage_banner_opacity : 25) / 100;
          const blur = settings?.homepage_banner_blur || 0;

          if (!bgUrl) return null;

          return (
            <div className="absolute inset-0 z-0 pointer-events-none" style={{ opacity }}>
              <picture>
                {mobileBgUrl && <source media="(max-width: 639px)" srcSet={mobileBgUrl} />}
                <img 
                  src={bgUrl} 
                  alt="Background" 
                  className="w-full h-full object-cover" 
                  style={{ filter: `brightness(0.7) blur(${blur}px)` }}
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/25 to-[#f4f3ee]" />
            </div>
          );
        })()}

        {/* Soft decorative background glows */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/[0.03] rounded-full blur-[120px] pointer-events-none" />
        
        <div className="flex-1 flex flex-col items-center justify-center text-center max-w-4xl mx-auto relative z-20">
          {/* Scaled-up Logo element in hero */}
          {showHeroName && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.1, ease: "easeOut" }}
              className="font-display text-4xl sm:text-5xl md:text-6xl text-foreground font-normal tracking-wide mb-8 animate-fade-in"
            >
              {settings?.hero_display_name}
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-10"
          >
            <span className="inline-block px-6 py-2 rounded-full border border-foreground/20 text-[10px] sm:text-xs uppercase tracking-[0.2em] text-foreground/80 font-medium">
              {settings?.hero_tagline || '• FILMMAKER • MARKETER • STORYTELLER •'}
            </span>
          </motion.div>
          
          {showHeroTitle && (
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#740427] leading-[1.05] mb-8 text-center"
              style={{ whiteSpace: 'pre-line' }}
            >
              {settings?.hero_title || 'Stories that move people. \nStrategy that moves \nmarkets.'}
            </motion.h1>
          )}

          {showHeroSubtitle && (
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 0.5, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="text-xs sm:text-sm md:text-base font-light tracking-[0.15em] uppercase max-w-xl text-foreground text-center"
            >
              {settings?.hero_subtitle || 'A portfolio at the intersection of cinema and consumer insight.'}
            </motion.p>
          )}

          {showHeroCta && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="mt-10"
            >
              <button
                onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative inline-flex items-center gap-3 px-9 py-4 bg-foreground text-background hover:bg-foreground/90 tracking-[0.22em] uppercase text-[11px] font-bold rounded-full transition-all duration-300 shadow-md hover:shadow-[0_15px_35px_rgba(0,0,0,0.22)] hover:-translate-y-0.5 cursor-pointer overflow-hidden border border-foreground/20"
              >
                {/* Shimmer Effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none" />
                
                <span>{settings?.hero_cta_text || 'Explore Projects'}</span>
                
                <ArrowRight className="w-4 h-4 text-background transition-transform duration-300 group-hover:translate-x-1.5" />
              </button>
            </motion.div>
          )}
        </div>

        {/* Scroll down indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="flex flex-col items-center gap-2 cursor-pointer z-20"
          onClick={() => {
            const targetId = showAboutSection ? 'about' : 'philosophy';
            document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span className="text-[9px] tracking-[0.25em] uppercase font-bold text-foreground/70">Scroll</span>
          <div className="w-[1px] h-10 bg-foreground/20 relative overflow-hidden">
            <motion.div 
              animate={{ y: ['-100%', '100%'] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-0 left-0 w-full h-[40%] bg-primary"
            />
          </div>
        </motion.div>
      </section>

      {/* 2. ABOUT SECTION */}
      {showAboutSection && (
        <InteractiveAboutSection
          settings={settings}
          showAboutHeading={showAboutHeading}
          showAboutBio={showAboutBio}
          showProfilePhoto={showProfilePhoto}
          showResume={showResume}
        />
      )}

      {/* 3. PHILOSOPHY / APPROACH SECTION */}
      <section id="philosophy" className="relative py-28 md:py-36 border-t border-foreground/10 z-20 overflow-hidden bg-background">
        {/* Film Grain Texture Overlay */}
        <div className="absolute inset-0 noise-overlay opacity-[0.025] pointer-events-none z-0" />
        
        {/* Ambient Floating Gold Dust in Air */}
        <div className="absolute inset-0 pointer-events-none z-0 opacity-30">
          <GoldDust count={16} />
        </div>

        {/* Section Container Slow Fade-In Reveal */}
        <motion.div 
          initial={{ opacity: 0, y: 55 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="container mx-auto px-6 max-w-7xl relative z-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
            
            {/* Left title and info - Staggered Fade In + Floating Weightlessly in Air */}
            <motion.div 
              initial={{ opacity: 0, x: -40, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.0, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 flex flex-col justify-start lg:sticky lg:top-36 text-left"
            >
              <motion.div
                animate={{ y: [-9, 9, -9], rotate: [-0.6, 0.6, -0.6] }}
                transition={{
                  duration: 6.5,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                <motion.span 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold mb-4 flex items-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5" /> 02 / APPROACH
                </motion.span>
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display text-4xl sm:text-5xl md:text-6xl text-foreground leading-tight mb-8 text-left"
                >
                  How I Help <br/>
                  <span className="italic text-primary bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                    Build Brands
                  </span>
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="text-foreground/70 font-light leading-relaxed text-base sm:text-lg text-left"
                >
                  My philosophy is simple: beautiful visuals mean nothing if they don't serve a clear business objective. I bridge the gap between creative execution and marketing strategy. When approaching a new task, I don't start with the camera; I start with the consumer. By understanding audience psychology and market gaps, we can engineer content that doesn't just look cinematic, but actually performs.
                </motion.p>
              </motion.div>
            </motion.div>

            {/* Right side process items with staggered fade-in entrance + continuous air floating motion */}
            <div className="lg:col-span-7 flex flex-col gap-6 w-full">
              {[
                {
                  id: "01",
                  title: "Intentional Creativity",
                  desc: "Every lighting choice, focal length, and edit is designed to evoke a specific emotion that aligns with the brand's core message.",
                  icon: Lightbulb,
                  floatDuration: 5.0,
                  floatDelay: 0,
                  floatY: [-12, 12, -12],
                  floatRotate: [-1.2, 1.2, -1.2]
                },
                {
                  id: "02",
                  title: "Audience-First Storytelling",
                  desc: "Creating narratives that speak directly to the target demographic's desires and pain points.",
                  icon: Compass,
                  floatDuration: 5.8,
                  floatDelay: 0.6,
                  floatY: [12, -12, 12],
                  floatRotate: [1.2, -1.2, 1.2]
                },
                {
                  id: "03",
                  title: "Holistic Execution",
                  desc: "Ensuring that the strategic vision remains uncompromised from the initial moodboard through production and final distribution.",
                  icon: Share2,
                  floatDuration: 6.6,
                  floatDelay: 1.2,
                  floatY: [-10, 10, -10],
                  floatRotate: [-1.0, 1.0, -1.0]
                }
              ].map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 50, y: 30 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.9, delay: 0.2 + index * 0.18, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full"
                  >
                    <motion.div
                      animate={{ y: item.floatY, rotate: item.floatRotate }}
                      transition={{ 
                        duration: item.floatDuration, 
                        repeat: Infinity, 
                        ease: 'easeInOut',
                        delay: item.floatDelay
                      }}
                    >
                      <TiltCard maxTilt={2.5} glare={false} className="w-full">
                        <div className="group rounded-2xl p-8 sm:p-10 border border-foreground/10 bg-card/75 hover:bg-card/95 hover:border-foreground/30 transition-all duration-500 shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] flex gap-6 items-start text-left relative overflow-hidden backdrop-blur-md">
                          {/* Interactive Accent Glow Line */}
                          <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                          <div className="w-12 h-12 rounded-full border border-foreground/20 flex items-center justify-center bg-foreground/5 text-foreground shrink-0 font-serif text-lg font-semibold group-hover:bg-primary group-hover:text-background group-hover:border-primary group-hover:scale-110 transition-all duration-500 shadow-sm">
                            {item.id}
                          </div>
                          <div className="flex-1 space-y-2 text-left">
                            <h3 className="text-lg sm:text-2xl text-foreground font-semibold tracking-wide flex items-center gap-2 text-left group-hover:text-primary transition-colors duration-300">
                              {item.title}
                              <IconComponent className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300 text-primary transform group-hover:translate-x-1" />
                            </h3>
                            <p className="text-foreground/75 font-light leading-relaxed text-sm sm:text-base text-left">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      </TiltCard>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </motion.div>
      </section>

      {/* 4. WORK SECTION */}
      <section id="work" className="relative py-28 md:py-36 border-t border-foreground/10 bg-secondary/15 z-20">
        <div className="container mx-auto px-6 max-w-7xl">
          
          <div className="flex flex-col items-center text-center mb-16 sm:mb-24">
            <span className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold mb-4 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" /> 03 / PORTFOLIO
            </span>
            <h2 className="font-display text-4xl sm:text-6xl text-foreground">
              My Work
            </h2>
            <div className="w-12 h-[1.5px] bg-foreground/15 mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {[
              { id: 'filmmaking', config: settings?.home_cards_config?.filmmaking, defaultLink: '/filmmaking', defaultTitle: 'Filmmaking', defaultBtn: 'Explore Projects' },
              { id: 'marketing', config: settings?.home_cards_config?.marketing, defaultLink: '/marketing', defaultTitle: 'Marketing', defaultBtn: 'Explore Campaigns' }
            ].sort((a, b) => (a.config?.card_order || 0) - (b.config?.card_order || 0))
            .filter(item => item.config?.show_card !== false)
            .map((item) => {
              let bgImage = item.config?.bg_image;
              
              if (bgImage?.includes('/attached_assets/')) {
                bgImage = null;
              }

              if (!bgImage) {
                if (item.id === 'filmmaking') bgImage = settings?.filmmaking_banner_url;
                if (item.id === 'marketing') bgImage = settings?.marketing_banner_url;
              }
              
              const title = item.config?.title || item.defaultTitle;
              const btnText = item.config?.button_text || item.defaultBtn;
              const btnLink = item.config?.button_link || item.defaultLink;
              const opacity = item.config?.overlay_opacity !== undefined ? item.config.overlay_opacity : 90;
              const overlayColor = item.config?.overlay_color || '#000000';
              const titleColor = item.config?.title_color || item.config?.text_color || '#ffffff';
              const textColor = item.config?.text_color || '#ffffff';
              const cardHeight = item.config?.card_height || 'aspect-[4/3.5]';
              const borderRadius = item.config?.border_radius || 'rounded-xl';
              const textAlignment = item.config?.text_alignment === 'center' ? 'text-center items-center' : item.config?.text_alignment === 'right' ? 'text-right items-end' : 'text-left items-start';
              const textAlignClass = item.config?.text_alignment === 'center' ? 'text-center justify-center' : item.config?.text_alignment === 'right' ? 'text-right justify-end' : 'text-left justify-start';

              return (
                <Link key={item.id} href={btnLink} className={`group block cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] ${borderRadius} overflow-hidden h-full`}>
                  <TiltCard maxTilt={4} glare={true} className={`${borderRadius} overflow-hidden h-full`}>
                    <div className={`relative w-full ${cardHeight} overflow-hidden flex flex-col justify-end p-8 border border-foreground/10 shadow-md`}>
                      {/* Background Image */}
                      <div className="absolute inset-0 z-0 bg-secondary/10">
                        {bgImage ? (
                          <img 
                            src={bgImage} 
                            alt={title} 
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter brightness-[0.7] group-hover:brightness-[0.9]"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-foreground/5">
                            <span className="text-foreground/30 uppercase tracking-widest text-xs font-bold font-display">{title} Background</span>
                          </div>
                        )}
                        <div 
                          className="absolute inset-0" 
                          style={{
                            background: `linear-gradient(to top, ${overlayColor} 0%, transparent 100%)`,
                            opacity: opacity / 100
                          }} 
                        />
                      </div>
                      
                      {/* Card Content */}
                      <div className={`relative z-10 flex flex-col gap-4 ${textAlignment}`} style={{ color: textColor }}>
                        <div className={`space-y-1 w-full ${textAlignClass}`}>
                          <h3 className={`font-display text-4xl md:text-5xl leading-tight ${textAlignClass}`} style={{ color: titleColor }}>{title}</h3>
                          <p className={`text-xs font-light tracking-[0.1em] uppercase opacity-70 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 ${textAlignClass}`}>
                            {btnText} <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                          </p>
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. CONTACT SECTION */}
      <section id="contact" className="relative py-28 md:py-36 border-t border-foreground/10 z-20 overflow-hidden bg-secondary/15">
        {/* Ambient warm light blur */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-primary/[0.03] rounded-full blur-[140px] pointer-events-none" />

        <div className="container mx-auto px-6 max-w-5xl relative z-10">
          
          <div className="mb-16 text-center max-w-2xl mx-auto space-y-4">
            <span className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold flex items-center justify-center gap-2">
              <Sparkles className="w-3.5 h-3.5" /> 04 / CONNECT
            </span>
            <h2 className="font-display text-5xl sm:text-7xl text-foreground text-center">
              {settings?.contact_heading || "Let's Work Together"}
            </h2>
            <div className="w-16 h-[1.5px] bg-foreground/15 mx-auto" />
            <p className="text-sm sm:text-base text-foreground/60 font-light leading-relaxed text-center">
              {settings?.contact_description || "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision."}
            </p>
          </div>

          {/* Dynamic 3D Contact Form Card */}
          <TiltCard maxTilt={3} glare={true} className="max-w-2xl mx-auto mb-16">
            <ContactForm />
          </TiltCard>

          {/* Social details display grid */}
          {(showEmail || showWhatsapp || showInstagram) && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto text-left">
              
              {/* Email Contact Detail */}
              {showEmail && (
                <motion.a
                  href={`mailto:${email}`}
                  whileHover={{ y: -4 }}
                  className="flex items-center gap-4 glass p-4 rounded-xl border border-foreground/10 bg-card/85 hover:bg-card transition-all shadow-sm text-left"
                >
                  <div 
                    className="w-12 h-12 rounded-full bg-[#EA4335] flex items-center justify-center text-white shrink-0 shadow-sm"
                    style={{ boxShadow: '0 0 10px rgba(234,67,53,0.15)' }}
                  >
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                  </div>
                  <div className="text-left min-w-0 flex-1">
                    <span className="text-[8px] uppercase tracking-widest text-foreground/45 font-bold block">Gmail ID</span>
                    <span className="text-xs text-foreground font-semibold truncate whitespace-nowrap overflow-hidden text-ellipsis block max-w-[180px]" title={email}>{email}</span>
                  </div>
                </motion.a>
              )}

              {/* WhatsApp Contact Detail */}
              {showWhatsapp && (
                <motion.a
                  href={whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -4 }}
                  className="flex items-center gap-4 glass p-4 rounded-xl border border-foreground/10 bg-card/85 hover:bg-card transition-all shadow-sm text-left min-w-0"
                >
                  <div 
                    className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center text-white shrink-0 shadow-sm"
                    style={{ boxShadow: '0 0 10px rgba(37,211,102,0.15)' }}
                  >
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.517 2.266 2.27 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.528 2.01 14.069.99 11.419.99c-5.442 0-9.866 4.372-9.87 9.802 0 1.83.504 3.618 1.46 5.181L2.01 21.6l5.787-1.503c-1.85 1.09-2.01 1.056-1.15 2.057zm11.373-7.534c-.3-.15-1.771-.875-2.045-.975-.275-.1-.475-.15-.675.15-.2.3-.775.975-.95 1.175-.175.2-.35.225-.65.075-.3-.15-1.265-.467-2.41-1.485-.89-.795-1.49-1.77-1.665-2.07-.175-.3-.02-.46.13-.61.135-.13.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.675-1.625-.925-2.225-.244-.589-.48-.58-.66-.59-.17-.01-.367-.01-.567-.01-.2 0-.525.075-.8.375-.275.3-1.05 1.025-1.05 2.5s1.075 2.9 1.225 3.1c.15.2 2.11 3.22 5.11 4.52.714.31 1.272.496 1.708.635.717.228 1.37.196 1.885.12.574-.085 1.771-.725 2.02-1.425.25-.7.25-1.3.175-1.425-.075-.125-.275-.2-.575-.35z" />
                    </svg>
                  </div>
                  <div className="text-left min-w-0 flex-1">
                    <span className="text-[8px] uppercase tracking-widest text-foreground/45 font-bold block">WhatsApp / Call</span>
                    <span className="text-xs text-foreground font-semibold truncate whitespace-nowrap overflow-hidden text-ellipsis block max-w-[180px]" title={settings?.contact_phone || '+91 91722 55729'}>
                      {settings?.contact_phone || '+91 91722 55729'}
                    </span>
                  </div>
                </motion.a>
              )}

              {/* Instagram Contact Detail */}
              {showInstagram && (
                <motion.a
                  href={instagram}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -4 }}
                  className="flex items-center gap-4 glass p-4 rounded-xl border border-foreground/10 bg-card/85 hover:bg-card transition-all shadow-sm text-left min-w-0"
                >
                  <div 
                    className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] flex items-center justify-center text-white shrink-0 shadow-sm"
                    style={{ boxShadow: '0 0 10px rgba(238,42,123,0.15)' }}
                  >
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                    </svg>
                  </div>
                  <div className="text-left min-w-0 flex-1">
                    <span className="text-[8px] uppercase tracking-widest text-foreground/45 font-bold block">Instagram</span>
                    <span className="text-xs text-foreground font-semibold truncate whitespace-nowrap overflow-hidden text-ellipsis block max-w-[180px]" title={settings?.instagram_url ? `@${settings.instagram_url.split('/').filter(Boolean).pop()}` : '@_aniifilms'}>
                      {settings?.instagram_url ? `@${settings.instagram_url.split('/').filter(Boolean).pop()}` : '@_aniifilms'}
                    </span>
                  </div>
                </motion.a>
              )}

            </div>
          )}

        </div>
      </section>
    </AnimatedPage>
  );
}