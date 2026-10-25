import { useEffect, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface GoldDustProps {
  count?: number;
  className?: string;
}

function seeded(index: number, salt: number) {
  const value = Math.sin(index * 91.73 + salt * 37.11) * 10000;
  return value - Math.floor(value);
}

const PETAL_THEMES = [
  {
    // Rose / Cherry Blossom
    bg: 'linear-gradient(135deg, #ffd3e2 0%, #ee2a7b 100%)',
    shadow: '0 2px 6px rgba(238,42,123,0.15)',
    borderRadius: '16px 3px 16px 3px',
  },
  {
    // Gold Leaf
    bg: 'linear-gradient(135deg, #fff2d0 0%, #e0b86e 100%)',
    shadow: '0 2px 6px rgba(224,184,110,0.15)',
    borderRadius: '14px 2px 14px 2px',
  },
  {
    // Deep Maroon Petal
    bg: 'linear-gradient(135deg, #b91c1c 0%, #631a1a 100%)',
    shadow: '0 2px 6px rgba(99,26,26,0.2)',
    borderRadius: '15px 4px 15px 4px',
  },
  {
    // Soft White/Cream Blossom
    bg: 'linear-gradient(135deg, #ffffff 0%, #dedcce 100%)',
    shadow: '0 2px 6px rgba(0,0,0,0.04)',
    borderRadius: '12px 2px 12px 2px',
  },
];

interface ParticleData {
  x: number;
  width: number;
  height: number;
  opacity: number;
  duration: number;
  delay: number;
  sway: number;
  rotateX: number;
  rotateY: number;
  rotateZ: number;
  theme: typeof PETAL_THEMES[number];
  parallaxWeight: number;
}

function DustParticle({
  p,
  springX,
  springY,
}: {
  p: ParticleData;
  springX: any;
  springY: any;
}) {
  // Apply a custom translation depending on particle size and parallax weight
  const translateX = useTransform(springX, (v: number) => v * p.parallaxWeight);
  const translateY = useTransform(springY, (v: number) => v * p.parallaxWeight);

  return (
    // Parent wrapper handles cursor parallax
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: `${p.x}%`,
        x: translateX,
        y: translateY,
      }}
    >
      {/* Child element handles falling, swaying, and 3D rotation */}
      <motion.span
        className="block will-change-transform"
        style={{
          width: p.width,
          height: p.height,
          background: p.theme.bg,
          boxShadow: p.theme.shadow,
          borderRadius: p.theme.borderRadius,
          transformStyle: 'preserve-3d',
        }}
        initial={{ y: '-10vh', opacity: 0, rotate: 0, rotateX: 0, rotateY: 0, x: 0 }}
        animate={{
          y: '115vh',
          opacity: [0, p.opacity, p.opacity, 0],
          x: [0, p.sway, -p.sway, p.sway, 0],
          rotate: [0, p.rotateZ],
          rotateX: [0, p.rotateX],
          rotateY: [0, p.rotateY],
        }}
        transition={{
          duration: p.duration,
          delay: p.delay,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </motion.div>
  );
}

/**
 * Ambient falling 3D petals / leaves background.
 * Drifts down, rotates in 3D, and responds to mouse/touch movements via parallax.
 */
export function GoldDust({ count = 30, className = '' }: GoldDustProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth mouse movement for parallax drift
  const springX = useSpring(mouseX, { damping: 45, stiffness: 60, mass: 0.8 });
  const springY = useSpring(mouseY, { damping: 45, stiffness: 60, mass: 0.8 });

  useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      // Scale mouse position to range [-1.0, 1.0] from screen center
      const xPercent = (e.clientX / window.innerWidth) * 2 - 1;
      const yPercent = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(xPercent);
      mouseY.set(yPercent);
    };

    window.addEventListener('pointermove', handleMove);
    return () => window.removeEventListener('pointermove', handleMove);
  }, [mouseX, mouseY]);

  const particles = useMemo<ParticleData[]>(
    () =>
      Array.from({ length: count }, (_, i) => {
        const themeIndex = Math.floor(seeded(i, 9) * PETAL_THEMES.length);
        const width = 8 + seeded(i, 3) * 12; // 8px to 20px
        const height = width * (0.6 + seeded(i, 11) * 0.4); // slightly narrower than width
        const duration = 12 + seeded(i, 5) * 12; // 12s to 24s
        
        // Seed a negative delay so the screen is already filled with petals on load
        const delay = seeded(i, 6) * -24;

        // Parallax weight: larger petals drift slightly more
        const parallaxWeight = (width * 1.5) + (seeded(i, 10) * 10);

        return {
          x: seeded(i, 1) * 100,
          width,
          height,
          opacity: 0.25 + seeded(i, 4) * 0.55,
          duration,
          delay,
          sway: (seeded(i, 8) - 0.5) * 80, // -40px to +40px sway path
          rotateX: seeded(i, 12) * 720,
          rotateY: seeded(i, 13) * 720,
          rotateZ: seeded(i, 14) * 720,
          theme: PETAL_THEMES[themeIndex],
          parallaxWeight,
        };
      }),
    [count]
  );

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {particles.map((p, i) => (
        <DustParticle key={i} p={p} springX={springX} springY={springY} />
      ))}
    </div>
  );
}
