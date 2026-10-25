import React from 'react';
import { BannerImageUpload } from './BannerImageUpload';

interface HomeCardConfig {
  title: string;
  title_color: string;
  subtitle: string;
  description: string;
  bg_image: string | null;
  desktop_bg_image: string | null;
  mobile_bg_image: string | null;
  overlay_opacity: number;
  overlay_color: string;
  text_color: string;
  button_text: string;
  button_link: string;
  card_height: string;
  border_radius: string;
  text_alignment: string;
  card_order: number;
  show_card: boolean;
  hover_animation: string;
}

interface Props {
  title: string;
  config: HomeCardConfig;
  onChange: (config: HomeCardConfig) => void;
}

export function HomeCardEditor({ title, config, onChange }: Props) {
  const update = (key: keyof HomeCardConfig, value: any) => {
    onChange({ ...config, [key]: value });
  };

  return (
    <div className="flex flex-col gap-6 p-6 border border-foreground/10 rounded-xl bg-card text-left mt-6">
      <div className="flex items-center justify-between border-b border-foreground/10 pb-4">
        <h4 className="font-bold text-foreground uppercase tracking-widest text-xs">{title} Configuration</h4>
        <div className="flex items-center gap-2">
          <label className="text-[10px] uppercase tracking-widest font-bold text-foreground/60">Show Card</label>
          <input 
            type="checkbox" 
            checked={config.show_card} 
            onChange={(e) => update('show_card', e.target.checked)}
            className="w-4 h-4 accent-primary"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-1.5">
          <label className="text-[9px] uppercase tracking-[0.2em] text-foreground/60 font-bold">Card Title</label>
          <input
            type="text"
            value={config.title}
            onChange={(e) => update('title', e.target.value)}
            className="bg-transparent border-b border-foreground/15 focus:border-primary outline-none py-2 text-sm text-foreground"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[9px] uppercase tracking-[0.2em] text-foreground/60 font-bold">Card Subtitle (Use • for separators)</label>
          <input
            type="text"
            value={config.subtitle}
            onChange={(e) => update('subtitle', e.target.value)}
            className="bg-transparent border-b border-foreground/15 focus:border-primary outline-none py-2 text-sm text-foreground"
          />
        </div>
        <div className="flex flex-col gap-1.5 md:col-span-2">
          <label className="text-[9px] uppercase tracking-[0.2em] text-foreground/60 font-bold">Hover Description (e.g. Explore Projects)</label>
          <input
            type="text"
            value={config.description}
            onChange={(e) => update('description', e.target.value)}
            className="bg-transparent border-b border-foreground/15 focus:border-primary outline-none py-2 text-sm text-foreground"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-foreground/10">
        <BannerImageUpload 
          label="Default Background Image" 
          value={config.bg_image || ''} 
          onChange={(url) => update('bg_image', url)} 
          aspectRatio="aspect-[4/3.5]"
        />
        <BannerImageUpload 
          label="Desktop Background (Optional)" 
          value={config.desktop_bg_image || ''} 
          onChange={(url) => update('desktop_bg_image', url)} 
          aspectRatio="aspect-[4/3.5]"
        />
        <BannerImageUpload 
          label="Mobile Background (Optional)" 
          value={config.mobile_bg_image || ''} 
          onChange={(url) => update('mobile_bg_image', url)} 
          aspectRatio="aspect-[4/3.5]"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-foreground/10">
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between">
            <label className="text-[9px] uppercase tracking-[0.2em] text-foreground/60 font-bold">Overlay Opacity</label>
            <span className="text-[9px] text-foreground/50">{config.overlay_opacity}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={config.overlay_opacity}
            onChange={(e) => update('overlay_opacity', parseInt(e.target.value))}
            className="w-full accent-primary"
          />
        </div>
        
        <div className="flex flex-col gap-1.5">
          <label className="text-[9px] uppercase tracking-[0.2em] text-foreground/60 font-bold">Overlay Color</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={config.overlay_color}
              onChange={(e) => update('overlay_color', e.target.value)}
              className="w-8 h-8 rounded border-none bg-transparent cursor-pointer"
            />
            <input
              type="text"
              value={config.overlay_color}
              onChange={(e) => update('overlay_color', e.target.value)}
              className="bg-transparent border-b border-foreground/15 focus:border-primary outline-none py-1 text-sm text-foreground w-full"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[9px] uppercase tracking-[0.2em] text-foreground/60 font-bold">Title Color</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={config.title_color || '#ffffff'}
              onChange={(e) => update('title_color', e.target.value)}
              className="w-8 h-8 rounded border-none bg-transparent cursor-pointer"
            />
            <input
              type="text"
              value={config.title_color || '#ffffff'}
              onChange={(e) => update('title_color', e.target.value)}
              className="bg-transparent border-b border-foreground/15 focus:border-primary outline-none py-1 text-sm text-foreground w-full"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[9px] uppercase tracking-[0.2em] text-foreground/60 font-bold">Button / Secondary Text Color</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={config.text_color}
              onChange={(e) => update('text_color', e.target.value)}
              className="w-8 h-8 rounded border-none bg-transparent cursor-pointer"
            />
            <input
              type="text"
              value={config.text_color}
              onChange={(e) => update('text_color', e.target.value)}
              className="bg-transparent border-b border-foreground/15 focus:border-primary outline-none py-1 text-sm text-foreground w-full"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4 border-t border-foreground/10">
        <div className="flex flex-col gap-1.5">
          <label className="text-[9px] uppercase tracking-[0.2em] text-foreground/60 font-bold">Card Height Class</label>
          <input
            type="text"
            value={config.card_height}
            onChange={(e) => update('card_height', e.target.value)}
            placeholder="aspect-[4/3.5] or h-[400px]"
            className="bg-transparent border-b border-foreground/15 focus:border-primary outline-none py-2 text-sm text-foreground"
          />
        </div>
        
        <div className="flex flex-col gap-1.5">
          <label className="text-[9px] uppercase tracking-[0.2em] text-foreground/60 font-bold">Border Radius Class</label>
          <input
            type="text"
            value={config.border_radius}
            onChange={(e) => update('border_radius', e.target.value)}
            placeholder="rounded-xl"
            className="bg-transparent border-b border-foreground/15 focus:border-primary outline-none py-2 text-sm text-foreground"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[9px] uppercase tracking-[0.2em] text-foreground/60 font-bold">Text Alignment</label>
          <select
            value={config.text_alignment}
            onChange={(e) => update('text_alignment', e.target.value)}
            className="bg-secondary/50 border-b border-foreground/15 focus:border-primary outline-none py-2 text-sm text-foreground"
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[9px] uppercase tracking-[0.2em] text-foreground/60 font-bold">Display Order</label>
          <input
            type="number"
            value={config.card_order}
            onChange={(e) => update('card_order', parseInt(e.target.value))}
            className="bg-transparent border-b border-foreground/15 focus:border-primary outline-none py-2 text-sm text-foreground"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-foreground/10">
        <div className="flex flex-col gap-1.5">
          <label className="text-[9px] uppercase tracking-[0.2em] text-foreground/60 font-bold">Button Text</label>
          <input
            type="text"
            value={config.button_text}
            onChange={(e) => update('button_text', e.target.value)}
            className="bg-transparent border-b border-foreground/15 focus:border-primary outline-none py-2 text-sm text-foreground"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[9px] uppercase tracking-[0.2em] text-foreground/60 font-bold">Button Link</label>
          <input
            type="text"
            value={config.button_link}
            onChange={(e) => update('button_link', e.target.value)}
            className="bg-transparent border-b border-foreground/15 focus:border-primary outline-none py-2 text-sm text-foreground"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[9px] uppercase tracking-[0.2em] text-foreground/60 font-bold">Hover Animation</label>
          <select
            value={config.hover_animation}
            onChange={(e) => update('hover_animation', e.target.value)}
            className="bg-secondary/50 border-b border-foreground/15 focus:border-primary outline-none py-2 text-sm text-foreground"
          >
            <option value="zoom-shadow">Zoom & Shadow</option>
            <option value="lift">Lift Up</option>
            <option value="glow">Glow</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
    </div>
  );
}
