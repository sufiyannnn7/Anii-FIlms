import { AnimatedPage } from '@/components/ui/AnimatedPage';
import { profile } from '@/data/profile';
import { Link } from 'wouter';
import { motion } from 'framer-motion';

export default function Landing() {
  return (
    <AnimatedPage className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Background Video/Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <img 
          src="/attached_assets/generated_images/hero_bg.jpg" 
          alt="Cinematic Background" 
          className="w-full h-full object-cover object-center scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
      </div>

      <div className="relative z-20 container mx-auto px-6 flex flex-col items-center text-center mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl"
        >
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-white mb-6 text-glow leading-tight">
            Strategic Marketing <br />
            <span className="text-accent italic font-light">Meets</span> Cinematic Storytelling
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="max-w-2xl mt-6 mb-12"
        >
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed font-light">
            {profile.bio}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <Link 
            href="/portfolio" 
            className="inline-flex items-center justify-center px-8 py-4 border border-white/20 bg-white/5 backdrop-blur-md text-white tracking-widest uppercase text-sm hover:bg-white hover:text-black transition-all duration-500 group"
          >
            Enter Portfolio
            <motion.span 
              className="ml-3 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
            >
              →
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </AnimatedPage>
  );
}
