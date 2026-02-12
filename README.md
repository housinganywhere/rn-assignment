# React Native – Interview Assignment

A small Expo (React Native) app for browsing property listings. This project runs in **Expo Snack** and is used as a timed coding exercise during interviews.

## What This App Does

- **Home screen:** List of property listings with a search bar and three category tabs (Verified, Near you, New). Tap a listing to open its detail screen.
- **Detail screen:** Shows full listing info and a "Contact Landlord" button (currently shows an alert).
- **Data:** Listings are loaded from in-memory mock data (no API). Filtering is done by category and search query.

## Tech Stack

- **Expo** (SDK 54) with **Expo Router** (file-based routing)
- **React Native** (core components: View, Text, FlatList, TextInput, ScrollView, etc.)
- **TypeScript**
- **React Context** for listings state (filter, search, list data)
- **react-native-safe-area-context** for safe areas
- **react-native-screens** (used by Expo Router)

## Project Structure

```
├── App.js                 # Entry point (Expo Root + Router context)
├── app/                    # Screens (Expo Router file-based routes)
│   ├── _layout.tsx         # Root layout (providers + Stack navigator)
│   ├── index.tsx           # Home screen (list + search + tabs)
│   └── listing/
│       └── [id].tsx        # Listing detail screen
├── components/             # Reusable UI components
│   ├── ListingCard.tsx     # Card for one listing in the list
│   ├── PropertyDetails.tsx # Full listing detail view
│   ├── SearchBar.tsx       # Search input
│   └── TabGroup.tsx        # Category tabs (Verified / Near you / New)
├── context/                # React Context
│   ├── ListingsContext.tsx # Listings state, filter, search
│   ├── data.ts             # Mock listings array
│   └── index.ts            # Exports
├── constants/
│   └── colors.ts           # Shared colors (no theme provider)
├── hooks/
│   └── useDebounce.ts      # Debounce hook (optional use)
├── types/
│   └── index.ts            # TypeScript types (Listing, SearchCategory)
└── utils/
    └── helpers.ts          # Small helpers (formatPrice, etc.)
```

## Running in Expo Snack

1. Open [snack.expo.dev](https://snack.expo.dev).
2. Import this repo (if shared via GitHub) or copy the project files into a new Snack.
3. Use the device preview or "Run on device" with Expo Go (Expo 54) to test on a phone or simulator.

No local install or npm install is required when using Snack; dependencies are resolved in the cloud.

## Key Files to Know

| File | Purpose |
|------|--------|
| app/index.tsx | Home screen: FlatList of listings, SearchBar, TabGroup. Uses useListings(). |
| app/listing/[id].tsx | Detail screen: reads id from route, gets listing via getListingById(id). |
| context/ListingsContext.tsx | Holds listings, activeCategory, searchQuery, filter logic, and refreshListings. |
| context/data.ts | MOCK_LISTINGS array (source of truth for the list). |
| types/index.ts | SearchCategory enum (VERIFIED, NEAR_YOU, NEW) and Listing interface. |

## Assignment Instructions

See **[ASSIGNMENT.md](./ASSIGNMENT.md)** for the timed coding exercise. Tasks are ordered by difficulty (easiest first). All work must run in Expo Snack.
