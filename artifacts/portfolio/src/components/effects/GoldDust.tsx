import { useMemo } from 'react';
import { motion } from 'framer-motion';

interface GoldDustProps {
  count?: number;
  className?: string;
}

function seeded(index: number, salt: number) {
  const value = Math.sin(index * 91.73 + salt * 37.11) * 10000;
  return value - Math.floor(value);
}

/**
 * Ambient drifting gold dust / light particles.
 * Absolutely positioned within the nearest `relative` ancestor —
 * wrap a section with `relative overflow-hidden` and drop this inside.
 */
export function GoldDust({ count = 36, className = '' }: GoldDustProps) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        x: seeded(i, 1) * 100,
        y: seeded(i, 2) * 100,
        size: 1.5 + seeded(i, 3) * 3,
        opacity: 0.15 + seeded(i, 4) * 0.45,
        duration: 8 + seeded(i, 5) * 14,
        delay: seeded(i, 6) * 8,
        drift: 20 + seeded(i, 7) * 60,
        sway: (seeded(i, 8) - 0.5) * 40,
      })),
    [count]
  );

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {particles.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: 'radial-gradient(circle, #fff2d0 0%, #e0b86e 55%, transparent 100%)',
            boxShadow: '0 0 6px 1px rgba(224,184,110,0.65)',
          }}
          initial={{ opacity: 0, y: 0, x: 0 }}
          animate={{
            opacity: [0, p.opacity, p.opacity, 0],
            y: [0, -p.drift],
            x: [0, p.sway, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
