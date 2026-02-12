import React from 'react';
import { Listing, SearchCategory } from '../types';
import { MOCK_LISTINGS } from './data';
import { sleep } from '../utils/helpers';

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

async function filterListings(
  items: Listing[],
  category: SearchCategory,
  query: string
): Promise<Listing[]> {
  // DO NOT Remove - This is to mock server response delay
  await sleep(600);
  
  const q = (query || '').toLowerCase().trim();
  return items.filter(
    (l) => {
      const categoryFilter = l.category === category;
      const queryFilter = !q ||
        l.title.toLowerCase().includes(q) ||
        l.address.toLowerCase().includes(q) ||
        l.city.toLowerCase().includes(q)
      
      return categoryFilter && queryFilter;
  });
}

const ListingsContext = React.createContext<ListingsContextType | undefined>(undefined);

export const ListingsProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [listings, setListings] = React.useState<Listing[]>([]);
  const [isLoading] = React.useState(false);
  const [error] = React.useState<string | null>(null);
  const [activeCategory, setActiveCategoryState] = React.useState<SearchCategory>(
    SearchCategory.VERIFIED
  );
  const [searchQuery, setSearchQuery] = React.useState('');

  const setActiveCategory = React.useCallback((c: SearchCategory) => {
    setActiveCategoryState(c);
  }, []);

  React.useEffect(() => {
    (async () => {
      setListings([]);
      const filteredListings = await filterListings(MOCK_LISTINGS, activeCategory, searchQuery)
      setListings(filteredListings);
    })()
  }, [activeCategory, searchQuery]);

  const refreshListings = React.useCallback(async () => {
    const newListings = await filterListings(MOCK_LISTINGS, activeCategory, searchQuery)
    setListings(newListings);
  }, [activeCategory, searchQuery]);

  const getListingById = React.useCallback((id: string) => {
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
  const c = React.useContext(ListingsContext);
  if (c === undefined)
    throw new Error('useListings must be used within ListingsProvider');
  return c;
}

