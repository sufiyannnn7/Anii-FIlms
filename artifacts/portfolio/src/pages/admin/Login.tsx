import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/lib/auth-context';
import { signIn } from '@/lib/auth';
import { Mail, Lock, AlertCircle, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSiteSettings } from '@/lib/settings';

export default function Login() {
  const { data: settings } = useSiteSettings();
  const { session } = useAuth();
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const brandName = settings?.brand_name;
  const logoUrl = settings?.logo_url;

  useEffect(() => {
    if (session) {
      setLocation('/admin/dashboard');
    }
  }, [session, setLocation]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { data, error: authError } = await signIn(email, password);
      
      if (authError) {
        setError(authError.message);
      } else if (data.session) {
        setLocation('/admin/dashboard');
      }
    } catch (err: any) {
      setError(err?.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f3ee] text-foreground flex items-center justify-center p-6 relative overflow-hidden">
      <div className="fixed inset-0 z-[100] noise-overlay mix-blend-overlay pointer-events-none"></div>
      
      {/* Decorative premium blurs */}
      <div className="absolute top-1/4 left-1/4 w-[30vw] h-[30vw] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[25vw] h-[25vw] rounded-full bg-primary/10 blur-[100px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md relative z-10"
      >
        {/* Brand Header */}
        <div className="text-center mb-8 flex flex-col items-center">
          <h1 className="font-display text-2xl uppercase tracking-[0.25em] text-foreground">Portfolio</h1>
          <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/45 mt-2 font-bold">Admin Portal</p>
        </div>

        {/* Login Card */}
        <div className="glass border border-foreground/10 bg-card/85 backdrop-blur-2xl p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-xl flex flex-col gap-6">
          <div className="text-center">
            <h2 className="text-lg font-semibold tracking-wide text-foreground">Sign In</h2>
            <p className="text-xs text-foreground/50 mt-1 font-light">Access your project dashboard panel</p>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-destructive/10 border border-destructive/20 text-destructive text-xs rounded-lg flex items-center gap-3"
            >
              <AlertCircle className="w-4.5 h-4.5 shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Email Field */}
            <div className="flex flex-col gap-1.5 text-left">
              <label className="text-[9px] uppercase tracking-[0.2em] text-foreground/60 font-bold">Email Address</label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3 w-4 h-4 text-foreground/35" />
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  disabled={loading}
                  className="w-full bg-transparent border-b border-foreground/15 focus:border-primary outline-none pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-foreground/30 font-light transition-colors"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-1.5 text-left">
              <label className="text-[9px] uppercase tracking-[0.2em] text-foreground/60 font-bold">Password</label>
              <div className="relative flex items-center">
                <Lock className="absolute left-3 w-4 h-4 text-foreground/35" />
                <input
                  required
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  disabled={loading}
                  className="w-full bg-transparent border-b border-foreground/15 focus:border-primary outline-none pl-10 pr-10 py-3 text-sm text-foreground placeholder:text-foreground/30 font-light transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 text-foreground/35 hover:text-foreground transition-colors p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: loading ? 1 : 1.01 }}
              whileTap={{ scale: loading ? 1 : 0.99 }}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2.5 mt-4 py-4 bg-primary hover:bg-primary/95 text-primary-foreground font-semibold tracking-widest uppercase text-[10px] rounded-md shadow-md transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-primary-foreground/20 border-t-primary-foreground rounded-full animate-spin"></div>
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
