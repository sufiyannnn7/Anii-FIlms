import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  href?: string;
  label?: string;
}

export function BackButton({ href, label = 'Back' }: BackButtonProps) {
  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = href || '/';
    }
  };

  return (
    <a
      href={href || '#'}
      onClick={handleBack}
      className="inline-flex items-center bg-card/85 backdrop-blur-md px-4.5 py-2.5 rounded-full border border-foreground/10 shadow-[0_4px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] hover:bg-card hover:border-foreground/20 transition-all duration-500 text-xs uppercase tracking-[0.25em] group relative z-[70] cursor-pointer text-foreground/75 hover:text-foreground"
    >
      <ArrowLeft className="w-3.5 h-3.5 mr-2.5 group-hover:-translate-x-0.5 transition-transform text-foreground" />
      <span className="relative font-bold text-[9px] sm:text-[10px]">
        {label}
      </span>
    </a>
  );
}