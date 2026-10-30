import React from 'react';
import { Phone, MessageSquare, ShieldCheck, MapPin } from 'lucide-react';
import { BUSINESS_INFO } from '../data/initialProperties';

interface FooterProps {
  onOpenAdmin: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, onNavigate }) => {
  return (
    <footer className="bg-[#08090b] text-neutral-400 border-t border-[#262b35] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#262b35]">
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-2xl font-bold tracking-wider text-white">
                ORAKZAI
              </span>
              <span className="text-xs font-sans tracking-[0.25em] text-[#c5a880] uppercase font-semibold">
                Real Estate
              </span>
            </div>

            <p className="font-serif italic text-sm text-[#c5a880]">
              &ldquo;{BUSINESS_INFO.tagline}&rdquo;
            </p>

            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              Premier property advisory across Peshawar, Nowshera, and WAPDA Town. Offering residential plots, luxury villas, and commercial real estate starting from PKR 36 Lac.
            </p>

            <div className="flex items-center gap-2 text-xs text-neutral-300">
              <MapPin className="w-3.5 h-3.5 text-[#c5a880]" />
              <span>Peshawar | Nowshera | WAPDA Town, Pakistan</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-white font-semibold">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('hero')}
                  className="hover:text-[#c5a880] transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('properties')}
                  className="hover:text-[#c5a880] transition-colors cursor-pointer"
                >
                  Featured Properties &amp; Plots
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('gallery')}
                  className="hover:text-[#c5a880] transition-colors cursor-pointer"
                >
                  Property Photo Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#c5a880] transition-colors cursor-pointer"
                >
                  About Orakzai Real Estate
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('why-us')}
                  className="hover:text-[#c5a880] transition-colors cursor-pointer"
                >
                  Why Choose Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('location')}
                  className="hover:text-[#c5a880] transition-colors cursor-pointer"
                >
                  Service Area Maps
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#c5a880] transition-colors cursor-pointer"
                >
                  Contact Advisors
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Advisors Contact Column */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-white font-semibold">
              Contact Advisors
            </h4>
            <div className="space-y-3 text-xs">
              {/* Hamid Shah */}
              <div className="p-3 bg-[#13161c] border border-[#262b35] rounded-xl flex items-center justify-between">
                <div>
                  <div className="font-semibold text-white">Hamid Shah</div>
                  <div className="font-mono text-neutral-400">03339198038</div>
                </div>
                <div className="flex items-center gap-1.5">
                  <a
                    href="tel:03339198038"
                    className="p-1.5 rounded-lg bg-[#1a1e26] hover:bg-[#262b35] text-[#c5a880]"
                    title="Call Hamid Shah"
                  >
                    <Phone className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://wa.me/923339198038"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-900 text-emerald-400"
                    title="WhatsApp Hamid Shah"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Bilal Shah */}
              <div className="p-3 bg-[#13161c] border border-[#262b35] rounded-xl flex items-center justify-between">
                <div>
                  <div className="font-semibold text-white">Bilal Shah</div>
                  <div className="font-mono text-neutral-400">+92 314 8147426</div>
                </div>
                <div className="flex items-center gap-1.5">
                  <a
                    href="tel:+923148147426"
                    className="p-1.5 rounded-lg bg-[#1a1e26] hover:bg-[#262b35] text-[#c5a880]"
                    title="Call Bilal Shah"
                  >
                    <Phone className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://wa.me/923148147426"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-900 text-emerald-400"
                    title="WhatsApp Bilal Shah"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <p>© {new Date().getFullYear()} Orakzai Real Estate. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <span className="text-[11px] text-neutral-400">
              Peshawar · Nowshera · WAPDA Town
            </span>
            <span aria-hidden="true">·</span>
            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1 hover:text-[#c5a880] transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
