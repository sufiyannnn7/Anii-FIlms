import { AnimatedPage } from '@/components/ui/AnimatedPage';
import { films } from '@/data/films';
import { filmCategories } from '@/data/categories';
import { useState } from 'react';
import { Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';

export default function Filmmaking() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredFilms = activeCategory === 'All' 
    ? films 
    : films.filter(film => film.category === activeCategory);

  return (
    <AnimatedPage className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/attached_assets/generated_images/filmmaking_bg.jpg" 
            alt="Filmmaking" 
            className="w-full h-full object-cover object-center filter brightness-[0.3]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>
        <div className="relative z-10 container mx-auto px-6 text-center pt-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-display text-5xl md:text-7xl text-white mb-6"
          >
            Cinematic Directing
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-muted-foreground font-light max-w-2xl mx-auto"
          >
            Emotion in motion. Exploring narrative, light, and performance.
          </motion.p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="sticky top-20 z-40 bg-background/90 backdrop-blur-md border-b border-border py-4">
        <div className="container mx-auto px-6">
          <div className="flex overflow-x-auto hide-scrollbar gap-8 items-center justify-start md:justify-center">
            {filmCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap uppercase tracking-widest text-xs font-medium transition-all duration-300 relative pb-2 ${
                  activeCategory === category ? 'text-accent' : 'text-muted-foreground hover:text-white'
                }`}
              >
                {category}
                {activeCategory === category && (
                  <motion.div 
                    layoutId="activeFilmTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Project Grid */}
      <section className="container mx-auto px-6 py-20">
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredFilms.map((film) => (
              <motion.div
                key={film.slug}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
              >
                <Link href={`/filmmaking/${film.slug}`} className="group block h-full">
                  <div className="glass rounded-xl overflow-hidden h-full flex flex-col glass-hover border border-card-border/50">
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                      <img 
                        src={film.posterUrl} 
                        alt={film.title}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                      <div className="absolute top-4 left-4 z-20">
                        <span className="bg-black/50 backdrop-blur-md text-white text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border border-white/10">
                          {film.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <h3 className="font-display text-2xl text-white group-hover:text-accent transition-colors">{film.title}</h3>
                          <span className="text-muted-foreground text-sm font-light">{film.year}</span>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed font-light line-clamp-3">
                          {film.shortDescription}
                        </p>
                      </div>
                      <div className="mt-6 flex items-center text-accent text-sm tracking-widest uppercase font-medium">
                        View Project
                        <motion.span className="ml-2 group-hover:translate-x-2 transition-transform duration-300">→</motion.span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {filteredFilms.length === 0 && (
          <div className="text-center py-32 text-muted-foreground">
            <p>No projects found in this category yet.</p>
          </div>
        )}
      </section>
    </AnimatedPage>
  );
}
