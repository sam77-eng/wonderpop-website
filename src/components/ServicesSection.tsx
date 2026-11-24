import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SERVICES_DATA } from '../data/wonderpopData';
import { Service3DCanvas } from './canvas/Service3DCanvas';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const totalServices = SERVICES_DATA.length;

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const totalScrollableDistance = rect.height - window.innerHeight;

      if (totalScrollableDistance <= 0) return;

      const progress = Math.max(0, Math.min(1, -rect.top / totalScrollableDistance));
      setScrollProgress(progress);

      const computedIndex = Math.min(totalServices - 1, Math.floor(progress * totalServices));
      setActiveIndex(computedIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [totalServices]);

  const activeService = SERVICES_DATA[activeIndex] || SERVICES_DATA[0];

  const goToService = (index: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const rect = section.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const sectionStart = rect.top + scrollTop;
    const totalScrollableDistance = rect.height - window.innerHeight;
    const targetScroll = sectionStart + (index / (totalServices - 1)) * totalScrollableDistance;

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth',
    });
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative h-[900vh] bg-[#14102A] text-white"
    >
      {/* Sticky Fullscreen Viewport */}
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
            <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.28em] text-[#FF9D85]">
              {activeService.category}
            </span>
          </div>

          {/* Step Indicators */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => goToService(Math.max(0, activeIndex - 1))}
              disabled={activeIndex === 0}
              className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none transition-colors"
              aria-label="Previous service"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="text-xs sm:text-sm font-bold tracking-wider text-[#A49FC0]">
              {activeService.number} <span className="text-white/30">/</span> {totalServices}
            </span>
            <button
              onClick={() => goToService(Math.min(totalServices - 1, activeIndex + 1))}
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
          {/* Left Column: Masked Container so text transitions NEVER bleed into navbar */}
          <div className="lg:col-span-6 flex flex-col justify-center order-2 lg:order-1 max-w-xl">
            <div className="relative overflow-hidden w-full min-h-[260px] sm:min-h-[320px] lg:min-h-[360px] flex items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -25 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="space-y-3.5 sm:space-y-5 w-full"
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
          {/* Quick navigation pill dots */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 overflow-x-auto py-1">
            {SERVICES_DATA.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => goToService(idx)}
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
              className="h-full bg-gradient-to-r from-[#7C5CFF] via-[#FF6B4A] to-[#FFD23F] transition-all duration-100 ease-out"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
