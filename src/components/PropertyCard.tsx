import React from 'react';
import { MessageSquare, ArrowUpRight, MapPin, Maximize2, Bed, Bath } from 'lucide-react';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
  onViewDetails: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, onViewDetails }) => {
  // Pre-fill WhatsApp message with property details
  const whatsappMessage = encodeURIComponent(
    `Hello Orakzai Real Estate, I am interested in inquiring about "${property.title}" (${property.priceDisplay}) located in ${property.location}. Please share availability and transfer details.`
  );
  // Send to Bilal Shah by default or Hamid Shah
  const whatsappUrl = `https://wa.me/923148147426?text=${whatsappMessage}`;

  return (
    <article className="group bg-[#13161c] border border-[#262b35] rounded-xl overflow-hidden hover:border-[#c5a880]/60 transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-2xl hover:shadow-black/50">
      {/* Top Image Container with Ratio 4:3 */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#1a1e26]">
        <img
          src={property.imageUrl}
          alt={property.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          referrerPolicy="no-referrer"
          loading="lazy"
          onError={(e) => {
            // High-fidelity architectural CSS fallback
            const target = e.target as HTMLElement;
            target.style.display = 'none';
          }}
        />

        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#13161c] via-transparent to-transparent opacity-80" />

        {/* Clear Demonstration Listing Label (Mandatory User Requirement) */}
        {property.isDemoListing && (
          <div className="absolute top-3 left-3 bg-[#0b0c0e]/90 border border-amber-500/40 text-amber-300 text-[11px] font-medium tracking-wider uppercase px-2.5 py-1 rounded backdrop-blur-md">
            Demonstration Listing
          </div>
        )}

        {/* Property Status Tag */}
        <div className="absolute top-3 right-3 bg-[#0b0c0e]/90 border border-neutral-700 text-neutral-300 text-[11px] font-medium tracking-wider uppercase px-2.5 py-1 rounded backdrop-blur-md">
          {property.status}
        </div>

        {/* Price Overlay in Tabular Numerals */}
        <div className="absolute bottom-3 left-3 right-3 flex items-baseline justify-between">
          <div className="bg-[#0b0c0e]/95 px-3 py-1.5 rounded-lg border border-[#c5a880]/30 backdrop-blur-md">
            <span className="font-serif text-lg sm:text-xl font-bold text-[#c5a880] tabular-nums">
              {property.priceDisplay}
            </span>
          </div>
          <div className="text-xs text-neutral-300 font-medium bg-[#0b0c0e]/80 px-2 py-1 rounded border border-neutral-800 backdrop-blur-md">
            {property.area}
          </div>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Unboxed Metadata with Typographic Separator (Anti-slop discipline) */}
          <div className="flex items-center gap-2 text-xs text-neutral-400 font-medium">
            <span className="text-[#c5a880]">{property.propertyType}</span>
            <span aria-hidden="true">·</span>
            <span>{property.city}</span>
            {property.sector && (
              <>
                <span aria-hidden="true">·</span>
                <span>{property.sector}</span>
              </>
            )}
          </div>

          {/* Property Title */}
          <h3 className="font-serif text-lg sm:text-xl font-semibold text-white group-hover:text-[#c5a880] transition-colors line-clamp-1">
            {property.title}
          </h3>

          {/* Location Line */}
          <div className="flex items-center gap-1.5 text-xs text-neutral-400">
            <MapPin className="w-3.5 h-3.5 text-[#c5a880] shrink-0" />
            <span className="truncate">{property.location}</span>
          </div>

          {/* Key Feature Specs (House: Beds/Baths, Plot: Utilities) */}
          <div className="pt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-neutral-300">
            {property.bedrooms ? (
              <div className="flex items-center gap-1">
                <Bed className="w-3.5 h-3.5 text-neutral-400" />
                <span>{property.bedrooms} Beds</span>
              </div>
            ) : null}

            {property.bathrooms ? (
              <div className="flex items-center gap-1">
                <Bath className="w-3.5 h-3.5 text-neutral-400" />
                <span>{property.bathrooms} Baths</span>
              </div>
            ) : null}

            <div className="flex items-center gap-1">
              <Maximize2 className="w-3.5 h-3.5 text-neutral-400" />
              <span>{property.area}</span>
            </div>

            {property.possessionStatus && (
              <span className="text-[11px] text-neutral-400">
                · {property.possessionStatus}
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons: View Details & WhatsApp Inquiry */}
        <div className="pt-3 border-t border-[#262b35] grid grid-cols-2 gap-2">
          <button
            onClick={() => onViewDetails(property)}
            className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs font-semibold text-neutral-200 bg-[#1a1e26] hover:bg-[#262b35] hover:text-white border border-[#262b35] transition-colors cursor-pointer"
          >
            <span>View Details</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs font-semibold text-emerald-300 bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-900/60 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </article>
  );
};
