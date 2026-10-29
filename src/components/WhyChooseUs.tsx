import React from 'react';
import {
  UserCheck,
  TrendingUp,
  Map,
  MessageCircle,
  Coins,
  Smartphone
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      icon: UserCheck,
      title: 'Personalized Property Assistance',
      description:
        'Tailored recommendations matching your exact residential lifestyle goals, family requirements, or commercial aspirations.'
    },
    {
      icon: TrendingUp,
      title: 'Investment Opportunities',
      description:
        'Carefully evaluated plots and assets with superior capital appreciation potential along high-demand Peshawar and Nowshera corridors.'
    },
    {
      icon: Map,
      title: 'Local Market Knowledge',
      description:
        'Authoritative insights into WAPDA Town sector trends, civic infrastructure timelines, development phases, and prevailing land rates.'
    },
    {
      icon: MessageCircle,
      title: 'Direct Customer Communication',
      description:
        'Clear, straightforward dialogue directly with Hamid Shah and Bilal Shah with prompt answers to all legal and financial queries.'
    },
    {
      icon: Coins,
      title: 'Options for Different Budgets',
      description:
        'Accessible, high-value opportunities starting from PKR 36–37 Lac up to multi-Kanal executive estates and commercial plazas.'
    },
    {
      icon: Smartphone,
      title: 'Convenient WhatsApp Support',
      description:
        'Instant messaging, instant file photo transfers, video walkthroughs, and document reviews via fast WhatsApp coordination.'
    }
  ];

  return (
    <section id="why-us" className="py-24 bg-[#0d0f12] border-t border-[#262b35]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <div className="text-xs uppercase tracking-[0.25em] text-[#c5a880] font-semibold">
            The Orakzai Standard
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Why Choose Us
          </h2>
          <p className="text-sm sm:text-base text-neutral-400">
            A boutique real estate practice built on integrity, transparent dealing, and unmatched regional expertise in Khyber Pakhtunkhwa.
          </p>
        </div>

        {/* 6 Grid Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="group bg-[#13161c] border border-[#262b35] rounded-xl p-6 hover:border-[#c5a880]/50 transition-all duration-300 hover:shadow-xl hover:shadow-black/40 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-[#0b0c0e] border border-[#262b35] flex items-center justify-center text-[#c5a880] group-hover:border-[#c5a880] transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#c5a880] transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#262b35]/60 flex items-center justify-between text-[11px] text-neutral-400">
                  <span className="uppercase tracking-wider font-medium">Standard 0{idx + 1}</span>
                  <span className="text-[#c5a880]">Peshawar · Nowshera</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
