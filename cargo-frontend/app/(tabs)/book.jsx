import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { router } from 'expo-router';
import { MapPin, Package, CreditCard } from 'lucide-react-native';
import { useShipments } from '@/contexts/ShipmentContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function BookShipmentScreen() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [pickupAddress, setPickupAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const [deliveryAddress, setDeliveryAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const [packageDetails, setPackageDetails] = useState({
    weight: 0,
    dimensions: { length: 0, width: 0, height: 0 },
    type: 'standard',
    description: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('cash');

  const { createShipment } = useShipments();

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      handleBookShipment();
    }
  };

  const handleBookShipment = async () => {
    if (!isFormValid()) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const completePickup = {
        id: '1',
        label: 'Pickup Location',
        ...pickupAddress,
        coordinates: { latitude: 0, longitude: 0 },
      };

      const completeDelivery = {
        id: '2',
        label: 'Delivery Location',
        ...deliveryAddress,
        coordinates: { latitude: 0, longitude: 0 },
      };

      const completePackage = packageDetails;

      const shipment = await createShipment({
        pickupAddress: completePickup,
        deliveryAddress: completeDelivery,
        package: completePackage,
        paymentMethod,
      });

      Alert.alert('Success', 'Shipment booked successfully!', [
        { text: 'OK', onPress: () => router.push(`/shipment/${shipment.id}`) }
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to book shipment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = () => {
    return (
      pickupAddress.street && pickupAddress.city &&
      deliveryAddress.street && deliveryAddress.city &&
      packageDetails.weight && packageDetails.weight > 0
    );
  };

  const renderStepIndicator = () => (
    <View style={styles.stepIndicator}>
      {[1, 2, 3].map((stepNumber) => (
        <View key={stepNumber} style={styles.stepIndicatorContainer}>
          <View style={[
            styles.stepCircle,
            step >= stepNumber && styles.stepCircleActive,
          ]}>
            <Text style={[
              styles.stepText,
              step >= stepNumber && styles.stepTextActive,
            ]}>
              {stepNumber}
            </Text>
          </View>
          {stepNumber < 3 && (
            <View style={[
              styles.stepLine,
              step > stepNumber && styles.stepLineActive,
            ]} />
          )}
        </View>
      ))}
    </View>
  );

  const renderAddressStep = () => (
    <View style={styles.stepContent}>
      <Card style={styles.addressCard}>
        <View style={styles.addressHeader}>
          <MapPin size={20} color="#2563EB" />
          <Text style={styles.addressTitle}>Pickup Address</Text>
        </View>
        <Input
          label="Street Address"
          value={pickupAddress.street}
          onChangeText={(value) => setPickupAddress(prev => ({ ...prev, street: value }))}
          placeholder="Enter pickup address"
        />
        <View style={styles.addressRow}>
          <Input
            label="City"
            value={pickupAddress.city}
            onChangeText={(value) => setPickupAddress(prev => ({ ...prev, city: value }))}
            placeholder="City"
            containerStyle={styles.addressInput}
          />
          <Input
            label="State"
            value={pickupAddress.state}
            onChangeText={(value) => setPickupAddress(prev => ({ ...prev, state: value }))}
            placeholder="State"
            containerStyle={styles.addressInput}
          />
        </View>
        <Input
          label="ZIP Code"
          value={pickupAddress.zipCode}
          onChangeText={(value) => setPickupAddress(prev => ({ ...prev, zipCode: value }))}
          placeholder="ZIP Code"
          keyboardType="numeric"
        />
      </Card>

      <Card style={styles.addressCard}>
        <View style={styles.addressHeader}>
          <MapPin size={20} color="#10B981" />
          <Text style={styles.addressTitle}>Delivery Address</Text>
        </View>
        <Input
          label="Street Address"
          value={deliveryAddress.street}
          onChangeText={(value) => setDeliveryAddress(prev => ({ ...prev, street: value }))}
          placeholder="Enter delivery address"
        />
        <View style={styles.addressRow}>
          <Input
            label="City"
            value={deliveryAddress.city}
            onChangeText={(value) => setDeliveryAddress(prev => ({ ...prev, city: value }))}
            placeholder="City"
            containerStyle={styles.addressInput}
          />
          <Input
            label="State"
            value={deliveryAddress.state}
            onChangeText={(value) => setDeliveryAddress(prev => ({ ...prev, state: value }))}
            placeholder="State"
            containerStyle={styles.addressInput}
          />
        </View>
        <Input
          label="ZIP Code"
          value={deliveryAddress.zipCode}
          onChangeText={(value) => setDeliveryAddress(prev => ({ ...prev, zipCode: value }))}
          placeholder="ZIP Code"
          keyboardType="numeric"
        />
      </Card>
    </View>
  );

  const renderPackageStep = () => (
    <View style={styles.stepContent}>
      <Card>
        <View style={styles.addressHeader}>
          <Package size={20} color="#2563EB" />
          <Text style={styles.addressTitle}>Package Details</Text>
        </View>
        
        <Input
          label="Weight (kg)"
          value={packageDetails.weight?.toString() || ''}
          onChangeText={(value) => setPackageDetails(prev => ({ 
            ...prev, 
            weight: parseFloat(value) || 0 
          }))}
          placeholder="Enter weight"
          keyboardType="numeric"
        />

        <Text style={styles.dimensionsLabel}>Dimensions (cm)</Text>
        <View style={styles.dimensionsRow}>
          <Input
            label="Length"
            value={packageDetails.dimensions?.length?.toString() || ''}
            onChangeText={(value) => setPackageDetails(prev => ({
              ...prev,
              dimensions: { 
                ...prev.dimensions, 
                length: parseFloat(value) || 0 
              }
            }))}
            placeholder="L"
            keyboardType="numeric"
            containerStyle={styles.dimensionInput}
          />
          <Input
            label="Width"
            value={packageDetails.dimensions?.width?.toString() || ''}
            onChangeText={(value) => setPackageDetails(prev => ({
              ...prev,
              dimensions: { 
                ...prev.dimensions, 
                width: parseFloat(value) || 0 
              }
            }))}
            placeholder="W"
            keyboardType="numeric"
            containerStyle={styles.dimensionInput}
          />
          <Input
            label="Height"
            value={packageDetails.dimensions?.height?.toString() || ''}
            onChangeText={(value) => setPackageDetails(prev => ({
              ...prev,
              dimensions: { 
                ...prev.dimensions, 
                height: parseFloat(value) || 0 
              }
            }))}
            placeholder="H"
            keyboardType="numeric"
            containerStyle={styles.dimensionInput}
          />
        </View>

        <Text style={styles.typeLabel}>Package Type</Text>
        <View style={styles.typeButtons}>
          {['standard', 'fragile', 'electronics', 'documents'].map((type) => (
            <Button
              key={type}
              title={type.charAt(0).toUpperCase() + type.slice(1)}
              onPress={() => setPackageDetails(prev => ({ ...prev, type }))}
              variant={packageDetails.type === type ? 'primary' : 'outline'}
              size="small"
              style={styles.typeButton}
            />
          ))}
        </View>

        <Input
          label="Description (Optional)"
          value={packageDetails.description}
          onChangeText={(value) => setPackageDetails(prev => ({ ...prev, description: value }))}
          placeholder="Package description"
          multiline
          numberOfLines={3}
        />
      </Card>
    </View>
  );

  const renderPaymentStep = () => (
    <View style={styles.stepContent}>
      <Card>
        <View style={styles.addressHeader}>
          <CreditCard size={20} color="#2563EB" />
          <Text style={styles.addressTitle}>Payment Method</Text>
        </View>

        <View style={styles.paymentMethods}>
          {[
            { key: 'cash', title: 'Cash on Delivery', subtitle: 'Pay when delivered' },
            { key: 'stripe', title: 'Credit Card', subtitle: 'Stripe payment' },
            { key: 'paypal', title: 'PayPal', subtitle: 'PayPal account' },
          ].map((method) => (
            <Button
              key={method.key}
              title={`${method.title} - ${method.subtitle}`}
              onPress={() => setPaymentMethod(method.key)}
              variant={paymentMethod === method.key ? 'primary' : 'outline'}
              style={styles.paymentMethodButton}
            />
          ))}
        </View>

        <Card style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Booking Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>From:</Text>
            <Text style={styles.summaryValue}>{pickupAddress.city}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>To:</Text>
            <Text style={styles.summaryValue}>{deliveryAddress.city}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Weight:</Text>
            <Text style={styles.summaryValue}>{packageDetails.weight}kg</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Estimated Cost:</Text>
            <Text style={[styles.summaryValue, styles.summaryPrice]}>
              ${Math.round((packageDetails.weight || 0) * 2 + 10)}
            </Text>
          </View>
        </Card>
      </Card>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Book Shipment</Text>
        {renderStepIndicator()}
      </View>

      <ScrollView style={styles.content}>
        {step === 1 && renderAddressStep()}
        {step === 2 && renderPackageStep()}
        {step === 3 && renderPaymentStep()}
      </ScrollView>

      <View style={styles.footer}>
        {step > 1 && (
          <Button
            title="Back"
            onPress={() => setStep(step - 1)}
            variant="outline"
            style={styles.backButton}
          />
        )}
        <Button
          title={step === 3 ? 'Book Shipment' : 'Next'}
          onPress={handleNext}
          loading={loading}
          style={styles.nextButton}
        />
      </View>
    </View>
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
  title: { fontSize: 24, fontWeight: '700', color: '#1F2937', marginBottom: 24 },
  stepIndicator: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  stepIndicatorContainer: { flexDirection: 'row', alignItems: 'center' },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepCircleActive: { backgroundColor: '#2563EB' },
  stepText: { fontSize: 14, fontWeight: '600', color: '#6B7280' },
  stepTextActive: { color: '#FFFFFF' },
  stepLine: { width: 40, height: 2, backgroundColor: '#E5E7EB', marginHorizontal: 8 },
  stepLineActive: { backgroundColor: '#2563EB' },
  content: { flex: 1, padding: 16 },
  stepContent: { gap: 16 },
  addressCard: { marginBottom: 16 },
  addressHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  addressTitle: { fontSize: 18, fontWeight: '600', color: '#1F2937', marginLeft: 8 },
  addressRow: { flexDirection: 'row', gap: 12 },
  addressInput: { flex: 1 },
  dimensionsLabel: { fontSize: 16, fontWeight: '500', color: '#374151', marginBottom: 8, marginTop: 8 },
  dimensionsRow: { flexDirection: 'row', gap: 12 },
  dimensionInput: { flex: 1 },
  typeLabel: { fontSize: 16, fontWeight: '500', color: '#374151', marginBottom: 12, marginTop: 16 },
  typeButtons: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  typeButton: { flex: 1, minWidth: '45%' },
  paymentMethods: { gap: 12, marginBottom: 24 },
  paymentMethodButton: { justifyContent: 'flex-start' },
  summaryCard: { backgroundColor: '#F9FAFB' },
  summaryTitle: { fontSize: 16, fontWeight: '600', color: '#1F2937', marginBottom: 12 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  summaryLabel: { fontSize: 14, color: '#6B7280' },
  summaryValue: { fontSize: 14, fontWeight: '500', color: '#1F2937' },
  summaryPrice: { fontSize: 18, fontWeight: '700', color: '#2563EB' },
  footer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    gap: 12,
  },
  backButton: { flex: 1 },
  nextButton: { flex: 2 },
});
