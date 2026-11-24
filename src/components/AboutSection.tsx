import React, { useEffect, useRef, useState } from 'react';

export const AboutSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const fullText =
    'We design, build and market digital experiences that make people stop scrolling. From first idea to launch day and beyond, Wonderpop turns ambitious brands into unforgettable ones.';

  const words = fullText.split(' ');

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start highlighting when element enters viewport (bottom 85%), finish when centered/exiting
      const start = windowHeight * 0.85;
      const end = windowHeight * 0.2;
      const total = start - end;
      const current = start - rect.top;

      const progress = Math.max(0, Math.min(1, current / total));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto flex flex-col items-center justify-center text-center select-none"
    >
      {/* Decorative subtle backdrop tags */}
      <div className="text-xs sm:text-sm font-bold uppercase tracking-[0.3em] text-[#FF6B4A] mb-8 px-4 py-1.5 rounded-full bg-coral-500/10 border border-[#FF6B4A]/20">
        Our Philosophy
      </div>

      <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold leading-[1.25] tracking-tight max-w-4xl text-[#14102A] dark:text-white">
        {words.map((word, index) => {
          const wordProgress = (index + 1) / words.length;
          const isLit = scrollProgress >= wordProgress - 0.05;

          const isWonderpop = word.includes('Wonderpop');
          const isUnforgettable = word.includes('unforgettable');

          return (
            <span
              key={index}
              className={`inline-block mr-[0.28em] transition-all duration-300 ${
                isLit
                  ? isWonderpop
                    ? 'text-[#4B2DB8] dark:text-[#FF9BD0] font-black opacity-100 scale-[1.03]'
                    : isUnforgettable
                    ? 'text-[#FF6B4A] font-black opacity-100 scale-[1.03]'
                    : 'text-[#14102A] dark:text-white opacity-100'
                  : 'text-[#5D5878] dark:text-[#A49FC0] opacity-25'
              }`}
            >
              {word}
            </span>
          );
        })}
      </h2>
    </section>
  );
};
