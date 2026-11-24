import React from 'react';
import { FOUNDERS_DATA } from '../data/wonderpopData';
import { Phone, Mail, Instagram, Linkedin, Twitter, Github, Dribbble, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const vamshi = FOUNDERS_DATA[0];
  const sam = FOUNDERS_DATA[1];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white dark:bg-[#0D0924] border-t border-[#E8E2F5] dark:border-[#2D235C] pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-[#5D5878] dark:text-[#A49FC0] transition-colors">
      <div className="max-w-7xl mx-auto">
        {/* Top Row: Wordmark, Nav, and Direct Contacts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-[#E8E2F5] dark:border-[#2D235C]">
          {/* Brand Info (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="w-56 sm:w-64">
              <img
                src="/wonderpop-wordmark.jpg"
                alt="Wonderpop"
                className="w-full h-auto object-contain rounded-xl shadow-sm"
              />
            </div>
            <p className="text-sm leading-relaxed max-w-sm text-[#5D5878] dark:text-[#A49FC0]">
              Technology, design and marketing under one roof. A global-standard digital studio for ambitious brands.
            </p>
            {/* Social Icons Placeholders */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-purple-50 dark:bg-white/5 border border-purple-200 dark:border-white/10 flex items-center justify-center hover:bg-[#FF6B4A] hover:text-white hover:border-transparent transition-all"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full bg-purple-50 dark:bg-white/5 border border-purple-200 dark:border-white/10 flex items-center justify-center hover:bg-[#4B2DB8] hover:text-white hover:border-transparent transition-all"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter / X"
                className="w-9 h-9 rounded-full bg-purple-50 dark:bg-white/5 border border-purple-200 dark:border-white/10 flex items-center justify-center hover:bg-[#14102A] dark:hover:bg-white dark:hover:text-[#14102A] hover:text-white hover:border-transparent transition-all"
              >
                <Twitter size={16} />
              </a>
              <a
                href="https://dribbble.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Dribbble"
                className="w-9 h-9 rounded-full bg-purple-50 dark:bg-white/5 border border-purple-200 dark:border-white/10 flex items-center justify-center hover:bg-[#FF9BD0] hover:text-white hover:border-transparent transition-all"
              >
                <Dribbble size={16} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="w-9 h-9 rounded-full bg-purple-50 dark:bg-white/5 border border-purple-200 dark:border-white/10 flex items-center justify-center hover:bg-[#2EC4B6] hover:text-white hover:border-transparent transition-all"
              >
                <Github size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#14102A] dark:text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#services" className="hover:text-[#4B2DB8] dark:hover:text-[#FF6B4A] transition-colors">
                  All 15 Services
                </a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-[#4B2DB8] dark:hover:text-[#FF6B4A] transition-colors">
                  Why Wonderpop & Stats
                </a>
              </li>
              <li>
                <a href="#founders" className="hover:text-[#4B2DB8] dark:hover:text-[#FF6B4A] transition-colors">
                  Meet the Founders
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#4B2DB8] dark:hover:text-[#FF6B4A] transition-colors">
                  Start a Project
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Founders Contact (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#14102A] dark:text-white">
              Direct Contact
            </h4>
            
            {/* Vamshi */}
            <div className="p-3.5 rounded-2xl bg-purple-50/50 dark:bg-white/5 border border-purple-100 dark:border-white/10 text-xs sm:text-sm space-y-1">
              <div className="font-bold text-[#14102A] dark:text-white">
                Vamshi Jurru — <span className="text-[#4B2DB8] dark:text-[#FF9BD0] font-semibold">Co-Founder</span>
              </div>
              <a href={`tel:${vamshi.phoneClean}`} className="flex items-center gap-1.5 hover:underline">
                <Phone size={13} className="text-[#4B2DB8]" />
                <span>{vamshi.phone}</span>
              </a>
              <a href={`mailto:${vamshi.email}`} className="flex items-center gap-1.5 hover:underline">
                <Mail size={13} className="text-[#4B2DB8]" />
                <span>{vamshi.email}</span>
              </a>
            </div>

            {/* Sam */}
            <div className="p-3.5 rounded-2xl bg-purple-50/50 dark:bg-white/5 border border-purple-100 dark:border-white/10 text-xs sm:text-sm space-y-1">
              <div className="font-bold text-[#14102A] dark:text-white">
                Sam Bhukya — <span className="text-[#FF6B4A] font-semibold">Co-Founder</span>
              </div>
              <a href={`tel:${sam.phoneClean}`} className="flex items-center gap-1.5 hover:underline">
                <Phone size={13} className="text-[#FF6B4A]" />
                <span>{sam.phone}</span>
              </a>
              <a href={`mailto:${sam.email}`} className="flex items-center gap-1.5 hover:underline">
                <Mail size={13} className="text-[#FF6B4A]" />
                <span>{sam.email}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Row: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#5D5878] dark:text-[#A49FC0]">
          <div>
            © 2026 Wonderpop. All rights reserved. Built to global agency standards.
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-xs font-semibold hover:text-[#4B2DB8] dark:hover:text-[#FF6B4A] transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
};
