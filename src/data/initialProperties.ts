import { Property } from '../types';

export const INITIAL_PROPERTIES: Property[] = [
  {
    id: 'orakzai-01',
    title: '5 Marla Prime Residential Plot',
    location: 'Sector B, WAPDA Town, Peshawar',
    city: 'WAPDA Town',
    propertyType: 'Residential Plot',
    priceInLac: 36.5,
    priceDisplay: 'PKR 36.5 Lac',
    area: '5 Marla',
    isDemoListing: true,
    status: 'Available',
    imageUrl: '/src/assets/images/prop_residential_plot_1793257685483.jpg',
    features: [
      'Immediate Possession',
      '40-Foot Wide Paved Road',
      'Underground Electricity & Gas',
      'Near Park & Grand Mosque',
      'Clear Registry & Direct Transfer'
    ],
    description: 'An exceptional entry opportunity situated in the heart of WAPDA Town Peshawar. Ideal for immediate home construction or short-to-medium term capital growth. Clear legal documentation and ready for immediate transfer.',
    possessionStatus: 'Immediate Possession',
    sector: 'Sector B',
    featured: true,
    createdAt: '2026-10-20T10:00:00.000Z'
  },
  {
    id: 'orakzai-02',
    title: '10 Marla Luxury Modern Designer Villa',
    location: 'Executive Enclave, WAPDA Town, Peshawar',
    city: 'WAPDA Town',
    propertyType: 'House',
    priceInLac: 285,
    priceDisplay: 'PKR 2.85 Crore',
    area: '10 Marla',
    isDemoListing: true,
    status: 'Available',
    imageUrl: '/src/assets/images/prop_luxury_villa_1793257684935.jpg',
    features: [
      '5 En-suite Master Bedrooms',
      'Italian Imported Tile Flooring',
      'Custom Oak & Champagne Bronze Kitchen',
      '2 Car Covered Garage',
      'Solar Backup System & Smart Lighting'
    ],
    description: 'Architecturally striking contemporary residence featuring double-height ceiling volumes, expansive architectural thermal glass, imported porcelain finishes, and a private landscaped rear terrace.',
    bedrooms: 5,
    bathrooms: 6,
    possessionStatus: 'Ready for Construction',
    sector: 'Executive Enclave',
    featured: true,
    createdAt: '2026-10-22T14:30:00.000Z'
  },
  {
    id: 'orakzai-03',
    title: '7 Marla Corner Residential Plot',
    location: 'GT Road Corridor, Nowshera',
    city: 'Nowshera',
    propertyType: 'Residential Plot',
    priceInLac: 37.0,
    priceDisplay: 'PKR 37.0 Lac',
    area: '7 Marla',
    isDemoListing: true,
    status: 'Available',
    imageUrl: '/src/assets/images/prop_residential_plot_1793257685483.jpg',
    features: [
      'Corner Plot Advantage',
      'Direct Access from Main GT Road',
      'High Ground Water Table',
      'Commercial Utility Nearby',
      'Rapidly Appreciating Sector'
    ],
    description: 'A prized corner plot offering dual frontages, superb ventilation, and high elevation. Situated within a peaceful, gated perimeter along the Nowshera corridor with straightforward connectivity to Peshawar.',
    possessionStatus: 'Immediate Possession',
    sector: 'GT Road Enclave',
    featured: true,
    createdAt: '2026-10-23T09:15:00.000Z'
  },
  {
    id: 'orakzai-04',
    title: 'Prime Boulevard Commercial Investment Plot',
    location: 'Main Commercial Avenue, Peshawar',
    city: 'Peshawar',
    propertyType: 'Investment Property',
    priceInLac: 160,
    priceDisplay: 'PKR 1.60 Crore',
    area: '4 Marla Commercial',
    isDemoListing: true,
    status: 'Available',
    imageUrl: '/src/assets/images/prop_commercial_investment_1793257686707.jpg',
    features: [
      'Basement + Ground + 4 Floors Approved',
      'High Footfall Commercial Boulevard',
      'Dedicated Customer Parking Bays',
      'Projected 9.5% Annual Rental Yield',
      'Direct Title with Full NOC'
    ],
    description: 'A high-yielding commercial asset with approved multi-storey architectural permissions. Positioned along one of Peshawar’s busiest commercial growth corridors, making it ideal for retail brands, corporate suites, or pharmacy chains.',
    possessionStatus: 'Ready for Construction',
    sector: 'Central Commercial Avenue',
    featured: true,
    createdAt: '2026-10-24T11:45:00.000Z'
  },
  {
    id: 'orakzai-05',
    title: '1 Kanal Executive Estate Plot',
    location: 'Block A, WAPDA Town, Peshawar',
    city: 'WAPDA Town',
    propertyType: 'Residential Plot',
    priceInLac: 145,
    priceDisplay: 'PKR 1.45 Crore',
    area: '1 Kanal (20 Marla)',
    isDemoListing: true,
    status: 'Available',
    imageUrl: '/src/assets/images/prop_residential_plot_1793257685483.jpg',
    features: [
      'Prime North-Facing Orientation',
      '50-Foot Main Boulevard Frontage',
      'Walking Distance to Elite School & Club',
      'Underground Fiber Optic & Utilities',
      'Verified Registry Documents'
    ],
    description: 'A generous 1 Kanal estate plot tailored for a landmark custom luxury residence. Situated in Block A of WAPDA Town with peaceful streetscapes and established green tree lines.',
    possessionStatus: 'Immediate Possession',
    sector: 'Block A',
    featured: false,
    createdAt: '2026-10-25T16:20:00.000Z'
  },
  {
    id: 'orakzai-06',
    title: '5 Marla Contemporary Double-Storey House',
    location: 'Shaheen Enclave, Nowshera',
    city: 'Nowshera',
    propertyType: 'House',
    priceInLac: 115,
    priceDisplay: 'PKR 1.15 Crore',
    area: '5 Marla',
    isDemoListing: true,
    status: 'Under Offer',
    imageUrl: '/src/assets/images/hero_luxury_villa_1793257684730.jpg',
    features: [
      '3 Spacious Bed Rooms with Wardrobes',
      'Modern Open-Concept Kitchen',
      'Rooftop Terrace with Mountain Views',
      'Solid Ash Wood Doors & Aluminum Windows',
      'Sui Gas Meter Installed'
    ],
    description: 'Elegantly proportioned 5-marla residential home with clean geometric lines, excellent natural light, and premium fixtures throughout. Located in a family-oriented neighborhood of Nowshera.',
    bedrooms: 3,
    bathrooms: 4,
    possessionStatus: 'Immediate Possession',
    sector: 'Shaheen Enclave',
    featured: false,
    createdAt: '2026-10-26T12:00:00.000Z'
  }
];

export const BUSINESS_INFO = {
  name: 'Orakzai Real Estate',
  tagline: 'Your Property. Your Future. Our Commitment.',
  startingPrice: 'PKR 36–37 Lac',
  primaryLocations: ['Peshawar', 'Nowshera', 'WAPDA Town'],
  locationDisplay: 'Peshawar | Nowshera | WAPDA Town',
  team: [
    {
      name: 'Hamid Shah',
      role: 'Senior Property Advisor',
      phone: '03339198038',
      telHref: 'tel:03339198038',
      whatsappUrl: 'https://wa.me/923339198038',
      whatsappNumber: '+92 333 9198038'
    },
    {
      name: 'Bilal Shah',
      role: 'Client Relations & Investment Consultant',
      phone: '+92 314 8147426',
      telHref: 'tel:+923148147426',
      whatsappUrl: 'https://wa.me/923148147426',
      whatsappNumber: '+92 314 8147426'
    }
  ]
};

export const INITIAL_GALLERY_ITEMS = [
  {
    id: 'gal-01',
    title: 'Modern Contemporary Luxury Residence at Dusk',
    location: 'WAPDA Town / Nowshera Corridor',
    category: 'Houses & Villas' as const,
    imageUrl: '/src/assets/images/hero_luxury_villa_1793257684730.jpg',
    isDemo: true,
    uploadedAt: '2026-10-20T10:00:00.000Z'
  },
  {
    id: 'gal-02',
    title: '10 Marla Luxury Modern Designer Villa',
    location: 'Executive Enclave, WAPDA Town, Peshawar',
    category: 'Houses & Villas' as const,
    imageUrl: '/src/assets/images/prop_luxury_villa_1793257684935.jpg',
    isDemo: true,
    uploadedAt: '2026-10-22T14:30:00.000Z'
  },
  {
    id: 'gal-03',
    title: 'Master-Planned Demarcated Residential Sector Plots',
    location: 'Sector B, WAPDA Town, Peshawar',
    category: 'Residential Plots' as const,
    imageUrl: '/src/assets/images/prop_residential_plot_1793257685483.jpg',
    isDemo: true,
    uploadedAt: '2026-10-23T09:15:00.000Z'
  },
  {
    id: 'gal-04',
    title: 'Prime Boulevard Commercial Plaza & Retail Arcade',
    location: 'Commercial Avenue, Peshawar',
    category: 'Commercial & Investment' as const,
    imageUrl: '/src/assets/images/prop_commercial_investment_1793257686707.jpg',
    isDemo: true,
    uploadedAt: '2026-10-24T11:45:00.000Z'
  },
  {
    id: 'gal-05',
    title: 'Private Client Consultation Lounge',
    location: 'Orakzai Real Estate Advisory',
    category: 'Advisory Lounge' as const,
    imageUrl: '/src/assets/images/about_architectural_lounge_1793257686256.jpg',
    isDemo: true,
    uploadedAt: '2026-10-25T16:20:00.000Z'
  }
];

