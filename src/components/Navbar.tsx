import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, Menu, X, ShieldCheck } from 'lucide-react';
import { BUSINESS_INFO } from '../data/initialProperties';

interface NavbarProps {
  onOpenAdmin: () => void;
  isAdminLoggedIn: boolean;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin, isAdminLoggedIn, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0d0f12]/95 backdrop-blur-md border-b border-[#262b35] py-3.5 shadow-xl shadow-black/40'
          : 'bg-gradient-to-b from-[#0b0c0e]/90 via-[#0b0c0e]/60 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark (Single Text Element) */}
          <button
            onClick={() => handleLinkClick('hero')}
            className="text-left group cursor-pointer focus:outline-none"
            aria-label="Orakzai Real Estate Home"
          >
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-wider text-[#f4f4f5] group-hover:text-[#c5a880] transition-colors">
                ORAKZAI
              </span>
              <span className="text-xs sm:text-sm font-sans tracking-[0.28em] text-[#c5a880] uppercase font-semibold">
                Real Estate
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links (Clean single-line unboxed text) */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-300">
            <button
              onClick={() => handleLinkClick('hero')}
              className="hover:text-[#c5a880] transition-colors whitespace-nowrap cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => handleLinkClick('properties')}
              className="hover:text-[#c5a880] transition-colors whitespace-nowrap cursor-pointer"
            >
              Properties
            </button>
            <button
              onClick={() => handleLinkClick('about')}
              className="hover:text-[#c5a880] transition-colors whitespace-nowrap cursor-pointer"
            >
              About Us
            </button>
            <button
              onClick={() => handleLinkClick('why-us')}
              className="hover:text-[#c5a880] transition-colors whitespace-nowrap cursor-pointer"
            >
              Why Choose Us
            </button>
            <button
              onClick={() => handleLinkClick('contact')}
              className="hover:text-[#c5a880] transition-colors whitespace-nowrap cursor-pointer"
            >
              Contact
            </button>
          </nav>

          {/* Zone 3: Primary Action & Quick WhatsApp Button */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            {/* Direct WhatsApp to Bilal Shah */}
            <a
              href="https://wa.me/923148147426?text=Hello%20Bilal%20Shah,%20I%20am%20inquiring%20about%20property%20opportunities%20with%20Orakzai%20Real%20Estate."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-emerald-400 border border-emerald-900/60 bg-emerald-950/30 rounded-lg hover:bg-emerald-900/40 hover:border-emerald-700/80 transition-colors whitespace-nowrap"
              title="Chat on WhatsApp with Bilal Shah"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp</span>
            </a>

            {/* Primary Action Button */}
            <button
              onClick={() => handleLinkClick('contact-form')}
              className="px-4 py-2 text-xs font-semibold text-[#0b0c0e] bg-gradient-to-r from-[#d4af62] via-[#c5a880] to-[#b69252] rounded-lg hover:brightness-110 active:scale-95 transition-all shadow-md shadow-[#c5a880]/15 whitespace-nowrap cursor-pointer"
            >
              Inquire Now
            </button>

            {/* Admin Access Button */}
            <button
              onClick={onOpenAdmin}
              className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                isAdminLoggedIn
                  ? 'border-[#c5a880] text-[#c5a880] bg-[#c5a880]/10'
                  : 'border-[#262b35] text-neutral-400 hover:text-neutral-200 hover:border-neutral-600'
              }`}
              title={isAdminLoggedIn ? 'Admin Portal Active' : 'Owner / Admin Portal'}
              aria-label="Admin Dashboard"
            >
              <ShieldCheck className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenAdmin}
              className={`p-2 rounded-lg border text-xs cursor-pointer ${
                isAdminLoggedIn ? 'border-[#c5a880] text-[#c5a880]' : 'border-[#262b35] text-neutral-400'
              }`}
              aria-label="Admin Portal"
            >
              <ShieldCheck className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-300 hover:text-[#c5a880] transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0d0f12]/98 border-b border-[#262b35] px-6 py-6 space-y-4 backdrop-blur-lg">
          <div className="flex flex-col space-y-3 text-base font-medium text-neutral-200">
            <button
              onClick={() => handleLinkClick('hero')}
              className="text-left py-2 hover:text-[#c5a880] transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => handleLinkClick('properties')}
              className="text-left py-2 hover:text-[#c5a880] transition-colors"
            >
              Properties & Plots
            </button>
            <button
              onClick={() => handleLinkClick('about')}
              className="text-left py-2 hover:text-[#c5a880] transition-colors"
            >
              About Orakzai Real Estate
            </button>
            <button
              onClick={() => handleLinkClick('why-us')}
              className="text-left py-2 hover:text-[#c5a880] transition-colors"
            >
              Why Choose Us
            </button>
            <button
              onClick={() => handleLinkClick('contact')}
              className="text-left py-2 hover:text-[#c5a880] transition-colors"
            >
              Contact Advisors
            </button>
          </div>

          <div className="pt-4 border-t border-[#262b35] flex flex-col gap-3">
            <div className="text-xs text-neutral-400">
              Peshawar · Nowshera · WAPDA Town
            </div>
            <div className="grid grid-cols-2 gap-2">
              <a
                href={BUSINESS_INFO.team[0].telHref}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg border border-[#262b35] bg-[#13161c] text-xs font-semibold text-neutral-200 hover:border-[#c5a880]"
              >
                <Phone className="w-3.5 h-3.5 text-[#c5a880]" />
                <span>Call Hamid</span>
              </a>
              <a
                href={BUSINESS_INFO.team[1].whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg border border-emerald-800/60 bg-emerald-950/40 text-xs font-semibold text-emerald-400 hover:bg-emerald-900/50"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Bilal</span>
              </a>
            </div>
            <button
              onClick={() => handleLinkClick('contact-form')}
              className="w-full py-3 text-center text-xs font-semibold text-[#0b0c0e] bg-[#c5a880] rounded-lg hover:brightness-110"
            >
              Send Property Inquiry
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
