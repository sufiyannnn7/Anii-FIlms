import { Link, useLocation } from 'wouter';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
  const [location, setLocation] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('intro');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Scroll spy logic
      if (location === '/') {
        const sections = ['intro', 'about', 'how-i-help', 'my-work', 'contact'];
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
    // Initial check
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

  const links = [
    { href: '#about', label: 'About', id: 'about' },
    { href: '#how-i-help', label: 'Approach', id: 'how-i-help' },
    { href: '#my-work', label: 'Work', id: 'my-work' },
    { href: '#contact', label: 'Contact', id: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    if (location !== '/') {
      setLocation('/');
      // Give it a moment to render the homepage then scroll
      setTimeout(() => {
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (location !== '/') {
      setLocation('/');
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 border-b ${
          scrolled ? 'bg-background/40 backdrop-blur-xl border-white/5 py-4' : 'bg-transparent border-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <a href="/" onClick={handleLogoClick} className="font-display text-xl tracking-[0.2em] text-white hover:text-white/70 transition-colors uppercase relative group">
            Anii Films
            <span className="absolute -inset-2 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 blur transition-opacity"></span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {links.map((link) => (
              <a
                key={link.id}
                href={location === '/' ? link.href : `/${link.href}`}
                onClick={(e) => handleNavClick(e, link.id)}
                className={`text-xs tracking-[0.15em] uppercase transition-all duration-300 relative py-2 ${
                  location === '/' && activeSection === link.id ? 'text-white' : 'text-white/50 hover:text-white'
                }`}
              >
                {link.label}
                {location === '/' && activeSection === link.id && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/80"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white/80 hover:text-white transition-colors"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-2xl flex flex-col p-6"
          >
            <div className="flex justify-between items-center py-6 mb-12">
              <a href="/" onClick={handleLogoClick} className="font-display text-xl tracking-[0.2em] text-white uppercase">
                Anii Films
              </a>
              <button onClick={() => setMobileMenuOpen(false)} className="text-white/80 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <nav className="flex flex-col gap-8 px-4">
              {links.map((link, i) => (
                <motion.a
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  key={link.id}
                  href={location === '/' ? link.href : `/${link.href}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={`text-3xl font-display tracking-wider transition-colors ${
                    location === '/' && activeSection === link.id ? 'text-white' : 'text-white/50 hover:text-white'
                  }`}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
            
            <div className="mt-auto pb-12 px-4">
               <p className="text-white/30 text-xs tracking-widest uppercase">Based Globally</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}