import { AnimatedPage } from '@/components/ui/AnimatedPage';
import { films } from '@/data/films';
import { useParams } from 'wouter';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { BackButton } from '@/components/ui/BackButton';

export default function FilmDetail() {
  const { slug } = useParams();
  const film = films.find(f => f.slug === slug);

  if (!film) {
    return (
      <AnimatedPage className="min-h-screen flex flex-col items-center justify-center p-6 bg-background">
        <h1 className="font-display text-4xl mb-4 text-white">Project Not Found</h1>
        <BackButton href="/filmmaking" label="Return to Filmmaking" />
      </AnimatedPage>
    );
  }

  return (
    <AnimatedPage className="min-h-screen bg-background pb-32 relative">
      <div className="fixed inset-0 z-[100] noise-overlay mix-blend-overlay pointer-events-none"></div>

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-end pb-24 border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <img 
            src={film.heroUrl} 
            alt={film.title} 
            className="w-full h-full object-cover object-top filter brightness-[0.3]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>
        
        <div className="absolute top-32 left-6 md:left-12 z-20">
          <BackButton href="/filmmaking" label="Back to Filmmaking" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="bg-white/5 backdrop-blur-md text-white/80 text-[10px] uppercase tracking-[0.2em] px-4 py-1.5 rounded-full border border-white/10">
                {film.category}
              </span>
              <span className="text-white/40 font-light text-sm">{film.year}</span>
            </div>
            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl text-white mb-6 leading-[0.9] text-glow tracking-tight">
              {film.title}
            </h1>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-6 mt-20 relative z-20 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-20">
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="prose prose-invert prose-lg max-w-none text-white/60 font-light leading-relaxed"
            >
              <p className="text-2xl md:text-3xl text-white/90 font-light mb-12 leading-relaxed tracking-wide">
                {film.overview}
              </p>
              
              <div className="space-y-12">
                <div>
                  <h2 className="font-display text-3xl md:text-4xl text-white mb-6 border-b border-white/10 pb-4">The Challenge</h2>
                  <p className="text-lg">{film.challenge}</p>
                </div>
                
                <div>
                  <h2 className="font-display text-3xl md:text-4xl text-white mb-6 border-b border-white/10 pb-4">Creative Process</h2>
                  <p className="text-lg">{film.creativeProcess}</p>
                </div>
              </div>
            </motion.section>

            {/* Video Player */}
            {film.videoEmbedUrl && (
              <motion.section
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="my-20"
              >
                <div className="relative aspect-video w-full rounded-sm overflow-hidden glass group cursor-pointer border border-white/10 bg-black">
                  <iframe 
                    src={film.videoEmbedUrl} 
                    title={`${film.title} Video`}
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  {/* Decorative Play Overlay */}
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-white/5 border border-white/20 backdrop-blur-md flex items-center justify-center pl-2 group-hover:scale-110 transition-transform duration-500 shadow-2xl">
                      <Play className="w-8 h-8 text-white/90" />
                    </div>
                  </div>
                </div>
              </motion.section>
            )}

            {/* Image Gallery */}
            {film.galleryUrls.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {film.galleryUrls.map((url, i) => (
                  <div key={i} className={`rounded-sm overflow-hidden border border-white/5 ${i === 0 ? 'md:col-span-2 aspect-[21/9]' : 'aspect-square'}`}>
                    <img src={url} alt={`Gallery ${i}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000 filter brightness-90 hover:brightness-100" />
                  </div>
                ))}
              </motion.section>
            )}
          </div>

          {/* Sidebar / Credits */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="sticky top-32 glass p-10 rounded-sm border border-white/10 bg-white/[0.02]"
            >
              <h3 className="uppercase tracking-[0.2em] text-xs font-medium text-white/40 mb-10 pb-4 border-b border-white/10">Credits</h3>
              <dl className="space-y-8">
                {film.credits.map((credit, i) => (
                  <div key={i} className="group">
                    <dt className="text-white/90 text-sm mb-1 uppercase tracking-widest">{credit.role}</dt>
                    <dd className="text-white/50 font-light group-hover:text-white transition-colors">{credit.name}</dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}