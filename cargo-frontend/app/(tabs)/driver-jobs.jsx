import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Package, MapPin } from 'lucide-react-native';
import { useShipments } from '@/contexts/ShipmentContext';
import { Card } from '@/components/ui/Card';

export default function DriverJobsScreen() {
  const { getAvailableShipments } = useShipments();
  const availableJobs = getAvailableShipments();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Available Jobs</Text>
        <Text style={styles.subtitle}>{availableJobs.length} jobs available</Text>
      </View>

      <ScrollView style={styles.content}>
        {availableJobs.length === 0 ? (
          <Card>
            <View style={styles.emptyState}>
              <Package size={48} color="#9CA3AF" />
              <Text style={styles.emptyStateTitle}>No jobs available</Text>
              <Text style={styles.emptyStateSubtitle}>
                New delivery opportunities will appear here
              </Text>
            </View>
          </Card>
        ) : (
          <View style={styles.jobsList}>
            {availableJobs.map((job) => (
              <Card key={job.id}>
                <View style={styles.jobCard}>
                  <View style={styles.jobHeader}>
                    <Text style={styles.jobId}>#{job.id.toUpperCase()}</Text>
                    <Text style={styles.jobPrice}>${job.estimatedCost}</Text>
                  </View>

                  <View style={styles.jobRoute}>
                    <View style={styles.routePoint}>
                      <MapPin size={16} color="#6B7280" />
                      <View style={styles.routeInfo}>
                        <Text style={styles.routeLabel}>Pickup</Text>
                        <Text style={styles.routeAddress}>
                          {job.pickupAddress.street}, {job.pickupAddress.city}
                        </Text>
                      </View>
                    </View>
                    
                    <View style={styles.routeLine} />
                    
                    <View style={styles.routePoint}>
                      <MapPin size={16} color="#10B981" />
                      <View style={styles.routeInfo}>
                        <Text style={styles.routeLabel}>Delivery</Text>
                        <Text style={styles.routeAddress}>
                          {job.deliveryAddress.street}, {job.deliveryAddress.city}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.jobDetails}>
                    <View style={styles.jobDetail}>
                      <Text style={styles.jobDetailLabel}>Weight</Text>
                      <Text style={styles.jobDetailValue}>{job.package.weight}kg</Text>
                    </View>
                    <View style={styles.jobDetail}>
                      <Text style={styles.jobDetailLabel}>Type</Text>
                      <Text style={styles.jobDetailValue}>
                        {job.package.type.charAt(0).toUpperCase() + job.package.type.slice(1)}
                      </Text>
                    </View>
                    <View style={styles.jobDetail}>
                      <Text style={styles.jobDetailLabel}>Distance</Text>
                      <Text style={styles.jobDetailValue}>5.2 km</Text>
                    </View>
                  </View>

                  <View style={styles.jobActions}>
                    <View style={styles.acceptButton}>
                      <Text style={styles.acceptButtonText}>Accept Job</Text>
                    </View>
                  </View>
                </View>
              </Card>
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
    padding: 16,
  },
  jobsList: {
    gap: 16,
  },
  jobCard: {
    gap: 16,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  jobId: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  jobPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2563EB',
  },
  jobRoute: {
    gap: 12,
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
    marginBottom: 2,
  },
  routeAddress: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '500',
  },
  routeLine: {
    width: 2,
    height: 16,
    backgroundColor: '#E5E7EB',
    marginLeft: 8,
  },
  jobDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  jobDetail: {
    alignItems: 'center',
  },
  jobDetailLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  jobDetailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  jobActions: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  acceptButton: {
    backgroundColor: '#10B981',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  acceptButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
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
  },
});