import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface IntroLoaderProps {
  onComplete: () => void;
}

export const IntroLoader: React.FC<IntroLoaderProps> = ({ onComplete }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelTopRef = useRef<HTMLDivElement>(null);
  const panelBottomRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      // Short fade for reduced motion preference
      const ctx = gsap.context(() => {
        gsap.to(overlayRef.current, {
          opacity: 0,
          duration: 0.4,
          delay: 0.6,
          onComplete: () => {
            if (overlayRef.current) overlayRef.current.style.display = 'none';
            onComplete();
          },
        });
      });
      return () => ctx.revert();
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (overlayRef.current) overlayRef.current.style.display = 'none';
          onComplete();
        },
      });

      // Initial States
      gsap.set(iconRef.current, { scale: 0, rotation: -30, opacity: 0, transformOrigin: 'center center' });
      gsap.set(glowRef.current, { scale: 0.5, opacity: 0 });
      gsap.set(textRef.current, { opacity: 0, y: 18 });
      gsap.set(lineRef.current, { scaleX: 0, transformOrigin: 'center' });

      // 0.0 - 0.7s: Icon scales in with a soft spring & slight rotation, purple glow pulses
      tl.to(
        iconRef.current,
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 0.75,
          ease: 'back.out(1.8)',
        },
        0
      )
        .to(
          glowRef.current,
          {
            scale: 1.2,
            opacity: 0.85,
            duration: 0.7,
            ease: 'power2.out',
          },
          0.1
        )
        // 0.7 - 1.6s: "WONDERPOP" text fades in below with wide letter spacing
        .to(
          textRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
          },
          0.7
        )
        // Thin coral to purple progress line draws under it
        .to(
          lineRef.current,
          {
            scaleX: 1,
            duration: 0.8,
            ease: 'power2.inOut',
          },
          0.8
        )
        // 1.6 - 2.0s: Hold phase (brief pause)
        .to({}, { duration: 0.4 })
        // 2.0 - 2.85s: Exit animation - Curtain panels wipe upward/downward while icon targets navbar
        .to(
          glowRef.current,
          {
            opacity: 0,
            scale: 1.6,
            duration: 0.5,
            ease: 'power2.in',
          },
          2.0
        )
        .to(
          textRef.current,
          {
            opacity: 0,
            y: -20,
            duration: 0.4,
            ease: 'power2.in',
          },
          2.0
        )
        // Icon shrinks toward top-left navbar position
        .to(
          iconRef.current,
          {
            scale: 0.35,
            x: () => -window.innerWidth * 0.42,
            y: () => -window.innerHeight * 0.42,
            opacity: 0,
            duration: 0.75,
            ease: 'power3.inOut',
          },
          2.05
        )
        // Curtain wipe panels reveal the website
        .to(
          panelTopRef.current,
          {
            yPercent: -100,
            duration: 0.85,
            ease: 'power3.inOut',
          },
          2.05
        )
        .to(
          panelBottomRef.current,
          {
            yPercent: 100,
            duration: 0.85,
            ease: 'power3.inOut',
          },
          2.05
        )
        .to(
          overlayRef.current,
          {
            opacity: 0,
            duration: 0.2,
          },
          2.75
        );
    });

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={overlayRef}
      id="intro-overlay"
      className="fixed inset-0 z-[9999] pointer-events-auto select-none overflow-hidden"
      style={{ backgroundColor: '#14102A' }}
    >
      {/* Top Curtain Panel */}
      <div
        ref={panelTopRef}
        className="absolute top-0 left-0 right-0 h-1/2 bg-[#14102A] z-10"
        style={{ willChange: 'transform' }}
      />

      {/* Bottom Curtain Panel */}
      <div
        ref={panelBottomRef}
        className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#14102A] z-10"
        style={{ willChange: 'transform' }}
      />

      {/* Center Animated Elements Container */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
        {/* Glow Element */}
        <div
          ref={glowRef}
          className="absolute w-72 h-72 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(124, 92, 255, 0.75) 0%, rgba(255, 107, 74, 0.35) 45%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />

        {/* Official Wonderpop App Icon */}
        <div ref={iconRef} className="relative z-30">
          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-[32px] overflow-hidden shadow-[0_0_80px_rgba(124,92,255,0.7)] border-2 border-white/20">
            <img
              src="/wonderpop-icon.jpg"
              alt="Wonderpop Icon"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* WONDERPOP text & progress line */}
        <div ref={textRef} className="mt-8 text-center z-30 flex flex-col items-center">
          <p className="text-sm sm:text-base font-bold tracking-[0.38em] text-[#A49FC0] uppercase pl-[0.38em]">
            WONDERPOP
          </p>
          <div className="mt-3.5 w-32 sm:w-40 h-[2.5px] bg-white/10 rounded-full overflow-hidden">
            <div
              ref={lineRef}
              className="w-full h-full bg-gradient-to-r from-[#4B2DB8] via-[#FF6B4A] to-[#FFD23F] rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
