import React, { useState } from 'react';
import { MapPin, Navigation, Compass, Building2, Car } from 'lucide-react';

export const LocationSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'wapda' | 'peshawar' | 'nowshera'>('wapda');

  const hubDetails = {
    wapda: {
      name: 'WAPDA Town, Peshawar',
      headline: 'Master-Planned Residential Community',
      description:
        'A prestigious gated development in Peshawar offering modern underground utilities, 40 to 60-foot wide asphalt boulevards, family parks, and immediate possession sectors. Popular for 5 Marla, 10 Marla, and 1 Kanal plots.',
      highlights: [
        'Organized Sectors & Executive Enclaves',
        '24/7 Security & Controlled Gated Access',
        'Direct connection to Northern Bypass & Ring Road',
        'Plots starting from PKR 36–37 Lac'
      ],
      // Google Maps embed URL centered on WAPDA Town Peshawar area
      mapQuery: 'WAPDA+Town+Peshawar+Pakistan'
    },
    peshawar: {
      name: 'Peshawar Metropolitan Hub',
      headline: 'Capital Commercial & Luxury Residential Corridor',
      description:
        'Peshawar’s expanding commercial sectors and luxury residential enclaves offer unmatched commercial rental yields, retail frontage, and prime land plots adjacent to main motorways and expressways.',
      highlights: [
        'Commercial multi-storey development zones',
        'Direct access to M-1 Motorway & GT Road',
        'Rapid appreciation along Ring Road & Northern Bypass',
        'High liquidity for investment portfolios'
      ],
      mapQuery: 'Peshawar+Khyber+Pakhtunkhwa+Pakistan'
    },
    nowshera: {
      name: 'Nowshera Growth Corridor',
      headline: 'Emerging High-Appreciation Residential Hub',
      description:
        'Positioned strategically between Peshawar and Islamabad along the GT Road corridor, Nowshera provides high-value residential and commercial plots for budget-conscious families and forward-thinking investors.',
      highlights: [
        'Budget-friendly entry from PKR 36 Lac',
        'Expansive road frontage along historic GT Road',
        'Peaceful suburban communities with fresh mountain air',
        'Continuous infrastructure upgrades'
      ],
      mapQuery: 'Nowshera+Khyber+Pakhtunkhwa+Pakistan'
    }
  };

  const current = hubDetails[activeTab];

  return (
    <section id="location" className="py-24 bg-[#0b0c0e] border-t border-[#262b35]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="text-xs uppercase tracking-[0.25em] text-[#c5a880] font-semibold">
            Service Area &amp; Coverage
          </div>
          {/* Prominent Service Area Display (Mandatory Requirement) */}
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Peshawar | Nowshera | WAPDA Town
          </h2>
          <p className="text-sm sm:text-base text-neutral-400">
            Our primary advisory footprint spans Khyber Pakhtunkhwa’s most active property corridors. Note: Precise office coordinates can be scheduled directly with our advisors.
          </p>
        </div>

        {/* Region Switcher Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1 bg-[#13161c] border border-[#262b35] rounded-xl">
            <button
              onClick={() => setActiveTab('wapda')}
              className={`px-5 py-2.5 text-xs sm:text-sm font-medium rounded-lg transition-all cursor-pointer ${
                activeTab === 'wapda'
                  ? 'bg-[#c5a880] text-[#0b0c0e] font-semibold shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              WAPDA Town
            </button>
            <button
              onClick={() => setActiveTab('peshawar')}
              className={`px-5 py-2.5 text-xs sm:text-sm font-medium rounded-lg transition-all cursor-pointer ${
                activeTab === 'peshawar'
                  ? 'bg-[#c5a880] text-[#0b0c0e] font-semibold shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Peshawar
            </button>
            <button
              onClick={() => setActiveTab('nowshera')}
              className={`px-5 py-2.5 text-xs sm:text-sm font-medium rounded-lg transition-all cursor-pointer ${
                activeTab === 'nowshera'
                  ? 'bg-[#c5a880] text-[#0b0c0e] font-semibold shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Nowshera
            </button>
          </div>
        </div>

        {/* 2-Column Split: Interactive Hub Intel & Google Maps Embed */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Hub Information & Key Infrastructure */}
          <div className="lg:col-span-5 bg-[#13161c] border border-[#262b35] rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#c5a880] uppercase tracking-wider">
                <Navigation className="w-4 h-4" />
                <span>Regional Corridor Focus</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                {current.name}
              </h3>
              <p className="text-xs sm:text-sm font-medium text-[#c5a880]">
                {current.headline}
              </p>

              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                {current.description}
              </p>

              <div className="pt-2 space-y-2">
                <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold block">
                  Sector &amp; Location Advantages
                </span>
                <ul className="space-y-2">
                  {current.highlights.map((point, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-neutral-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#c5a880] mt-1.5 shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Advisory note */}
            <div className="p-4 bg-[#0b0c0e] border border-[#262b35] rounded-xl flex items-start gap-3">
              <Compass className="w-5 h-5 text-[#c5a880] shrink-0 mt-0.5" />
              <div className="text-xs text-neutral-400 leading-relaxed">
                <strong className="text-white block font-medium">On-Site Advisory:</strong>
                Hamid Shah and Bilal Shah conduct on-site visits across Peshawar, Nowshera, and WAPDA Town daily by prior scheduling.
              </div>
            </div>
          </div>

          {/* Right: Configurable Google Maps Integration */}
          <div className="lg:col-span-7 bg-[#13161c] border border-[#262b35] rounded-2xl overflow-hidden flex flex-col shadow-xl">
            <div className="px-5 py-3.5 bg-[#0d0f12] border-b border-[#262b35] flex items-center justify-between text-xs text-neutral-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#c5a880]" />
                <span className="text-white font-medium">Service Area Map: {current.name}</span>
              </div>
              <span className="text-[11px] text-neutral-500">Google Maps Integration</span>
            </div>

            <div className="relative w-full flex-1 min-h-[380px] bg-[#1a1e26]">
              {/* Responsive Google Maps Embed with Dark Aesthetic Filter */}
              <iframe
                title={`Map of ${current.name}`}
                width="100%"
                height="100%"
                className="w-full h-full min-h-[380px] border-0"
                style={{
                  filter: 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)'
                }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://maps.google.com/maps?q=${current.mapQuery}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
              />

              {/* Map Footer overlay */}
              <div className="absolute bottom-3 left-3 right-3 bg-[#0b0c0e]/95 border border-[#262b35] p-3 rounded-xl backdrop-blur-md flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-neutral-300">
                  <Building2 className="w-4 h-4 text-[#c5a880]" />
                  <span>Coverage: Peshawar · Nowshera · WAPDA Town</span>
                </div>
                <div className="flex items-center gap-2 text-[#c5a880] font-medium">
                  <Car className="w-4 h-4" />
                  <span>Personal Site Inspection Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
