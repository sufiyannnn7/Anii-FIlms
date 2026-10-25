import React, { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/lib/auth-context';

export function ProtectedRoute({ component: Component }: { component: React.ComponentType }) {
  const { session, loading } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!loading && !session) {
      setLocation('/admin/login');
    }
  }, [loading, session, setLocation]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f4f3ee] flex items-center justify-center relative">
        <div className="fixed inset-0 z-[100] noise-overlay mix-blend-overlay pointer-events-none"></div>
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-foreground/10 border-t-primary rounded-full animate-spin"></div>
          <span className="text-[10px] uppercase tracking-[0.2em] text-foreground/50 font-semibold">Verifying Session...</span>
        </div>
      </div>
    );
  }

  return session ? <Component /> : null;
}
