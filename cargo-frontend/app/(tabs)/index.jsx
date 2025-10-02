import { Redirect } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';
import { ActivityIndicator, View } from 'react-native';

export default function Index() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const defaultRoutes = {
    user: '/(tabs)/book',
    driver: '/(tabs)/driver-dashboard',
    admin: '/(tabs)/admin-dashboard',
  };

  return <Redirect href={defaultRoutes[user?.role] || '/(auth)/login'} />;
}
