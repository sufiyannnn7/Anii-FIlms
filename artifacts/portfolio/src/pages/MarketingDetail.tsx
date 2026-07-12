import { AnimatedPage } from '@/components/ui/AnimatedPage';
import { marketing } from '@/data/marketing';
import { useParams, Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowLeft, Target, Lightbulb, Zap, TrendingUp } from 'lucide-react';

export default function MarketingDetail() {
  const { slug } = useParams();
  const study = marketing.find(m => m.slug === slug);

  if (!study) {
    return (
      <AnimatedPage className="min-h-screen flex flex-col items-center justify-center p-6">
        <h1 className="font-display text-4xl mb-4">Case Study Not Found</h1>
        <Link href="/marketing" className="text-accent uppercase tracking-widest text-sm hover:underline">
          Return to Marketing
        </Link>
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
    <AnimatedPage className="min-h-screen pb-20">
      {/* Header */}
      <section className="pt-32 pb-16 container mx-auto px-6 max-w-5xl">
        <Link href="/marketing" className="inline-flex items-center text-muted-foreground hover:text-white transition-colors mb-12 text-sm uppercase tracking-widest group">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> All Case Studies
        </Link>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="text-accent uppercase tracking-widest text-sm font-medium">{study.category}</span>
            <span className="text-muted-foreground/50">•</span>
            <span className="text-muted-foreground uppercase tracking-widest text-sm">{study.brand}</span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl text-white mb-8">{study.campaignName}</h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-3xl mx-auto leading-relaxed">
            {study.shortDescription}
          </p>
        </motion.div>
      </section>

      {/* Hero Image */}
      <motion.section 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="container mx-auto px-6 max-w-6xl mb-24"
      >
        <div className="w-full aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden glass">
          <img src={study.heroUrl} alt={study.campaignName} className="w-full h-full object-cover" />
        </div>
      </motion.section>

      {/* Content Sections */}
      <section className="container mx-auto px-6 max-w-4xl">
        <div className="space-y-24">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.div 
                key={section.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="flex flex-col md:flex-row gap-8 md:gap-16">
                  <div className="md:w-1/3 flex flex-col md:items-end md:text-right shrink-0">
                    <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 md:ml-auto">
                      <Icon className="w-5 h-5 text-accent" />
                    </div>
                    <h2 className="font-display text-3xl md:text-4xl text-white">{section.title}</h2>
                  </div>
                  
                  <div className="md:w-2/3 glass p-8 md:p-10 rounded-2xl border-t border-white/10 bg-gradient-to-b from-white/5 to-transparent">
                    <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Gallery */}
      {study.galleryUrls.length > 1 && (
        <section className="container mx-auto px-6 max-w-6xl mt-32">
          <h3 className="font-display text-3xl text-center mb-12">Campaign Assets</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {study.galleryUrls.filter(url => url !== study.heroUrl).map((url, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="aspect-square rounded-2xl overflow-hidden glass"
              >
                <img src={url} alt={`Campaign asset ${i}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Next/Prev Navigation could go here */}
    </AnimatedPage>
  );
}
