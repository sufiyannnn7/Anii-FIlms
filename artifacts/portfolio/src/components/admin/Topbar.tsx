import React from 'react';
import { useAuth } from '@/lib/auth-context';
import { LogOut, User } from 'lucide-react';

export default function Topbar({ title }: { title: string }) {
  const { user, signOut } = useAuth();

  return (
    <header className="h-20 border-b border-foreground/10 bg-card/45 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-4 sm:px-8">
      {/* Title block */}
      <div>
        <h2 className="text-sm uppercase tracking-[0.2em] font-bold text-foreground">{title}</h2>
      </div>

      {/* User details and Action block */}
      <div className="flex items-center gap-4 sm:gap-6">
        {user && (
          <div className="hidden sm:flex items-center gap-2 border-r border-foreground/10 pr-6 text-foreground/75">
            <User className="w-4 h-4 text-foreground/45" />
            <span className="text-xs font-light tracking-wide">{user.email}</span>
          </div>
        )}
        <button
          onClick={() => signOut()}
          className="flex items-center gap-2 px-3 py-1.5 hover:bg-foreground/5 text-foreground/60 hover:text-foreground transition-all rounded-md text-[10px] uppercase tracking-widest font-bold cursor-pointer border border-transparent hover:border-foreground/10"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
}
