import React, { useState, useEffect, useRef } from 'react';
import { ThemeProvider } from './hooks/useTheme';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { IntroLoader } from './components/IntroLoader';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { StatsSection } from './components/StatsSection';
import { FoundersSection } from './components/FoundersSection';
import { ContactCTA } from './components/ContactCTA';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgressBar } from './components/ScrollProgressBar';

export const AppContent: React.FC = () => {
  const [introFinished, setIntroFinished] = useState(false);
  const initialHashRef = useRef<string>('');

  // 1. Capture initial hash (if any) and clear it from URL so the browser does NOT jump before intro
  useEffect(() => {
    if (window.location.hash) {
      initialHashRef.current = window.location.hash;
      try {
        history.replaceState(null, '', window.location.pathname + window.location.search);
      } catch (e) {
        // Fallback
      }
    }
  }, []);

  // 2. Initialize Lenis + GSAP synchronization (locked until intro completes)
  const lenisRef = useSmoothScroll(!introFinished);

  // 3. When intro finishes, unlock and handle delayed hash navigation
  const handleIntroComplete = () => {
    setIntroFinished(true);

    if (initialHashRef.current) {
      const targetHash = initialHashRef.current;
      setTimeout(() => {
        const el = document.querySelector(targetHash);
        if (el) {
          if (lenisRef.current) {
            lenisRef.current.scrollTo(targetHash, { offset: -60, duration: 1.4 });
          } else {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 400);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FAF7FE] dark:bg-[#0D0924] text-[#14102A] dark:text-[#F3F0FF] transition-colors duration-400">
      {/* Intro Overlay (Topmost z-index, fully opaque, plays first) */}
      <IntroLoader onComplete={handleIntroComplete} />

      {/* Website underneath is hidden until intro completes so nothing overlaps or bleeds */}
      <div
        className={`w-full transition-opacity duration-500 ${
          introFinished ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        style={{
          visibility: introFinished ? 'visible' : 'hidden',
        }}
      >
        {/* Top Scroll Progress Indicator */}
        <ScrollProgressBar />

        {/* Luxury Custom Cursor (Desktop only) */}
        <CustomCursor />

        {/* Sticky Header Navbar */}
        <Navbar />

        {/* Section 2: Hero (animations only start when introFinished is true) */}
        <Hero introFinished={introFinished} />

        {/* Section 3: Infinite Marquee */}
        <Marquee />

        {/* Section 4: About Statement with word-by-word scroll lighting */}
        <AboutSection />

        {/* Section 5: Pinned Sticky Services with Upgraded 3D Models */}
        <ServicesSection />

        {/* Section 6: Why Wonderpop / Global Standard Stats */}
        <StatsSection />

        {/* Section 7: Meet the Founders with Cartoon Avatars & Floating Physics */}
        <FoundersSection />

        {/* Section 8: Big Gradient Contact CTA & Direct Inquiries */}
        <ContactCTA />

        {/* Section 9: Footer with Official Wordmark & Socials */}
        <Footer />
      </div>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
