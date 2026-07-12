import { Switch, Route, Redirect, useLocation } from 'wouter';
import { AnimatePresence } from 'framer-motion';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

import Landing from '@/pages/Landing';
import Filmmaking from '@/pages/Filmmaking';
import FilmDetail from '@/pages/FilmDetail';
import Marketing from '@/pages/Marketing';
import MarketingDetail from '@/pages/MarketingDetail';
import NotFound from '@/pages/not-found';

export function Router() {
  const [location] = useLocation();

  return (
    <div className="flex flex-col min-h-screen selection:bg-white/20 selection:text-white">
      <Navbar />
      
      <main className="flex-1 flex flex-col w-full h-full">
        <AnimatePresence mode="wait">
          <Switch location={location} key={location}>
            <Route path="/" component={Landing} />
            
            <Route path="/filmmaking" component={Filmmaking} />
            <Route path="/filmmaking/:slug" component={FilmDetail} />
            
            <Route path="/marketing" component={Marketing} />
            <Route path="/marketing/:slug" component={MarketingDetail} />
            
            <Route path="/about">
              <Redirect to="/" />
            </Route>
            <Route path="/contact">
              <Redirect to="/" />
            </Route>
            <Route path="/portfolio">
              <Redirect to="/" />
            </Route>
            
            <Route component={NotFound} />
          </Switch>
        </AnimatePresence>
      </main>
      
      <Footer />
    </div>
  );
}