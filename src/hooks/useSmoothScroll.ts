import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useSmoothScroll = (isLocked: boolean = true) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // 1. Set scroll restoration to manual and ensure top scroll
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.8,
    });

    lenisRef.current = lenis;

    // Initially stop scroll while locked
    if (isLocked) {
      lenis.stop();
      document.body.classList.add('lock-scroll');
    }

    // Connect Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
      document.body.classList.remove('lock-scroll');
    };
  }, []);

  // Watch lock state changes
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    if (isLocked) {
      lenis.stop();
      document.body.classList.add('lock-scroll');
    } else {
      lenis.start();
      document.body.classList.remove('lock-scroll');
      ScrollTrigger.refresh();
    }
  }, [isLocked]);

  return lenisRef;
};
