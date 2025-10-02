import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, ActivityIndicator } from 'react-native';
import { Truck, MapPin, DollarSign, Clock } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { useShipments } from '@/contexts/ShipmentContext';
import { Card } from '@/components/ui/Card';
import { ShipmentCard } from '@/components/ShipmentCard';

export default function DriverDashboardScreen() {
  const [isOnline, setIsOnline] = useState(true);
  const [loadingShipments, setLoadingShipments] = useState(true);
  const { user } = useAuth();
  const { getAvailableShipments } = useShipments();

  const [availableShipments, setAvailableShipments] = useState([]);
  const [todayEarnings, setTodayEarnings] = useState(0);
  const [completedToday, setCompletedToday] = useState(0);

  useEffect(() => {
    if (!user) return;

    // Simulate async fetching
    const fetchShipments = async () => {
      setLoadingShipments(true);
      const shipments = await getAvailableShipments();
      setAvailableShipments(shipments || []);
      
      // You can replace these with real API calls
      setTodayEarnings(245);
      setCompletedToday(8);

      setLoadingShipments(false);
    };

    fetchShipments();
  }, [user]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Welcome back, {user?.name}!</Text>
        <View style={styles.statusContainer}>
          <Text style={styles.statusLabel}>{isOnline ? 'Online' : 'Offline'}</Text>
          <Switch
            value={isOnline}
            onValueChange={setIsOnline}
            trackColor={{ false: '#E5E7EB', true: '#10B981' }}
            thumbColor="#FFFFFF"
          />
        </View>
      </View>

      <View style={styles.statsContainer}>
        <Card style={styles.statCard}>
          <DollarSign size={24} color="#10B981" />
          <Text style={styles.statNumber}>${todayEarnings}</Text>
          <Text style={styles.statLabel}>Today's Earnings</Text>
        </Card>

        <Card style={styles.statCard}>
          <Truck size={24} color="#2563EB" />
          <Text style={styles.statNumber}>{completedToday}</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </Card>

        <Card style={styles.statCard}>
          <Clock size={24} color="#F59E0B" />
          <Text style={styles.statNumber}>6.5</Text>
          <Text style={styles.statLabel}>Hours Online</Text>
        </Card>
      </View>

      {isOnline && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MapPin size={20} color="#2563EB" />
            <Text style={styles.sectionTitle}>Available Jobs</Text>
          </View>

          {loadingShipments ? (
            <ActivityIndicator size="large" style={{ marginVertical: 32 }} />
          ) : availableShipments.length === 0 ? (
            <Card>
              <View style={styles.emptyState}>
                <Truck size={48} color="#9CA3AF" />
                <Text style={styles.emptyStateTitle}>No jobs available</Text>
                <Text style={styles.emptyStateSubtitle}>
                  Check back later for new delivery opportunities
                </Text>
              </View>
            </Card>
          ) : (
            <View style={styles.jobsList}>
              {availableShipments.slice(0, 5).map((shipment) => (
                <ShipmentCard
                  key={shipment.id}
                  shipment={shipment}
                  onPress={() => {}}
                  showDriverActions={true}
                />
              ))}
            </View>
          )}
        </View>
      )}

      {!isOnline && (
        <Card style={styles.offlineCard}>
          <View style={styles.offlineContent}>
            <Truck size={48} color="#6B7280" />
            <Text style={styles.offlineTitle}>You're Offline</Text>
            <Text style={styles.offlineSubtitle}>
              Turn on your availability to start receiving job offers
            </Text>
          </View>
        </Card>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 24, paddingTop: 60, backgroundColor: '#FFFFFF' },
  greeting: { fontSize: 20, fontWeight: '600', color: '#1F2937', flex: 1 },
  statusContainer: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  statusLabel: { fontSize: 16, fontWeight: '500', color: '#1F2937' },
  statsContainer: { flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 24, gap: 12 },
  statCard: { flex: 1, alignItems: 'center', paddingVertical: 20 },
  statNumber: { fontSize: 24, fontWeight: '700', color: '#1F2937', marginTop: 8, marginBottom: 4 },
  statLabel: { fontSize: 12, color: '#6B7280' },
  section: { paddingHorizontal: 16, marginBottom: 32 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: '#1F2937', marginLeft: 8 },
  jobsList: { gap: 8 },
  emptyState: { alignItems: 'center', paddingVertical: 32 },
  emptyStateTitle: { fontSize: 18, fontWeight: '600', color: '#1F2937', marginTop: 16, marginBottom: 8 },
  emptyStateSubtitle: { fontSize: 14, color: '#6B7280', textAlign: 'center' },
  offlineCard: { margin: 16 },
  offlineContent: { alignItems: 'center', paddingVertical: 32 },
  offlineTitle: { fontSize: 18, fontWeight: '600', color: '#1F2937', marginTop: 16, marginBottom: 8 },
  offlineSubtitle: { fontSize: 14, color: '#6B7280', textAlign: 'center', paddingHorizontal: 24 },
});
