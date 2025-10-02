import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function StatusBadge({ status, size = 'medium' }) {
  const getStatusConfig = () => {
    switch (status) {
      case 'created':
        return { color: '#3B82F6', backgroundColor: '#DBEAFE', text: 'Created' };
      case 'assigned':
        return { color: '#F59E0B', backgroundColor: '#FEF3C7', text: 'Assigned' };
      case 'picked_up':
        return { color: '#8B5CF6', backgroundColor: '#EDE9FE', text: 'Picked Up' };
      case 'in_transit':
        return { color: '#F59E0B', backgroundColor: '#FEF3C7', text: 'In Transit' };
      case 'delivered':
        return { color: '#10B981', backgroundColor: '#D1FAE5', text: 'Delivered' };
      case 'cancelled':
        return { color: '#EF4444', backgroundColor: '#FEE2E2', text: 'Cancelled' };
      default:
        return { color: '#6B7280', backgroundColor: '#F3F4F6', text: 'Unknown' };
    }
  };

  const { color, backgroundColor, text } = getStatusConfig();

  return (
    <View
      style={[
        styles.badge,
        { backgroundColor },
        size === 'small' && styles.smallBadge,
      ]}
    >
      <Text
        style={[
          styles.text,
          { color },
          size === 'small' && styles.smallText,
        ]}
      >
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  smallBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
  },
  smallText: {
    fontSize: 12,
  },
});
