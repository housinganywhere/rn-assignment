import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Listing, SearchCategory } from '../types';
import { COLORS } from '../constants/colors';

interface ListingCardProps {
  listing: Listing;
  onPress: (listing: Listing) => void;
}

export const ListingCard: React.FC<ListingCardProps> = ({ listing, onPress }) => {

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-EU', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <TouchableOpacity
      onPress={() => onPress(listing)}
      style={[
        styles.container,
        {
          backgroundColor: COLORS.surface,
          borderColor: COLORS.border,
        },
      ]}
      activeOpacity={0.7}
    >
      <Image
        source={{ uri: listing.imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <View style={styles.header}>
          <Text
            style={[styles.title, { color: COLORS.text }]}
            numberOfLines={1}
          >
            {listing.title}
          </Text>
          {listing.category === SearchCategory.VERIFIED && (
            <View
              style={[
                styles.badge,
                { backgroundColor: COLORS.success },
              ]}
            >
              <Text style={styles.badgeText}>✔</Text>
            </View>
          )}
        </View>

        <Text
          style={[styles.address, { color: COLORS.textSecondary }]}
          numberOfLines={1}
        >
          {listing.address}, {listing.city}
        </Text>

        <View style={styles.details}>
          <Text style={[styles.price, { color: COLORS.primary }]}>
            {formatPrice(listing.price, listing.currency)}/mo
          </Text>
          <Text style={[styles.meta, { color: COLORS.textSecondary }]}>
            {listing.bedrooms} bed • {listing.size} m²
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: 12,
  },
  image: {
    width: 100,
    height: 100,
  },
  content: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  badge: {
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  address: {
    fontSize: 13,
    marginTop: 2,
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  price: {
    fontSize: 15,
    fontWeight: '700',
  },
  meta: {
    fontSize: 13,
  }
});
