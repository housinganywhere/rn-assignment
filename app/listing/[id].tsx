import React from 'react';
import { Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useListings } from '../../context';
import { PropertyDetails } from '../../components';

export default function ListingDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { getListingById } = useListings();

  const listing = getListingById(id);

  if (!listing) {
    router.back();
    return null;
  }

  return (
    <PropertyDetails
      listing={listing}
      onContact={() => Alert.alert('Contact', 'Contact feature is not available in this demo.')}
    />
  );
}
