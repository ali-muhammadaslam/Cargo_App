import { Redirect } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!user) return <Redirect href="/(auth)/login" />;

  const roleRoutes = {
    user: "/(tabs)/book",
    driver: "/(tabs)/driver-dashboard",
    admin: "/(tabs)/admin-dashboard",
  };

  return <Redirect href={roleRoutes[user.role] || "/(auth)/login"} />;
}
