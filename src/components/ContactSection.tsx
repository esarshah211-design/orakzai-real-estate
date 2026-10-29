import React, { useState } from 'react';
import { Phone, MessageSquare, Copy, Check, Clock, ShieldCheck } from 'lucide-react';
import { BUSINESS_INFO } from '../data/initialProperties';

export const ContactSection: React.FC = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopyPhone = (phone: string, index: number) => {
    navigator.clipboard.writeText(phone);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  return (
    <section id="contact" className="py-24 bg-[#0b0c0e] border-t border-[#262b35]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <div className="text-xs uppercase tracking-[0.25em] text-[#c5a880] font-semibold">
            Direct Advisor Access
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Speak with Our Team
          </h2>
          <p className="text-sm sm:text-base text-neutral-400">
            Reach out directly to our dedicated property specialists in Peshawar and Nowshera for immediate plot availability, site visits, and transparent transfers.
          </p>
        </div>

        {/* Two Bespoke Luxury Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {BUSINESS_INFO.team.map((advisor, index) => {
            const isHamid = advisor.name.includes('Hamid');
            return (
              <div
                key={index}
                className="bg-[#13161c] border border-[#262b35] rounded-2xl p-6 sm:p-8 hover:border-[#c5a880]/60 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-black/60 flex flex-col justify-between relative overflow-hidden"
              >
                {/* Accent corner glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#c5a880]/5 rounded-bl-full pointer-events-none" />

                <div className="space-y-6">
                  {/* Advisor Title & Identity (ONLY names Hamid Shah and Bilal Shah, no family relations) */}
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-xs font-semibold text-[#c5a880] uppercase tracking-wider">
                        {advisor.role}
                      </div>
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
                        {advisor.name}
                      </h3>
                      <div className="text-xs text-neutral-400 mt-1">
                        Orakzai Real Estate
                      </div>
                    </div>

                    <div className="w-12 h-12 rounded-full bg-[#1a1e26] border border-[#262b35] flex items-center justify-center text-[#c5a880]">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Phone Number Display with Copy Affordance */}
                  <div className="p-4 bg-[#0b0c0e] border border-[#262b35] rounded-xl flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-neutral-400 block uppercase tracking-wider">Direct Phone Line</span>
                      <span className="font-mono text-lg sm:text-xl font-bold text-white tracking-wide">
                        {advisor.phone}
                      </span>
                    </div>

                    <button
                      onClick={() => handleCopyPhone(advisor.phone, index)}
                      className="p-2 text-neutral-400 hover:text-[#c5a880] transition-colors rounded-lg hover:bg-[#1a1e26] cursor-pointer"
                      title="Copy phone number"
                      aria-label={`Copy phone for ${advisor.name}`}
                    >
                      {copiedIndex === index ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Working Hours / Availability */}
                  <div className="flex items-center gap-2 text-xs text-neutral-400">
                    <Clock className="w-3.5 h-3.5 text-[#c5a880]" />
                    <span>Available Daily: 9:00 AM – 9:00 PM PKT (Site visits by appointment)</span>
                  </div>
                </div>

                {/* Direct Action Buttons: Call & WhatsApp */}
                <div className="pt-6 mt-6 border-t border-[#262b35] grid grid-cols-2 gap-3">
                  {/* Call Button: tel: link */}
                  <a
                    href={advisor.telHref}
                    className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold text-white bg-[#1a1e26] hover:bg-[#262b35] border border-[#262b35] hover:border-[#c5a880] transition-all shadow-sm"
                  >
                    <Phone className="w-4 h-4 text-[#c5a880]" />
                    <span>Call Now</span>
                  </a>

                  {/* WhatsApp Button: wa.me link */}
                  <a
                    href={advisor.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold text-emerald-300 bg-emerald-950/50 hover:bg-emerald-900/70 border border-emerald-900/80 hover:border-emerald-700 transition-all shadow-md"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
