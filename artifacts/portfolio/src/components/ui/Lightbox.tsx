import React, { useEffect, useState, useRef, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LightboxProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function Lightbox({ images, currentIndex, onClose, onNavigate }: LightboxProps) {
  const [zoom, setZoom] = useState(false);
  const touchStart = useRef<number | null>(null);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      onNavigate(currentIndex - 1);
      setZoom(false);
    }
  }, [currentIndex, onNavigate]);

  const goNext = useCallback(() => {
    if (currentIndex < images.length - 1) {
      onNavigate(currentIndex + 1);
      setZoom(false);
    }
  }, [currentIndex, images.length, onNavigate]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, goPrev, goNext]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current === null) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    const threshold = 50;
    if (diff > threshold) goNext();
    else if (diff < -threshold) goPrev();
    touchStart.current = null;
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[999] bg-black/95 backdrop-blur-md flex items-center justify-center select-none"
        onClick={onClose}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Controls Container */}
        <div className="absolute top-6 right-6 z-[1000] flex items-center gap-4" onClick={(e) => e.stopPropagation()}>
          {/* Image counter */}
          <span className="text-white/50 text-xs font-mono tracking-wide">
            {currentIndex + 1} / {images.length}
          </span>
          <button 
            onClick={() => setZoom(!zoom)}
            className="text-white/70 hover:text-white p-2.5 bg-white/5 hover:bg-white/10 rounded-full transition-all cursor-pointer"
            title={zoom ? 'Zoom Out' : 'Zoom In'}
          >
            {zoom ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
          </button>
          <button 
            onClick={onClose}
            className="text-white/70 hover:text-white p-2.5 bg-white/5 hover:bg-white/10 rounded-full transition-all cursor-pointer"
            title="Close (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Prev Button */}
        {currentIndex > 0 && (
          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-4 sm:left-6 z-[1000] text-white/70 hover:text-white p-3 bg-white/5 hover:bg-white/10 rounded-full transition-all cursor-pointer"
            title="Previous (←)"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Next Button */}
        {currentIndex < images.length - 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-4 sm:right-6 z-[1000] text-white/70 hover:text-white p-3 bg-white/5 hover:bg-white/10 rounded-full transition-all cursor-pointer"
            title="Next (→)"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* Image Display */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          className="max-w-[90vw] max-h-[85vh] flex items-center justify-center overflow-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <img 
            src={images[currentIndex]} 
            alt={`Gallery image ${currentIndex + 1}`}
            className={`object-contain max-w-full max-h-[85vh] transition-transform duration-300 ${zoom ? 'scale-[1.8] cursor-zoom-out' : 'cursor-zoom-in'}`}
            onClick={() => setZoom(!zoom)}
            draggable={false}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
