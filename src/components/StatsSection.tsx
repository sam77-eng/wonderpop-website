import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { STATS_DATA } from '../data/wonderpopData';
import { ShieldCheck, Zap, HeartHandshake, Code2 } from 'lucide-react';

export const StatsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const featurePillars = [
    {
      icon: <Zap className="text-[#FF6B4A]" size={24} />,
      title: 'High Velocity Execution',
      desc: 'Rapid iterations from idea to launch without sacrificing architectural integrity.',
    },
    {
      icon: <ShieldCheck className="text-[#4B2DB8] dark:text-[#FF9BD0]" size={24} />,
      title: 'USA Agency Quality',
      desc: 'Global-standard design finesse, meticulous code reviews, and pristine UX.',
    },
    {
      icon: <HeartHandshake className="text-[#2EC4B6]" size={24} />,
      title: 'Direct Founder Access',
      desc: 'Work directly with the core builders. Zero account managers, zero telephone game.',
    },
    {
      icon: <Code2 className="text-[#FFD23F]" size={24} />,
      title: 'Zero Cookie-Cutter',
      desc: '100% custom-tailored bespoke digital engines designed to outperform competitors.',
    },
  ];

  return (
    <section
      id="why-us"
      ref={sectionRef}
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="inline-block px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-widest text-[#4B2DB8] dark:text-[#FF9BD0] bg-purple-100 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-700/40 mb-4"
        >
          Why Wonderpop
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#14102A] dark:text-white leading-[1.1] mb-5"
        >
          Built to a global standard.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg sm:text-xl text-[#5D5878] dark:text-[#A49FC0] font-normal leading-relaxed"
        >
          Premium quality, clear communication and results that matter, for ambitious brands everywhere.
        </motion.p>
      </div>

      {/* 4 Animated Counter Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16 sm:mb-20">
        {STATS_DATA.map((stat, idx) => (
          <StatCardItem key={idx} stat={stat} idx={idx} />
        ))}
      </div>

      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {featurePillars.map((pillar, pIdx) => (
          <motion.div
            key={pIdx}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 + pIdx * 0.1 }}
            className="p-6 rounded-24 bg-white/60 dark:bg-[#1A1438]/60 backdrop-blur-sm border border-[#E8E2F5] dark:border-[#2D235C] hover:shadow-md transition-all"
          >
            <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center mb-4">
              {pillar.icon}
            </div>
            <h4 className="text-lg font-bold text-[#14102A] dark:text-white mb-2">
              {pillar.title}
            </h4>
            <p className="text-sm text-[#5D5878] dark:text-[#A49FC0] leading-relaxed">
              {pillar.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// Stat Card Item with 60% view trigger
const StatCardItem: React.FC<{ stat: (typeof STATS_DATA)[0]; idx: number }> = ({ stat, idx }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  // Starts when card is ~60% in view
  const isCardInView = useInView(cardRef, { once: true, amount: 0.6 });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isCardInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 + idx * 0.08 }}
      className="p-6 sm:p-8 rounded-32 bg-white dark:bg-[#1A1438] border border-[#E8E2F5] dark:border-[#2D235C] shadow-card-soft dark:shadow-card-dark text-center group hover:-translate-y-2 hover:border-[#4B2DB8] dark:hover:border-[#FF6B4A] transition-all duration-300"
    >
      <div className="text-4xl sm:text-6xl font-black text-gradient-purple-coral mb-2">
        <Counter target={stat.numericValue} suffix={stat.suffix || ''} trigger={isCardInView} />
      </div>
      <div className="text-base sm:text-lg font-bold text-[#14102A] dark:text-white mb-1">
        {stat.label}
      </div>
      <div className="text-xs sm:text-sm text-[#5D5878] dark:text-[#A49FC0] font-normal">
        {stat.subtext}
      </div>
    </motion.div>
  );
};

// Smooth Animated Number Counter Component (RAF with ease-out cubic, no end hitch)
const Counter: React.FC<{ target: number; suffix: string; trigger: boolean }> = ({
  target,
  suffix,
  trigger,
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;

    let animId: number;
    const duration = 1600; // ms
    const startTime = performance.now();

    const update = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(ease * target);
      setCount(current);

      if (progress < 1) {
        animId = requestAnimationFrame(update);
      } else {
        setCount(target);
      }
    };

    animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, [trigger, target]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};
