import { Tabs } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { View, ActivityIndicator } from "react-native";

export default function TabsLayout() {
  const { user, isLoading } = useAuth();

  if (isLoading) return null;
  if (!user) return null;

  switch (user.role) {
    case "user":
      return (
        <Tabs screenOptions={{ headerShown: false }}>
          <Tabs.Screen name="book" options={{ tabBarIcon: ({ color }) => <Ionicons name="cube-outline" size={20} color={color} /> }} />
          <Tabs.Screen name="tracking" options={{ tabBarIcon: ({ color }) => <Ionicons name="location-outline" size={20} color={color} /> }} />
          <Tabs.Screen name="profile" options={{ tabBarIcon: ({ color }) => <Ionicons name="person-outline" size={20} color={color} /> }} />
        </Tabs>
      );
    case "driver":
      return (
        <Tabs screenOptions={{ headerShown: false }}>
          <Tabs.Screen name="driver-dashboard" options={{ tabBarIcon: ({ color }) => <Ionicons name="briefcase-outline" size={20} color={color} /> }} />
          <Tabs.Screen name="driver-earnings" options={{ tabBarIcon: ({ color }) => <Ionicons name="cash-outline" size={20} color={color} /> }} />
          <Tabs.Screen name="profile" options={{ tabBarIcon: ({ color }) => <Ionicons name="person-outline" size={20} color={color} /> }} />
        </Tabs>
      );
    case "admin":
      return (
        <Tabs screenOptions={{ headerShown: false }}>
          <Tabs.Screen name="admin-dashboard" options={{ tabBarIcon: ({ color }) => <Ionicons name="settings-outline" size={20} color={color} /> }} />
          <Tabs.Screen name="profile" options={{ tabBarIcon: ({ color }) => <Ionicons name="person-outline" size={20} color={color} /> }} />
        </Tabs>
      );
    default:
      return null;
  }
}
