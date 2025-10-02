import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFrameworkReady } from "@/hooks/useFrameworkReady";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ShipmentProvider } from "@/contexts/ShipmentContext";
import { View, ActivityIndicator } from "react-native";

function RootLayoutNav() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {!user ? <Stack.Screen name="(auth)" /> : <Stack.Screen name="(tabs)" />}
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

export default function RootLayout() {
  useFrameworkReady();

  return (
    <AuthProvider>
      <ShipmentProvider>
        <RootLayoutNav />
        <StatusBar style="auto" />
      </ShipmentProvider>
    </AuthProvider>
  );
}
