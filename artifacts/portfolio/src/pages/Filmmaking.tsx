import { AnimatedPage } from '@/components/ui/AnimatedPage';
import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { BackButton } from '@/components/ui/BackButton';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Film } from 'lucide-react';
import { useSiteSettings } from '@/lib/settings';

export default function Filmmaking() {
  const [activeCategory, setActiveCategory] = useState('All');
  const { data: settings } = useSiteSettings();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getAspectClass = (ratio: string | null | undefined): string => {
    switch (ratio) {
      case 'Landscape': return 'aspect-[16/9]';
      case 'Portrait': return 'aspect-[4/5]';
      case 'Square': return 'aspect-[1/1]';
      case 'Banner': return 'aspect-[21/9]';
      default: return ''; // Intrinsic ratio
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://placehold.co/1920x1080/1a1a1a/444444?text=No+Image';
    e.currentTarget.onerror = null;
  };

  // Fetch dynamic categories
  const { data: dbCategories = [] } = useQuery({
    queryKey: ['public-categories', 'Filmmaking'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('name')
        .eq('section', 'Filmmaking');
      if (error) throw error;
      return data || [];
    }
  });

  const filmCategories = ['All', ...dbCategories.map(c => c.name).sort((a, b) => a.localeCompare(b))];

  const { data: films = [], isLoading, error } = useQuery({
    queryKey: ['public-projects', 'Filmmaking'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('section', 'Filmmaking')
        .eq('status', 'Published')
        .order('display_order', { ascending: true })
        .order('id', { ascending: false });
      if (error) throw error;
      return data || [];
    }
  });

  if (isLoading) {
    return (
      <AnimatedPage className="min-h-screen bg-[#f4f3ee] text-foreground flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-foreground/10 border-t-primary rounded-full animate-spin"></div>
          <span className="text-[10px] uppercase tracking-[0.2em] text-foreground/50 font-semibold animate-pulse">Loading creative collection...</span>
        </div>
      </AnimatedPage>
    );
  }

  if (error) {
    return (
      <AnimatedPage className="min-h-screen bg-[#f4f3ee] text-foreground flex items-center justify-center">
        <div className="max-w-md p-8 border border-destructive/20 bg-destructive/5 rounded-lg text-center flex flex-col items-center gap-4 mx-6">
          <span className="text-xs uppercase tracking-widest text-destructive font-semibold">Error Loading Collection</span>
          <p className="text-sm text-foreground/60 font-light">{(error as any)?.message || 'Unable to retrieve creative items at this time.'}</p>
          <button onClick={() => window.location.reload()} className="px-4 py-2 bg-foreground/5 hover:bg-foreground/10 border border-foreground/10 text-xs uppercase tracking-widest font-bold transition-all cursor-pointer">
            Retry
          </button>
        </div>
      </AnimatedPage>
    );
  }

  if (!films || films.length === 0) {
    return (
      <>
        <div className="fixed top-28 left-4 sm:left-6 md:left-12 z-[70]">
          <BackButton href="/" label="Back Home" />
        </div>
        <AnimatedPage className="min-h-screen bg-[#f4f3ee] text-foreground flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md flex flex-col items-center gap-6">
            <div className="w-12 h-12 rounded-full border border-foreground/10 flex items-center justify-center text-foreground/35">
              <Film className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display text-2xl mb-2 text-foreground">Creative Directory Empty</h2>
              <p className="text-sm text-foreground/50 font-light leading-relaxed">Our cinematic workspace is currently preparing new storytelling collections. Please check back soon.</p>
            </div>
          </div>
        </AnimatedPage>
      </>
    );
  }

  const filteredFilms = activeCategory === 'All' 
    ? films 
    : films.filter(film => film.category === activeCategory);

  return (
    <>
      <div className="fixed top-28 left-4 sm:left-6 md:left-12 z-[70]">
        <BackButton href="/" label="Back Home" />
      </div>

      <AnimatedPage className="min-h-screen bg-[#f4f3ee] text-foreground relative">
        <div className="fixed inset-0 z-[100] noise-overlay mix-blend-overlay pointer-events-none"></div>

        {/* Dynamic Section Banner */}
        {(() => {
          const title = settings?.filmmaking_title || 'Filmmaking';
          const description = settings?.filmmaking_description || 'Emotion in motion. Exploring narrative, light, and performance.';
          const desktopBanner = settings?.filmmaking_banner_desktop_url || settings?.filmmaking_banner_url || 'https://placehold.co/1920x1080/1a1a1a/444444?text=Filmmaking';
          const mobileBanner = settings?.filmmaking_banner_mobile_url || settings?.filmmaking_banner_url || '';
          const opacity = (settings?.filmmaking_banner_opacity !== undefined && settings?.filmmaking_banner_opacity !== null ? settings.filmmaking_banner_opacity : 40) / 100;
          const height = settings?.filmmaking_banner_height || '50vh';
          const position = settings?.filmmaking_banner_position || 'center';
          const blur = settings?.filmmaking_banner_blur || 0;

          return (
            <section className="relative w-full flex items-center justify-center overflow-hidden bg-black" style={{ height }}>
              <div className="absolute inset-0 z-0 bg-black">
                <picture>
                  {mobileBanner && <source media="(max-width: 639px)" srcSet={mobileBanner} />}
                  <img 
                    src={desktopBanner} 
                    alt={title} 
                    onError={handleImageError}
                    className="w-full h-full object-cover opacity-80"
                    style={{
                      objectPosition: position,
                      filter: `brightness(${1 - opacity}) blur(${blur}px)`
                    }}
                  />
                </picture>
                <div className="absolute inset-0" style={{
                  backgroundImage: 'linear-gradient(180deg, rgba(0,0,0,0.65), rgba(0,0,0,0.35), rgba(0,0,0,0.75))'
                }} />
              </div>

              <div className="relative z-10 container mx-auto px-6 text-center pt-20">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-white mb-6 text-glow">
                    {title}
                  </h1>
                  <p className="text-lg md:text-xl text-white/70 font-light max-w-2xl mx-auto tracking-wide">
                    {description}
                  </p>
                </motion.div>
              </div>
            </section>
          );
        })()}

        {/* Filter Tabs */}
        <section className="sticky top-[88px] z-40 bg-[#f4f3ee]/90 backdrop-blur-xl border-y border-foreground/10 py-4">
          <div className="container mx-auto px-6">
            <div className="flex overflow-x-auto hide-scrollbar gap-8 items-center justify-start md:flex-wrap md:justify-center">
              {filmCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`whitespace-nowrap uppercase tracking-[0.15em] text-[10px] sm:text-xs font-semibold transition-all duration-300 relative pb-2 cursor-pointer ${
                    activeCategory === category ? 'text-foreground' : 'text-foreground/50 hover:text-foreground'
                  }`}
                >
                  {category}
                  {activeCategory === category && (
                    <motion.div 
                      layoutId="activeFilmTab"
                      className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-primary"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Project Grid */}
        <section className="container mx-auto px-6 py-24 relative z-10 max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 w-full mx-auto items-start">
            <AnimatePresence mode="popLayout">
              {filteredFilms.map((film: any) => {
                const aspectClass = getAspectClass(film.aspect_ratio) || 'aspect-[16/9]';
                return (
                  <motion.div
                    key={film.id}
                    layout
                    initial={{ opacity: 0, scale: 0.96, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, scale: 0.96, filter: 'blur(8px)' }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full min-w-0 flex flex-col"
                  >
                    <Link href={`/filmmaking/${film.slug}`} className={`group block w-full relative overflow-hidden rounded-sm border border-foreground/10 ${aspectClass} shadow-md bg-black cursor-pointer transform-gpu`}>
                      {/* Thumbnail Image - absolute positioning ensures cross-browser Safari/Firefox/Chrome consistency */}
                      <img 
                        src={film.thumbnail || 'https://placehold.co/1920x1080/1a1a1a/444444?text=No+Thumbnail'} 
                        alt={film.title}
                        loading="lazy"
                        onError={handleImageError}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-103 filter brightness-90 group-hover:brightness-95 block"
                      />
                      
                      {/* Gradient Overlay to make white text always visible */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent z-10 transition-colors duration-500 group-hover:from-black/90 group-hover:via-black/50 pointer-events-none" />
                      
                      {/* Overlaid Card Info - absolute overlay ensures it's perfectly on top */}
                      <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 sm:p-8 md:p-10 text-left pointer-events-none">
                        <div className="flex items-center gap-3.5 mb-3 text-left">
                          <span className="bg-white/10 backdrop-blur-md text-white/90 text-[8px] uppercase tracking-[0.25em] px-3.5 py-1.5 rounded-full border border-white/10 font-bold">
                            {film.category}
                          </span>
                          <span className="text-white/60 font-light text-xs sm:text-sm">{film.year}</span>
                        </div>
                        
                        <div className="flex flex-col gap-2 text-left">
                          <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white font-normal leading-tight tracking-tight text-left drop-shadow-md">
                            {film.title}
                          </h3>

                          {film.short_description && (
                            <p className="text-white/70 text-xs sm:text-sm font-light line-clamp-1 mb-2 drop-shadow-md">
                              {film.short_description}
                            </p>
                          )}
                          
                          <div className="text-white/80 text-[10px] tracking-[0.2em] uppercase font-bold flex items-center shrink-0 mt-2">
                            View Project <span className="ml-2 font-display text-sm font-normal">→</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </section>
      </AnimatedPage>
    </>
  );
}