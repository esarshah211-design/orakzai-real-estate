/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PropertiesSection } from './components/PropertiesSection';
import { GallerySection } from './components/GallerySection';
import { PropertyModal } from './components/PropertyModal';
import { AboutSection } from './components/AboutSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ContactSection } from './components/ContactSection';
import { InquiryForm } from './components/InquiryForm';
import { LocationSection } from './components/LocationSection';
import { AdminModal } from './components/AdminModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';
import { INITIAL_PROPERTIES, INITIAL_GALLERY_ITEMS } from './data/initialProperties';
import { Property, CustomerInquiry, PropertyCity, PropertyType, GalleryItem } from './types';

export default function App() {
  const [properties, setProperties] = useState<Property[]>(INITIAL_PROPERTIES);
  const [inquiries, setInquiries] = useState<CustomerInquiry[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(INITIAL_GALLERY_ITEMS);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  // Quick filters passed from Hero
  const [heroCityFilter, setHeroCityFilter] = useState<PropertyCity | undefined>(undefined);
  const [heroTypeFilter, setHeroTypeFilter] = useState<PropertyType | undefined>(undefined);
  const [heroMaxPriceFilter, setHeroMaxPriceFilter] = useState<number | undefined>(undefined);

  // Admin Modal state
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Load properties and inquiries from backend API on mount
  useEffect(() => {
    fetchProperties();
    fetchInquiries();
    fetchGallery();
  }, []);

  const fetchProperties = async () => {
    try {
      const res = await fetch('/api/properties');
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setProperties(json.data);
        }
      }
    } catch {
      // Offline fallback: keep INITIAL_PROPERTIES
    }
  };

  const fetchInquiries = async () => {
    try {
      const res = await fetch('/api/inquiries');
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setInquiries(json.data);
        }
      }
    } catch {
      // Inquiries loaded from state
    }
  };

  const fetchGallery = async () => {
    try {
      const res = await fetch('/api/gallery');
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setGalleryItems(json.data);
        }
      }
    } catch {
      // Offline fallback: keep INITIAL_GALLERY_ITEMS
    }
  };

  const handleAddGalleryPhoto = async (item: {
    title: string;
    location: string;
    category: any;
    imageUrl: string;
  }): Promise<boolean> => {
    try {
      const res = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setGalleryItems((prev) => [json.data, ...prev]);
          return true;
        }
      }
    } catch {
      // fallback
    }
    const localItem: GalleryItem = {
      id: `gal-local-${Date.now()}`,
      title: item.title,
      location: item.location,
      category: item.category,
      imageUrl: item.imageUrl,
      isDemo: false,
      uploadedAt: new Date().toISOString()
    };
    setGalleryItems((prev) => [localItem, ...prev]);
    return true;
  };

  const handleDeleteGalleryPhoto = async (id: string): Promise<boolean> => {
    try {
      await fetch(`/api/gallery/${id}`, { method: 'DELETE' });
    } catch {
      // fallback
    }
    setGalleryItems((prev) => prev.filter((i) => i.id !== id));
    return true;
  };

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleQuickFilter = (filters: { city?: PropertyCity; type?: PropertyType; maxPrice?: number }) => {
    setHeroCityFilter(filters.city);
    setHeroTypeFilter(filters.type);
    setHeroMaxPriceFilter(filters.maxPrice);
  };

  // Submit Inquiry handler (used by both general form and in-modal form)
  const handlePostInquiry = async (data: {
    fullName: string;
    phone: string;
    propertyType: any;
    budget: string;
    preferredLocation: string;
    message: string;
    propertyId?: string;
    propertyTitle?: string;
  }): Promise<boolean> => {
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setInquiries((prev) => [json.data, ...prev]);
          return true;
        }
      }
      // Optimistic client fallback
      const fallbackInq: CustomerInquiry = {
        id: `inq-local-${Date.now()}`,
        fullName: data.fullName,
        phone: data.phone,
        propertyType: data.propertyType,
        budget: data.budget,
        preferredLocation: data.preferredLocation,
        message: data.message,
        propertyId: data.propertyId,
        propertyTitle: data.propertyTitle,
        status: 'Pending',
        createdAt: new Date().toISOString()
      };
      setInquiries((prev) => [fallbackInq, ...prev]);
      return true;
    } catch {
      return false;
    }
  };

  // Admin login handler
  const handleAdminLogin = async (password: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      if (res.ok) {
        setIsAdminLoggedIn(true);
        return true;
      }
    } catch {
      // Fallback local check
      if (password === 'orakzai2026' || password === 'orakzai') {
        setIsAdminLoggedIn(true);
        return true;
      }
    }
    return false;
  };

  // Admin save property (add or update)
  const handleSaveProperty = async (propData: Partial<Property> & { id?: string }): Promise<boolean> => {
    try {
      const isUpdate = !!propData.id;
      const url = isUpdate ? `/api/properties/${propData.id}` : '/api/properties';
      const method = isUpdate ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(propData)
      });

      if (res.ok) {
        await fetchProperties();
        return true;
      }
    } catch {
      // local fallback update
    }

    if (propData.id) {
      setProperties((prev) =>
        prev.map((p) => (p.id === propData.id ? ({ ...p, ...propData } as Property) : p))
      );
    } else {
      const newP: Property = {
        ...(propData as any),
        id: `orakzai-local-${Date.now()}`,
        createdAt: new Date().toISOString()
      };
      setProperties((prev) => [newP, ...prev]);
    }
    return true;
  };

  // Admin delete property
  const handleDeleteProperty = async (id: string): Promise<boolean> => {
    try {
      await fetch(`/api/properties/${id}`, { method: 'DELETE' });
    } catch {
      // fallback
    }
    setProperties((prev) => prev.filter((p) => p.id !== id));
    return true;
  };

  // Admin update inquiry status
  const handleUpdateInquiryStatus = async (
    id: string,
    status: 'Pending' | 'Contacted' | 'Closed'
  ): Promise<boolean> => {
    try {
      await fetch(`/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
    } catch {
      // fallback
    }
    setInquiries((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));
    return true;
  };

  return (
    <div className="min-h-screen bg-[#0b0c0e] text-[#f4f4f5] font-sans selection:bg-[#c5a880] selection:text-[#0b0c0e]">
      {/* 1. Sticky Navigation Bar */}
      <Navbar
        onOpenAdmin={() => setIsAdminOpen(true)}
        isAdminLoggedIn={isAdminLoggedIn}
        onNavigate={handleNavigate}
      />

      {/* 2. Homepage Hero Section */}
      <Hero
        onExploreClick={() => handleNavigate('properties')}
        onContactClick={() => handleNavigate('contact')}
        onQuickFilter={handleQuickFilter}
      />

      {/* 3. Featured Properties Section */}
      <PropertiesSection
        properties={properties}
        onViewDetails={(prop) => setSelectedProperty(prop)}
        onOpenInquiryForGeneral={() => handleNavigate('contact-form')}
        activeCityFilter={heroCityFilter}
        activeTypeFilter={heroTypeFilter}
        maxPriceFilter={heroMaxPriceFilter}
      />

      {/* 4. Property Photo Gallery (Showcase of Images + Easy Real Photo Upload) */}
      <GallerySection
        galleryItems={galleryItems}
        onAddPhoto={handleAddGalleryPhoto}
        onDeletePhoto={handleDeleteGalleryPhoto}
      />

      {/* 5. About Orakzai Real Estate */}
      <AboutSection onContactClick={() => handleNavigate('contact')} />

      {/* 5. Why Choose Us */}
      <WhyChooseUs />

      {/* 6. Contact Section (Hamid Shah & Bilal Shah Cards) */}
      <ContactSection />

      {/* 7. Working Contact & Inquiry Form */}
      <InquiryForm onPostInquiry={handlePostInquiry} />

      {/* 8. Service Area & Maps (Peshawar | Nowshera | WAPDA Town) */}
      <LocationSection />

      {/* 9. Professional Footer */}
      <Footer
        onOpenAdmin={() => setIsAdminOpen(true)}
        onNavigate={handleNavigate}
      />

      {/* 10. Floating WhatsApp Button (Bilal Shah) */}
      <FloatingWhatsApp />

      {/* 11. Property Detailed Dossier Modal */}
      <PropertyModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
        onSubmitInquiry={handlePostInquiry}
      />

      {/* 12. Secure Admin Management Dashboard */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        properties={properties}
        inquiries={inquiries}
        isLoggedIn={isAdminLoggedIn}
        onLogin={handleAdminLogin}
        onLogout={() => setIsAdminLoggedIn(false)}
        onSaveProperty={handleSaveProperty}
        onDeleteProperty={handleDeleteProperty}
        onUpdateInquiryStatus={handleUpdateInquiryStatus}
      />
    </div>
  );
}
