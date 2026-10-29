export type PropertyType = 'Residential Plot' | 'House' | 'Investment Property';
export type PropertyCity = 'Peshawar' | 'Nowshera' | 'WAPDA Town';
export type PropertyStatus = 'Available' | 'Reserved' | 'Under Offer';

export interface Property {
  id: string;
  title: string;
  location: string;
  city: PropertyCity;
  propertyType: PropertyType;
  priceInLac: number;
  priceDisplay: string;
  area: string; // e.g. "5 Marla", "10 Marla", "1 Kanal"
  isDemoListing: boolean; // Must be true for demo listings
  status: PropertyStatus;
  imageUrl: string;
  gallery?: string[];
  features: string[];
  description: string;
  bedrooms?: number;
  bathrooms?: number;
  featured?: boolean;
  possessionStatus?: 'Immediate Possession' | 'Under Development' | 'Ready for Construction';
  sector?: string;
  createdAt: string;
}

export interface CustomerInquiry {
  id: string;
  fullName: string;
  phone: string;
  propertyType: PropertyType | 'General Inquiry';
  budget: string;
  preferredLocation: string;
  message: string;
  propertyId?: string;
  propertyTitle?: string;
  status: 'Pending' | 'Contacted' | 'Closed';
  createdAt: string;
}

export interface AdminStats {
  totalProperties: number;
  availableProperties: number;
  totalInquiries: number;
  pendingInquiries: number;
  startingPriceLac: number;
}
