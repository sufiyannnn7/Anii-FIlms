import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { motion } from 'framer-motion';
import { FileText, Sparkles } from 'lucide-react';
import { SiteSettings } from '@/lib/settings';
import { GoldDust } from '@/components/effects/GoldDust';

interface InteractiveAboutSectionProps {
  settings?: SiteSettings;
  showAboutHeading: boolean;
  showAboutBio: boolean;
  showProfilePhoto: boolean;
  showResume: boolean;
}

export function InteractiveAboutSection({
  settings,
  showAboutHeading,
  showAboutBio,
  showProfilePhoto,
  showResume,
}: InteractiveAboutSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);
  const word1Ref = useRef<HTMLHeadingElement>(null);
  const word2Ref = useRef<HTMLHeadingElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const headingBioRef = useRef<HTMLHeadingElement>(null);
  const paragraphBioRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const [isHovered, setIsHovered] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  // Parallax physics coordinates for desktop 3D mouse reactivity
  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const targetGlowPos = useRef({ x: 0, y: 0 });
  const currentGlowPos = useRef({ x: 0, y: 0 });

  const portraitSrc = '/aniket_transparent_portrait.png';

  useEffect(() => {
    const checkMobile = () => {
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth < 768;
      const noFinePointer = !window.matchMedia('(hover: hover) and (pointer: fine)').matches;
      setIsMobileDevice(isTouch || isSmallScreen || noFinePointer);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Luxurious, slow GSAP entrance reveal on mount
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Slow, graceful entrance
      tl.fromTo(
        [word1Ref.current, word2Ref.current],
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.4, stagger: 0.2 }
      )
        .fromTo(
          portraitRef.current,
          { scale: 0.94, opacity: 0, y: 30 },
          { scale: 1, opacity: 1, y: 0, duration: 1.5 },
          '-=0.8'
        )
        .fromTo(
          cardRef.current,
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.4 },
          '-=0.7'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // 60 FPS Desktop 3D Mouse Parallax & Dynamic Reactive Glow
  useEffect(() => {
    if (isMobileDevice) return;

    let animationFrameId: number;

    const handleWindowMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();

      const isInside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      setIsHovered(isInside);

      const relX = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const relY = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

      const clampedX = Math.max(-1, Math.min(1, relX));
      const clampedY = Math.max(-1, Math.min(1, relY));

      targetPos.current = { x: clampedX, y: clampedY };
      targetGlowPos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    window.addEventListener('mousemove', handleWindowMouseMove, { passive: true });

    const updatePhysics = () => {
      const inertiaFactor = 0.06;
      const glowInertiaFactor = 0.04;

      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * inertiaFactor;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * inertiaFactor;

      currentGlowPos.current.x += (targetGlowPos.current.x - currentGlowPos.current.x) * glowInertiaFactor;
      currentGlowPos.current.y += (targetGlowPos.current.y - currentGlowPos.current.y) * glowInertiaFactor;

      const normX = currentPos.current.x;
      const normY = currentPos.current.y;

      if (bgTextRef.current) {
        bgTextRef.current.style.transform = `translate3d(${(-normX * 8).toFixed(2)}px, ${(-normY * 6).toFixed(2)}px, 0px)`;
      }

      if (portraitRef.current) {
        portraitRef.current.style.transform = `translate3d(${(normX * 14).toFixed(2)}px, ${(normY * 10).toFixed(2)}px, 0px)`;
      }

      if (cardRef.current) {
        cardRef.current.style.transform = `translate3d(${(normX * 6).toFixed(2)}px, ${(normY * 4).toFixed(2)}px, 0px)`;
      }

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${currentGlowPos.current.x.toFixed(1)}px, ${currentGlowPos.current.y.toFixed(1)}px, 0px) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(updatePhysics);
    };

    animationFrameId = requestAnimationFrame(updatePhysics);

    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMobileDevice]);

  return (
    <section 
      id="about" 
      ref={sectionRef} 
      className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-hidden border-t border-foreground/10 bg-secondary/15 z-20 py-16 sm:py-24"
    >
      {/* Top Left Section Badge */}
      <div className="absolute top-6 left-6 sm:top-10 sm:left-10 z-30">
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-primary font-bold flex items-center gap-2 bg-background/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-foreground/10 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-primary" /> 01 / ABOUT
        </span>
      </div>

      {/* Film Grain Texture Overlay */}
      <div className="absolute inset-0 noise-overlay opacity-[0.025] pointer-events-none z-0" />

      {/* Subtle Floating Dust Particles */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-20">
        <GoldDust count={isMobileDevice ? 4 : 10} />
      </div>

      {/* Warm Vignette */}
      <div className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.12)_100%)]" />

      {/* Cinematic Radial Cursor Glow */}
      {!isMobileDevice && (
        <div
          ref={glowRef}
          className="absolute w-[850px] h-[850px] rounded-full pointer-events-none transition-opacity duration-700 ease-out z-0 top-0 left-0 transform-gpu"
          style={{
            willChange: 'transform',
            transform: 'translate3d(50%, 50%, 0px) translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(235, 225, 205, 0.55) 0%, rgba(220, 210, 190, 0.2) 50%, rgba(0,0,0,0) 75%)',
            filter: 'blur(150px)',
            opacity: isHovered ? 0.95 : 0.4,
          }}
        />
      )}

      {/* Slow Fade-In Viewport Motion Container */}
      <motion.div 
        initial={{ opacity: 0, y: 45 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10 flex flex-col items-center text-center"
      >

        {/* Dynamic Reactive Typography Stack (2 Words: FILMMAKING & MARKETING) */}
        <div 
          ref={bgTextRef}
          style={{ willChange: 'transform' }}
          className="relative z-0 select-none text-center leading-none w-full max-w-full flex flex-col items-center justify-center gap-0.5 sm:gap-2 py-1 sm:py-2 transform-gpu overflow-visible transition-transform duration-300 ease-out"
        >
          {/* Word 1: FILMMAKING */}
          <div className="w-full flex justify-center max-w-full overflow-visible">
            <h1 
              ref={word1Ref}
              className="font-serif text-[9.5vw] min-[360px]:text-[10vw] sm:text-7xl md:text-8xl lg:text-[10rem] font-extrabold tracking-tight sm:tracking-tighter uppercase leading-[0.85] sm:leading-[0.82] bg-gradient-to-r from-[#24211c] via-[#484238] to-[#756b5c] bg-clip-text text-transparent opacity-85 px-1 max-w-full whitespace-nowrap transform-gpu"
            >
              FILMMAKING
            </h1>
          </div>

          {/* Word 2: MARKETING */}
          <div className="w-full flex justify-center max-w-full overflow-visible">
            <h1 
              ref={word2Ref}
              style={{ 
                WebkitTextStroke: '1.5px rgba(36, 33, 28, 0.85)', 
                color: 'transparent' 
              }}
              className="font-serif text-[9.5vw] min-[360px]:text-[11vw] sm:text-7xl md:text-8xl lg:text-[10rem] font-extrabold tracking-tight sm:tracking-tighter uppercase leading-[0.85] sm:leading-[0.82] text-transparent px-1 max-w-full whitespace-nowrap transform-gpu"
            >
              MARKETING
            </h1>
          </div>
        </div>

        {/* Centered Cutout Portrait Overlapping Background Words */}
        {showProfilePhoto && (
          <div 
            ref={portraitRef}
            style={{ willChange: 'transform' }}
            className="relative z-10 -mt-20 min-[380px]:-mt-28 sm:-mt-44 md:-mt-52 lg:-mt-[18rem] flex flex-col items-center pointer-events-auto transform-gpu transition-transform duration-300 ease-out"
          >
            <div className="relative group">
              <div 
                className="w-52 h-[19rem] min-[380px]:w-60 min-[380px]:h-[22rem] sm:w-80 sm:h-[30rem] md:w-[26rem] md:h-[34rem] lg:w-[30rem] lg:h-[38rem] relative z-10 [mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)] transition-transform duration-700 group-hover:scale-[1.025]"
              >
                <img
                  src={portraitSrc}
                  alt="Aniket - Cutout Portrait"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-contain object-top filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.18)] sm:drop-shadow-[0_30px_50px_rgba(0,0,0,0.28)] transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        )}

        {/* Soft Glass Content Panel */}
        <div 
          ref={cardRef}
          style={{ willChange: 'transform' }}
          className="relative z-20 mt-4 sm:mt-8 w-full max-w-4xl transform-gpu transition-transform duration-300 ease-out"
        >
          <div
            className={`rounded-2xl sm:rounded-[2.2rem] p-6 sm:p-12 border border-foreground/10 relative overflow-hidden bg-card/50 backdrop-blur-md sm:backdrop-blur-xl text-left transition-all duration-300 ease-out ${
              isHovered
                ? '-translate-y-1 scale-[1.01] border-foreground/20 shadow-[0_25px_50px_rgba(0,0,0,0.12)]'
                : 'scale-100 shadow-sm'
            }`}
          >
            {/* Corner Gold Accent */}
            <div className="absolute top-0 right-0 w-12 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            <div className="absolute top-0 right-0 w-[1px] h-12 bg-gradient-to-b from-transparent via-primary/30 to-transparent" />

            {showAboutHeading && (
              <h3 
                ref={headingBioRef}
                className="font-display text-xl sm:text-3xl text-foreground font-semibold mb-3 sm:mb-4 leading-tight text-left transform-gpu"
              >
                {settings?.about_heading || 'Strategic Marketing Meets Cinematic Storytelling'}
              </h3>
            )}

            {showAboutBio && (
              <p 
                ref={paragraphBioRef}
                className="text-sm sm:text-lg text-foreground/85 font-light leading-relaxed mb-6 sm:mb-8 text-left transform-gpu"
              >
                {settings?.about_description}
              </p>
            )}

            {showResume && (
              <div ref={ctaRef} className="flex flex-wrap items-center gap-4 mb-8 transform-gpu">
                <a
                  href={settings?.resume_url || ''}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative inline-flex items-center gap-3 px-8 py-3.5 border border-foreground/20 hover:border-foreground bg-foreground text-background hover:bg-foreground/90 tracking-[0.2em] uppercase text-[11px] font-bold rounded-full transition-all duration-300 shadow-md hover:shadow-[0_15px_30px_rgba(0,0,0,0.2)] hover:-translate-y-0.5 overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none" />
                  <FileText className="w-4 h-4 text-background" />
                  <span>Download Resume / CV</span>
                </a>
              </div>
            )}

            {/* Bottom Stats Divider */}
            <div className="border-t border-foreground/15 pt-6 sm:pt-8 flex flex-wrap gap-x-12 sm:gap-x-16 gap-y-6 sm:gap-y-8 text-left">
              {(settings?.about_stats || [{ value: '40+', label: 'Successful projects & campaigns delivered' }]).map((stat, idx) => (
                <div key={idx} className="flex flex-col gap-1.5 sm:gap-2 max-w-[240px]">
                  <span className="font-serif text-3xl sm:text-5xl text-foreground tracking-tighter font-light italic">
                    {stat.value}
                  </span>
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.18em] sm:tracking-[0.2em] text-foreground/70 font-medium leading-relaxed">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </motion.div>
    </section>
  );
}
