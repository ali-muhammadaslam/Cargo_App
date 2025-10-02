import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MapPin, Package, Clock } from 'lucide-react-native';
import { Card } from '@/components/ui/Card';
import { StatusBadge } from '@/components/ui/StatusBadge';

export function ShipmentCard({ shipment, onPress, showDriverActions = false }) {
  return (
    <Card style={styles.card}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        <View style={styles.header}>
          <Text style={styles.shipmentId}>#{shipment.id.toUpperCase()}</Text>
          <StatusBadge status={shipment.status} size="small" />
        </View>

        <View style={styles.addresses}>
          <View style={styles.addressRow}>
            <MapPin size={16} color="#6B7280" />
            <View style={styles.addressInfo}>
              <Text style={styles.addressLabel}>From</Text>
              <Text style={styles.addressText}>{shipment.pickupAddress.street}</Text>
            </View>
          </View>
          
          <View style={styles.addressRow}>
            <MapPin size={16} color="#10B981" />
            <View style={styles.addressInfo}>
              <Text style={styles.addressLabel}>To</Text>
              <Text style={styles.addressText}>{shipment.deliveryAddress.street}</Text>
            </View>
          </View>
        </View>

        <View style={styles.details}>
          <View style={styles.detailItem}>
            <Package size={16} color="#6B7280" />
            <Text style={styles.detailText}>{shipment.package.weight}kg</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Clock size={16} color="#6B7280" />
            <Text style={styles.detailText}>{shipment.estimatedDeliveryTime}</Text>
          </View>
          
          <Text style={styles.cost}>${shipment.estimatedCost}</Text>
        </View>

        {showDriverActions && shipment.status === 'created' && (
          <View style={styles.driverActions}>
            <TouchableOpacity style={styles.acceptButton}>
              <Text style={styles.acceptButtonText}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rejectButton}>
              <Text style={styles.rejectButtonText}>Skip</Text>
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  shipmentId: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  addresses: {
    marginBottom: 16,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  addressInfo: {
    marginLeft: 12,
    flex: 1,
  },
  addressLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 2,
  },
  addressText: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '500',
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 6,
  },
  cost: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2563EB',
  },
  driverActions: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 12,
  },
  acceptButton: {
    flex: 1,
    backgroundColor: '#10B981',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  acceptButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  rejectButton: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  rejectButtonText: {
    color: '#6B7280',
    fontWeight: '600',
  },
});
