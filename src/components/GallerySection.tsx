import React, { useState, useRef } from 'react';
import {
  Camera,
  Plus,
  X,
  Upload,
  MessageSquare,
  ZoomIn,
  Trash2,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Sparkles
} from 'lucide-react';
import { GalleryItem } from '../types';

interface GallerySectionProps {
  galleryItems: GalleryItem[];
  onAddPhoto: (item: {
    title: string;
    location: string;
    category: any;
    imageUrl: string;
  }) => Promise<boolean>;
  onDeletePhoto: (id: string) => Promise<boolean>;
}

export const GallerySection: React.FC<GallerySectionProps> = ({
  galleryItems,
  onAddPhoto,
  onDeletePhoto
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeLightbox, setActiveLightbox] = useState<GalleryItem | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Upload Form State
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadLocation, setUploadLocation] = useState('WAPDA Town, Peshawar');
  const [uploadCategory, setUploadCategory] = useState<GalleryItem['category']>('Site Photos');
  const [uploadImageUrl, setUploadImageUrl] = useState('');
  const [previewDataUrl, setPreviewDataUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = [
    'All',
    'Houses & Villas',
    'Residential Plots',
    'Commercial & Investment',
    'Advisory Lounge',
    'Site Photos'
  ];

  const filteredItems = galleryItems.filter((item) => {
    if (selectedCategory === 'All') return true;
    return item.category === selectedCategory;
  });

  const realPhotosCount = galleryItems.filter((i) => !i.isDemo).length;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file (JPEG, PNG, WebP).');
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      setUploadError('File size must be under 15MB.');
      return;
    }

    setUploadError('');
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPreviewDataUrl(result);
      setUploadImageUrl(result);
    };
    reader.readAsDataURL(file);
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalUrl = previewDataUrl || uploadImageUrl.trim();

    if (!finalUrl) {
      setUploadError('Please choose a photo from your device or paste an image URL.');
      return;
    }

    setIsSubmitting(true);
    setUploadError('');

    try {
      const ok = await onAddPhoto({
        title: uploadTitle.trim() || 'Verified Property Site Photo',
        location: uploadLocation.trim() || 'Peshawar / WAPDA Town',
        category: uploadCategory,
        imageUrl: finalUrl
      });

      if (ok) {
        setUploadSuccess(true);
        setTimeout(() => {
          setUploadSuccess(false);
          setIsUploadModalOpen(false);
          setUploadTitle('');
          setUploadImageUrl('');
          setPreviewDataUrl(null);
        }, 1500);
      } else {
        setUploadError('Could not save photo. Please try a smaller file or image URL.');
      }
    } catch {
      setUploadError('An error occurred during upload. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="gallery" className="py-24 bg-[#0d0f12] border-t border-[#262b35] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="text-xs uppercase tracking-[0.25em] text-[#c5a880] font-semibold flex items-center gap-2">
              <Camera className="w-4 h-4 text-[#c5a880]" />
              <span>Property Showcase Gallery</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Visual Architecture &amp; Sites
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 max-w-xl">
              High-resolution imagery of residential communities, modern houses, and commercial opportunities in Peshawar, Nowshera, and WAPDA Town.
            </p>
          </div>

          {/* Easy-to-use "Add Real Property Photos" Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setUploadError('');
                setUploadSuccess(false);
                setIsUploadModalOpen(true);
              }}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-xs font-semibold text-[#0b0c0e] bg-gradient-to-r from-[#d4af62] via-[#c5a880] to-[#b69252] hover:brightness-110 active:scale-95 transition-all shadow-md cursor-pointer whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              <span>Add Real Property Photos</span>
            </button>
          </div>
        </div>

        {/* Gallery Status Note */}
        <div className="mb-8 p-4 bg-[#13161c] border border-[#262b35] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#c5a880] shrink-0" />
            <span>
              {realPhotosCount > 0 ? (
                <>
                  Showing <strong className="text-emerald-400 font-semibold">{realPhotosCount} verified real site photos</strong> alongside curated property visuals.
                </>
              ) : (
                <>
                  Showing our <strong className="text-white font-medium">curated architectural property portfolio</strong>. You can upload your own real photos anytime with the button above.
                </>
              )}
            </span>
          </div>
          <div className="text-neutral-400">
            Total Photos: <span className="font-mono text-white font-medium">{galleryItems.length}</span>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-[#13161c] border border-[#262b35] rounded-xl mb-8 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#c5a880] text-[#0b0c0e] font-semibold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Photo Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const whatsappText = encodeURIComponent(
              `Hello Bilal Shah, I am inquiring about the property shown in your gallery: "${item.title}" (${item.location}). Could you please share more details or schedule a site visit?`
            );

            return (
              <div
                key={item.id}
                className="group relative bg-[#13161c] border border-[#262b35] rounded-xl overflow-hidden hover:border-[#c5a880]/60 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-black/60 flex flex-col justify-between"
              >
                {/* Image Container */}
                <div
                  className="relative aspect-[4/3] w-full overflow-hidden bg-[#1a1e26] cursor-pointer"
                  onClick={() => setActiveLightbox(item)}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    onError={(e) => {
                      const img = e.currentTarget;
                      if (!img.dataset.fallbackTried && img.src.includes('/src/assets/images/')) {
                        img.dataset.fallbackTried = 'true';
                        const filename = img.src.split('/').pop();
                        if (filename) img.src = `/images/${filename}`;
                      }
                    }}
                  />

                  {/* Overlay Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#13161c] via-transparent to-transparent opacity-75" />

                  {/* Badge: Curated Showcase vs Verified Real Photo */}
                  <div className="absolute top-3 left-3">
                    {item.isDemo ? (
                      <span className="bg-[#0b0c0e]/90 border border-neutral-700 text-neutral-300 text-[10px] uppercase tracking-wider font-medium px-2 py-0.5 rounded backdrop-blur-md">
                        Curated Showcase
                      </span>
                    ) : (
                      <span className="bg-emerald-950/90 border border-emerald-700 text-emerald-300 text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded backdrop-blur-md flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        Verified Real Photo
                      </span>
                    )}
                  </div>

                  {/* Zoom Icon on hover */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-[#0b0c0e]/90 text-white p-1.5 rounded-lg border border-neutral-700 backdrop-blur-md">
                    <ZoomIn className="w-4 h-4 text-[#c5a880]" />
                  </div>

                  {/* Category Pill */}
                  <div className="absolute bottom-3 right-3 text-[11px] text-neutral-300 bg-[#0b0c0e]/80 px-2 py-1 rounded border border-neutral-800 backdrop-blur-md">
                    {item.category}
                  </div>
                </div>

                {/* Card Meta Content */}
                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3
                      onClick={() => setActiveLightbox(item)}
                      className="font-serif text-base font-semibold text-white group-hover:text-[#c5a880] transition-colors line-clamp-1 cursor-pointer"
                    >
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-neutral-400 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-[#c5a880] shrink-0" />
                      <span className="truncate">{item.location}</span>
                    </div>
                  </div>

                  {/* Action row: WhatsApp Inquiry + Delete if real photo */}
                  <div className="pt-2 border-t border-[#262b35] flex items-center justify-between gap-2">
                    <a
                      href={`https://wa.me/923148147426?text=${whatsappText}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Inquire on WhatsApp</span>
                    </a>

                    {!item.isDemo && (
                      <button
                        onClick={() => onDeletePhoto(item.id)}
                        className="text-neutral-500 hover:text-red-400 p-1 rounded transition-colors cursor-pointer"
                        title="Remove uploaded photo"
                        aria-label="Remove photo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeLightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative max-w-4xl w-full bg-[#13161c] border border-[#262b35] rounded-2xl overflow-hidden shadow-2xl flex flex-col">
            <div className="flex items-center justify-between px-5 py-3 border-b border-[#262b35] bg-[#0d0f12]">
              <div className="flex items-center gap-2">
                <span className="font-serif text-base font-semibold text-white">
                  {activeLightbox.title}
                </span>
                {activeLightbox.isDemo ? (
                  <span className="text-[10px] text-neutral-400 bg-neutral-800 px-2 py-0.5 rounded">
                    Curated Showcase
                  </span>
                ) : (
                  <span className="text-[10px] text-emerald-300 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded">
                    Verified Real Photo
                  </span>
                )}
              </div>
              <button
                onClick={() => setActiveLightbox(null)}
                className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-[#262b35] cursor-pointer"
                aria-label="Close photo preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative max-h-[70vh] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={activeLightbox.imageUrl}
                alt={activeLightbox.title}
                className="max-h-[70vh] w-auto object-contain mx-auto"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="p-4 bg-[#0d0f12] border-t border-[#262b35] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-neutral-300">
                <MapPin className="w-4 h-4 text-[#c5a880]" />
                <span>{activeLightbox.location}</span>
                <span className="text-neutral-500">·</span>
                <span className="text-neutral-400">{activeLightbox.category}</span>
              </div>

              <a
                href={`https://wa.me/923148147426?text=${encodeURIComponent(
                  `Hello Bilal Shah, I am inquiring about the property photo "${activeLightbox.title}" in ${activeLightbox.location}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-800 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                <span>Inquire About This Property (WhatsApp)</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Upload Real Property Photo Modal */}
      {isUploadModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative max-w-lg w-full bg-[#13161c] border border-[#262b35] rounded-2xl overflow-hidden shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-[#262b35] pb-3">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-[#c5a880]" />
                <h3 className="font-serif text-lg font-bold text-white">
                  Add Real Property Photo
                </h3>
              </div>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="text-neutral-400 hover:text-white p-1 rounded cursor-pointer"
                aria-label="Close upload dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {uploadSuccess ? (
              <div className="p-6 text-center space-y-2 bg-emerald-950/40 border border-emerald-800 rounded-xl">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 className="font-serif text-base font-bold text-white">
                  Photo Added Successfully!
                </h4>
                <p className="text-xs text-neutral-300">
                  Your genuine property photo is now live in the showcase gallery.
                </p>
              </div>
            ) : (
              <form onSubmit={handleUploadSubmit} className="space-y-4">
                {/* File picker drop area */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-300 font-medium mb-1.5">
                    Select Image File From Your Device
                  </label>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-[#262b35] hover:border-[#c5a880] rounded-xl p-6 text-center cursor-pointer transition-colors bg-[#0b0c0e]/60"
                  >
                    {previewDataUrl ? (
                      <div className="space-y-2">
                        <img
                          src={previewDataUrl}
                          alt="Upload preview"
                          className="max-h-36 mx-auto rounded-lg object-cover"
                        />
                        <span className="text-xs text-[#c5a880] block font-medium">
                          Click to choose a different photo
                        </span>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Upload className="w-8 h-8 text-[#c5a880] mx-auto" />
                        <span className="text-xs text-white block font-medium">
                          Click to select a photo from your computer or phone
                        </span>
                        <span className="text-[11px] text-neutral-400 block">
                          PNG, JPG, WebP up to 15MB
                        </span>
                      </div>
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>

                {/* Alternative: Image URL */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 font-medium mb-1">
                    Or Paste Image URL (Optional)
                  </label>
                  <input
                    type="url"
                    placeholder="https://example.com/property-photo.jpg"
                    value={uploadImageUrl}
                    onChange={(e) => {
                      setUploadImageUrl(e.target.value);
                      if (e.target.value) setPreviewDataUrl(null);
                    }}
                    className="w-full bg-[#0b0c0e] border border-[#262b35] text-xs text-white rounded-lg px-3 py-2 focus:outline-none focus:border-[#c5a880]"
                  />
                </div>

                {/* Title */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-300 font-medium mb-1">
                    Photo Title / Property Description *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 5 Marla Corner Plot Ground View Sector B"
                    value={uploadTitle}
                    onChange={(e) => setUploadTitle(e.target.value)}
                    className="w-full bg-[#0b0c0e] border border-[#262b35] text-xs text-white rounded-lg px-3 py-2 focus:outline-none focus:border-[#c5a880]"
                  />
                </div>

                {/* Location & Category */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-neutral-300 font-medium mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. WAPDA Town, Peshawar"
                      value={uploadLocation}
                      onChange={(e) => setUploadLocation(e.target.value)}
                      className="w-full bg-[#0b0c0e] border border-[#262b35] text-xs text-white rounded-lg px-3 py-2 focus:outline-none focus:border-[#c5a880]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-neutral-300 font-medium mb-1">
                      Category
                    </label>
                    <select
                      value={uploadCategory}
                      onChange={(e) => setUploadCategory(e.target.value as any)}
                      className="w-full bg-[#0b0c0e] border border-[#262b35] text-xs text-white rounded-lg px-3 py-2 focus:outline-none focus:border-[#c5a880]"
                    >
                      <option value="Residential Plots">Residential Plots</option>
                      <option value="Houses & Villas">Houses &amp; Villas</option>
                      <option value="Commercial & Investment">Commercial &amp; Investment</option>
                      <option value="Site Photos">Verified Site Photos</option>
                      <option value="Advisory Lounge">Advisory Lounge</option>
                    </select>
                  </div>
                </div>

                {uploadError && (
                  <div className="p-3 bg-red-950/40 border border-red-800 rounded-lg flex items-center gap-2 text-xs text-red-300">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                    <span>{uploadError}</span>
                  </div>
                )}

                <div className="flex justify-end gap-2 pt-2 border-t border-[#262b35]">
                  <button
                    type="button"
                    onClick={() => setIsUploadModalOpen(false)}
                    className="px-4 py-2 text-xs text-neutral-300 hover:text-white rounded-lg hover:bg-[#1a1e26] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-[#0b0c0e] bg-gradient-to-r from-[#d4af62] via-[#c5a880] to-[#b69252] rounded-lg hover:brightness-110 active:scale-95 disabled:opacity-50 transition-all cursor-pointer shadow-md"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? 'Uploading...' : 'Publish to Gallery'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
