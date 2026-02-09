import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ListingsProvider } from "../context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ListingsProvider>
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false }} />
      </ListingsProvider>
    </SafeAreaProvider>
  );
}
