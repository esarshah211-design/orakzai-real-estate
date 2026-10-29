import React, { useState, useMemo } from 'react';
import { Property, PropertyCity, PropertyType } from '../types';
import { PropertyCard } from './PropertyCard';
import { Filter, SlidersHorizontal, AlertCircle, PhoneCall } from 'lucide-react';

interface PropertiesSectionProps {
  properties: Property[];
  onViewDetails: (property: Property) => void;
  onOpenInquiryForGeneral: () => void;
  activeCityFilter?: PropertyCity;
  activeTypeFilter?: PropertyType;
  maxPriceFilter?: number;
}

export const PropertiesSection: React.FC<PropertiesSectionProps> = ({
  properties,
  onViewDetails,
  onOpenInquiryForGeneral,
  activeCityFilter,
  activeTypeFilter,
  maxPriceFilter
}) => {
  const [selectedType, setSelectedType] = useState<string>(activeTypeFilter || 'All');
  const [selectedCity, setSelectedCity] = useState<string>(activeCityFilter || 'All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Update when props change from Hero quick search
  React.useEffect(() => {
    if (activeCityFilter) setSelectedCity(activeCityFilter);
  }, [activeCityFilter]);

  React.useEffect(() => {
    if (activeTypeFilter) setSelectedType(activeTypeFilter);
  }, [activeTypeFilter]);

  const filteredProperties = useMemo(() => {
    return properties
      .filter((prop) => {
        // Category filter
        if (selectedType !== 'All' && prop.propertyType !== selectedType) return false;
        // City filter
        if (selectedCity !== 'All' && prop.city !== selectedCity) return false;
        // Max Price
        if (maxPriceFilter && prop.priceInLac > maxPriceFilter) return false;
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = prop.title.toLowerCase().includes(q);
          const matchLoc = prop.location.toLowerCase().includes(q);
          const matchSector = prop.sector ? prop.sector.toLowerCase().includes(q) : false;
          if (!matchTitle && !matchLoc && !matchSector) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.priceInLac - b.priceInLac;
        if (sortBy === 'price-desc') return b.priceInLac - a.priceInLac;
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [properties, selectedType, selectedCity, maxPriceFilter, searchQuery, sortBy]);

  return (
    <section id="properties" className="py-20 bg-[#0d0f12] border-t border-[#262b35]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-3">
            <div className="text-xs uppercase tracking-[0.25em] text-[#c5a880] font-semibold">
              Curated Portfolio · Starting PKR 36 Lac
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Featured Properties
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 max-w-xl">
              Explore residential plots, architect-designed luxury houses, and high-yield commercial investments across Peshawar, Nowshera, and WAPDA Town.
            </p>
          </div>

          {/* Demonstration Notice */}
          <div className="p-3.5 bg-[#13161c] border border-amber-500/30 rounded-xl flex items-start gap-3 max-w-md">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-xs text-neutral-300 leading-relaxed">
              <strong className="text-amber-300 font-medium">Demonstration Listings:</strong> The sample properties shown below represent typical available inventory in WAPDA Town, Peshawar, and Nowshera. Exact live sector plots and verified legal files are provided upon consultation.
            </p>
          </div>
        </div>

        {/* Filter Controls (Segmented Tabs & Dropdowns) */}
        <div className="bg-[#13161c] border border-[#262b35] rounded-xl p-4 mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Interactive Filter Controls: Category Segmented Tabs */}
            <div className="flex items-center gap-1 p-1 bg-[#0b0c0e] rounded-lg overflow-x-auto">
              {[
                { label: 'All Showcase', value: 'All' },
                { label: 'Residential Plots', value: 'Residential Plot' },
                { label: 'Houses & Villas', value: 'House' },
                { label: 'Investment Properties', value: 'Investment Property' }
              ].map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setSelectedType(tab.value)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                    selectedType === tab.value
                      ? 'bg-[#c5a880] text-[#0b0c0e] font-semibold shadow-sm'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Region Filter & Sort & Search */}
            <div className="flex flex-wrap items-center gap-3">
              {/* City selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-neutral-400">Region:</span>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="bg-[#0b0c0e] border border-[#262b35] text-xs text-neutral-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#c5a880] cursor-pointer"
                >
                  <option value="All">All Regions</option>
                  <option value="WAPDA Town">WAPDA Town</option>
                  <option value="Peshawar">Peshawar</option>
                  <option value="Nowshera">Nowshera</option>
                </select>
              </div>

              {/* Sort selector */}
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-[#0b0c0e] border border-[#262b35] text-xs text-neutral-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#c5a880] cursor-pointer"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>

              {/* Keyword Search */}
              <input
                type="text"
                placeholder="Search by title, sector..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[#0b0c0e] border border-[#262b35] text-xs text-neutral-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#c5a880] placeholder-neutral-500 w-full sm:w-48"
              />
            </div>
          </div>

          {/* Active Filter count & Reset */}
          <div className="flex items-center justify-between text-xs text-neutral-400 pt-2 border-t border-[#262b35]/60">
            <span>
              Showing <strong className="text-white font-semibold">{filteredProperties.length}</strong> listings
              {selectedType !== 'All' ? ` in ${selectedType}` : ''}
              {selectedCity !== 'All' ? ` (${selectedCity})` : ''}
            </span>

            {(selectedType !== 'All' || selectedCity !== 'All' || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedType('All');
                  setSelectedCity('All');
                  setSearchQuery('');
                }}
                className="text-[#c5a880] hover:underline cursor-pointer"
              >
                Reset All Filters
              </button>
            )}
          </div>
        </div>

        {/* Property Grid */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onViewDetails={onViewDetails}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#13161c] border border-[#262b35] rounded-xl space-y-4">
            <Filter className="w-10 h-10 text-neutral-500 mx-auto" />
            <div className="space-y-1">
              <h3 className="text-lg font-serif font-semibold text-white">No properties match your exact criteria</h3>
              <p className="text-sm text-neutral-400 max-w-md mx-auto">
                Try widening your price or category filters, or connect directly with Hamid Shah and Bilal Shah for unlisted off-market plots.
              </p>
            </div>
            <button
              onClick={() => {
                setSelectedType('All');
                setSelectedCity('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 text-xs font-semibold text-[#0b0c0e] bg-[#c5a880] rounded-lg hover:bg-[#d4af62]"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Custom Property Request Banner */}
        <div className="mt-14 bg-gradient-to-r from-[#13161c] via-[#1a1e26] to-[#13161c] border border-[#c5a880]/30 rounded-xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="font-serif text-xl sm:text-2xl font-bold text-white">
              Looking for a Specific Plot Size or Budget in WAPDA Town?
            </h4>
            <p className="text-sm text-neutral-300 max-w-2xl">
              Whether you need 5 Marla, 10 Marla, or 1 Kanal in WAPDA Town, Peshawar or Nowshera, our team tracks verified files daily starting from PKR 36 Lac.
            </p>
          </div>

          <button
            onClick={onOpenInquiryForGeneral}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-xs font-semibold text-[#0b0c0e] bg-gradient-to-r from-[#d4af62] via-[#c5a880] to-[#b69252] hover:brightness-110 shrink-0 whitespace-nowrap cursor-pointer shadow-md"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Request Custom Search</span>
          </button>
        </div>
      </div>
    </section>
  );
};
