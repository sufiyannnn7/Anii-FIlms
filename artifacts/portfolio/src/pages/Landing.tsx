import { AnimatedPage } from '@/components/ui/AnimatedPage';
import { profile } from '@/data/profile';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Mail, Instagram, MessageCircle, ArrowRight } from 'lucide-react';

export default function Landing() {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <AnimatedPage className="bg-background relative">
      {/* Noise Overlay */}
      <div className="fixed inset-0 z-[100] noise-overlay mix-blend-overlay"></div>

      {/* Intro Section */}
      <section id="intro" className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-background/80 z-10 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background z-20" />
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: "easeOut" }}
            src="/attached_assets/generated_images/cinematic_hero.jpg" 
            alt="Cinematic Background" 
            className="w-full h-full object-cover object-center"
          />
          {/* Subtle light beams */}
          <div className="absolute top-[-20%] left-[20%] w-[60%] h-[140%] bg-white/[0.03] rotate-[35deg] blur-[120px] z-10 pointer-events-none" />
        </div>

        <div className="relative z-30 container mx-auto px-6 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-2 mb-10"
          >
            <h1 className="font-display text-5xl md:text-7xl lg:text-9xl text-white text-glow leading-[0.9] tracking-tight">FILMMAKER</h1>
            <h1 className="font-display text-5xl md:text-7xl lg:text-9xl text-white/80 leading-[0.9] tracking-tight italic">MARKETER</h1>
            <h1 className="font-display text-5xl md:text-7xl lg:text-9xl text-white/50 leading-[0.9] tracking-tight">STORYTELLER</h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="max-w-2xl mb-12 flex flex-col items-center gap-6"
          >
            <p className="text-white text-xl md:text-2xl font-light tracking-wide">
              Stories that move people. Strategy that moves markets.
            </p>
            <p className="text-white/50 text-sm md:text-base font-light uppercase tracking-[0.2em]">
              A portfolio at the intersection of cinema and consumer insight.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <a 
              href="#my-work"
              onClick={(e) => scrollToSection(e, 'my-work')}
              className="inline-flex items-center justify-center px-8 py-4 border border-white/20 bg-white/5 backdrop-blur-md text-white tracking-[0.2em] uppercase text-xs hover:bg-white hover:text-black transition-all duration-500 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-white translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
              <span className="relative z-10 flex items-center">
                Explore My Work
                <motion.span 
                  className="ml-3 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
                >
                  ↓
                </motion.span>
              </span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative min-h-screen py-32 flex items-center z-20">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            
            {/* Image Column */}
            <div className="lg:col-span-5 relative">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative aspect-[3/4] overflow-hidden rounded-sm group"
              >
                <img 
                  src="/attached_assets/generated_images/cinematic_about.jpg" 
                  alt="About Anii Films"
                  className="w-full h-full object-cover filter brightness-[0.8] group-hover:scale-105 group-hover:brightness-100 transition-all duration-1000"
                />
                <div className="absolute inset-0 border border-white/10 mix-blend-overlay" />
              </motion.div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                <h2 className="font-display text-4xl md:text-6xl text-white mb-10 leading-tight">
                  Strategic Marketing Meets <span className="italic text-white/60">Cinematic Storytelling</span>
                </h2>
                
                <div className="space-y-8 text-white/70 font-light text-lg md:text-xl leading-relaxed">
                  <p>
                    Driven by curiosity and built through creativity, I'm passionate about marketing, branding, and building ideas that connect with people.
                  </p>
                  <p>
                    Alongside strategy and digital storytelling, I explore filmmaking, cinematography, and editing to create visuals that combine aesthetics, emotion, and purpose while constantly evolving both creatively and strategically.
                  </p>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* How I Help Build Brands */}
      <section id="how-i-help" className="relative py-32 bg-secondary/20 border-y border-white/5 z-20 overflow-hidden">
        {/* Ambient background light */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.02] rounded-full blur-[150px] pointer-events-none" />

        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h2 className="font-display text-4xl md:text-6xl text-white mb-8">How I Help Build Brands</h2>
            <p className="text-white/60 font-light text-lg leading-relaxed">
              My philosophy is simple: beautiful visuals mean nothing if they don't serve a clear business objective. I bridge the gap between creative execution and marketing strategy. When approaching a new task, I don't start with the camera; I start with the consumer. By understanding audience psychology and market gaps, I create content that doesn't just look cinematic -- it performs with purpose.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Intentional Creativity",
                desc: "Every lighting choice, camera movement, composition, and edit exists to communicate the brand's message.",
                delay: 0.2
              },
              {
                title: "Audience-First Storytelling",
                desc: "Creating narratives that connect emotionally while addressing audience needs and business goals.",
                delay: 0.4
              },
              {
                title: "Holistic Execution",
                desc: "Maintaining strategic consistency from concept development through production and final delivery.",
                delay: 0.6
              }
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: card.delay }}
                className="glass p-10 rounded-sm flex flex-col items-start text-left glass-hover group"
              >
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mb-8 bg-white/5 group-hover:bg-white/10 group-hover:scale-110 transition-all duration-500">
                  <span className="font-display text-xl text-white/50 group-hover:text-white">0{i+1}</span>
                </div>
                <h3 className="text-xl text-white tracking-wide mb-4 font-medium">{card.title}</h3>
                <p className="text-white/50 font-light leading-relaxed text-sm">
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* My Work */}
      <section id="my-work" className="relative min-h-[100dvh] flex flex-col pt-32 pb-16 z-20">
        <div className="container mx-auto px-6 mb-16">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="text-center"
          >
            <h2 className="font-display text-4xl md:text-6xl text-white">My Work</h2>
            <div className="w-12 h-[1px] bg-white/30 mx-auto mt-8" />
          </motion.div>
        </div>

        <div className="flex-1 flex flex-col md:flex-row container mx-auto px-6 gap-6 max-w-7xl pb-16">
          <Link href="/filmmaking" className="group relative flex-1 min-h-[40dvh] md:min-h-full overflow-hidden flex items-center justify-center cursor-pointer rounded-sm">
            <div className="absolute inset-0 z-0">
              <img 
                src="/attached_assets/generated_images/filmmaking_bg.jpg" 
                alt="Filmmaking" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter brightness-[0.3] group-hover:brightness-[0.6]"
              />
              <div className="absolute inset-0 bg-background/40 group-hover:bg-transparent transition-colors duration-700" />
            </div>
            
            <div className="relative z-10 text-center p-8 glass mx-8 md:mx-12 rounded-sm overflow-hidden glass-hover transform transition-transform duration-500 group-hover:-translate-y-2 border-white/10 backdrop-blur-md">
              <h3 className="font-display text-4xl md:text-5xl text-white mb-6 tracking-wide">Filmmaking</h3>
              <div className="flex items-center justify-center text-white/60 tracking-[0.2em] uppercase text-xs font-medium group-hover:text-white transition-colors">
                <span className="mr-3">Explore</span>
                <motion.span 
                  initial={{ x: 0 }}
                  className="group-hover:translate-x-2 transition-transform duration-300"
                >
                  →
                </motion.span>
              </div>
            </div>
          </Link>

          <Link href="/marketing" className="group relative flex-1 min-h-[40dvh] md:min-h-full overflow-hidden flex items-center justify-center cursor-pointer rounded-sm">
            <div className="absolute inset-0 z-0">
              <img 
                src="/attached_assets/generated_images/marketing_bg.jpg" 
                alt="Marketing" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter brightness-[0.3] group-hover:brightness-[0.6]"
              />
              <div className="absolute inset-0 bg-background/40 group-hover:bg-transparent transition-colors duration-700" />
            </div>
            
            <div className="relative z-10 text-center p-8 glass mx-8 md:mx-12 rounded-sm overflow-hidden glass-hover transform transition-transform duration-500 group-hover:-translate-y-2 border-white/10 backdrop-blur-md">
              <h3 className="font-display text-4xl md:text-5xl text-white mb-6 tracking-wide">Marketing</h3>
              <div className="flex items-center justify-center text-white/60 tracking-[0.2em] uppercase text-xs font-medium group-hover:text-white transition-colors">
                <span className="mr-3">Explore</span>
                <motion.span 
                  initial={{ x: 0 }}
                  className="group-hover:translate-x-2 transition-transform duration-300"
                >
                  →
                </motion.span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="relative min-h-[80vh] py-32 flex items-center border-t border-white/5 bg-secondary/10 z-20">
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-20 text-center"
          >
            <h2 className="font-display text-5xl md:text-7xl mb-8 text-white">Let's Make Something Honest.</h2>
            <div className="w-16 h-[1px] bg-white/30 mx-auto mb-8" />
            <p className="text-lg md:text-xl text-white/50 font-light max-w-2xl mx-auto leading-relaxed">
              Whether it's branding, campaigns, filmmaking, or creative strategy, let's start with a conversation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.a
              href={`mailto:${profile.socials.email}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="group flex flex-col items-center justify-center p-12 glass rounded-sm glass-hover text-center"
            >
              <Mail className="w-8 h-8 text-white/50 group-hover:text-white mb-6 transition-colors" />
              <h3 className="text-sm uppercase tracking-[0.2em] mb-2 text-white/70 group-hover:text-white transition-colors">Email</h3>
              <p className="text-white/40 text-sm font-light mt-auto">aniket24007@gmail.com</p>
            </motion.a>

            <motion.a
              href={profile.socials.instagram}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="group flex flex-col items-center justify-center p-12 glass rounded-sm glass-hover text-center"
            >
              <Instagram className="w-8 h-8 text-white/50 group-hover:text-white mb-6 transition-colors" />
              <h3 className="text-sm uppercase tracking-[0.2em] mb-2 text-white/70 group-hover:text-white transition-colors">Instagram</h3>
              <p className="text-white/40 text-sm font-light mt-auto">@_aniifilms</p>
            </motion.a>

            <motion.a
              href={profile.socials.whatsapp}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="group flex flex-col items-center justify-center p-12 glass rounded-sm glass-hover text-center"
            >
              <MessageCircle className="w-8 h-8 text-white/50 group-hover:text-white mb-6 transition-colors" />
              <h3 className="text-sm uppercase tracking-[0.2em] mb-2 text-white/70 group-hover:text-white transition-colors">WhatsApp</h3>
              <p className="text-white/40 text-sm font-light mt-auto">+91 9172255729</p>
            </motion.a>
          </div>
        </div>
      </section>
    </AnimatedPage>
  );
}