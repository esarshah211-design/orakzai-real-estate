import React from 'react';
import { ShieldCheck, Compass, Users2, Check } from 'lucide-react';

interface AboutSectionProps {
  onContactClick: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onContactClick }) => {
  return (
    <section id="about" className="py-24 bg-[#0b0c0e] relative overflow-hidden border-t border-[#262b35]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Visual Side: High-End Advisory Lounge Image */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#262b35] shadow-2xl bg-[#13161c]">
              <img
                src="/src/assets/images/about_architectural_lounge_1793257686256.jpg"
                alt="Orakzai Real Estate Private Client Advisory"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const img = e.currentTarget;
                  if (!img.dataset.fallbackTried) {
                    img.dataset.fallbackTried = 'true';
                    img.src = '/images/about_architectural_lounge_1793257686256.jpg';
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c0e] via-transparent to-transparent opacity-60" />

              {/* Floating Quote Card */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#0d0f12]/95 border border-[#c5a880]/40 backdrop-blur-md">
                <p className="font-serif italic text-sm sm:text-base text-[#f4f4f5]">
                  &ldquo;Your Property. Your Future. Our Commitment.&rdquo;
                </p>
                <div className="mt-1 flex items-center justify-between text-xs text-neutral-400">
                  <span className="text-[#c5a880] font-medium">Orakzai Real Estate</span>
                  <span>Peshawar · Nowshera · WAPDA Town</span>
                </div>
              </div>
            </div>

            {/* Micro Stats Row */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 bg-[#13161c] border border-[#262b35] rounded-xl text-center">
                <span className="text-[11px] uppercase tracking-wider text-neutral-400 block">Entry Point</span>
                <span className="font-serif text-lg font-bold text-[#c5a880] tabular-nums">PKR 36 Lac</span>
              </div>
              <div className="p-3 bg-[#13161c] border border-[#262b35] rounded-xl text-center">
                <span className="text-[11px] uppercase tracking-wider text-neutral-400 block">Focus Hubs</span>
                <span className="font-serif text-lg font-bold text-white">3 Regions</span>
              </div>
              <div className="p-3 bg-[#13161c] border border-[#262b35] rounded-xl text-center">
                <span className="text-[11px] uppercase tracking-wider text-neutral-400 block">Direct Access</span>
                <span className="font-serif text-lg font-bold text-[#c5a880]">Principals</span>
              </div>
            </div>
          </div>

          {/* Narrative Content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <div className="text-xs uppercase tracking-[0.25em] text-[#c5a880] font-semibold">
                About Orakzai Real Estate
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
                Your Trusted Real Estate Partner
              </h2>
            </div>

            {/* Exact Required Description */}
            <p className="text-base sm:text-lg text-neutral-300 font-normal leading-relaxed">
              At Orakzai Real Estate, we help customers explore property opportunities in Peshawar, Nowshera, and WAPDA Town. Our focus is on personalized service, clear communication, and helping customers find properties that match their needs and budgets.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5">
                <div className="p-2 rounded-lg bg-[#13161c] border border-[#262b35] text-[#c5a880] shrink-0 mt-1">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Verified Legal Clearances</h4>
                  <p className="text-xs text-neutral-400 leading-relaxed mt-0.5">
                    We ensure all plots and properties under consideration possess transparent registry, NOC approvals, and clean Inteqal records.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2 rounded-lg bg-[#13161c] border border-[#262b35] text-[#c5a880] shrink-0 mt-1">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Market Intelligence across 3 Key Growth Hubs</h4>
                  <p className="text-xs text-neutral-400 leading-relaxed mt-0.5">
                    In-depth on-the-ground knowledge of WAPDA Town sectors, Peshawar Ring Road developments, and Nowshera GT Road corridors.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2 rounded-lg bg-[#13161c] border border-[#262b35] text-[#c5a880] shrink-0 mt-1">
                  <Users2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Direct Guidance from Hamid Shah &amp; Bilal Shah</h4>
                  <p className="text-xs text-neutral-400 leading-relaxed mt-0.5">
                    No middlemen or call center delays. You communicate directly with our dedicated real estate advisors.
                  </p>
                </div>
              </div>
            </div>

            {/* Checklist & CTA */}
            <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[#262b35]">
              <div className="flex items-center gap-2 text-xs text-neutral-300">
                <Check className="w-4 h-4 text-[#c5a880]" />
                <span>Transparent Transfer Procedures</span>
              </div>
              <button
                onClick={onContactClick}
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-xs font-semibold text-[#0b0c0e] bg-[#c5a880] hover:bg-[#d4af62] transition-colors cursor-pointer"
              >
                Connect with Our Advisors
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
