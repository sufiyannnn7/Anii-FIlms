import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

interface BackButtonProps {
  href: string;
  label: string;
}

export function BackButton({ href, label }: BackButtonProps) {
  return (
    <Link href={href} className="inline-flex items-center text-white/50 hover:text-white transition-all duration-300 text-xs uppercase tracking-[0.2em] group relative z-20 py-2">
      <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-white/10 mr-4 group-hover:bg-white/10 transition-colors group-hover:border-white/20 overflow-hidden">
         {/* Subtle inner glow on hover */}
         <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity blur-md" />
         <ArrowLeft className="w-3.5 h-3.5 relative z-10 group-hover:-translate-x-0.5 transition-transform" />
      </div>
      <span className="relative">
        {label}
        <span className="absolute left-0 -bottom-1 w-full h-[1px] bg-white/30 scale-x-0 group-hover:scale-x-100 transform origin-left transition-transform duration-300" />
      </span>
    </Link>
  );
}