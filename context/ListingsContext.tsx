import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { Listing, SearchCategory } from '../types';

const MOCK_LISTINGS: Listing[] = [
  {
    id: '1',
    title: 'Modern Studio in City Center',
    address: 'Witte de Withstraat 45',
    city: 'Rotterdam',
    price: 1250,
    currency: 'EUR',
    category: SearchCategory.VERIFIED,
    isVerified: true,
    imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400',
    bedrooms: 1,
    bathrooms: 1,
    size: 45,
    description: 'Beautiful modern studio with all amenities included.',
    landlordName: 'Jan de Vries',
    availableFrom: '2026-03-01',
    unreadMessages: 2,
    lastMessageAt: '2026-02-07T10:30:00Z',
  },
  {
    id: '2',
    title: 'Spacious 2BR Apartment',
    address: 'Coolsingel 123',
    city: 'Rotterdam',
    price: 1850,
    currency: 'EUR',
    category: SearchCategory.NEAR_YOU,
    isVerified: false,
    imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400',
    bedrooms: 2,
    bathrooms: 1,
    size: 75,
    description: 'Spacious apartment with a beautiful view of the city.',
    landlordName: 'Maria Santos',
    availableFrom: '2026-02-15',
    unreadMessages: 0,
    lastMessageAt: '2026-02-05T14:20:00Z',
  },
  {
    id: '3',
    title: 'Cozy Room in Shared House',
    address: 'Bergweg 78',
    city: 'Rotterdam',
    price: 650,
    currency: 'EUR',
    category: SearchCategory.NEW,
    isVerified: true,
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400',
    bedrooms: 1,
    bathrooms: 1,
    size: 18,
    description: 'Furnished room in a friendly shared house.',
    landlordName: 'Peter Johnson',
    availableFrom: '2026-02-20',
    unreadMessages: 5,
    lastMessageAt: '2026-02-07T09:15:00Z',
  },
  {
    id: '4',
    title: 'Luxury Penthouse',
    address: 'Kop van Zuid 1',
    city: 'Rotterdam',
    price: 3500,
    currency: 'EUR',
    category: SearchCategory.VERIFIED,
    isVerified: true,
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400',
    bedrooms: 3,
    bathrooms: 2,
    size: 120,
    description: 'Stunning penthouse with panoramic views.',
    landlordName: 'Sophie Brown',
    availableFrom: '2026-04-01',
    unreadMessages: 1,
    lastMessageAt: '2026-02-06T16:45:00Z',
  },
  {
    id: '5',
    title: 'Student Studio near Erasmus',
    address: 'Kralingseweg 200',
    city: 'Rotterdam',
    price: 800,
    currency: 'EUR',
    category: SearchCategory.NEAR_YOU,
    isVerified: false,
    imageUrl: 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=400',
    bedrooms: 1,
    bathrooms: 1,
    size: 28,
    description: 'Perfect for students. 10 min bike ride to Erasmus.',
    landlordName: 'Tom Wilson',
    availableFrom: '2026-01-15',
    unreadMessages: 0,
    lastMessageAt: '2026-01-20T11:00:00Z',
  },
  {
    id: '6',
    title: 'Family House with Garden',
    address: 'Hillegersberg 55',
    city: 'Rotterdam',
    price: 2200,
    currency: 'EUR',
    category: SearchCategory.NEW,
    isVerified: true,
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400',
    bedrooms: 4,
    bathrooms: 2,
    size: 150,
    description: 'Beautiful family home with large garden.',
    landlordName: 'Emma van Dijk',
    availableFrom: '2026-01-01',
    unreadMessages: 0,
    lastMessageAt: '2025-12-15T08:30:00Z',
  },
];

interface ListingsContextType {
  listings: Listing[];
  allListings: Listing[];
  isLoading: boolean;
  error: string | null;
  activeCategory: SearchCategory;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setActiveCategory: (category: SearchCategory) => void;
  refreshListings: () => void;
  getListingById: (id: string) => Listing | undefined;
}

function filterListings(
  items: Listing[],
  category: SearchCategory,
  query: string
): Listing[] {
  const q = (query || '').toLowerCase().trim();
  return items.filter(
    (l) =>
      l.category === category &&
      (!q ||
        l.title.toLowerCase().includes(q) ||
        l.address.toLowerCase().includes(q) ||
        l.city.toLowerCase().includes(q))
  );
}

const ListingsContext = createContext<ListingsContextType | undefined>(undefined);

export const ListingsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading] = useState(false);
  const [error] = useState<string | null>(null);
  const [activeCategory, setActiveCategoryState] = useState<SearchCategory>(
    SearchCategory.VERIFIED
  );
  const [searchQuery, setSearchQuery] = useState('');

  const setActiveCategory = useCallback((c: SearchCategory) => {
    setActiveCategoryState(c);
  }, []);

  useEffect(() => {
    setListings(filterListings(MOCK_LISTINGS, activeCategory, searchQuery));
  }, [activeCategory, searchQuery]);

  const refreshListings = useCallback(() => {
    setListings(filterListings(MOCK_LISTINGS, activeCategory, searchQuery));
  }, [activeCategory, searchQuery]);

  const getListingById = useCallback((id: string) => {
    return MOCK_LISTINGS.find((l) => l.id === id);
  }, []);

  const value: ListingsContextType = {
    listings,
    allListings: MOCK_LISTINGS,
    isLoading,
    error,
    activeCategory,
    searchQuery,
    setSearchQuery,
    setActiveCategory,
    refreshListings,
    getListingById,
  };

  return (
    <ListingsContext.Provider value={value}>
      {children}
    </ListingsContext.Provider>
  );
};

export function useListings(): ListingsContextType {
  const c = useContext(ListingsContext);
  if (c === undefined)
    throw new Error('useListings must be used within ListingsProvider');
  return c;
}

