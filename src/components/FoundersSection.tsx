import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Phone, MessageSquare, Mail } from 'lucide-react';
import { FOUNDERS_DATA } from '../data/wonderpopData';

interface FounderCardProps {
  name: string;
  role: string;
  image: string;
  phone: string;
  phoneClean: string;
  email: string;
  whatsappUrl: string;
  direction: 'left' | 'right';
  isInView: boolean;
  floatDuration: number;
  floatDelay: number;
}

const FounderCard: React.FC<FounderCardProps> = ({
  name,
  role,
  image,
  phone,
  phoneClean,
  email,
  whatsappUrl,
  direction,
  isInView,
  floatDuration,
  floatDelay,
}) => {
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkIsDesktop = () => {
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsDesktop(!hasTouch && window.innerWidth >= 1024);
    };
    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);
    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDesktop) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      rx: -y * 12,
      ry: x * 12,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: direction === 'left' ? -80 : 80 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      className="w-full flex justify-center"
    >
      <motion.div
        animate={isInView ? { y: [0, -6, 0] } : {}}
        transition={{
          repeat: Infinity,
          duration: floatDuration,
          delay: floatDelay,
          ease: 'easeInOut',
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: isDesktop
            ? `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`
            : 'none',
          transition: 'transform 0.15s ease-out',
        }}
        className="w-full max-w-[340px] bg-white rounded-[28px] border border-[#E8E2F5] shadow-[0_15px_35px_rgba(20,16,42,0.06)] overflow-hidden text-center text-[#14102A] select-none"
      >
        {/* Real Founder Photo - Object Fit Cover, Object Position Top, no filter/glow */}
        <div className="w-full h-64 sm:h-72 overflow-hidden bg-gray-50">
          <img
            src={image}
            alt={name}
            loading="eager"
            className="w-full h-full object-cover object-top block"
          />
        </div>

        {/* Founder Details Below Photo */}
        <div className="p-6">
          <h3 className="text-xl sm:text-2xl font-extrabold text-[#14102A] mb-1">
            {name}
          </h3>
          <div className="text-xs font-bold tracking-wider uppercase text-[#4B2DB8] mb-4">
            {role}
          </div>

          {/* Contact Links */}
          <div className="space-y-2 mb-5">
            <a
              href={`tel:${phoneClean}`}
              className="flex items-center justify-center gap-2 text-xs sm:text-sm font-medium text-[#5D5878] hover:text-[#4B2DB8] transition-colors"
            >
              <Phone size={14} className="text-[#4B2DB8]" />
              <span>{phone}</span>
            </a>
            <a
              href={`mailto:${email}`}
              className="flex items-center justify-center gap-2 text-xs sm:text-sm font-medium text-[#5D5878] hover:text-[#4B2DB8] transition-colors"
            >
              <Mail size={14} className="text-[#4B2DB8]" />
              <span>{email}</span>
            </a>
          </div>

          {/* Call and WhatsApp Buttons */}
          <div className="flex items-center justify-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold bg-[#4B2DB8] text-white hover:bg-[#3b2292] shadow-sm hover:-translate-y-0.5 active:translate-y-0 transition-all"
            >
              <MessageSquare size={14} />
              <span>WhatsApp</span>
            </a>
            <a
              href={`tel:${phoneClean}`}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold bg-[#F4F1FA] text-[#14102A] border border-[#E8E2F5] hover:border-[#4B2DB8] hover:-translate-y-0.5 active:translate-y-0 transition-all"
            >
              <Phone size={14} />
              <span>Call</span>
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const FoundersSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  const vamshi = FOUNDERS_DATA[0];
  const sam = FOUNDERS_DATA[1];

  return (
    <section
      id="founders"
      ref={sectionRef}
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden relative"
    >
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="inline-block px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-widest text-[#FF6B4A] bg-orange-100 dark:bg-orange-950/40 border border-[#FF6B4A]/30 mb-4"
        >
          Leadership
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#14102A] dark:text-white leading-[1.1] mb-4"
        >
          Meet the founders
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-base sm:text-xl text-[#5D5878] dark:text-[#A49FC0] font-normal leading-relaxed"
        >
          Two people. One vision. Say hello directly.
        </motion.p>
      </div>

      {/* Floating Decorative Stickers AROUND the cards (not on top of photos) */}
      <div className="relative max-w-5xl mx-auto">
        <span
          className="absolute -top-10 left-4 sm:left-12 text-3xl sm:text-4xl animate-bounce delay-1000 select-none pointer-events-none z-0"
          aria-hidden="true"
        >
          🚀
        </span>
        <span
          className="absolute -top-8 right-4 sm:right-12 text-3xl sm:text-4xl animate-bounce delay-2000 select-none pointer-events-none z-0"
          aria-hidden="true"
        >
          💡
        </span>
        <span
          className="absolute -bottom-8 left-8 sm:left-20 text-3xl sm:text-4xl animate-bounce delay-3000 select-none pointer-events-none z-0"
          aria-hidden="true"
        >
          🎨
        </span>
        <span
          className="absolute -bottom-10 right-8 sm:right-24 text-3xl sm:text-4xl animate-bounce select-none pointer-events-none z-0"
          aria-hidden="true"
        >
          📈
        </span>

        {/* Dual Founder Cards - Stacked on Mobile, Side by Side on Desktop */}
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-14">
          {/* Card 1: Vamshi Jurru (Left) */}
          <FounderCard
            name={vamshi.name}
            role={vamshi.role}
            image="/images/founders/vamshi.jpg"
            phone={vamshi.phone}
            phoneClean={vamshi.phoneClean}
            email={vamshi.email}
            whatsappUrl={vamshi.whatsappUrl}
            direction="left"
            isInView={isInView}
            floatDuration={4.4}
            floatDelay={0}
          />

          {/* Card 2: Sam Bhukya (Right) */}
          <FounderCard
            name={sam.name}
            role={sam.role}
            image="/images/founders/sam.jpg"
            phone={sam.phone}
            phoneClean={sam.phoneClean}
            email={sam.email}
            whatsappUrl={sam.whatsappUrl}
            direction="right"
            isInView={isInView}
            floatDuration={5.0}
            floatDelay={0.8}
          />
        </div>
      </div>
    </section>
  );
};
