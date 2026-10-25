import React from 'react';
import Sidebar from '@/components/admin/Sidebar';
import Topbar from '@/components/admin/Topbar';
import { Folder, Tags, Settings, ArrowRight, Film } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';

export default function Dashboard() {
  const [, setLocation] = useLocation();

  const cards = [
    {
      title: 'Projects',
      description: 'Manage filmmaking films and marketing campaign items.',
      icon: Folder,
      path: '/admin/projects',
    },
    {
      title: 'Categories',
      description: 'Configure and categorize work divisions and filters.',
      icon: Tags,
      path: '/admin/categories',
    },
    {
      title: 'Videos',
      description: 'Manage individual video players and featured spotlights.',
      icon: Film,
      path: '/admin/projects',
    },
    {
      title: 'System Settings',
      description: 'Preferences, environment properties, and client connections.',
      icon: Settings,
      path: '/admin/settings',
    },
  ];

  return (
    <div className="min-h-screen bg-[#f4f3ee] text-foreground flex">
      <div className="fixed inset-0 z-0 noise-overlay mix-blend-overlay pointer-events-none"></div>

      {/* Sidebar Panel */}
      <Sidebar />

      {/* Main Work Area */}
      <div className="flex-1 flex flex-col min-w-0 z-10 relative">
        <Topbar title="Overview Dashboard" />

        <main className="flex-1 p-8 overflow-y-auto">
          {/* Welcome section */}
          <div className="mb-12 text-left">
            <h1 className="font-display text-4xl text-foreground mb-3 leading-tight">Welcome, Admin</h1>
            <p className="text-sm text-foreground/50 font-light max-w-xl">
              This is the centralized workspace control panel for managing your portfolio projects and system configurations.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 auto-rows-fr">
            {cards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  onClick={() => setLocation(card.path)}
                  className="glass border border-foreground/10 bg-card/65 p-8 rounded-2xl flex flex-col hover:bg-card hover:border-foreground/20 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500 shadow-[0_4px_20px_rgba(0,0,0,0.02)] group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-xl bg-foreground/5 border border-foreground/10 flex items-center justify-center text-foreground/75 mb-6 group-hover:scale-110 group-hover:bg-foreground/10 transition-all duration-500">
                    <Icon className="w-5 h-5" />
                  </div>
                  
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-base font-semibold tracking-wide text-foreground mb-2">{card.title}</h3>
                    <p className="text-xs text-foreground/50 font-light leading-relaxed">
                      {card.description}
                    </p>
                  </div>

                  <div className="mt-8 flex items-center text-[10px] uppercase tracking-widest font-bold text-foreground/40 group-hover:text-primary transition-colors border-t border-foreground/5 pt-5">
                    <span>Configure</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-2 transition-transform duration-500" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}
