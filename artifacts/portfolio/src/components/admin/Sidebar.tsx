import React from 'react';
import { useLocation } from 'wouter';
import { LayoutDashboard, Folder, Tags, User, Settings, LogOut } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { useSiteSettings } from '@/lib/settings';

export default function Sidebar() {
  const { data: settings } = useSiteSettings();
  const [location, setLocation] = useLocation();
  const { user, signOut } = useAuth();

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Projects', path: '/admin/projects', icon: Folder },
    { name: 'Categories', path: '/admin/categories', icon: Tags },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <aside className="w-16 md:w-64 bg-card border-r border-foreground/10 flex flex-col h-screen sticky top-0 shrink-0 group hover:w-64 transition-all duration-300 overflow-x-hidden z-40">
      {/* Brand Header */}
      <div className="h-20 border-b border-foreground/10 flex items-center px-6 gap-3">
        {settings?.logo_url && (
          <div className="w-8 h-8 flex items-center justify-center shrink-0">
            <img src={settings.logo_url} alt="Logo" className="w-full h-full object-contain" />
          </div>
        )}
        <div className="flex-col hidden md:flex group-hover:flex">
          <span className="font-display text-sm tracking-[0.2em] text-foreground uppercase whitespace-nowrap">{settings?.brand_name || 'Portfolio'}</span>
          <span className="text-[8px] uppercase tracking-[0.15em] text-foreground/40 font-bold whitespace-nowrap">Workspace</span>
        </div>
      </div>

      {/* Nav Menu */}
      <nav className="flex-1 py-6 px-4 flex flex-col gap-1.5">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.path;
          return (
            <button
              key={item.name}
              
              onClick={() => setLocation(item.path)}
              className={`w-full flex items-center gap-3.5 px-4.5 py-3 rounded-lg text-xs uppercase tracking-wider font-semibold transition-all duration-300 ${
                isActive
                  ? 'bg-foreground/5 text-foreground'
                  : 'text-foreground/50 hover:text-foreground hover:bg-foreground/5'
              } cursor-pointer`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span className="hidden md:inline group-hover:inline whitespace-nowrap">{item.name}</span>

            </button>
          );
        })}
      </nav>

      {/* User Footer Profile */}
      {user && (
        <div className="p-4 border-t border-foreground/10 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="flex-col min-w-0 hidden md:flex group-hover:flex">
              <span className="text-[10px] uppercase tracking-wider text-foreground/75 font-semibold truncate">
                {settings?.hero_display_name || 'Admin User'}
              </span>
              <span className="text-[8px] text-foreground/45 truncate">
                {user.email}
              </span>
            </div>
          </div>
          <button
            onClick={() => signOut()}
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-foreground/5 hover:bg-foreground/10 text-foreground/70 hover:text-foreground border border-foreground/10 rounded-lg text-[9px] uppercase tracking-widest font-bold transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden md:inline group-hover:inline whitespace-nowrap">Log Out</span>
          </button>
        </div>
      )}
    </aside>
  );
}
