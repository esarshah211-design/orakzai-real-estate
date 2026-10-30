import React, { useState } from 'react';
import { X, MapPin, CheckCircle, MessageSquare, Phone, Send, Calculator } from 'lucide-react';
import { Property } from '../types';

interface PropertyModalProps {
  property: Property | null;
  onClose: () => void;
  onSubmitInquiry: (inquiryData: {
    fullName: string;
    phone: string;
    propertyType: any;
    budget: string;
    preferredLocation: string;
    message: string;
    propertyId?: string;
    propertyTitle?: string;
  }) => Promise<boolean>;
}

export const PropertyModal: React.FC<PropertyModalProps> = ({
  property,
  onClose,
  onSubmitInquiry
}) => {
  if (!property) return null;

  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryMsg, setInquiryMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Downpayment calculator state
  const [downpaymentPct, setDownpaymentPct] = useState(30);

  const priceInPkr = property.priceInLac * 100000;
  const downpaymentAmount = (priceInPkr * downpaymentPct) / 100;
  const remainingBalance = priceInPkr - downpaymentAmount;

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName.trim() || !inquiryPhone.trim()) {
      setSubmitError('Please provide your name and phone number.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const ok = await onSubmitInquiry({
        fullName: inquiryName.trim(),
        phone: inquiryPhone.trim(),
        propertyType: property.propertyType,
        budget: property.priceDisplay,
        preferredLocation: property.city,
        message: inquiryMsg.trim() || `Inquiring about ${property.title} in ${property.location}.`,
        propertyId: property.id,
        propertyTitle: property.title
      });

      if (ok) {
        setSubmitSuccess(true);
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 5000);
      } else {
        setSubmitError('Could not record inquiry. Please try WhatsApp directly.');
      }
    } catch (err) {
      setSubmitError('Something went wrong. Please connect via WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappText = encodeURIComponent(
    `Hello Bilal Shah, I am reviewing the details of "${property.title}" (${property.priceDisplay}) in ${property.location}. I would like more information on documents and availability.`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      {/* Modal Container */}
      <div
        className="relative w-full max-w-4xl bg-[#13161c] border border-[#262b35] rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Header bar with close */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#262b35] bg-[#0d0f12]">
          <div className="flex items-center gap-3">
            <span className="font-serif text-lg font-bold text-white tracking-wide">
              Property Dossier
            </span>
            {property.isDemoListing && (
              <span className="text-[11px] font-medium tracking-wider uppercase text-amber-300 bg-amber-950/40 border border-amber-500/40 px-2 py-0.5 rounded">
                Demonstration Listing
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-[#262b35] transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 space-y-8">
          {/* Main Visual & Key Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Visual */}
            <div className="lg:col-span-7 space-y-3">
              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-[#262b35] bg-[#1a1e26]">
                <img
                  src={property.imageUrl}
                  alt={property.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const img = e.currentTarget;
                    if (!img.dataset.fallbackTried) {
                      img.dataset.fallbackTried = 'true';
                      const filename = img.src.split('/').pop();
                      if (filename) {
                        img.src = `/images/${filename}`;
                      }
                    }
                  }}
                />
                <div className="absolute bottom-3 left-3 bg-[#0b0c0e]/90 px-3 py-1.5 rounded-lg border border-[#c5a880]/40 backdrop-blur-md">
                  <span className="text-xs uppercase text-neutral-400 mr-2">Listing Price:</span>
                  <span className="font-serif text-xl font-bold text-[#c5a880] tabular-nums">
                    {property.priceDisplay}
                  </span>
                </div>
              </div>

              {/* Location Badge */}
              <div className="flex items-center gap-2 text-xs text-neutral-300 bg-[#0b0c0e] p-3 rounded-lg border border-[#262b35]">
                <MapPin className="w-4 h-4 text-[#c5a880] shrink-0" />
                <span className="font-medium text-white">{property.location}</span>
                <span className="text-neutral-500">·</span>
                <span className="text-neutral-400">{property.city}</span>
              </div>
            </div>

            {/* Quick Specs & Direct Contact */}
            <div className="lg:col-span-5 space-y-4">
              <div className="space-y-1">
                <div className="text-xs font-semibold text-[#c5a880] uppercase tracking-wider">
                  {property.propertyType}
                </div>
                <h3 className="font-serif text-2xl font-bold text-white">
                  {property.title}
                </h3>
              </div>

              {/* Grid of Key Attributes */}
              <div className="grid grid-cols-2 gap-2 text-xs bg-[#0b0c0e] p-3.5 rounded-xl border border-[#262b35]">
                <div>
                  <span className="text-neutral-400 block">Land / Unit Size</span>
                  <strong className="text-white font-medium text-sm">{property.area}</strong>
                </div>
                <div>
                  <span className="text-neutral-400 block">Possession</span>
                  <strong className="text-white font-medium text-sm">
                    {property.possessionStatus || 'Immediate'}
                  </strong>
                </div>
                {property.bedrooms ? (
                  <div>
                    <span className="text-neutral-400 block">Bedrooms</span>
                    <strong className="text-white font-medium text-sm">{property.bedrooms} Beds</strong>
                  </div>
                ) : null}
                {property.bathrooms ? (
                  <div>
                    <span className="text-neutral-400 block">Bathrooms</span>
                    <strong className="text-white font-medium text-sm">{property.bathrooms} Baths</strong>
                  </div>
                ) : null}
                <div>
                  <span className="text-neutral-400 block">Status</span>
                  <strong className="text-emerald-400 font-medium text-sm">{property.status}</strong>
                </div>
                <div>
                  <span className="text-neutral-400 block">Starting Anchor</span>
                  <strong className="text-[#c5a880] font-medium text-sm">PKR 36 Lac+</strong>
                </div>
              </div>

              {/* Direct Advisor Buttons */}
              <div className="space-y-2 pt-2">
                <a
                  href={`https://wa.me/923148147426?text=${whatsappText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-semibold text-emerald-200 bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-800/80 transition-colors shadow-md"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp Bilal Shah (+92 314 8147426)</span>
                </a>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="tel:03339198038"
                    className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs font-medium text-neutral-200 bg-[#1a1e26] hover:bg-[#262b35] border border-[#262b35] transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#c5a880]" />
                    <span>Call Hamid Shah</span>
                  </a>
                  <a
                    href="tel:+923148147426"
                    className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs font-medium text-neutral-200 bg-[#1a1e26] hover:bg-[#262b35] border border-[#262b35] transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#c5a880]" />
                    <span>Call Bilal Shah</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Description & Features */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4 border-t border-[#262b35]">
            <div className="lg:col-span-7 space-y-4">
              <h4 className="font-serif text-lg font-bold text-white">
                Property Overview
              </h4>
              <p className="text-sm text-neutral-300 leading-relaxed">
                {property.description}
              </p>

              {/* Feature Highlights */}
              <div className="space-y-2 pt-2">
                <h5 className="text-xs uppercase tracking-wider text-[#c5a880] font-semibold">
                  Property Highlights &amp; Infrastructure
                </h5>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-300">
                  {property.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2 bg-[#0b0c0e] p-2.5 rounded-lg border border-[#262b35]">
                      <CheckCircle className="w-4 h-4 text-[#c5a880] shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Investment & Payment Estimator */}
              <div className="bg-[#0b0c0e] border border-[#262b35] rounded-xl p-4 space-y-3 mt-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#c5a880] uppercase tracking-wider">
                  <Calculator className="w-4 h-4" />
                  <span>Downpayment &amp; Equity Estimator</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-neutral-400">
                    <span>Initial Downpayment: {downpaymentPct}%</span>
                    <span className="text-white font-medium tabular-nums">
                      PKR {(downpaymentAmount / 100000).toFixed(1)} Lac
                    </span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="60"
                    step="5"
                    value={downpaymentPct}
                    onChange={(e) => setDownpaymentPct(parseInt(e.target.value, 10))}
                    className="w-full accent-[#c5a880] cursor-pointer"
                  />
                  <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-1">
                    <span>Remaining Balance: PKR {(remainingBalance / 100000).toFixed(1)} Lac</span>
                    <span>Standard Transfer Cycle: 30–60 Days</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct In-Modal Inquiry Form */}
            <div className="lg:col-span-5 bg-[#0b0c0e] border border-[#262b35] rounded-xl p-5 space-y-4">
              <div className="space-y-1">
                <h4 className="font-serif text-lg font-bold text-white">
                  Direct Inquire for This Property
                </h4>
                <p className="text-xs text-neutral-400">
                  Hamid Shah and Bilal Shah will review your contact details and follow up promptly.
                </p>
              </div>

              {submitSuccess ? (
                <div className="bg-emerald-950/40 border border-emerald-800 rounded-lg p-4 text-center space-y-2">
                  <CheckCircle className="w-6 h-6 text-emerald-400 mx-auto" />
                  <p className="text-xs font-semibold text-emerald-300">
                    Inquiry submitted successfully!
                  </p>
                  <p className="text-[11px] text-neutral-400">
                    Our advisors have received your request and will contact you directly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-3">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-neutral-400 font-medium mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Asad Khan"
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      className="w-full bg-[#13161c] border border-[#262b35] text-xs text-neutral-200 rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#c5a880]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-neutral-400 font-medium mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="03XX-XXXXXXX"
                      value={inquiryPhone}
                      onChange={(e) => setInquiryPhone(e.target.value)}
                      className="w-full bg-[#13161c] border border-[#262b35] text-xs text-neutral-200 rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#c5a880]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-neutral-400 font-medium mb-1">
                      Message or Question
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Is immediate possession available? Can we visit this week?"
                      value={inquiryMsg}
                      onChange={(e) => setInquiryMsg(e.target.value)}
                      className="w-full bg-[#13161c] border border-[#262b35] text-xs text-neutral-200 rounded-lg px-3 py-2 focus:outline-none focus:border-[#c5a880]"
                    />
                  </div>

                  {submitError && (
                    <p className="text-[11px] text-red-400">{submitError}</p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-xs font-semibold text-[#0b0c0e] bg-gradient-to-r from-[#d4af62] via-[#c5a880] to-[#b69252] hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 cursor-pointer shadow-md"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? 'Sending Request...' : 'Submit Inquiry'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
