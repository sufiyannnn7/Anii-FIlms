import { profile } from '@/data/profile';
import { Link } from 'wouter';

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-12 md:py-16 mt-auto">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="max-w-sm">
          <Link href="/" className="font-display text-2xl tracking-widest text-white mb-4 block hover:text-accent transition-colors">
            JULIAN VANCE
          </Link>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {profile.tagline}. Based globally. Available for commercial and artistic commissions.
          </p>
        </div>
        
        <div className="flex flex-col gap-4 text-sm">
          <h4 className="text-white uppercase tracking-widest font-medium text-xs mb-2">Connect</h4>
          <a href={`mailto:${profile.socials.email}`} className="text-muted-foreground hover:text-accent transition-colors">
            Email
          </a>
          <a href={profile.socials.instagram} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-accent transition-colors">
            Instagram
          </a>
          <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-accent transition-colors">
            LinkedIn
          </a>
        </div>
      </div>
      <div className="container mx-auto px-6 mt-16 pt-8 border-t border-border/50 text-xs text-muted-foreground flex justify-between">
        <p>&copy; {new Date().getFullYear()} Julian Vance. All rights reserved.</p>
        <p>Built with intent.</p>
      </div>
    </footer>
  );
}
