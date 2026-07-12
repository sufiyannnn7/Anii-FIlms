import { profile } from '@/data/profile';

export function Footer() {
  const handleScrollTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/5 bg-background py-16 md:py-24 relative overflow-hidden">
      {/* Subtle ambient light */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-white/[0.02] rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
        <div className="max-w-sm">
          <a href="#" onClick={handleScrollTop} className="font-display text-2xl tracking-[0.2em] text-white mb-6 block hover:text-white/70 transition-colors uppercase">
            Anii Films
          </a>
          <p className="text-white/50 text-sm leading-relaxed font-light">
            {profile.tagline}. <br/>
            Based globally. Available for commercial and artistic commissions.
          </p>
        </div>
        
        <div className="flex flex-col gap-6 text-sm">
          <h4 className="text-white/30 uppercase tracking-widest font-medium text-xs mb-2">Connect</h4>
          <a href={`mailto:${profile.socials.email}`} className="text-white/60 hover:text-white transition-colors tracking-wide">
            Email
          </a>
          <a href={profile.socials.instagram} target="_blank" rel="noreferrer" className="text-white/60 hover:text-white transition-colors tracking-wide">
            Instagram
          </a>
          <a href={profile.socials.whatsapp} target="_blank" rel="noreferrer" className="text-white/60 hover:text-white transition-colors tracking-wide">
            WhatsApp
          </a>
        </div>
      </div>
      <div className="container mx-auto px-6 mt-20 pt-8 border-t border-white/5 text-xs text-white/30 flex flex-col md:flex-row justify-between items-center gap-4 tracking-wider">
        <p>&copy; {new Date().getFullYear()} Anii Films. All rights reserved.</p>
        <p>Built with intent.</p>
      </div>
    </footer>
  );
}