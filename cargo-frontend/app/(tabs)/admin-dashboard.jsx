import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Users, Package, DollarSign, TrendingUp } from 'lucide-react-native';
import { Card } from '@/components/ui/Card';
import api from '@/utils/api';

export default function AdminDashboardScreen() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/api/admin/stats');
        setStats(res.data);
      } catch (err) {
        console.log('Error fetching admin stats:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  if (!stats) {
    return (
      <View style={styles.loader}>
        <Text style={{ color: '#EF4444' }}>Failed to load dashboard</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Admin Dashboard</Text>
        <Text style={styles.subtitle}>Platform overview and analytics</Text>
      </View>

      <View style={styles.statsContainer}>
        <Card style={styles.statCard}>
          <Users size={24} color="#2563EB" />
          <Text style={styles.statNumber}>{stats.totalUsers.toLocaleString()}</Text>
          <Text style={styles.statLabel}>Total Users</Text>
        </Card>

        <Card style={styles.statCard}>
          <Package size={24} color="#10B981" />
          <Text style={styles.statNumber}>{stats.totalShipments.toLocaleString()}</Text>
          <Text style={styles.statLabel}>Shipments</Text>
        </Card>
      </View>

      <View style={styles.statsContainer}>
        <Card style={styles.statCard}>
          <TrendingUp size={24} color="#F59E0B" />
          <Text style={styles.statNumber}>{stats.activeDrivers}</Text>
          <Text style={styles.statLabel}>Active Drivers</Text>
        </Card>

        <Card style={styles.statCard}>
          <DollarSign size={24} color="#8B5CF6" />
          <Text style={styles.statNumber}>${stats.revenue.toLocaleString()}</Text>
          <Text style={styles.statLabel}>Revenue</Text>
        </Card>
      </View>

      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <View style={styles.activityList}>
          {stats.recentActivity?.length > 0 ? (
            stats.recentActivity.map((item, index) => (
              <View key={index} style={styles.activityItem}>
                <Text style={styles.activityText}>{item.text}</Text>
                <Text style={styles.activityTime}>{item.time}</Text>
              </View>
            ))
          ) : (
            <Text style={{ color: '#6B7280' }}>No recent activity</Text>
          )}
        </View>
      </Card>

      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>System Health</Text>
        <View style={styles.healthList}>
          <View style={styles.healthItem}>
            <Text style={styles.healthLabel}>Server Status</Text>
            <Text style={[styles.healthStatus, styles.healthGood]}>
              {stats.systemHealth?.server || 'Unknown'}
            </Text>
          </View>
          <View style={styles.healthItem}>
            <Text style={styles.healthLabel}>Payment Gateway</Text>
            <Text style={[styles.healthStatus, styles.healthGood]}>
              {stats.systemHealth?.payment || 'Unknown'}
            </Text>
          </View>
          <View style={styles.healthItem}>
            <Text style={styles.healthLabel}>Database</Text>
            <Text style={[styles.healthStatus, styles.healthGood]}>
              {stats.systemHealth?.database || 'Unknown'}
            </Text>
          </View>
        </View>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: { fontSize: 24, fontWeight: '700', color: '#1F2937', marginBottom: 4 },
  subtitle: { fontSize: 16, color: '#6B7280' },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  statCard: { flex: 1, alignItems: 'center', paddingVertical: 20 },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: { fontSize: 12, color: '#6B7280' },
  section: { margin: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: '#1F2937', marginBottom: 16 },
  activityList: { gap: 12 },
  activityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  activityText: { fontSize: 14, color: '#1F2937', flex: 1 },
  activityTime: { fontSize: 12, color: '#6B7280' },
  healthList: { gap: 12 },
  healthItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  healthLabel: { fontSize: 14, color: '#1F2937' },
  healthStatus: { fontSize: 14, fontWeight: '500' },
  healthGood: { color: '#10B981' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
