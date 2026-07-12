import { AnimatedPage } from '@/components/ui/AnimatedPage';
import { marketing } from '@/data/marketing';
import { useParams } from 'wouter';
import { motion } from 'framer-motion';
import { Target, Lightbulb, Zap, TrendingUp } from 'lucide-react';
import { BackButton } from '@/components/ui/BackButton';

export default function MarketingDetail() {
  const { slug } = useParams();
  const study = marketing.find(m => m.slug === slug);

  if (!study) {
    return (
      <AnimatedPage className="min-h-screen flex flex-col items-center justify-center p-6 bg-background">
        <h1 className="font-display text-4xl mb-4 text-white">Case Study Not Found</h1>
        <BackButton href="/marketing" label="Return to Marketing" />
      </AnimatedPage>
    );
  }

  const sections = [
    { id: 'challenge', title: 'The Challenge', content: study.challenge, icon: Target },
    { id: 'strategy', title: 'The Strategy', content: study.strategy, icon: Lightbulb },
    { id: 'execution', title: 'The Execution', content: study.execution, icon: Zap },
    { id: 'outcome', title: 'The Outcome', content: study.outcome, icon: TrendingUp },
  ];

  return (
    <AnimatedPage className="min-h-screen bg-background pb-32 relative">
      <div className="fixed inset-0 z-[100] noise-overlay mix-blend-overlay pointer-events-none"></div>

      {/* Header */}
      <section className="pt-40 pb-20 container mx-auto px-6 max-w-5xl relative z-10 text-center">
        <div className="absolute top-32 left-6 md:left-12 z-20">
          <BackButton href="/marketing" label="All Case Studies" />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12"
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="text-white/60 uppercase tracking-[0.2em] text-xs font-medium">{study.category}</span>
            <span className="text-white/20">•</span>
            <span className="text-white/40 uppercase tracking-[0.2em] text-xs font-light">{study.brand}</span>
          </div>
          <h1 className="font-display text-6xl md:text-8xl text-white mb-10 leading-[0.9] text-glow">{study.campaignName}</h1>
          <p className="text-xl md:text-3xl text-white/60 font-light max-w-4xl mx-auto leading-relaxed tracking-wide">
            {study.shortDescription}
          </p>
        </motion.div>
      </section>

      {/* Hero Image */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="container mx-auto px-6 max-w-7xl mb-32 relative z-10"
      >
        <div className="w-full aspect-video md:aspect-[21/9] rounded-sm overflow-hidden glass border border-white/10 p-2">
          <div className="w-full h-full rounded-sm overflow-hidden">
             <img src={study.heroUrl} alt={study.campaignName} className="w-full h-full object-cover filter brightness-[0.85]" />
          </div>
        </div>
      </motion.section>

      {/* Content Sections */}
      <section className="container mx-auto px-6 max-w-5xl relative z-10">
        <div className="space-y-32">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.div 
                key={section.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <div className="flex flex-col md:flex-row gap-12 md:gap-20">
                  <div className="md:w-1/3 flex flex-col items-start shrink-0">
                    <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-8">
                      <Icon className="w-6 h-6 text-white/70" />
                    </div>
                    <h2 className="font-display text-4xl md:text-5xl text-white">{section.title}</h2>
                  </div>
                  
                  <div className="md:w-2/3">
                    <div className="glass p-10 md:p-12 rounded-sm border border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent h-full">
                      <p className="text-xl md:text-2xl text-white/70 font-light leading-relaxed">
                        {section.content}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Gallery */}
      {study.galleryUrls.length > 1 && (
        <section className="container mx-auto px-6 max-w-7xl mt-40 relative z-10">
          <div className="text-center mb-16">
            <h3 className="font-display text-4xl text-white mb-6">Campaign Assets</h3>
            <div className="w-12 h-[1px] bg-white/20 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {study.galleryUrls.filter(url => url !== study.heroUrl).map((url, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="aspect-square rounded-sm overflow-hidden glass border border-white/10 p-2"
              >
                <div className="w-full h-full rounded-sm overflow-hidden bg-secondary/50">
                  <img src={url} alt={`Campaign asset ${i}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000 filter brightness-90 hover:brightness-100" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}
    </AnimatedPage>
  );
}