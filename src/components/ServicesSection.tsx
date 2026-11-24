import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SERVICES_DATA } from '../data/wonderpopData';
import { Service3DCanvas } from './canvas/Service3DCanvas';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ServicesSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const activeIndexRef = useRef(0);
  const targetIndexRef = useRef(0);
  const isTransitioningRef = useRef(false);
  const transitionTimerRef = useRef<NodeJS.Timeout | number>(0);
  const snapTimerRef = useRef<NodeJS.Timeout | number>(0);

  const totalServices = SERVICES_DATA.length;

  // Step-wise transition: moves AT MOST ONE STEP per transition (~320ms) toward targetIndex
  // Ensures fast scrolling or flings never skip any service
  const advanceStep = useCallback(() => {
    if (activeIndexRef.current === targetIndexRef.current) {
      isTransitioningRef.current = false;
      return;
    }

    isTransitioningRef.current = true;
    const step = Math.sign(targetIndexRef.current - activeIndexRef.current);
    const nextIndex = activeIndexRef.current + step;
    activeIndexRef.current = nextIndex;
    setActiveIndex(nextIndex);

    transitionTimerRef.current = setTimeout(() => {
      advanceStep();
    }, 320);
  }, []);

  const setTargetIndex = useCallback(
    (newTarget: number) => {
      targetIndexRef.current = newTarget;
      if (!isTransitioningRef.current) {
        advanceStep();
      }
    },
    [advanceStep]
  );

  // Scroll directly to matching service position for arrows, dots, and soft snap
  const scrollToService = useCallback(
    (index: number) => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const sectionStart = rect.top + scrollTop;
      const totalDist = rect.height - window.innerHeight;

      if (totalDist <= 0) return;

      const targetScroll = sectionStart + (index / (totalServices - 1)) * totalDist;

      // Update target immediately so UI reflects user intent
      setTargetIndex(index);

      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
    },
    [totalServices, setTargetIndex]
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Handle scroll progress and derive target service index
    const onScrollProgress = (prog: number) => {
      const clamped = Math.max(0, Math.min(1, prog));

      // Direct DOM update on scrub bar to avoid component re-renders
      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${clamped * 100}%`;
      }

      // Map progress across 15 services (0 to 14)
      // Service 15 sits right at the end with immediate release after (no dead zone)
      const rawTarget = Math.round(clamped * (totalServices - 1));
      const target = Math.min(totalServices - 1, Math.max(0, rawTarget));
      setTargetIndex(target);

      // Soft snap: after scrolling stops for ~160ms, gently settle to the nearest service
      clearTimeout(snapTimerRef.current);
      if (clamped > 0.04 && clamped < 0.96) {
        snapTimerRef.current = setTimeout(() => {
          scrollToService(activeIndexRef.current);
        }, 160);
      }
    };

    // Primary: GSAP ScrollTrigger (integrated with Lenis ticker in useSmoothScroll)
    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => onScrollProgress(self.progress),
    });

    // Secondary: Native passive window scroll listener fallback
    let rafId: number = 0;
    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        const rect = section.getBoundingClientRect();
        const totalDist = rect.height - window.innerHeight;
        if (totalDist <= 0) return;
        const prog = -rect.top / totalDist;
        onScrollProgress(prog);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      st.kill();
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
      clearTimeout(transitionTimerRef.current);
      clearTimeout(snapTimerRef.current);
    };
  }, [totalServices, setTargetIndex, scrollToService]);

  const activeService = SERVICES_DATA[activeIndex] || SERVICES_DATA[0];

  return (
    <section
      id="services"
      ref={sectionRef}
      style={{ height: `${totalServices * 75}vh` }}
      className="relative bg-[#14102A] text-white"
    >
      {/* Sticky Fullscreen Viewport: 100svh pinned while scrolling through the tall wrapper */}
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden flex flex-col justify-between bg-radial-navy pt-20 sm:pt-24 pb-4">
        {/* Ambient colored backdrop radial orbs */}
        <div
          className="absolute -top-32 right-0 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none transition-colors duration-700 opacity-30"
          style={{ backgroundColor: activeService.color }}
        />
        <div
          className="absolute -bottom-32 left-0 w-[450px] h-[450px] rounded-full blur-[140px] pointer-events-none transition-colors duration-700 opacity-20"
          style={{ backgroundColor: activeService.accentColor }}
        />

        {/* Section Header Bar */}
        <div className="relative z-20 px-6 sm:px-12 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B4A] animate-ping" />
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={activeService.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
                className="text-xs sm:text-sm font-bold uppercase tracking-[0.28em] text-[#FF9D85] inline-block"
              >
                {activeService.category}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Step Indicators & Sync Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollToService(Math.max(0, activeIndex - 1))}
              disabled={activeIndex === 0}
              className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none transition-colors"
              aria-label="Previous service"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="text-xs sm:text-sm font-bold tracking-wider text-[#A49FC0]">
              <span className="text-white font-extrabold">{activeService.number}</span>{' '}
              <span className="text-white/30">/</span> {totalServices}
            </span>
            <button
              onClick={() => scrollToService(Math.min(totalServices - 1, activeIndex + 1))}
              disabled={activeIndex === totalServices - 1}
              className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none transition-colors"
              aria-label="Next service"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Center Grid: Text on Left (bottom on mobile), 3D on Right (top on mobile) */}
        <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-12 items-center px-6 sm:px-12 lg:px-16 gap-6 sm:gap-8 my-auto overflow-hidden">
          {/* Left Column: Fixed Top-Anchored Container so titles NEVER jump when tags wrap */}
          <div className="lg:col-span-6 flex flex-col justify-start order-2 lg:order-1 max-w-xl">
            <div className="relative overflow-hidden w-full min-h-[300px] sm:min-h-[330px] lg:min-h-[350px] flex flex-col justify-start items-start">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={activeService.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-3.5 sm:space-y-4 w-full"
                >
                  {/* Service Badge */}
                  <div className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-white/10 text-white/90 border border-white/15">
                    Service {activeService.number}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.1]">
                    {activeService.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm sm:text-lg text-[#C9C3E8] font-normal leading-relaxed">
                    {activeService.shortDesc}
                  </p>

                  <p className="text-xs sm:text-sm text-[#A49FC0] leading-relaxed hidden sm:block">
                    {activeService.fullDesc}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {activeService.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/90"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Link CTA */}
                  <div className="pt-2">
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-[#FF6B4A] hover:text-[#ff896f] transition-colors group"
                    >
                      <span>Explore this service</span>
                      <ArrowRight
                        size={17}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Persistent 3D Canvas */}
          <div className="lg:col-span-6 flex items-center justify-center order-1 lg:order-2 h-[34vh] sm:h-[40vh] lg:h-[58vh] relative">
            <Service3DCanvas activeIndex={activeIndex} />
          </div>
        </div>

        {/* Bottom Navigation & Continuous Scrub Bar */}
        <div className="relative z-20 px-6 sm:px-12 flex flex-col gap-2.5 flex-shrink-0">
          {/* Quick navigation pill dots: Clicking scrolls page to matching service */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 overflow-x-auto py-1">
            {SERVICES_DATA.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => scrollToService(idx)}
                aria-label={`Jump to ${s.title}`}
                className={`transition-all duration-300 rounded-full ${
                  idx === activeIndex
                    ? 'w-7 sm:w-8 h-2 sm:h-2.5 bg-[#FF6B4A]'
                    : 'w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white/20 hover:bg-white/50'
                }`}
              />
            ))}
          </div>

          {/* Scrub Progress Bar */}
          <div className="w-full h-1 sm:h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              ref={progressBarRef}
              className="h-full bg-gradient-to-r from-[#7C5CFF] via-[#FF6B4A] to-[#FFD23F] transition-all duration-75 ease-out"
              style={{ width: '0%' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
