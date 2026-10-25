import { AnimatedPage } from '@/components/ui/AnimatedPage';
import { useParams, Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, X, ChevronLeft, ChevronRight, Share2, Expand, Link as LinkIcon, Lightbulb, Target, Zap, TrendingUp, Calendar, Tag, Compass } from 'lucide-react';
import { VideoPlayer } from '@/components/ui/VideoPlayer';
import { BackButton } from '@/components/ui/BackButton';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Lightbox } from '@/components/ui/Lightbox';

export default function MarketingDetail() {
  const { slug } = useParams();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = '/attached_assets/generated_images/marketing_bg.jpg';
    e.currentTarget.onerror = null;
  };


  const [activeVideo, setActiveVideo] = useState<any>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);


  const formattedSlug = decodeURIComponent(slug || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-');

  const { data: study, isLoading, error } = useQuery({
    queryKey: ['public-project', formattedSlug],
    queryFn: async () => {
      let { data, error } = await supabase
        .from('projects')
        .select('*, project_videos(*)')
        .in('slug', [formattedSlug, decodeURIComponent(slug || '')])
        .eq('section', 'Marketing')
        .limit(1)
        .maybeSingle();

      if (error && error.message.includes('relationship')) {
         console.warn('project_videos relationship not found, falling back to flat query');
         const fallback = await supabase
           .from('projects')
           .select('*')
           .in('slug', [formattedSlug, decodeURIComponent(slug || '')])
           .eq('section', 'Marketing')
           .limit(1)
           .maybeSingle();
         data = fallback.data;
         error = fallback.error;
      }

      if (error) throw error;
      return data;
    }
  });

  useEffect(() => {
    if (study) {
      document.title = study.seo_title || `${study.title} | Marketing`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', study.seo_description || study.short_description || '');
      }

      // Initialize active video
      if (study.project_videos && study.project_videos.length > 0) {
        const sorted = [...study.project_videos].sort((a, b) => {
          if (a.is_featured && !b.is_featured) return -1;
          if (!a.is_featured && b.is_featured) return 1;
          if (a.display_order !== b.display_order) return a.display_order - b.display_order;
          return (b.created_at || b.id || '').localeCompare(a.created_at || a.id || '');
        });
        const featured = sorted.find(v => v.is_featured);
        setActiveVideo(featured || sorted[0]);
      } else if (study.video_type && study.video_type !== 'none') {
        setActiveVideo({
          id: 'legacy',
          video_type: study.video_type,
          video_url: study.video_url,
          youtube_id: study.youtube_id,
          vimeo_id: study.vimeo_id,
          video_thumbnail: study.video_thumbnail,
          title: study.title
        });
      } else {
        setActiveVideo(null);
      }
    }
  }, [study]);

  const { data: siblingProjects = [] } = useQuery({
    queryKey: ['public-projects', 'Marketing'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('title, slug')
        .eq('section', 'Marketing')
        .eq('status', 'Published')
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
          <span className="text-[10px] uppercase tracking-[0.2em] text-foreground/50 font-semibold animate-pulse">Loading case details...</span>
        </div>
      </AnimatedPage>
    );
  }

  if (error || !study) {
    return (
      <AnimatedPage className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#f4f3ee] text-foreground">
        <h1 className="font-display text-4xl mb-4 text-foreground">Case Study Not Found</h1>
        <p className="text-sm text-foreground/50 font-light mb-8 max-w-sm text-center">
          The requested campaign details could not be loaded. It may have been retired or updated.
        </p>
        <BackButton href="/marketing" label="Return to Marketing" />
      </AnimatedPage>
    );
  }

  const sections = [
    { id: 'overview', title: 'The Campaign', content: study.description, icon: Lightbulb },
    study.challenge && { id: 'challenge', title: 'The Challenge', content: study.challenge, icon: Target },
    study.strategy && { id: 'strategy', title: 'The Strategy', content: study.strategy, icon: Lightbulb },
    study.execution && { id: 'execution', title: 'The Execution', content: study.execution, icon: Zap },
    study.outcome && { id: 'outcome', title: 'The Outcome', content: study.outcome, icon: TrendingUp },
  ].filter(Boolean) as any[];

  let galleryUrls = study.gallery_urls || [];
  if (typeof galleryUrls === 'string') {
    try {
      galleryUrls = JSON.parse(galleryUrls);
    } catch {
      galleryUrls = [galleryUrls];
    }
  }
  if (!Array.isArray(galleryUrls)) galleryUrls = [];

  // Sibling project lookup
  const currentIndex = siblingProjects.findIndex((p: any) => p.slug === formattedSlug);
  const prevProject = currentIndex > 0 ? siblingProjects[currentIndex - 1] : null;
  const nextProject = currentIndex < siblingProjects.length - 1 ? siblingProjects[currentIndex + 1] : null;

  return (
    <>
      {/* Floating Fixed Back Button capsule - rendered outside AnimatedPage to bypass CSS transform-fix quirks */}
      <div className="fixed top-28 left-4 sm:left-6 md:left-12 z-[70]">
        <BackButton href="/marketing" label="All Case Studies" />
      </div>

      <AnimatedPage className="min-h-screen bg-[#f4f3ee] text-foreground pb-32 relative">
        <div className="fixed inset-0 z-[100] noise-overlay mix-blend-overlay pointer-events-none"></div>

        {/* Beautiful full-width Hero Section */}
        <section className="relative h-[60vh] md:h-[85vh] w-full flex items-end pb-16 md:pb-24 border-b border-foreground/10 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src={study.hero_image || study.thumbnail || '/attached_assets/generated_images/marketing_bg.jpg'} 
              alt={study.title} 
              onError={handleImageError}
              className="w-full h-full object-cover object-center filter brightness-[0.25]"
            />
            <div className="absolute inset-0 z-10" style={{ backgroundImage: 'linear-gradient(180deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0.75) 100%)' }} />
          </div>
          
          <div className="container mx-auto px-6 relative z-25 max-w-6xl text-left">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3.5 text-left">
                <span className="bg-white/15 backdrop-blur-md text-white/90 text-[8px] uppercase tracking-[0.25em] px-4 py-1.5 rounded-full border border-white/10 font-bold">
                  {study.category}
                </span>
                <span className="text-white/60 text-xs font-light tracking-widest uppercase">{study.year}</span>
              </div>
              
              <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white mb-4 leading-[0.95] text-glow tracking-tight text-left">
                {study.title}
              </h1>

              {study.short_description && (
                <p className="text-white/75 font-light text-lg sm:text-xl md:text-2xl max-w-4xl leading-relaxed tracking-wide text-left">
                  {study.short_description}
                </p>
              )}
            </motion.div>
          </div>
        </section>

        {/* Project details content container */}
        <div className="container mx-auto px-6 mt-24 relative z-20 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            
            {/* Main Content Column */}
            <div className="lg:col-span-8 space-y-24 text-left">
              {/* Campaign Story section */}
              <div className="space-y-24 text-left">
                {sections.map((sec) => {
                  const Icon = sec.icon;
                  return (
                    <motion.div 
                      key={sec.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                      className="text-left space-y-4"
                    >
                      <div className="flex items-center gap-4 text-left">
                        <div className="w-10 h-10 rounded-full bg-foreground/5 border border-foreground/10 flex items-center justify-center text-primary shrink-0">
                          <Icon className="w-4 h-4 text-primary" />
                        </div>
                        <h2 className="font-display text-3xl sm:text-4xl text-foreground text-left">{sec.title}</h2>
                      </div>
                      <div className="glass p-8 md:p-10 rounded-sm border border-foreground/10 bg-card/60 backdrop-blur-md text-left">
                        <p className="text-base text-foreground/80 font-light leading-relaxed text-left">
                          {sec.content}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Cinematic Video Player & Multi-Video Gallery */}
              {activeVideo && (
                <div className="space-y-6">
                  <VideoPlayer 
                    id={activeVideo.id}
                    video_type={activeVideo.source_type || activeVideo.video_type}
                    video_url={activeVideo.video_url}
                    youtube_id={activeVideo.youtube_id}
                    vimeo_id={activeVideo.vimeo_id}
                    video_thumbnail={activeVideo.thumbnail_url || activeVideo.video_thumbnail}
                    hero_image={study.hero_image}
                    title={activeVideo.title}
                    aspect_ratio={activeVideo.aspect_ratio}
                  />
                  {activeVideo.description && (
                    <p className="text-foreground/75 font-light text-sm italic">{activeVideo.description}</p>
                  )}

                  {/* Other Videos Thumbnails */}
                  {study.project_videos && study.project_videos.length > 1 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                      {[...study.project_videos]
                        .sort((a, b) => {
                          if (a.is_featured && !b.is_featured) return -1;
                          if (!a.is_featured && b.is_featured) return 1;
                          if (a.display_order !== b.display_order) return a.display_order - b.display_order;
                          return (b.created_at || b.id || '').localeCompare(a.created_at || a.id || '');
                        })
                        .map((v) => {
                          const isActive = activeVideo.id === v.id;
                          let thumb = v.thumbnail_url;
                          if (!thumb && v.youtube_id) {
                            thumb = `https://img.youtube.com/vi/${v.youtube_id}/maxresdefault.jpg`;
                          }
                          if (!thumb) {
                            thumb = study.hero_image || study.thumbnail;
                          }
                          return (
                            <div 
                              key={v.id} 
                              onClick={() => setActiveVideo(v)}
                              className={`relative aspect-video rounded-md overflow-hidden cursor-pointer group border-2 transition-all ${isActive ? 'border-primary shadow-lg shadow-primary/20' : 'border-transparent hover:border-foreground/30'}`}
                            >
                              {(v.source_type === 'upload' || (v.video_url && v.video_url.includes('.mp4'))) && !v.thumbnail_url ? (
                                <video 
                                  src={v.video_url}
                                  className="w-full h-full object-cover filter brightness-[0.7] group-hover:brightness-100 transition-all pointer-events-none"
                                  preload="metadata"
                                  muted
                                  playsInline
                                />
                              ) : (
                                <img src={thumb} alt={v.title} className="w-full h-full object-cover filter brightness-[0.7] group-hover:brightness-100 transition-all" />
                              )}
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className={`w-8 h-8 rounded-full bg-black/50 flex items-center justify-center backdrop-blur-sm transition-transform ${isActive ? 'scale-0' : 'group-hover:scale-110'}`}>
                                  <svg className="w-4 h-4 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                </div>
                              </div>
                              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                                <span className="text-white text-[10px] font-bold uppercase tracking-wider truncate block">{v.title}</span>
                              </div>
                            </div>
                          );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* Professional Mixed Aspect Ratio Editorial Gallery */}
              {galleryUrls.length > 0 && (
                <motion.section
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-24"
                >
                    {galleryUrls.map((url: string, i: number) => {
                      const gridSpan = i % 3 === 0 ? 'md:col-span-2 aspect-[21/9]' : 'aspect-[4/3]';
                      return (
                        <div 
                          key={i} 
                          onClick={() => setLightboxIndex(i)}
                          className={`rounded-sm overflow-hidden border border-foreground/10 bg-secondary shadow-sm ${gridSpan} cursor-pointer`}
                        >
                          <img 
                            src={url} 
                            alt={`Gallery ${i}`} 
                            className="w-full h-full object-cover hover:scale-103 transition-all duration-1000 filter brightness-[0.93] hover:brightness-100" 
                          />
                        </div>
                      );
                    })}
                </motion.section>
              )}

              {/* Sibling Navigation */}
              {(prevProject || nextProject) && (
                <div className="border-t border-foreground/10 pt-12 mt-24 flex justify-between items-center gap-6">
                  {prevProject ? (
                    <Link href={`/marketing/${prevProject.slug}`} className="group flex flex-col items-start text-left cursor-pointer">
                      <span className="text-[9px] uppercase tracking-[0.25em] text-foreground/45 font-bold mb-2 block">← Previous Case</span>
                      <span className="font-display text-xl sm:text-2xl text-foreground group-hover:text-primary transition-colors block">{prevProject.title}</span>
                    </Link>
                  ) : (
                    <div />
                  )}

                  {nextProject ? (
                    <Link href={`/marketing/${nextProject.slug}`} className="group flex flex-col items-end text-right cursor-pointer">
                      <span className="text-[9px] uppercase tracking-[0.25em] text-foreground/45 font-bold mb-2 block">Next Case →</span>
                      <span className="font-display text-xl sm:text-2xl text-foreground group-hover:text-primary transition-colors block">{nextProject.title}</span>
                    </Link>
                  ) : (
                    <div />
                  )}
                </div>
              )}
            </div>

            {/* Sticky Creative Info Card Column */}
            <div className="lg:col-span-4 text-left">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="sticky top-32 glass p-8 sm:p-10 rounded-sm border border-foreground/10 bg-card/65 backdrop-blur-xl shadow-sm text-left"
              >
                <h3 className="uppercase tracking-[0.25em] text-[10px] font-bold text-foreground/45 mb-8 pb-4 border-b border-foreground/15 text-left">
                  Campaign Specs
                </h3>
                <dl className="space-y-6 text-left">
                  <div className="flex flex-col gap-1 text-left">
                    <dt className="text-[9px] uppercase tracking-widest text-foreground/45 font-bold flex items-center gap-2">
                      <Compass className="w-3.5 h-3.5" /> Workspace
                    </dt>
                    <dd className="text-foreground/80 font-light text-sm text-left">{study.section}</dd>
                  </div>
                  <div className="flex flex-col gap-1 text-left">
                    <dt className="text-[9px] uppercase tracking-widest text-foreground/45 font-bold flex items-center gap-2">
                      <Tag className="w-3.5 h-3.5" /> Category
                    </dt>
                    <dd className="text-foreground/80 font-light text-sm text-left">{study.category}</dd>
                  </div>
                  <div className="flex flex-col gap-1 text-left">
                    <dt className="text-[9px] uppercase tracking-widest text-foreground/45 font-bold flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5" /> Campaign Year
                    </dt>
                    <dd className="text-foreground/80 font-light text-sm text-left">{study.year}</dd>
                  </div>
                  {study.client && (
                    <div className="flex flex-col gap-1 text-left border-t border-foreground/5 pt-4">
                      <dt className="text-[9px] uppercase tracking-widest text-foreground/45 font-bold">
                        Client
                      </dt>
                      <dd className="text-foreground/80 font-light text-sm text-left">{study.client}</dd>
                    </div>
                  )}
                  {study.services && (
                    <div className="flex flex-col gap-1 text-left border-t border-foreground/5 pt-4">
                      <dt className="text-[9px] uppercase tracking-widest text-foreground/45 font-bold">
                        Services
                      </dt>
                      <dd className="text-foreground/80 font-light text-sm text-left">{study.services}</dd>
                    </div>
                  )}
                  {study.credits && (
                    <div className="flex flex-col gap-1 text-left border-t border-foreground/5 pt-4">
                      <dt className="text-[9px] uppercase tracking-widest text-foreground/45 font-bold">
                        Credits
                      </dt>
                      <dd className="text-foreground/85 font-light text-xs text-left whitespace-pre-line leading-relaxed">{study.credits}</dd>
                    </div>
                  )}
                </dl>
              </motion.div>
            </div>
            
          </div>
        </div>
      </AnimatedPage>

      {lightboxIndex !== null && (
        <Lightbox 
          images={galleryUrls} 
          currentIndex={lightboxIndex} 
          onClose={() => setLightboxIndex(null)} 
          onNavigate={(index) => setLightboxIndex(index)} 
        />
      )}
    </>
  );
}