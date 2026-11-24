import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Users, Sparkles } from 'lucide-react';
import { HeroShapesCanvas } from './canvas/HeroShapesCanvas';
import { MagneticButton } from './MagneticButton';

interface HeroProps {
  introFinished: boolean;
}

export const Hero: React.FC<HeroProps> = ({ introFinished }) => {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (introFinished) {
      const timer = setTimeout(() => {
        setRevealed(true);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [introFinished]);

  return (
    <section className="relative min-h-[100dvh] sm:min-h-[100svh] flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 pt-20 sm:pt-20 md:pt-24 pb-8 sm:pb-12 overflow-hidden bg-[#FAF7FE] dark:bg-[#0D0924] transition-colors duration-400">
      {/* 3D Floating Shapes Background Canvas */}
      <HeroShapesCanvas />

      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-28 w-96 h-96 rounded-full bg-[#4B2DB8]/10 dark:bg-[#4B2DB8]/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-28 w-96 h-96 rounded-full bg-[#FF6B4A]/10 dark:bg-[#FF6B4A]/20 blur-3xl pointer-events-none" />

      {/* Subtle depth glow behind hero content in dark mode */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[750px] h-[350px] sm:h-[450px] rounded-full pointer-events-none opacity-0 dark:opacity-100 transition-opacity duration-500 z-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(75, 45, 184, 0.22) 0%, rgba(255, 107, 74, 0.12) 40%, transparent 72%)',
        }}
        aria-hidden="true"
      />

      {/* Main Hero Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Studio Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: -15 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-100/70 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-700/40 text-xs sm:text-sm font-semibold text-[#4B2DB8] dark:text-[#FF9BD0] mb-3 sm:mb-4 backdrop-blur-sm shadow-sm"
        >
          <Sparkles size={14} className="text-[#FF6B4A]" />
          <span>Next-Generation Digital Agency & Studio</span>
        </motion.div>

        {/* Wordmark Logo revealed with handwriting effect */}
        <div className="relative mb-3 sm:mb-4 md:mb-5 flex justify-center w-full max-w-[520px] px-4">
          <img
            src="/wonderpop-wordmark.jpg"
            alt="Wonderpop"
            className={`w-full max-w-[340px] sm:max-w-[420px] md:max-w-[460px] h-auto object-contain rounded-2xl drop-shadow-md logo-reveal-mask ${
              revealed ? 'logo-revealed' : ''
            }`}
          />
        </div>

        {/* Headline - strictly 2 clean lines at every width */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
          transition={{ duration: 0.7, delay: 0.35, ease: 'easeOut' }}
          className="text-[clamp(1.75rem,4.2vw,3.75rem)] font-extrabold tracking-tight text-[#14102A] dark:text-white leading-[1.12] mb-2 sm:mb-3 max-w-3xl"
        >
          Where brands become <br className="hidden sm:inline" />
          <span className="text-gradient-purple-coral font-black">wonders.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.55, ease: 'easeOut' }}
          className="text-xs sm:text-base md:text-lg text-[#5D5878] dark:text-[#A49FC0] max-w-xl font-normal leading-relaxed mb-5 sm:mb-6 px-2"
        >
          Technology, design and marketing under one roof. A global-standard digital studio for ambitious brands.
        </motion.p>

        {/* Dual CTAs with Magnetic Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.75, ease: 'easeOut' }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto"
        >
          <MagneticButton
            href="#services"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-bold text-xs sm:text-sm md:text-base bg-[#4B2DB8] text-white hover:bg-[#3d2498] shadow-[0_10px_30px_rgba(75,45,184,0.38)] hover:shadow-[0_14px_36px_rgba(75,45,184,0.5)] transition-all duration-200"
          >
            <span>Explore services</span>
            <ArrowDown size={18} />
          </MagneticButton>

          <MagneticButton
            href="#founders"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-bold text-xs sm:text-sm md:text-base bg-white/80 dark:bg-white/10 text-[#14102A] dark:text-white border border-purple-200 dark:border-white/20 hover:border-[#4B2DB8] dark:hover:border-[#FF6B4A] hover:bg-white dark:hover:bg-white/15 transition-all duration-200 backdrop-blur-sm shadow-sm"
          >
            <Users size={18} className="text-[#FF6B4A]" />
            <span>Meet the founders</span>
          </MagneticButton>
        </motion.div>
      </div>

      {/* Subtle Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={revealed ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-[#5D5878]/70 dark:text-[#A49FC0]/70 pointer-events-none"
      >
        <span>Scroll to explore</span>
        <div className="w-4 h-6 rounded-full border border-[#5D5878]/40 dark:border-[#A49FC0]/40 flex items-start justify-center p-1">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            className="w-1 h-1 rounded-full bg-[#FF6B4A]"
          />
        </div>
      </motion.div>
    </section>
  );
};
