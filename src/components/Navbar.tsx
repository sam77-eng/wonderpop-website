import React, { useState, useEffect } from 'react';
import { Sun, Moon, ArrowUpRight, Menu, X } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-2.5 sm:py-3 bg-[#FAF7FE]/95 dark:bg-[#14102A]/95 backdrop-blur-xl shadow-md border-b border-purple-900/10 dark:border-white/10'
          : 'py-4 sm:py-5 bg-[#FAF7FE]/80 dark:bg-[#14102A]/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo: App Icon + Official Wordmark Image (not plain text) */}
        <a href="#" className="flex items-center gap-2.5 sm:gap-3 group">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden shadow-sm group-hover:scale-105 transition-transform duration-200 border border-white/25 flex-shrink-0">
            <img
              src="/wonderpop-icon.jpg"
              alt="Wonderpop App Icon"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Official Script Wordmark Image */}
          <div className="h-7 sm:h-8 flex items-center overflow-hidden rounded-md">
            <img
              src="/wonderpop-wordmark.jpg"
              alt="Wonderpop"
              className="h-full w-auto object-contain drop-shadow-sm group-hover:opacity-90 transition-opacity"
            />
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-8">
          <a
            href="#services"
            className="text-sm font-semibold text-[#5D5878] dark:text-[#A49FC0] hover:text-[#4B2DB8] dark:hover:text-[#FF6B4A] transition-colors"
          >
            Services
          </a>
          <a
            href="#why-us"
            className="text-sm font-semibold text-[#5D5878] dark:text-[#A49FC0] hover:text-[#4B2DB8] dark:hover:text-[#FF6B4A] transition-colors"
          >
            Why Wonderpop
          </a>
          <a
            href="#founders"
            className="text-sm font-semibold text-[#5D5878] dark:text-[#A49FC0] hover:text-[#4B2DB8] dark:hover:text-[#FF6B4A] transition-colors"
          >
            Founders
          </a>
          <a
            href="#contact"
            className="text-sm font-semibold text-[#5D5878] dark:text-[#A49FC0] hover:text-[#4B2DB8] dark:hover:text-[#FF6B4A] transition-colors"
          >
            Contact
          </a>
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-white/90 dark:bg-white/10 text-[#14102A] dark:text-white border border-purple-200/80 dark:border-white/10 shadow-sm hover:scale-105 active:scale-95 transition-all"
          >
            {theme === 'dark' ? <Sun size={17} className="text-[#FFD23F]" /> : <Moon size={17} className="text-[#4B2DB8]" />}
          </button>

          {/* Let's Talk Coral CTA Button */}
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-bold bg-[#FF6B4A] text-white hover:bg-[#e65a39] shadow-[0_6px_20px_rgba(255,107,74,0.35)] hover:shadow-[0_10px_25px_rgba(255,107,74,0.45)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
          >
            <span>Let’s talk</span>
            <ArrowUpRight size={15} />
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center bg-white/90 dark:bg-white/10 text-[#14102A] dark:text-white border border-purple-200 dark:border-white/10"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden px-5 pt-3 pb-6 bg-[#FAF7FE] dark:bg-[#14102A] border-b border-purple-100 dark:border-white/10 shadow-2xl">
          <div className="flex flex-col gap-3.5">
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold py-2 text-[#14102A] dark:text-white border-b border-gray-200/60 dark:border-white/5"
            >
              Services
            </a>
            <a
              href="#why-us"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold py-2 text-[#14102A] dark:text-white border-b border-gray-200/60 dark:border-white/5"
            >
              Why Wonderpop
            </a>
            <a
              href="#founders"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold py-2 text-[#14102A] dark:text-white border-b border-gray-200/60 dark:border-white/5"
            >
              Founders
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold py-2 text-[#14102A] dark:text-white border-b border-gray-200/60 dark:border-white/5"
            >
              Contact
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 w-full text-center py-3 rounded-full text-sm font-bold bg-[#FF6B4A] text-white shadow-md"
            >
              Let’s talk
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
