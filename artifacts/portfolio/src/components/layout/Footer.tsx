import { useSiteSettings } from '@/lib/settings';

export function Footer() {
  const { data: settings, isLoading } = useSiteSettings();
  
  if (isLoading) return null;

  const handleScrollTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const hasSettings = !!settings;
  
  const showLogo = !!settings?.logo_url;
  const logoUrl = settings?.logo_url;
  
  const showBrandName = !settings || !!settings.brand_name;
  const brandName = settings?.brand_name || 'Anii Films';
  
  const showTagline = !hasSettings || !!settings.tagline;
  const tagline = settings?.tagline || 'Strategic Marketing Meets Cinematic Storytelling';
  
  const showEmail = !hasSettings || !!settings.contact_email;
  const email = settings?.contact_email || 'aniket24007@gmail.com';
  
  const showInstagram = !hasSettings || !!settings.instagram_url;
  const instagram = settings?.instagram_url || 'https://instagram.com/_aniifilms';
  
  const showWhatsapp = !hasSettings || !!settings.contact_phone;
  const whatsapp = settings?.contact_phone 
    ? `https://wa.me/${settings.contact_phone.replace(/\D/g, '')}` 
    : 'https://wa.me/919172255729';

  return (
    <footer className="border-t border-foreground/10 bg-[#ebeae4]/20 pt-16 pb-8 relative overflow-hidden">
      {/* Subtle ambient light */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#631a1a]/[0.01] rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center gap-10">
        
        {/* Brand / Logo (Optional) */}
        {(showLogo || showBrandName) && (
          <a href="#" onClick={handleScrollTop} className="flex flex-col items-center gap-4 font-display text-xl sm:text-2xl tracking-[0.2em] text-foreground hover:text-foreground/80 transition-colors uppercase">
            {showLogo && (
              <div className="w-12 h-12 rounded-full overflow-hidden border border-foreground/20 flex items-center justify-center bg-black shrink-0 shadow-[0_0_15px_rgba(0,0,0,0.15)]">
                <img src={logoUrl || undefined} alt="Logo" className="w-full h-full object-cover scale-105" />
              </div>
            )}
            {showBrandName && <span>{brandName}</span>}
          </a>
        )}

        {/* Connect Links */}
        {(showEmail || showInstagram || showWhatsapp) && (
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 text-[11px] uppercase tracking-[0.25em] font-bold text-foreground/60">
            {showEmail && (
              <a href={`mailto:${email}`} className="hover:text-foreground transition-colors">
                Email
              </a>
            )}
            {showInstagram && (
              <a href={instagram} target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">
                Instagram
              </a>
            )}
            {showWhatsapp && (
              <a href={whatsapp} target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">
                WhatsApp
              </a>
            )}
          </div>
        )}
      </div>

      <div className="container mx-auto px-6 mt-16 pt-8 border-t border-foreground/10 text-[10px] uppercase tracking-[0.2em] text-foreground/40 flex flex-col md:flex-row justify-between items-center gap-4">
        <p>{new Date().getFullYear()} {showBrandName ? brandName : 'Portfolio'}. All rights reserved.</p>
        <p>Built with intent.</p>
      </div>
    </footer>
  );
}