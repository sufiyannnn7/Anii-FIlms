import { Switch, Route, useLocation } from 'wouter';
import { AnimatePresence } from 'framer-motion';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

import Landing from '@/pages/Landing';
import PortfolioSelector from '@/pages/PortfolioSelector';
import Filmmaking from '@/pages/Filmmaking';
import FilmDetail from '@/pages/FilmDetail';
import Marketing from '@/pages/Marketing';
import MarketingDetail from '@/pages/MarketingDetail';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import NotFound from '@/pages/not-found';

export function Router() {
  const [location] = useLocation();
  const isLanding = location === '/';

  return (
    <div className="flex flex-col min-h-screen selection:bg-accent selection:text-white">
      {/* Hide navbar on the landing page if desired, or keep it. The spec said "possibly the full-bleed landing hero". Let's show a minimal one or just keep it transparent. Navbar component handles scrolled state. */}
      {!isLanding && <Navbar />}
      {isLanding && <Navbar />} {/* Decided to keep it for navigation consistency, it's transparent at top anyway */}
      
      <main className="flex-1 flex flex-col w-full h-full">
        <AnimatePresence mode="wait">
          <Switch location={location} key={location}>
            <Route path="/" component={Landing} />
            <Route path="/portfolio" component={PortfolioSelector} />
            
            <Route path="/filmmaking" component={Filmmaking} />
            <Route path="/filmmaking/:slug" component={FilmDetail} />
            
            <Route path="/marketing" component={Marketing} />
            <Route path="/marketing/:slug" component={MarketingDetail} />
            
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            
            <Route component={NotFound} />
          </Switch>
        </AnimatePresence>
      </main>
      
      {!isLanding && <Footer />}
    </div>
  );
}
