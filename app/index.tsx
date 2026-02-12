import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SearchCategory, Listing } from '../types';
import { useListings } from '../context';
import { COLORS } from '../constants/colors';
import { TabGroup, ListingCard, SearchBar } from '../components';

const TABS = [
  { key: SearchCategory.VERIFIED, label: 'Verified' },
  { key: SearchCategory.NEAR_YOU, label: 'Near you' },
  { key: SearchCategory.NEW, label: 'New' },
];

export default function ListingsScreen() {
  
  const router = useRouter();
  const {
    listings,
    isLoading,
    error,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    refreshListings,
  } = useListings();

  const handleListingPress = (listing: Listing) => {
    router.push(`/listing/${listing.id}`);
  };

  const renderListItem = ({ item }: { item: Listing }) => (
    <ListingCard listing={item} onPress={handleListingPress} />
  );

  const renderEmptyState = () => {
    if (isLoading) return null;

    return (
      <View style={styles.emptyContainer}>
        <Text style={[styles.emptyTitle, { color: COLORS.text }]}>
          No listings found
        </Text>
        <Text
          style={[styles.emptySubtitle, { color: COLORS.textSecondary }]}
        >
          {searchQuery
            ? `No results for "${searchQuery}"`
            : `No listings match the current filters.`}
        </Text>
      </View>
    );
  };

  return (
    <View
      style={[styles.container, { backgroundColor: COLORS.background }]}
    >
      {/* Header */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: COLORS.surface,
            borderBottomColor: COLORS.border,
          },
        ]}
      >
        <Text style={[styles.title, { color: COLORS.text }]}>
          Find your home
        </Text>
      </View>

      {/* Tabs & Search */}
      <View
        style={[
          styles.controlsContainer,
          { backgroundColor: COLORS.surface },
        ]}
      >
        <View style={styles.searchWrapper}>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search destination, street..."
          />
        </View>
        <TabGroup
          tabs={TABS}
          activeTab={activeCategory}
          onTabChange={(key) => setActiveCategory(key as SearchCategory)}
        />
      </View>

      {/* Error State */}
      {error && (
        <View
          style={[
            styles.errorContainer,
            { backgroundColor: COLORS.error + '20' },
          ]}
        >
          <Text style={[styles.errorText, { color: COLORS.error }]}>
            {error}
          </Text>
        </View>
      )}

      {/* Listings */}
      <FlatList
        data={listings}
        renderItem={renderListItem}
        keyExtractor={() => 'listing'}
        // @ts-expect-error -- FlatListProps in Snack is misbehaving, we need to ignore this error
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyState}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={refreshListings}
            tintColor={COLORS.primary}
          />
        }
        ListHeaderComponent={
          isLoading && (listings?.length ?? 0) === 0 ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={COLORS.primary} />
              <Text
                style={[
                  styles.loadingText,
                  { color: COLORS.textSecondary },
                ]}
              >
                Loading...
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  controlsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0', // Subtle separator
  },
  searchWrapper: {
    marginBottom: 16,
  },
  listContent: {
    padding: 16,
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 15,
    textAlign: 'center',
    paddingHorizontal: 32,
  },
  errorContainer: {
    marginHorizontal: 16,
    marginTop: 8,
    padding: 12,
    borderRadius: 8,
  },
  errorText: {
    fontSize: 14,
    textAlign: 'center',
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 15,
  },
});
