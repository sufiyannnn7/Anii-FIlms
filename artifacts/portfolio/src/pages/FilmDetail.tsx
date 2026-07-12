import { AnimatedPage } from '@/components/ui/AnimatedPage';
import { films } from '@/data/films';
import { useParams, Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowLeft, Play } from 'lucide-react';

export default function FilmDetail() {
  const { slug } = useParams();
  const film = films.find(f => f.slug === slug);

  if (!film) {
    return (
      <AnimatedPage className="min-h-screen flex flex-col items-center justify-center p-6">
        <h1 className="font-display text-4xl mb-4">Project Not Found</h1>
        <Link href="/filmmaking" className="text-accent uppercase tracking-widest text-sm hover:underline">
          Return to Filmmaking
        </Link>
      </AnimatedPage>
    );
  }

  return (
    <AnimatedPage className="min-h-screen pb-20">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-end pb-20">
        <div className="absolute inset-0 z-0">
          <img 
            src={film.heroUrl} 
            alt={film.title} 
            className="w-full h-full object-cover object-top filter brightness-[0.4]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <Link href="/filmmaking" className="inline-flex items-center text-muted-foreground hover:text-white transition-colors mb-8 text-sm uppercase tracking-widest group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to projects
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="bg-white/10 backdrop-blur-md text-white text-xs uppercase tracking-widest px-3 py-1 rounded-full border border-white/20">
                {film.category}
              </span>
              <span className="text-muted-foreground font-light">{film.year}</span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-tight">
              {film.title}
            </h1>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-6 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-16">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="prose prose-invert prose-lg max-w-none text-muted-foreground font-light leading-relaxed"
            >
              <p className="text-2xl text-white font-normal mb-8 leading-normal">{film.overview}</p>
              
              <h2 className="font-display text-3xl text-white mt-12 mb-6">The Challenge</h2>
              <p>{film.challenge}</p>
              
              <h2 className="font-display text-3xl text-white mt-12 mb-6">Creative Process</h2>
              <p>{film.creativeProcess}</p>
            </motion.section>

            {/* Video Player */}
            {film.videoEmbedUrl && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="my-16"
              >
                <div className="relative aspect-video w-full rounded-xl overflow-hidden glass group cursor-pointer border border-white/10">
                  <iframe 
                    src={film.videoEmbedUrl} 
                    title={`${film.title} Video`}
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  {/* Decorative Play Overlay - in a real app, this would disappear on click to play the iframe */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-accent/80 backdrop-blur flex items-center justify-center pl-2 group-hover:scale-110 transition-transform shadow-lg shadow-accent/20">
                      <Play className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>
              </motion.section>
            )}

            {/* Image Gallery */}
            {film.galleryUrls.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {film.galleryUrls.map((url, i) => (
                  <div key={i} className={`rounded-xl overflow-hidden ${i === 0 ? 'md:col-span-2 aspect-[21/9]' : 'aspect-square'}`}>
                    <img src={url} alt={`Gallery ${i}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" />
                  </div>
                ))}
              </motion.section>
            )}
          </div>

          {/* Sidebar / Credits */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="sticky top-32 glass p-8 rounded-xl"
            >
              <h3 className="uppercase tracking-widest text-xs font-medium text-muted-foreground mb-8 pb-4 border-b border-border">Credits</h3>
              <dl className="space-y-6">
                {film.credits.map((credit, i) => (
                  <div key={i}>
                    <dt className="text-white text-sm mb-1">{credit.role}</dt>
                    <dd className="text-muted-foreground font-light">{credit.name}</dd>
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
