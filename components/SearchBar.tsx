import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/colors';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = 'Search listings...',
}) => {
  

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: COLORS.surface,
          borderColor: COLORS.border,
        },
      ]}
    >
      <View style={styles.iconContainer}>
        <SearchIcon color={COLORS.textSecondary} />
      </View>
      <TextInput
        style={[
          styles.input,
          {
            color: COLORS.text,
          },
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.textSecondary}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {value.length > 0 && (
        <TouchableOpacity
          onPress={() => onChangeText('')}
          style={styles.clearButton}
        >
          <ClearIcon color={COLORS.textSecondary} />
        </TouchableOpacity>
      )}
    </View>
  );
};

// Simple SVG-like icons using View
const SearchIcon: React.FC<{ color: string }> = ({ color }) => (
  <View
    style={[
      styles.searchIcon,
      {
        borderColor: color,
      },
    ]}
  >
    <View
      style={[
        styles.searchHandle,
        {
          backgroundColor: color,
        },
      ]}
    />
  </View>
);

const ClearIcon: React.FC<{ color: string }> = ({ color }) => (
  <View style={styles.clearIcon}>
    <View
      style={[
        styles.clearLine,
        { backgroundColor: color, transform: [{ rotate: '45deg' }] },
      ]}
    />
    <View
      style={[
        styles.clearLine,
        { backgroundColor: color, transform: [{ rotate: '-45deg' }] },
      ]}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 12,
    height: 48,
  },
  iconContainer: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    height: '100%',
  },
  clearButton: {
    padding: 4,
  },
  searchIcon: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
  },
  searchHandle: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    width: 8,
    height: 2,
    borderRadius: 1,
    transform: [{ rotate: '45deg' }],
  },
  clearIcon: {
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearLine: {
    position: 'absolute',
    width: 14,
    height: 2,
    borderRadius: 1,
  },
});
