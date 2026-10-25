import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * A soft multi-color light that follows the cursor or touch gestures across the entire page.
 * Purely decorative — sits above content but ignores pointer events.
 * Works on both desktop and touch/mobile screens.
 */
export function CursorGlow() {
  const mouseX = useMotionValue(-400);
  const mouseY = useMotionValue(-400);
  const opacity = useMotionValue(0);

  const springConfig = { damping: 28, stiffness: 180, mass: 0.6 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);
  const springOpacity = useSpring(opacity, { damping: 20, stiffness: 120 });

  const dotX = useSpring(mouseX, { damping: 35, stiffness: 600, mass: 0.2 });
  const dotY = useSpring(mouseY, { damping: 35, stiffness: 600, mass: 0.2 });

  useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      opacity.set(1);
    };

    const handleLeave = () => {
      opacity.set(0);
    };

    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerleave', handleLeave);
    window.addEventListener('pointerup', handleLeave);
    window.addEventListener('pointercancel', handleLeave);

    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerleave', handleLeave);
      window.removeEventListener('pointerup', handleLeave);
      window.removeEventListener('pointercancel', handleLeave);
    };
  }, [mouseX, mouseY, opacity]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[90] overflow-hidden" aria-hidden="true">
      {/* Large soft ambient glow, trails behind cursor with maroon and gold tint */}
      <motion.div
        className="absolute rounded-full"
        style={{
          left: springX,
          top: springY,
          x: '-50%',
          y: '-50%',
          width: 320,
          height: 320,
          background:
            'radial-gradient(circle, rgba(99,26,26,0.04) 0%, rgba(224,184,110,0.02) 45%, transparent 70%)',
          mixBlendMode: 'multiply',
          opacity: springOpacity,
        }}
      />
      {/* Tight inner glow */}
      <motion.div
        className="absolute rounded-full"
        style={{
          left: springX,
          top: springY,
          x: '-50%',
          y: '-50%',
          width: 100,
          height: 100,
          background:
            'radial-gradient(circle, rgba(99,26,26,0.08) 0%, rgba(224,184,110,0.04) 50%, transparent 80%)',
          mixBlendMode: 'multiply',
          opacity: springOpacity,
        }}
      />
      {/* Crisp dot at the exact cursor point */}
      <motion.div
        className="absolute rounded-full bg-[#631a1a]"
        style={{
          left: dotX,
          top: dotY,
          x: '-50%',
          y: '-50%',
          width: 5,
          height: 5,
          boxShadow: '0 0 10px 2px rgba(99,26,26,0.3), 0 0 20px 4px rgba(224,184,110,0.15)',
          opacity: springOpacity,
        }}
      />
    </div>
  );
}
