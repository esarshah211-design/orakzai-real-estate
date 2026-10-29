import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [isTooltipDismissed, setIsTooltipDismissed] = useState(false);

  // Pre-filled WhatsApp greeting for Bilal Shah
  const whatsappUrl =
    'https://wa.me/923148147426?text=' +
    encodeURIComponent(
      'Hello Bilal Shah, I am visiting the Orakzai Real Estate website and would like to inquire about available properties in Peshawar, Nowshera, and WAPDA Town.'
    );

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2">
      {/* Floating Tooltip Pill */}
      {!isTooltipDismissed && (
        <div className="bg-[#13161c] border border-[#262b35] text-xs text-neutral-200 px-3.5 py-2 rounded-xl shadow-2xl flex items-center gap-2 max-w-xs animate-fade-in backdrop-blur-md">
          <span>Need quick plot info? Chat with <strong>Bilal Shah</strong></span>
          <button
            onClick={() => setIsTooltipDismissed(true)}
            className="text-neutral-400 hover:text-white p-0.5 rounded cursor-pointer"
            aria-label="Dismiss notice"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs sm:text-sm shadow-xl shadow-emerald-950/60 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 border border-emerald-400/40"
        aria-label="Chat on WhatsApp with Bilal Shah"
      >
        <MessageSquare className="w-5 h-5 text-white" />
        <span className="hidden sm:inline font-semibold">WhatsApp Bilal Shah</span>
      </a>
    </div>
  );
};
