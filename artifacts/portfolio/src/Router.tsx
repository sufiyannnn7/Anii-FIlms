import { Switch, Route, useLocation } from 'wouter';
import { AnimatePresence } from 'framer-motion';
import { lazy, Suspense } from 'react';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CursorGlow } from '@/components/effects/CursorGlow';

// Eagerly load the critical components
import Landing from '@/pages/Landing';

// Lazy load other pages to drastically reduce the initial bundle size
const Filmmaking = lazy(() => import('@/pages/Filmmaking'));
const FilmDetail = lazy(() => import('@/pages/FilmDetail'));
const Marketing = lazy(() => import('@/pages/Marketing'));
const MarketingDetail = lazy(() => import('@/pages/MarketingDetail'));
const NotFound = lazy(() => import('@/pages/not-found'));

const Login = lazy(() => import('@/pages/admin/Login'));
const Dashboard = lazy(() => import('@/pages/admin/Dashboard'));
const Projects = lazy(() => import('@/pages/admin/Projects'));
const NewProject = lazy(() => import('@/pages/admin/NewProject'));
const Settings = lazy(() => import('@/pages/admin/Settings'));
const Categories = lazy(() => import('@/pages/admin/Categories'));

import { ProtectedRoute } from '@/components/admin/ProtectedRoute';

// Simple fallback loader for lazy loaded components
const PageLoader = () => (
  <div className="w-full h-[60vh] flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-8 h-8 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin"></div>
      <span className="text-[10px] uppercase tracking-widest text-foreground/40 font-bold">Loading...</span>
    </div>
  </div>
);

export function Router() {
  const [location] = useLocation();
  const isAdminRoute = location.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen selection:bg-white/20 selection:text-white">
      {!isAdminRoute && <CursorGlow />}
      {!isAdminRoute && <Navbar />}
      
      <main className="flex-1 flex flex-col w-full h-full">
        <Suspense fallback={!isAdminRoute ? <PageLoader /> : null}>
          <AnimatePresence mode="wait">
            <Switch location={location} key={location}>
              <Route path="/" component={Landing} />
              
              <Route path="/filmmaking" component={Filmmaking} />
              <Route path="/filmmaking/:slug" component={FilmDetail} />
              
              <Route path="/marketing" component={Marketing} />
              <Route path="/marketing/:slug" component={MarketingDetail} />
              
              {/* Admin Authentication & Workspace Routes */}
              <Route path="/admin/login" component={Login} />
              
              <Route path="/admin/dashboard">
                <ProtectedRoute component={Dashboard} />
              </Route>

              <Route path="/admin/projects">
                <ProtectedRoute component={Projects} />
              </Route>
              
              <Route path="/admin/projects/new">
                <ProtectedRoute component={NewProject} />
              </Route>

              <Route path="/admin/projects/edit/:id">
                <ProtectedRoute component={NewProject} />
              </Route>

              <Route path="/admin/categories">
                <ProtectedRoute component={Categories} />
              </Route>

              <Route path="/admin/settings">
                <ProtectedRoute component={Settings} />
              </Route>

              {/* Catch-all 404 Route */}
              <Route>
                <NotFound />
              </Route>
            </Switch>
          </AnimatePresence>
        </Suspense>
      </main>

      {!isAdminRoute && <Footer />}
    </div>
  );
}