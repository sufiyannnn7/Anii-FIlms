import { AnimatedPage } from '@/components/ui/AnimatedPage';
import { Link } from 'wouter';
import { motion } from 'framer-motion';

export default function PortfolioSelector() {
  return (
    <AnimatedPage className="min-h-[100dvh] flex flex-col md:flex-row pt-20 md:pt-0">
      <Link href="/filmmaking" className="group relative flex-1 min-h-[50dvh] md:min-h-screen overflow-hidden flex items-center justify-center cursor-pointer">
        <div className="absolute inset-0 z-0">
          <img 
            src="/attached_assets/generated_images/filmmaking_bg.jpg" 
            alt="Filmmaking" 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 filter brightness-[0.4] group-hover:brightness-[0.6]"
          />
          <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors duration-700" />
        </div>
        
        <div className="relative z-10 text-center p-8 glass mx-8 md:mx-12 lg:mx-20 rounded-xl overflow-hidden glass-hover transform transition-transform duration-500 group-hover:-translate-y-2">
          <h2 className="font-display text-4xl md:text-6xl text-white mb-4">Filmmaking</h2>
          <div className="flex items-center justify-center text-accent tracking-widest uppercase text-sm font-medium">
            <span className="mr-2">Explore</span>
            <motion.span 
              initial={{ x: 0 }}
              className="group-hover:translate-x-2 transition-transform duration-300"
            >
              →
            </motion.span>
          </div>
        </div>
      </Link>

      <div className="w-full h-[1px] md:w-[1px] md:h-screen bg-border z-20 shrink-0" />

      <Link href="/marketing" className="group relative flex-1 min-h-[50dvh] md:min-h-screen overflow-hidden flex items-center justify-center cursor-pointer">
        <div className="absolute inset-0 z-0">
          <img 
            src="/attached_assets/generated_images/marketing_bg.jpg" 
            alt="Marketing" 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 filter brightness-[0.4] group-hover:brightness-[0.6]"
          />
          <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors duration-700" />
        </div>
        
        <div className="relative z-10 text-center p-8 glass mx-8 md:mx-12 lg:mx-20 rounded-xl overflow-hidden glass-hover transform transition-transform duration-500 group-hover:-translate-y-2">
          <h2 className="font-display text-4xl md:text-6xl text-white mb-4">Marketing</h2>
          <div className="flex items-center justify-center text-accent tracking-widest uppercase text-sm font-medium">
            <span className="mr-2">Explore</span>
            <motion.span 
              initial={{ x: 0 }}
              className="group-hover:translate-x-2 transition-transform duration-300"
            >
              →
            </motion.span>
          </div>
        </div>
      </Link>
    </AnimatedPage>
  );
}
