import { Link, useLocation } from 'wouter';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSiteSettings } from '@/lib/settings';

export function Navbar() {
  const { data: settings } = useSiteSettings();
  const [location, setLocation] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('intro');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      if (location === '/') {
        const sections = ['intro', 'about', 'philosophy', 'work', 'contact'];
        let current = 'intro';
        for (const section of sections) {
          const el = document.getElementById(section);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= window.innerHeight / 3) {
              current = section;
            }
          }
        }
        setActiveSection(current);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

  useEffect(() => {
    if (location === '/') {
      const targetId = localStorage.getItem('scroll-to-section');
      if (targetId) {
        localStorage.removeItem('scroll-to-section');
        setTimeout(() => {
          if (targetId === 'top') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            const el = document.getElementById(targetId);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            }
          }
        }, 350);
      }
    }
  }, [location]);

  const links = [
    { href: '#about', label: 'About', id: 'about' },
    { href: '#philosophy', label: 'Approach', id: 'philosophy' },
    { href: '#work', label: 'Work', id: 'work' },
    { href: '#contact', label: 'Contact', id: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    if (location !== '/') {
      localStorage.setItem('scroll-to-section', targetId);
      setLocation('/');
    } else {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (location !== '/') {
      localStorage.setItem('scroll-to-section', 'top');
      setLocation('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none px-4">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`pointer-events-auto flex items-center bg-[#eae8dd]/80 backdrop-blur-md rounded-full px-12 md:px-16 py-4 border border-foreground/5 shadow-sm transition-all duration-500 ${scrolled ? 'shadow-md bg-[#eae8dd]/95 py-3.5' : ''}`}
        >

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-12 lg:gap-16">
            {links.map((link) => (
              <a
                key={link.id}
                href={location === '/' ? link.href : `/${link.href}`}
                onClick={(e) => handleNavClick(e, link.id)}
                className={`text-xs sm:text-sm tracking-[0.2em] uppercase transition-colors duration-300 font-bold ${
                  location === '/' && activeSection === link.id 
                    ? 'text-foreground' 
                    : 'text-foreground/50 hover:text-foreground'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden text-foreground hover:text-foreground/70 transition-colors ml-4"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </motion.div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl flex flex-col justify-center items-center"
          >
            <div className="absolute top-0 left-0 w-full h-full noise-overlay opacity-30 mix-blend-overlay pointer-events-none"></div>
            
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-8 right-8 p-3 text-foreground/70 hover:text-foreground bg-foreground/5 rounded-full transition-all"
            >
              <X className="w-6 h-6" />
            </button>

            <nav className="flex flex-col items-center gap-10">
              {links.map((link, idx) => (
                <motion.a
                  key={link.id}
                  href={location === '/' ? link.href : `/${link.href}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className={`font-display text-4xl uppercase tracking-widest ${
                    location === '/' && activeSection === link.id 
                      ? 'text-foreground' 
                      : 'text-foreground/40 hover:text-foreground'
                  }`}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}