import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * A soft light that follows the cursor across the entire page.
 * Purely decorative — sits above content but ignores pointer events.
 * Hidden on touch devices where there is no persistent cursor.
 */
export function CursorGlow() {
  const mouseX = useMotionValue(-400);
  const mouseY = useMotionValue(-400);
  const springX = useSpring(mouseX, { damping: 30, stiffness: 200, mass: 0.5 });
  const springY = useSpring(mouseY, { damping: 30, stiffness: 200, mass: 0.5 });
  const dotX = useSpring(mouseX, { damping: 40, stiffness: 700, mass: 0.2 });
  const dotY = useSpring(mouseY, { damping: 40, stiffness: 700, mass: 0.2 });
  const hasCursor = useRef(true);

  useEffect(() => {
    hasCursor.current = window.matchMedia('(pointer: fine)').matches;
    if (!hasCursor.current) return;

    const handleMove = (e: PointerEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('pointermove', handleMove);
    return () => window.removeEventListener('pointermove', handleMove);
  }, [mouseX, mouseY]);

  if (!hasCursor.current) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[90] hidden md:block" aria-hidden="true">
      {/* Large soft ambient glow, trails behind cursor */}
      <motion.div
        className="absolute rounded-full"
        style={{
          left: springX,
          top: springY,
          x: '-50%',
          y: '-50%',
          width: 420,
          height: 420,
          background:
            'radial-gradient(circle, rgba(224,184,110,0.10) 0%, rgba(224,184,110,0.04) 35%, transparent 70%)',
          mixBlendMode: 'screen',
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
          width: 140,
          height: 140,
          background:
            'radial-gradient(circle, rgba(255,236,196,0.22) 0%, rgba(224,184,110,0.08) 45%, transparent 75%)',
          mixBlendMode: 'screen',
        }}
      />
      {/* Crisp dot at the exact cursor point */}
      <motion.div
        className="absolute rounded-full bg-[#f3dfae]"
        style={{
          left: dotX,
          top: dotY,
          x: '-50%',
          y: '-50%',
          width: 6,
          height: 6,
          boxShadow: '0 0 12px 2px rgba(224,184,110,0.7)',
        }}
      />
    </div>
  );
}
