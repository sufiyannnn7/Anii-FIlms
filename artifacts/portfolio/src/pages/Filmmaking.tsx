import { AnimatedPage } from '@/components/ui/AnimatedPage';
import { films } from '@/data/films';
import { filmCategories } from '@/data/categories';
import { useState } from 'react';
import { Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { BackButton } from '@/components/ui/BackButton';

export default function Filmmaking() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredFilms = activeCategory === 'All' 
    ? films 
    : films.filter(film => film.category === activeCategory);

  return (
    <AnimatedPage className="min-h-screen bg-background relative">
      <div className="fixed inset-0 z-[100] noise-overlay mix-blend-overlay pointer-events-none"></div>

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/attached_assets/generated_images/filmmaking_bg.jpg" 
            alt="Filmmaking" 
            className="w-full h-full object-cover object-center filter brightness-[0.25]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>
        
        <div className="absolute top-32 left-6 md:left-12 z-20">
          <BackButton href="/" label="Back Home" />
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center pt-20">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-white mb-6 text-glow">
              Filmmaking
            </h1>
            <p className="text-lg md:text-xl text-white/50 font-light max-w-2xl mx-auto tracking-wide">
              Emotion in motion. Exploring narrative, light, and performance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="sticky top-[88px] z-40 bg-background/80 backdrop-blur-xl border-y border-white/5 py-4">
        <div className="container mx-auto px-6">
          <div className="flex overflow-x-auto hide-scrollbar gap-8 items-center justify-start md:flex-wrap md:justify-center">
            {filmCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap uppercase tracking-[0.15em] text-[10px] sm:text-xs font-medium transition-all duration-300 relative pb-2 ${
                  activeCategory === category ? 'text-white' : 'text-white/40 hover:text-white/80'
                }`}
              >
                {category}
                {activeCategory === category && (
                  <motion.div 
                    layoutId="activeFilmTab"
                    className="absolute bottom-0 left-0 right-0 h-[1px] bg-white"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Project Grid */}
      <section className="container mx-auto px-6 py-24 relative z-10">
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence mode="popLayout">
            {filteredFilms.map((film) => (
              <motion.div
                key={film.slug}
                layout
                initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link href={`/filmmaking/${film.slug}`} className="group block h-full">
                  <div className="glass rounded-sm overflow-hidden h-full flex flex-col glass-hover border-white/5 bg-white/[0.01]">
                    <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-700 z-10" />
                      <img 
                        src={film.posterUrl} 
                        alt={film.title}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                      <div className="absolute top-6 left-6 z-20">
                        <span className="bg-black/60 backdrop-blur-md text-white/80 text-[10px] uppercase tracking-[0.2em] px-4 py-1.5 rounded-full border border-white/10">
                          {film.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-8 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-4 gap-4">
                          <h3 className="font-display text-3xl text-white group-hover:text-white/80 transition-colors leading-tight">{film.title}</h3>
                          <span className="text-white/30 text-sm font-light mt-1">{film.year}</span>
                        </div>
                        <p className="text-white/50 text-sm leading-relaxed font-light line-clamp-3">
                          {film.shortDescription}
                        </p>
                      </div>
                      <div className="mt-8 flex items-center text-white/70 text-xs tracking-[0.2em] uppercase font-medium group-hover:text-white transition-colors">
                        View Project
                        <motion.span className="ml-3 group-hover:translate-x-2 transition-transform duration-300">→</motion.span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {filteredFilms.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-center py-32 text-white/40 tracking-widest uppercase text-sm"
          >
            <p>No projects found in this category.</p>
          </motion.div>
        )}
      </section>
    </AnimatedPage>
  );
}