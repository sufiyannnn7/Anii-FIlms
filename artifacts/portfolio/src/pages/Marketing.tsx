import { AnimatedPage } from '@/components/ui/AnimatedPage';
import { marketing } from '@/data/marketing';
import { marketingCategories } from '@/data/categories';
import { useState } from 'react';
import { Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';

export default function Marketing() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredMarketing = activeCategory === 'All' 
    ? marketing 
    : marketing.filter(item => item.category === activeCategory);

  return (
    <AnimatedPage className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex flex-col justify-center bg-secondary/30 pt-20">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl text-white mb-8"
          >
            How I Help Build Brands
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="prose prose-invert prose-lg mx-auto text-muted-foreground font-light leading-relaxed"
          >
            <p>
              My philosophy is simple: Beautiful visuals mean nothing if they don't serve a clear business objective. I bridge the gap between creative execution and marketing strategy. When approaching a new task, I don't start with the camera. I start with the audience, the business objective, and the story.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="sticky top-20 z-40 bg-background/90 backdrop-blur-md border-y border-border py-4">
        <div className="container mx-auto px-6">
          <div className="flex overflow-x-auto hide-scrollbar gap-8 items-center justify-start md:justify-center">
            {marketingCategories.map((category) => (
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
                    layoutId="activeMarketingTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Project List/Grid */}
      <section className="container mx-auto px-6 py-24">
        <div className="flex flex-col gap-16 md:gap-32">
          <AnimatePresence mode="popLayout">
            {filteredMarketing.map((item, index) => (
              <motion.div
                key={item.slug}
                layout
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.7 }}
              >
                <div className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-10 md:gap-16 items-center`}>
                  {/* Image side */}
                  <div className="w-full md:w-1/2 relative group">
                    <Link href={`/marketing/${item.slug}`} className="block relative aspect-[4/3] md:aspect-square overflow-hidden rounded-xl">
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700 z-10" />
                      <img 
                        src={item.heroUrl} 
                        alt={item.campaignName} 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                    </Link>
                  </div>
                  
                  {/* Content side */}
                  <div className="w-full md:w-1/2 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-accent uppercase tracking-widest text-xs font-medium">{item.category}</span>
                      <span className="text-border text-sm">•</span>
                      <span className="text-muted-foreground text-sm">{item.year}</span>
                    </div>
                    
                    <h2 className="font-display text-4xl md:text-5xl text-white mb-4 hover:text-accent transition-colors">
                      <Link href={`/marketing/${item.slug}`}>{item.campaignName}</Link>
                    </h2>
                    
                    <h3 className="text-xl text-white/60 mb-6 font-light">{item.brand}</h3>
                    
                    <p className="text-muted-foreground text-lg font-light leading-relaxed mb-10">
                      {item.shortDescription}
                    </p>
                    
                    <Link 
                      href={`/marketing/${item.slug}`}
                      className="self-start inline-flex items-center justify-center px-8 py-4 border border-white/20 hover:border-accent text-white tracking-widest uppercase text-xs hover:bg-accent hover:text-white transition-all duration-300 group"
                    >
                      View Case Study
                      <motion.span className="ml-3 group-hover:translate-x-1 transition-transform">
                        →
                      </motion.span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {filteredMarketing.length === 0 && (
          <div className="text-center py-32 text-muted-foreground">
            <p>No case studies found in this category yet.</p>
          </div>
        )}
      </section>
    </AnimatedPage>
  );
}
