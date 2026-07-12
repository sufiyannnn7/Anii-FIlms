import { AnimatedPage } from '@/components/ui/AnimatedPage';
import { marketing } from '@/data/marketing';
import { marketingCategories } from '@/data/categories';
import { useState } from 'react';
import { Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { BackButton } from '@/components/ui/BackButton';

export default function Marketing() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredMarketing = activeCategory === 'All' 
    ? marketing 
    : marketing.filter(item => item.category === activeCategory);

  return (
    <AnimatedPage className="min-h-screen bg-background relative">
      <div className="fixed inset-0 z-[100] noise-overlay mix-blend-overlay pointer-events-none"></div>

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/attached_assets/generated_images/marketing_bg.jpg" 
            alt="Marketing" 
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
              Marketing
            </h1>
            <p className="text-lg md:text-xl text-white/50 font-light max-w-2xl mx-auto tracking-wide">
              Bridging the gap between creative execution and strategic business objectives.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="sticky top-[88px] z-40 bg-background/80 backdrop-blur-xl border-y border-white/5 py-4">
        <div className="container mx-auto px-6">
          <div className="flex overflow-x-auto hide-scrollbar gap-8 items-center justify-start md:flex-wrap md:justify-center">
            {marketingCategories.map((category) => (
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
                    layoutId="activeMarketingTab"
                    className="absolute bottom-0 left-0 right-0 h-[1px] bg-white"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Project List */}
      <section className="container mx-auto px-6 py-24 relative z-10">
        <div className="flex flex-col gap-24 md:gap-32">
          <AnimatePresence mode="popLayout">
            {filteredMarketing.map((item, index) => (
              <motion.div
                key={item.slug}
                layout
                initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: "-100px" }}
                exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 md:gap-20 items-center`}>
                  {/* Image side */}
                  <div className="w-full md:w-[55%] relative group">
                    <Link href={`/marketing/${item.slug}`} className="block relative aspect-[4/3] overflow-hidden rounded-sm bg-secondary/50 border border-white/5 shadow-2xl">
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors duration-700 z-10" />
                      <img 
                        src={item.heroUrl} 
                        alt={item.campaignName} 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter brightness-90 group-hover:brightness-100"
                      />
                    </Link>
                  </div>
                  
                  {/* Content side */}
                  <div className="w-full md:w-[45%] flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-white/60 uppercase tracking-[0.2em] text-[10px] font-medium">{item.category}</span>
                      <span className="text-white/20 text-sm">•</span>
                      <span className="text-white/40 text-sm font-light">{item.year}</span>
                    </div>
                    
                    <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white mb-4 hover:text-white/80 transition-colors leading-tight">
                      <Link href={`/marketing/${item.slug}`}>{item.campaignName}</Link>
                    </h2>
                    
                    <h3 className="text-xl text-white/40 mb-8 font-light italic">for {item.brand}</h3>
                    
                    <p className="text-white/60 text-lg font-light leading-relaxed mb-10">
                      {item.shortDescription}
                    </p>
                    
                    <Link 
                      href={`/marketing/${item.slug}`}
                      className="self-start inline-flex items-center justify-center px-8 py-4 border border-white/20 hover:border-white/50 bg-white/[0.02] hover:bg-white/[0.05] text-white tracking-[0.2em] uppercase text-xs transition-all duration-500 group"
                    >
                      View Case Study
                      <motion.span className="ml-3 opacity-50 group-hover:opacity-100 group-hover:translate-x-2 transition-transform">
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
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-center py-32 text-white/40 tracking-widest uppercase text-sm"
          >
            <p>No case studies found in this category.</p>
          </motion.div>
        )}
      </section>
    </AnimatedPage>
  );
}