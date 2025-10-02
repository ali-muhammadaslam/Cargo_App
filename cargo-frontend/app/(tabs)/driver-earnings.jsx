import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { DollarSign, TrendingUp, Calendar } from 'lucide-react-native';
import { Card } from '@/components/ui/Card';

const earningsData = [
  { date: '2024-01-15', amount: 245, trips: 8 },
  { date: '2024-01-14', amount: 189, trips: 6 },
  { date: '2024-01-13', amount: 312, trips: 12 },
  { date: '2024-01-12', amount: 156, trips: 5 },
  { date: '2024-01-11', amount: 278, trips: 9 },
];

export default function DriverEarningsScreen() {
  const totalEarnings = earningsData.reduce((sum, day) => sum + day.amount, 0);
  const totalTrips = earningsData.reduce((sum, day) => sum + day.trips, 0);
  const averagePerTrip = Math.round(totalEarnings / totalTrips);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Earnings</Text>
        <Text style={styles.subtitle}>Track your delivery income</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.statsContainer}>
          <Card style={styles.statCard}>
            <DollarSign size={24} color="#10B981" />
            <Text style={styles.statNumber}>${totalEarnings}</Text>
            <Text style={styles.statLabel}>This Week</Text>
          </Card>
          
          <Card style={styles.statCard}>
            <TrendingUp size={24} color="#2563EB" />
            <Text style={styles.statNumber}>${averagePerTrip}</Text>
            <Text style={styles.statLabel}>Per Trip</Text>
          </Card>
          
          <Card style={styles.statCard}>
            <Calendar size={24} color="#F59E0B" />
            <Text style={styles.statNumber}>{totalTrips}</Text>
            <Text style={styles.statLabel}>Total Trips</Text>
          </Card>
        </View>

        <Card>
          <Text style={styles.sectionTitle}>Daily Breakdown</Text>
          <View style={styles.earningsList}>
            {earningsData.map((earning, index) => (
              <View key={earning.date} style={styles.earningItem}>
                <View style={styles.earningDate}>
                  <Text style={styles.earningDateText}>
                    {new Date(earning.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </Text>
                  <Text style={styles.earningTrips}>{earning.trips} trips</Text>
                </View>
                <Text style={styles.earningAmount}>${earning.amount}</Text>
              </View>
            ))}
          </View>
        </Card>

        <Card>
          <Text style={styles.sectionTitle}>Payment Methods</Text>
          <View style={styles.paymentMethods}>
            <View style={styles.paymentMethod}>
              <View style={styles.paymentMethodInfo}>
                <Text style={styles.paymentMethodTitle}>Bank Account</Text>
                <Text style={styles.paymentMethodSubtitle}>**** 1234</Text>
              </View>
              <Text style={styles.paymentMethodStatus}>Active</Text>
            </View>
            <View style={styles.paymentMethod}>
              <View style={styles.paymentMethodInfo}>
                <Text style={styles.paymentMethodTitle}>PayPal</Text>
                <Text style={styles.paymentMethodSubtitle}>driver@email.com</Text>
              </View>
              <Text style={styles.paymentMethodStatus}>Connected</Text>
            </View>
          </View>
        </Card>
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
  statsContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 12,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  earningsList: {
    gap: 12,
  },
  earningItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  earningDate: {
    flex: 1,
  },
  earningDateText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  earningTrips: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  earningAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#10B981',
  },
  paymentMethods: {
    gap: 16,
  },
  paymentMethod: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentMethodInfo: {
    flex: 1,
  },
  paymentMethodTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  paymentMethodSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  paymentMethodStatus: {
    fontSize: 14,
    fontWeight: '500',
    color: '#10B981',
  },
});