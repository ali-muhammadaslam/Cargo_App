import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { MapPin, Package, Clock, User } from 'lucide-react-native';
import { useShipments } from '@/contexts/ShipmentContext';
import { Card } from '@/components/ui/Card';
import { StatusBadge } from '@/components/ui/StatusBadge';

export default function ShipmentDetailScreen() {
  const { id } = useLocalSearchParams();
  const { shipments } = useShipments();
  
  const shipment = shipments.find(s => s.id === id);

  if (!shipment) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: 'Shipment Not Found' }} />
        <Text>Shipment not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ title: `Shipment #${shipment.id.toUpperCase()}` }} />
      
      <View style={styles.header}>
        <Text style={styles.title}>Shipment Details</Text>
        <StatusBadge status={shipment.status} />
      </View>

      <Card>
        <Text style={styles.sectionTitle}>Route</Text>
        <View style={styles.route}>
          <View style={styles.routePoint}>
            <MapPin size={16} color="#6B7280" />
            <View style={styles.routeInfo}>
              <Text style={styles.routeLabel}>Pickup</Text>
              <Text style={styles.routeAddress}>{shipment.pickupAddress.street}</Text>
              <Text style={styles.routeCity}>
                {shipment.pickupAddress.city}, {shipment.pickupAddress.state}
              </Text>
            </View>
          </View>
          
          <View style={styles.routeLine} />
          
          <View style={styles.routePoint}>
            <MapPin size={16} color="#10B981" />
            <View style={styles.routeInfo}>
              <Text style={styles.routeLabel}>Delivery</Text>
              <Text style={styles.routeAddress}>{shipment.deliveryAddress.street}</Text>
              <Text style={styles.routeCity}>
                {shipment.deliveryAddress.city}, {shipment.deliveryAddress.state}
              </Text>
            </View>
          </View>
        </View>
      </Card>

      <Card>
        <Text style={styles.sectionTitle}>Package Information</Text>
        <View style={styles.packageInfo}>
          <View style={styles.infoRow}>
            <Package size={16} color="#6B7280" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Weight</Text>
              <Text style={styles.infoValue}>{shipment.package.weight} kg</Text>
            </View>
          </View>
          
          <View style={styles.infoRow}>
            <Package size={16} color="#6B7280" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Type</Text>
              <Text style={styles.infoValue}>
                {shipment.package.type.charAt(0).toUpperCase() + shipment.package.type.slice(1)}
              </Text>
            </View>
          </View>
          
          <View style={styles.infoRow}>
            <Clock size={16} color="#6B7280" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Estimated Delivery</Text>
              <Text style={styles.infoValue}>{shipment.estimatedDeliveryTime}</Text>
            </View>
          </View>
        </View>
      </Card>

      <Card>
        <Text style={styles.sectionTitle}>Tracking History</Text>
        <View style={styles.trackingHistory}>
          {shipment.trackingHistory.map((update, index) => (
            <View key={update.id} style={styles.trackingItem}>
              <View style={styles.trackingDot} />
              <View style={styles.trackingContent}>
                <Text style={styles.trackingStatus}>
                  {update.status.charAt(0).toUpperCase() + update.status.slice(1).replace('_', ' ')}
                </Text>
                <Text style={styles.trackingTime}>
                  {new Date(update.timestamp).toLocaleString()}
                </Text>
                {update.note && (
                  <Text style={styles.trackingNote}>{update.note}</Text>
                )}
              </View>
            </View>
          ))}
        </View>
      </Card>

      <Card>
        <Text style={styles.sectionTitle}>Payment</Text>
        <View style={styles.paymentInfo}>
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Method</Text>
            <Text style={styles.paymentValue}>
              {shipment.paymentMethod.charAt(0).toUpperCase() + shipment.paymentMethod.slice(1)}
            </Text>
          </View>
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Status</Text>
            <Text style={[
              styles.paymentValue,
              shipment.paymentStatus === 'paid' && styles.paymentPaid,
              shipment.paymentStatus === 'failed' && styles.paymentFailed,
            ]}>
              {shipment.paymentStatus.charAt(0).toUpperCase() + shipment.paymentStatus.slice(1)}
            </Text>
          </View>
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Total</Text>
            <Text style={styles.paymentTotal}>${shipment.estimatedCost}</Text>
          </View>
        </View>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    paddingTop: 12,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  route: {
    gap: 16,
  },
  routePoint: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  routeInfo: {
    marginLeft: 12,
    flex: 1,
  },
  routeLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  routeAddress: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  routeCity: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  routeLine: {
    width: 2,
    height: 24,
    backgroundColor: '#E5E7EB',
    marginLeft: 8,
  },
  packageInfo: {
    gap: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoContent: {
    marginLeft: 12,
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginTop: 2,
  },
  trackingHistory: {
    gap: 16,
  },
  trackingItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  trackingDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#2563EB',
    marginTop: 4,
  },
  trackingContent: {
    marginLeft: 16,
    flex: 1,
  },
  trackingStatus: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  trackingTime: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  trackingNote: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
    fontStyle: 'italic',
  },
  paymentInfo: {
    gap: 12,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentLabel: {
    fontSize: 16,
    color: '#6B7280',
  },
  paymentValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  paymentPaid: {
    color: '#10B981',
  },
  paymentFailed: {
    color: '#EF4444',
  },
  paymentTotal: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2563EB',
  },
});