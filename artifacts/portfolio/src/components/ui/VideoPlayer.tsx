import React, { useRef } from 'react';
import { motion } from 'framer-motion';

export interface VideoProps {
  id?: string;
  video_type?: string;
  video_url?: string;
  youtube_id?: string;
  vimeo_id?: string;
  video_thumbnail?: string;
  hero_image?: string;
  title: string;
  aspect_ratio?: string;
}

export const VideoPlayer = React.memo(function VideoPlayer({ id, video_type, video_url, youtube_id, vimeo_id, video_thumbnail, hero_image, title, aspect_ratio }: VideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // If no video or explicit 'none' type, render nothing
  if (!video_type || video_type === 'none') {
    return null;
  }

  // Graceful fallback if type is known but source is missing
  if (video_type === 'youtube' && !youtube_id) return null;
  if (video_type === 'vimeo' && !vimeo_id) return null;
  if (video_type === 'mp4' && !video_url) return null;

  const getAspectRatioStyle = () => {
    if (aspect_ratio && aspect_ratio !== 'Auto' && aspect_ratio !== 'Auto (Preserve)') {
      const parts = aspect_ratio.split(':');
      if (parts.length === 2) {
        return { aspectRatio: `${parts[0]}/${parts[1]}` };
      }
    }
    // Default for iframes if Auto
    if ((video_type === 'youtube' || video_type === 'vimeo') && (!aspect_ratio || aspect_ratio.startsWith('Auto'))) {
      return { aspectRatio: '16/9' };
    }
    return {};
  };

  const isMp4 = video_type === 'mp4';

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="my-16 w-full flex justify-center items-center"
      key={id || 'featured-video'}
    >
      <div 
        ref={containerRef}
        className={`relative w-full max-w-5xl rounded-xl overflow-hidden shadow-2xl border border-foreground/10 bg-black group mx-auto`}
        style={!isMp4 ? getAspectRatioStyle() : {}}
      >
        
        {video_type === 'youtube' && (
          <iframe 
            src={`https://www.youtube.com/embed/${youtube_id}?autoplay=0&rel=0&modestbranding=1`} 
            title={`${title} Video`}
            className="w-full h-full"
            style={{ minHeight: '100%' }}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        )}

        {video_type === 'vimeo' && (
          <iframe 
            src={`https://player.vimeo.com/video/${vimeo_id}?title=0&byline=0&portrait=0`} 
            title={`${title} Video`}
            className="w-full h-full"
            style={{ minHeight: '100%' }}
            loading="lazy"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        )}

        {video_type === 'mp4' && (
          <video 
            src={video_url} 
            poster={video_thumbnail || hero_image}
            className={isMp4 ? "w-full h-auto max-h-[80vh] object-contain outline-none cursor-pointer block mx-auto" : "absolute inset-0 w-full h-full object-contain outline-none cursor-pointer"}
            controls
            playsInline
            preload="metadata"
            onDoubleClick={toggleFullscreen}
          />
        )}
      </div>
    </motion.section>
  );
});
