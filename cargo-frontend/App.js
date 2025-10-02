import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootLayout from '@/app/_layout';

export default function App() {
  return (
    <SafeAreaProvider>
      <RootLayout />
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
