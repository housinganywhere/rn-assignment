// Types for the HomeAway Listings Interview App

export enum ListingStatus {
  ACTIVE = 'active',
  PENDING = 'pending',
  ARCHIVED = 'archived',
}

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
  category: SearchCategory; // Added for product-aligned search
  isVerified: boolean;      // Added for 'Verified' filter
  imageUrl: string;
  bedrooms: number;
  bathrooms: number;
  size: number; // sqm
  description: string;
  landlordName: string;
  availableFrom: string;
  unreadMessages: number;
  lastMessageAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'tenant' | 'landlord';
  avatarUrl: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface ListingsState {
  listings: Listing[];
  allListings: Listing[];
  isLoading: boolean;
  error: string | null;
  activeCategory: SearchCategory;
  searchQuery: string;
}

export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    error: string;
    success: string;
    warning: string;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
    xl?: number;
  };
}
