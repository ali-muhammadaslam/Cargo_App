import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { router } from 'expo-router';
import { Package } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { useShipments } from '@/contexts/ShipmentContext';
import { ShipmentCard } from '@/components/ShipmentCard';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

const filterOptions = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'delivered', label: 'Delivered' },
  { key: 'cancelled', label: 'Cancelled' },
];

export default function TrackingScreen() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [refreshing, setRefreshing] = useState(false);
  
  const { user } = useAuth();
  const { getShipmentsByUserId } = useShipments();

  const userShipments = getShipmentsByUserId(user?.id || '');

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  const getFilteredShipments = () => {
    switch (selectedFilter) {
      case 'active':
        return userShipments.filter(s => !['delivered', 'cancelled'].includes(s.status));
      case 'delivered':
        return userShipments.filter(s => s.status === 'delivered');
      case 'cancelled':
        return userShipments.filter(s => s.status === 'cancelled');
      default:
        return userShipments;
    }
  };

  const filteredShipments = getFilteredShipments();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Track Shipments</Text>
        <Text style={styles.subtitle}>Monitor your package delivery status</Text>
      </View>

      <ScrollView
        style={styles.content}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={styles.filterContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.filterButtons}>
              {filterOptions.map((option) => (
                <Button
                  key={option.key}
                  title={option.label}
                  onPress={() => setSelectedFilter(option.key)}
                  variant={selectedFilter === option.key ? 'primary' : 'outline'}
                  size="small"
                  style={styles.filterButton}
                />
              ))}
            </View>
          </ScrollView>
        </View>

        {filteredShipments.length === 0 ? (
          <Card>
            <View style={styles.emptyState}>
              <Package size={48} color="#9CA3AF" />
              <Text style={styles.emptyStateTitle}>
                {selectedFilter === 'all' ? 'No shipments yet' : `No ${selectedFilter} shipments`}
              </Text>
              <Text style={styles.emptyStateSubtitle}>
                {selectedFilter === 'all' 
                  ? 'Book your first shipment to get started'
                  : `You don't have any ${selectedFilter} shipments`
                }
              </Text>
              {selectedFilter === 'all' && (
                <Button
                  title="Book Shipment"
                  onPress={() => router.push('/(tabs)/book')}
                  style={styles.emptyStateButton}
                />
              )}
            </View>
          </Card>
        ) : (
          <View style={styles.shipmentsList}>
            {filteredShipments.map((shipment) => (
              <ShipmentCard
                key={shipment.id}
                shipment={shipment}
                onPress={() => router.push(`/shipment/${shipment.id}`)}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  content: {
    flex: 1,
  },
  filterContainer: {
    paddingVertical: 16,
  },
  filterButtons: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
  },
  filterButton: {
    paddingHorizontal: 20,
  },
  shipmentsList: {
    paddingBottom: 24,
    gap: 8,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 24,
  },
  emptyStateButton: {
    paddingHorizontal: 32,
  },
});