import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Listing } from '../types';
import { COLORS } from '../constants/colors';

interface PropertyDetailsProps {
  listing: Listing;
  onClose: () => void;
  onContact?: () => void;
}

export const PropertyDetails: React.FC<PropertyDetailsProps> = ({
  listing,
  onClose,
  onContact,
}) => {
  

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-EU', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-EU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: COLORS.background },
      ]}
    >
      <View
        style={[
          styles.header,
          {
            backgroundColor: COLORS.surface,
            borderBottomColor: COLORS.border,
          },
        ]}
      >
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={[styles.closeText, { color: COLORS.primary }]}>
            ← Back
          </Text>
        </TouchableOpacity>
        <Text
          style={[styles.headerTitle, { color: COLORS.text }]}
          numberOfLines={1}
        >
          {listing.title}
        </Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <Image
          source={{ uri: listing.imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />

        <View
          style={[
            styles.infoCard,
            {
              backgroundColor: COLORS.surface,
              borderColor: COLORS.border,
            },
          ]}
        >
          <Text style={[styles.price, { color: COLORS.primary }]}>
            {formatPrice(listing.price, listing.currency)}/month
          </Text>

          <Text style={[styles.address, { color: COLORS.text }]}>
            {listing.address}
          </Text>
          <Text
            style={[styles.city, { color: COLORS.textSecondary }]}
          >
            {listing.city}
          </Text>

          <View style={styles.features}>
            <FeatureItem
              label="Bedrooms"
              value={listing.bedrooms.toString()}
              theme={COLORS}
            />
            <FeatureItem
              label="Bathrooms"
              value={listing.bathrooms.toString()}
              theme={COLORS}
            />
            <FeatureItem
              label="Size"
              value={`${listing.size} m²`}
              theme={COLORS}
            />
          </View>
        </View>

        <View
          style={[
            styles.section,
            {
              backgroundColor: COLORS.surface,
              borderColor: COLORS.border,
            },
          ]}
        >
          <Text
            style={[styles.sectionTitle, { color: COLORS.text }]}
          >
            Description
          </Text>
          <Text
            style={[
              styles.description,
              { color: COLORS.textSecondary },
            ]}
          >
            {listing.description}
          </Text>
        </View>

        <View
          style={[
            styles.section,
            {
              backgroundColor: COLORS.surface,
              borderColor: COLORS.border,
            },
          ]}
        >
          <Text
            style={[styles.sectionTitle, { color: COLORS.text }]}
          >
            Availability
          </Text>
          <Text
            style={[
              styles.availability,
              { color: COLORS.textSecondary },
            ]}
          >
            Available from {formatDate(listing.availableFrom)}
          </Text>
        </View>

        <View
          style={[
            styles.section,
            {
              backgroundColor: COLORS.surface,
              borderColor: COLORS.border,
            },
          ]}
        >
          <Text
            style={[styles.sectionTitle, { color: COLORS.text }]}
          >
            Landlord
          </Text>
          <Text
            style={[
              styles.landlord,
              { color: COLORS.textSecondary },
            ]}
          >
            {listing.landlordName}
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.contactButton,
            { backgroundColor: COLORS.primary },
          ]}
          activeOpacity={0.8}
          onPress={onContact}
        >
          <Text style={styles.contactButtonText}>Contact Landlord</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const FeatureItem: React.FC<{
  label: string;
  value: string;
  theme: any;
}> = ({ label, value, theme }) => (
  <View style={styles.featureItem}>
    <Text style={[styles.featureValue, { color: COLORS.text }]}>
      {value}
    </Text>
    <Text
      style={[styles.featureLabel, { color: COLORS.textSecondary }]}
    >
      {label}
    </Text>
  </View>
);

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  closeButton: {
    padding: 4,
    width: 60,
  },
  closeText: {
    fontSize: 16,
    fontWeight: '500',
  },
  headerTitle: {
    flex: 1,
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
  },
  placeholder: {
    width: 60,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  image: {
    width: width,
    height: width * 0.65,
  },
  infoCard: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  price: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  address: {
    fontSize: 17,
    fontWeight: '500',
  },
  city: {
    fontSize: 15,
    marginTop: 2,
  },
  features: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  featureItem: {
    alignItems: 'center',
  },
  featureValue: {
    fontSize: 20,
    fontWeight: '600',
  },
  featureLabel: {
    fontSize: 13,
    marginTop: 4,
  },
  section: {
    marginHorizontal: 16,
    marginTop: 12,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
  },
  availability: {
    fontSize: 15,
  },
  landlord: {
    fontSize: 15,
  },
  contactButton: {
    marginHorizontal: 16,
    marginTop: 24,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  contactButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
  },
});
