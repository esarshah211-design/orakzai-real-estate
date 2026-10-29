import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, MessageSquare } from 'lucide-react';
import { PropertyType } from '../types';

interface InquiryFormProps {
  onSubmitSuccess?: () => void;
  onPostInquiry: (data: {
    fullName: string;
    phone: string;
    propertyType: any;
    budget: string;
    preferredLocation: string;
    message: string;
  }) => Promise<boolean>;
}

export const InquiryForm: React.FC<InquiryFormProps> = ({ onSubmitSuccess, onPostInquiry }) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [propertyType, setPropertyType] = useState<PropertyType | 'General Inquiry'>('Residential Plot');
  const [budget, setBudget] = useState('PKR 36–50 Lac');
  const [preferredLocation, setPreferredLocation] = useState('WAPDA Town');
  const [message, setMessage] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg(null);

    // Validation
    if (!fullName.trim() || !phone.trim()) {
      setStatusMsg({
        type: 'error',
        text: 'Please provide both your Full Name and a valid Phone Number.'
      });
      return;
    }

    if (phone.trim().length < 8) {
      setStatusMsg({
        type: 'error',
        text: 'Please provide a valid Pakistani contact number (e.g. 0333-1234567).'
      });
      return;
    }

    setIsLoading(true);

    try {
      const ok = await onPostInquiry({
        fullName: fullName.trim(),
        phone: phone.trim(),
        propertyType,
        budget,
        preferredLocation,
        message: message.trim()
      });

      if (ok) {
        setStatusMsg({
          type: 'success',
          text: 'Thank you. Your inquiry has been registered in our system. Hamid Shah and Bilal Shah have been notified.'
        });
        setFullName('');
        setPhone('');
        setMessage('');
        if (onSubmitSuccess) onSubmitSuccess();
      } else {
        setStatusMsg({
          type: 'error',
          text: 'There was a temporary issue saving your request. Please message our advisors directly on WhatsApp.'
        });
      }
    } catch (err) {
      setStatusMsg({
        type: 'error',
        text: 'Network communication error. Please use WhatsApp or call 03339198038.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleWhatsAppForward = () => {
    const text = encodeURIComponent(
      `Hello Bilal Shah, I am submitting a property inquiry:\n\nName: ${fullName || 'Interested Client'}\nPhone: ${phone || 'Not provided'}\nProperty Interest: ${propertyType}\nBudget: ${budget}\nPreferred Location: ${preferredLocation}\nNote: ${message || 'Please send available options.'}`
    );
    window.open(`https://wa.me/923148147426?text=${text}`, '_blank');
  };

  return (
    <section id="contact-form" className="py-20 bg-[#0d0f12] border-t border-[#262b35]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#13161c] border border-[#262b35] rounded-2xl p-6 sm:p-10 shadow-2xl relative">
          {/* Header */}
          <div className="text-center max-w-xl mx-auto space-y-2 mb-8">
            <div className="text-xs uppercase tracking-[0.25em] text-[#c5a880] font-semibold">
              Property Consultation Form
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Send Your Inquiry
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400">
              Submit your property requirements below. Our team handles your inquiry with utmost confidentiality and attention to detail.
            </p>
          </div>

          {/* Feedback Alert */}
          {statusMsg && (
            <div
              className={`mb-6 p-4 rounded-xl border flex items-start gap-3 ${
                statusMsg.type === 'success'
                  ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300'
                  : 'bg-red-950/40 border-red-800 text-red-300'
              }`}
            >
              {statusMsg.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 shrink-0 text-red-400 mt-0.5" />
              )}
              <div className="text-xs sm:text-sm leading-relaxed">{statusMsg.text}</div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-neutral-300 font-medium">
                  Full Name <span className="text-[#c5a880]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tariq Mehmood"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-[#0b0c0e] border border-[#262b35] text-sm text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#c5a880] transition-colors"
                />
              </div>

              {/* Phone Number */}
              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-neutral-300 font-medium">
                  Phone Number (Call / WhatsApp) <span className="text-[#c5a880]">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="0333-1234567 or +92 314 8147426"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#0b0c0e] border border-[#262b35] text-sm text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#c5a880] transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {/* Interested Property Type */}
              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-neutral-300 font-medium">
                  Property Category
                </label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value as any)}
                  className="w-full bg-[#0b0c0e] border border-[#262b35] text-sm text-neutral-200 rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#c5a880] cursor-pointer"
                >
                  <option value="Residential Plot">Residential Plot (5, 7, 10 Marla, 1 Kanal)</option>
                  <option value="House">Modern House / Luxury Villa</option>
                  <option value="Investment Property">Commercial / Investment Plaza</option>
                  <option value="General Inquiry">General Property Inquiry</option>
                </select>
              </div>

              {/* Budget */}
              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-neutral-300 font-medium">
                  Planned Budget
                </label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full bg-[#0b0c0e] border border-[#262b35] text-sm text-neutral-200 rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#c5a880] cursor-pointer"
                >
                  <option value="PKR 36–50 Lac">PKR 36–50 Lac</option>
                  <option value="PKR 50–80 Lac">PKR 50–80 Lac</option>
                  <option value="PKR 80 Lac – 1.5 Crore">PKR 80 Lac – 1.5 Crore</option>
                  <option value="PKR 1.5 – 3 Crore">PKR 1.5 – 3 Crore</option>
                  <option value="PKR 3 Crore+">PKR 3 Crore+</option>
                </select>
              </div>

              {/* Location */}
              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-neutral-300 font-medium">
                  Preferred Location
                </label>
                <select
                  value={preferredLocation}
                  onChange={(e) => setPreferredLocation(e.target.value)}
                  className="w-full bg-[#0b0c0e] border border-[#262b35] text-sm text-neutral-200 rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#c5a880] cursor-pointer"
                >
                  <option value="WAPDA Town">WAPDA Town (Peshawar)</option>
                  <option value="Peshawar">Peshawar (City / Ring Road)</option>
                  <option value="Nowshera">Nowshera Corridor</option>
                  <option value="Any / Flexible">Open to Recommendations</option>
                </select>
              </div>
            </div>

            {/* Message */}
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-neutral-300 font-medium">
                Message / Particular Requirements
              </label>
              <textarea
                rows={3}
                placeholder="Share any preferred sector, road width, corner plot requirements, or preferred timeline for purchase..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-[#0b0c0e] border border-[#262b35] text-sm text-neutral-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#c5a880] transition-colors"
              />
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-neutral-400">
                Direct phone assistance: <span className="text-white font-mono">03339198038</span> (Hamid Shah) · <span className="text-white font-mono">+92 314 8147426</span> (Bilal Shah)
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleWhatsAppForward}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-xs font-semibold text-emerald-400 border border-emerald-900/60 bg-emerald-950/30 hover:bg-emerald-900/40 transition-colors cursor-pointer w-full sm:w-auto"
                  title="Forward directly into WhatsApp chat"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Send via WhatsApp</span>
                </button>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-xs font-semibold text-[#0b0c0e] bg-gradient-to-r from-[#d4af62] via-[#c5a880] to-[#b69252] hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 cursor-pointer shadow-lg shadow-[#c5a880]/15 w-full sm:w-auto whitespace-nowrap"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isLoading ? 'Submitting...' : 'Submit Inquiry'}</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
