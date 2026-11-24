import React from 'react';
import { MARQUEE_ITEMS } from '../data/wonderpopData';

export const Marquee: React.FC = () => {
  // Triple the items so the continuous loop never breaks on wide monitors
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div
      className="relative w-full overflow-hidden bg-[#FF6B4A] text-white py-4 sm:py-5 shadow-lg select-none z-20"
      aria-hidden="true"
    >
      <div className="flex w-max animate-[marquee_30s_linear_infinite] hover:[animation-play-state:paused]">
        {items.map((item, index) => (
          <div key={index} className="flex items-center whitespace-nowrap">
            <span className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight px-4 sm:px-6 uppercase">
              {item}
            </span>
            <span className="text-[#FFD23F] text-lg sm:text-2xl">★</span>
          </div>
        ))}
      </div>
      
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};
