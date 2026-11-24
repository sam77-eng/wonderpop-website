import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Send, Sparkles, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SERVICES_DATA, FOUNDERS_DATA } from '../data/wonderpopData';

export const ContactCTA: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    service: SERVICES_DATA[0].title,
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const vamshi = FOUNDERS_DATA[0];
  const sam = FOUNDERS_DATA[1];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Trigger joyful confetti celebration
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#4B2DB8', '#FF6B4A', '#FFD23F', '#2EC4B6', '#FF9BD0'],
      });
    } catch (err) {
      // Confetti fallback
    }

    setSubmitted(true);

    // Open email draft addressed to both founders
    const recipientEmails = `${vamshi.email},${sam.email}`;
    const subject = encodeURIComponent(
      `Wonderpop Inquiry: ${formData.service} from ${formData.name || 'Client'}`
    );
    const body = encodeURIComponent(
      `Hello Vamshi & Sam,\n\nMy name is ${formData.name}.\nContact Info: ${formData.contact}\nService Interested in: ${formData.service}\n\nProject Details:\n${formData.message}\n\nLooking forward to bringing magic together!`
    );

    window.open(`mailto:${recipientEmails}?subject=${subject}&body=${body}`, '_blank');
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="relative rounded-[36px] sm:rounded-[48px] bg-gradient-to-br from-[#4B2DB8] via-[#7B32B6] to-[#FF6B4A] text-white p-8 sm:p-14 lg:p-20 overflow-hidden shadow-2xl">
        {/* Floating Cartoon/Emoji Stickers */}
        <span className="absolute left-[5%] top-[12%] text-4xl sm:text-5xl animate-bounce delay-1000 select-none pointer-events-none opacity-85">
          🚀
        </span>
        <span className="absolute right-[6%] top-[16%] text-4xl sm:text-5xl animate-bounce delay-2000 select-none pointer-events-none opacity-85">
          💡
        </span>
        <span className="absolute left-[8%] bottom-[12%] text-4xl sm:text-5xl animate-bounce delay-3000 select-none pointer-events-none opacity-85">
          🎨
        </span>
        <span className="absolute right-[8%] bottom-[14%] text-4xl sm:text-5xl animate-bounce select-none pointer-events-none opacity-85">
          📈
        </span>

        {/* Ambient Glow Circles inside panel */}
        <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-white/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-black/25 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto text-center mb-12">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-bold uppercase tracking-widest text-white mb-6">
            <Sparkles size={14} className="text-[#FFD23F]" />
            <span>Ready to Scale</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.08] mb-4">
            Let’s build something wonderful.
          </h2>

          <p className="text-lg sm:text-xl text-white/90 font-normal leading-relaxed max-w-xl mx-auto mb-8">
            Tell us your idea. We’ll bring the magic.
          </p>

          {/* Quick WhatsApp Chat Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={vamshi.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 rounded-full font-bold text-sm sm:text-base bg-white text-[#14102A] hover:bg-[#FAF7FE] shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all"
            >
              <MessageSquare size={18} className="text-[#4B2DB8]" />
              <span>Chat with Vamshi</span>
            </a>

            <a
              href={sam.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 rounded-full font-bold text-sm sm:text-base bg-white text-[#14102A] hover:bg-[#FAF7FE] shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all"
            >
              <MessageSquare size={18} className="text-[#FF6B4A]" />
              <span>Chat with Sam</span>
            </a>
          </div>
        </div>

        {/* Contact Form Container */}
        <div className="relative z-10 max-w-2xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-[28px] p-6 sm:p-10 shadow-xl">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8 space-y-4"
            >
              <CheckCircle2 size={56} className="mx-auto text-[#FFD23F]" />
              <h3 className="text-2xl font-bold text-white">Message Prepared!</h3>
              <p className="text-sm text-white/80 max-w-md mx-auto">
                Your email client has opened with a direct draft to both Vamshi and Sam. You can also message them directly on WhatsApp above anytime!
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2 rounded-full text-xs font-semibold bg-white/20 hover:bg-white/30 text-white transition-colors"
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Morgan"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-white/15 border border-white/25 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#FFD23F] focus:border-transparent transition-all text-sm"
                  />
                </div>

                {/* Contact Email or Phone */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-2">
                    Email or Phone *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="alex@company.com"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-white/15 border border-white/25 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#FFD23F] focus:border-transparent transition-all text-sm"
                  />
                </div>
              </div>

              {/* Service Dropdown */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-2">
                  Service Interested In
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-[#14102A]/80 border border-white/25 text-white focus:outline-none focus:ring-2 focus:ring-[#FFD23F] focus:border-transparent transition-all text-sm"
                >
                  {SERVICES_DATA.map((srv) => (
                    <option key={srv.id} value={srv.title} className="bg-[#14102A] text-white">
                      {srv.number} — {srv.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-2">
                  Tell Us About Your Project
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Goals, timeline, vision, or any challenges..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-white/15 border border-white/25 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#FFD23F] focus:border-transparent transition-all text-sm resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 rounded-full font-extrabold text-base bg-white text-[#14102A] hover:bg-[#FAF7FE] shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2"
              >
                <span>Send to Both Founders</span>
                <Send size={18} className="text-[#FF6B4A]" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
