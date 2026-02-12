export enum SearchCategory {
  VERIFIED = 'verified',
  NEAR_YOU = 'near_you',
  NEW = 'new',
}

export interface Listing {
  id: string;
  title: string;
  address: string;
  city: string;
  price: number;
  currency: string;
  category: SearchCategory; 
  imageUrl: string;
  bedrooms: number;
  bathrooms: number;
  size: number; // sqm
  description: string;
  landlordName: string;
  availableFrom: string;
}

export interface ListingsState {
  listings: Listing[];
  allListings: Listing[];
  isLoading: boolean;
  error: string | null;
  activeCategory: SearchCategory;
  searchQuery: string;
}
