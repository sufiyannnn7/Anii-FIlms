import { AnimatedPage } from '@/components/ui/AnimatedPage';
import { profile } from '@/data/profile';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <AnimatedPage className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Image Column */}
          <div className="md:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="sticky top-32"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl glass">
                <img 
                  src="/attached_assets/generated_images/about_profile.jpg" 
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 border border-white/10 rounded-xl" />
              </div>
            </motion.div>
          </div>

          {/* Content Column */}
          <div className="md:col-span-7 space-y-16">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="font-display text-5xl md:text-6xl mb-4">{profile.name}</h1>
              <p className="text-accent text-lg uppercase tracking-widest mb-8 font-medium">
                {profile.role}
              </p>
              <div className="prose prose-invert prose-lg max-w-none text-muted-foreground font-light leading-relaxed">
                <p>{profile.bio}</p>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-display text-3xl mb-6">Creative Philosophy</h2>
              <div className="p-8 glass border-l-4 border-l-accent rounded-r-xl">
                <p className="text-xl text-white font-light italic leading-relaxed">
                  "{profile.creativePhilosophy}"
                </p>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-display text-3xl mb-8">Disciplines</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-white uppercase tracking-widest text-sm mb-4 pb-2 border-b border-border">Filmmaking</h3>
                  <ul className="space-y-3">
                    {profile.skills.filmmaking.map((skill, i) => (
                      <li key={i} className="text-muted-foreground font-light flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent mr-3" />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-white uppercase tracking-widest text-sm mb-4 pb-2 border-b border-border">Marketing</h3>
                  <ul className="space-y-3">
                    {profile.skills.marketing.map((skill, i) => (
                      <li key={i} className="text-muted-foreground font-light flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent mr-3" />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-display text-3xl mb-8">Experience</h2>
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
                {profile.timeline.map((item, i) => (
                  <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-accent bg-background shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-accent/20" />
                    <div className="w-[calc(100%-3rem)] md:w-[calc(50%-1.5rem)] p-6 glass rounded-xl glass-hover">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                        <h4 className="font-display text-xl text-white">{item.title}</h4>
                        <time className="text-accent text-sm font-medium tracking-wide">{item.year}</time>
                      </div>
                      <p className="text-sm text-white/60 uppercase tracking-widest mb-4">{item.company}</p>
                      <p className="text-muted-foreground font-light text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}
