import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { User, Settings, CircleHelp as HelpCircle, LogOut, Bell, Shield } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { router } from 'expo-router';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: async () => {
            await logout();
            router.replace('/(auth)/login'); // redirect to login
          }
        },
      ]
    );
  };

  const menuItems = [
    { icon: Settings, title: 'Settings', subtitle: 'App preferences and notifications' },
    { icon: Bell, title: 'Notifications', subtitle: 'Manage notification preferences' },
    { icon: Shield, title: 'Security', subtitle: 'Password and security settings' },
    { icon: HelpCircle, title: 'Help & Support', subtitle: 'FAQs and contact support' },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>

      {/* User Info */}
      <Card style={styles.profileCard}>
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <User size={32} color="#FFFFFF" />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{user?.name}</Text>
            <Text style={styles.profileEmail}>{user?.email}</Text>
            <View style={styles.roleContainer}>
              <Text style={styles.roleText}>
                {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)} Account
              </Text>
              {user?.role === 'driver' && user?.isApproved && (
                <Text style={styles.approvedText}>✓ Verified</Text>
              )}
            </View>
          </View>
        </View>
      </Card>

      {/* Account Menu */}
      <Card style={styles.menuCard}>
        <Text style={styles.sectionTitle}>Account</Text>
        <View>
          {menuItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem}>
              <View style={styles.menuItemIcon}>
                <item.icon size={20} color="#6B7280" />
              </View>
              <View style={styles.menuItemContent}>
                <Text style={styles.menuItemTitle}>{item.title}</Text>
                <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </Card>

      {/* Role-specific sections */}
      {user?.role === 'user' && (
        <Card style={styles.menuCard}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.preferenceList}>
            <View style={styles.preferenceItem}>
              <Text style={styles.preferenceLabel}>Saved Addresses</Text>
              <Text style={styles.preferenceValue}>3 locations</Text>
            </View>
            <View style={styles.preferenceItem}>
              <Text style={styles.preferenceLabel}>Default Payment</Text>
              <Text style={styles.preferenceValue}>Cash on Delivery</Text>
            </View>
            <View style={styles.preferenceItem}>
              <Text style={styles.preferenceLabel}>Language</Text>
              <Text style={styles.preferenceValue}>English</Text>
            </View>
          </View>
        </Card>
      )}

      {user?.role === 'driver' && (
        <Card style={styles.menuCard}>
          <Text style={styles.sectionTitle}>Driver Info</Text>
          <View style={styles.driverInfo}>
            <View style={styles.driverStat}>
              <Text style={styles.driverStatNumber}>4.9</Text>
              <Text style={styles.driverStatLabel}>Rating</Text>
            </View>
            <View style={styles.driverStat}>
              <Text style={styles.driverStatNumber}>156</Text>
              <Text style={styles.driverStatLabel}>Deliveries</Text>
            </View>
            <View style={styles.driverStat}>
              <Text style={styles.driverStatNumber}>98%</Text>
              <Text style={styles.driverStatLabel}>On-time</Text>
            </View>
          </View>
        </Card>
      )}

      {/* Footer */}
      <View style={styles.footer}>
        <Button
          title="Logout"
          onPress={handleLogout}
          variant="outline"
          style={styles.logoutButton}
        />
        <Text style={styles.version}>Version 1.0.0</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: { backgroundColor: '#FFFFFF', paddingHorizontal: 24, paddingTop: 60, paddingBottom: 24, borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  title: { fontSize: 24, fontWeight: '700', color: '#1F2937' },
  profileCard: { margin: 16 },
  profileHeader: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#2563EB', alignItems: 'center', justifyContent: 'center' },
  profileInfo: { marginLeft: 16, flex: 1 },
  profileName: { fontSize: 20, fontWeight: '700', color: '#1F2937' },
  profileEmail: { fontSize: 14, color: '#6B7280', marginTop: 4 },
  roleContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  roleText: { fontSize: 14, fontWeight: '500', color: '#2563EB', backgroundColor: '#DBEAFE', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 },
  approvedText: { fontSize: 12, fontWeight: '500', color: '#10B981', marginLeft: 8 },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: '#1F2937', marginBottom: 16 },
  menuCard: { margin: 16, padding: 16 },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12 },
  menuItemIcon: { width: 40, alignItems: 'center' },
  menuItemContent: { flex: 1, marginLeft: 12 },
  menuItemTitle: { fontSize: 16, fontWeight: '500', color: '#1F2937' },
  menuItemSubtitle: { fontSize: 14, color: '#6B7280', marginTop: 2 },
  preferenceList: { marginVertical: 8 },
  preferenceItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 },
  preferenceLabel: { fontSize: 16, color: '#1F2937' },
  preferenceValue: { fontSize: 16, fontWeight: '500', color: '#6B7280' },
  driverInfo: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 8 },
  driverStat: { alignItems: 'center' },
  driverStatNumber: { fontSize: 24, fontWeight: '700', color: '#2563EB' },
  driverStatLabel: { fontSize: 14, color: '#6B7280', marginTop: 4 },
  footer: { padding: 16, alignItems: 'center' },
  logoutButton: { width: '100%', borderColor: '#EF4444' },
  version: { fontSize: 14, color: '#9CA3AF', marginTop: 12 },
});
