import React, { useState } from 'react';
import { ArrowRight, MessageSquare, PhoneCall, Search } from 'lucide-react';
import { PropertyCity, PropertyType } from '../types';

interface HeroProps {
  onExploreClick: () => void;
  onContactClick: () => void;
  onQuickFilter: (filters: { city?: PropertyCity; type?: PropertyType; maxPrice?: number }) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  onContactClick,
  onQuickFilter
}) => {
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedBudget, setSelectedBudget] = useState<string>('All');

  const handleApplyFilter = () => {
    let maxPrice: number | undefined;
    if (selectedBudget === 'under50') maxPrice = 50;
    else if (selectedBudget === 'under100') maxPrice = 100;
    else if (selectedBudget === 'under200') maxPrice = 200;

    onQuickFilter({
      city: selectedCity === 'All' ? undefined : (selectedCity as PropertyCity),
      type: selectedType === 'All' ? undefined : (selectedType as PropertyType),
      maxPrice
    });
    onExploreClick();
  };

  return (
    <section id="hero" className="relative min-h-[92vh] flex flex-col justify-between pt-24 pb-12 overflow-hidden bg-[#0b0c0e]">
      {/* Background Architectural Image with Measured Luxury Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_luxury_villa_1793257684730.jpg"
          alt="Luxury modern architectural residence in Peshawar Nowshera"
          className="w-full h-full object-cover object-center scale-105 animate-fade-in transition-transform duration-1000 ease-out"
          referrerPolicy="no-referrer"
          onError={(e) => {
            const img = e.currentTarget;
            if (!img.dataset.fallbackTried) {
              img.dataset.fallbackTried = 'true';
              img.src = '/images/hero_luxury_villa_1793257684730.jpg';
            }
          }}
        />
        {/* Measured Scrim: 4.5:1 WCAG contrast across all luminance levels */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c0e] via-[#0b0c0e]/75 to-[#0b0c0e]/45" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#0b0c0e]/50 to-[#0b0c0e]/90" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-12">
        <div className="max-w-3xl space-y-6">
          {/* Slogan & Regional Location */}
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm uppercase tracking-[0.22em] text-[#c5a880] font-semibold">
            <span>Peshawar</span>
            <span aria-hidden="true" className="text-neutral-500">·</span>
            <span>Nowshera</span>
            <span aria-hidden="true" className="text-neutral-500">·</span>
            <span>WAPDA Town</span>
          </div>

          {/* Main Heading */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08] [text-wrap:balance]">
            Find Your Perfect Property
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg md:text-xl text-neutral-300 font-normal leading-relaxed max-w-2xl">
            Discover Exceptional Property Opportunities in Peshawar &amp; Nowshera.
          </p>

          {/* Starting Price Luxury Tag */}
          <div className="pt-2">
            <div className="inline-flex items-baseline gap-2.5 px-4 py-2 rounded-lg bg-[#13161c]/80 border border-[#c5a880]/30 backdrop-blur-md">
              <span className="text-xs uppercase tracking-wider text-neutral-400 font-medium">Starting Investment</span>
              <span className="text-sm font-semibold text-[#f4f4f5]">·</span>
              <span className="text-base sm:text-lg font-serif font-bold text-[#c5a880] tabular-nums">
                Properties Starting From PKR 36 Lac
              </span>
            </div>
          </div>

          {/* 3 Attractive Action Buttons */}
          <div className="pt-4 flex flex-wrap items-center gap-3.5 sm:gap-4">
            {/* 1. Explore Properties */}
            <button
              onClick={onExploreClick}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg text-sm font-semibold text-[#0b0c0e] bg-gradient-to-r from-[#d4af62] via-[#c5a880] to-[#b69252] hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-[#c5a880]/20 whitespace-nowrap cursor-pointer"
            >
              <span>Explore Properties</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* 2. Contact Our Team */}
            <button
              onClick={onContactClick}
              className="inline-flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-lg text-sm font-medium text-neutral-200 border border-[#262b35] bg-[#13161c]/80 hover:border-[#c5a880] hover:text-white backdrop-blur-md transition-all whitespace-nowrap cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 text-[#c5a880]" />
              <span>Contact Our Team</span>
            </button>

            {/* 3. Chat on WhatsApp (Bilal Shah) */}
            <a
              href="https://wa.me/923148147426?text=Hello%20Bilal%20Shah,%20I%20am%20interested%20in%20property%20opportunities%20in%20Peshawar%20and%20Nowshera%20starting%20from%20PKR%2036%20Lac."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-lg text-sm font-medium text-emerald-300 border border-emerald-900/70 bg-emerald-950/40 hover:bg-emerald-900/60 hover:border-emerald-600 transition-all whitespace-nowrap"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Docked Search & Filter Bar */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-6">
        <div className="bg-[#13161c]/95 border border-[#262b35] rounded-xl p-4 sm:p-5 backdrop-blur-md shadow-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            {/* Location Filter */}
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-neutral-400 font-medium">
                Location Area
              </label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full bg-[#0b0c0e] border border-[#262b35] text-neutral-200 text-sm rounded-lg px-3.5 py-2.5 focus:outline-none focus:border-[#c5a880] transition-colors cursor-pointer"
              >
                <option value="All">All Regions</option>
                <option value="WAPDA Town">WAPDA Town (Peshawar)</option>
                <option value="Peshawar">Peshawar Central</option>
                <option value="Nowshera">Nowshera Corridor</option>
              </select>
            </div>

            {/* Property Type Filter */}
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-neutral-400 font-medium">
                Property Category
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full bg-[#0b0c0e] border border-[#262b35] text-neutral-200 text-sm rounded-lg px-3.5 py-2.5 focus:outline-none focus:border-[#c5a880] transition-colors cursor-pointer"
              >
                <option value="All">All Categories</option>
                <option value="Residential Plot">Residential Plots</option>
                <option value="House">Houses &amp; Villas</option>
                <option value="Investment Property">Investment Properties</option>
              </select>
            </div>

            {/* Budget Range */}
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-neutral-400 font-medium">
                Budget Range
              </label>
              <select
                value={selectedBudget}
                onChange={(e) => setSelectedBudget(e.target.value)}
                className="w-full bg-[#0b0c0e] border border-[#262b35] text-neutral-200 text-sm rounded-lg px-3.5 py-2.5 focus:outline-none focus:border-[#c5a880] transition-colors cursor-pointer"
              >
                <option value="All">Any Budget (From PKR 36 Lac)</option>
                <option value="under50">Under PKR 50 Lac</option>
                <option value="under100">Under PKR 1 Crore</option>
                <option value="under200">Under PKR 2 Crore</option>
              </select>
            </div>

            {/* Apply Button */}
            <div>
              <button
                onClick={handleApplyFilter}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-[#0b0c0e] bg-[#c5a880] hover:bg-[#d4af62] transition-colors cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>Search Properties</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
