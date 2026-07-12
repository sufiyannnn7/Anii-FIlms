import { AnimatedPage } from '@/components/ui/AnimatedPage';
import { profile } from '@/data/profile';
import { motion } from 'framer-motion';
import { Mail, Instagram, Linkedin, ArrowRight } from 'lucide-react';

export default function Contact() {
  return (
    <AnimatedPage className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h1 className="font-display text-5xl md:text-7xl mb-6">Let's Create.</h1>
          <div className="w-20 h-1 bg-accent mb-8" />
          <p className="text-xl text-muted-foreground font-light max-w-2xl leading-relaxed">
            Available for commercial directing, brand strategy consulting, and creative direction globally. 
            Reach out to discuss your next ambitious project.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.a
            href={`mailto:${profile.socials.email}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="group block p-10 glass rounded-xl glass-hover"
          >
            <Mail className="w-8 h-8 text-accent mb-6" />
            <h3 className="text-2xl font-display mb-2 text-white">Email</h3>
            <p className="text-muted-foreground mb-6">{profile.socials.email}</p>
            <div className="flex items-center text-sm tracking-widest uppercase text-white group-hover:text-accent transition-colors">
              Send Message <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
            </div>
          </motion.a>

          <div className="space-y-6">
            <motion.a
              href={profile.socials.instagram}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="group flex items-center justify-between p-8 glass rounded-xl glass-hover"
            >
              <div className="flex items-center gap-4">
                <Instagram className="w-6 h-6 text-accent" />
                <span className="text-lg text-white">Instagram</span>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
            </motion.a>

            <motion.a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="group flex items-center justify-between p-8 glass rounded-xl glass-hover"
            >
              <div className="flex items-center gap-4">
                <Linkedin className="w-6 h-6 text-accent" />
                <span className="text-lg text-white">LinkedIn</span>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
            </motion.a>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}
