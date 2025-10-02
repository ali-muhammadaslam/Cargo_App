import React, { createContext, useContext, useState } from 'react';

const ShipmentContext = createContext(undefined);

export function useShipments() {
  const context = useContext(ShipmentContext);
  if (!context) {
    throw new Error('useShipments must be used within a ShipmentProvider');
  }
  return context;
}

export function ShipmentProvider({ children }) {
  const [shipments, setShipments] = useState([]);
  const [activeShipment, setActiveShipment] = useState(null);

  // Create a new shipment
  const createShipment = async (data) => {
    const newShipment = {
      id: `s_${Date.now()}`,
      customerId: data.customerId || '1',
      pickupAddress: data.pickupAddress,
      deliveryAddress: data.deliveryAddress,
      package: data.package,
      status: 'created', // created, assigned, in-transit, delivered
      assignedDriverId: null, // driver assignment
      estimatedCost: calculateCost(data.package),
      estimatedDeliveryTime: '2-4 hours',
      paymentMethod: data.paymentMethod,
      paymentStatus: 'pending',
      createdAt: new Date(),
      trackingHistory: [
        {
          id: `t_${Date.now()}`,
          status: 'created',
          timestamp: new Date(),
          note: 'Shipment created successfully',
        },
      ],
    };

    setShipments((prev) => [...prev, newShipment]);
    setActiveShipment(newShipment);
    return newShipment;
  };

  // Update shipment status
  const updateShipmentStatus = (shipmentId, status, note = '') => {
    setShipments((prev) =>
      prev.map((shipment) =>
        shipment.id === shipmentId
          ? {
              ...shipment,
              status,
              trackingHistory: [
                ...shipment.trackingHistory,
                {
                  id: `t_${Date.now()}`,
                  status,
                  timestamp: new Date(),
                  note: note || `Status updated to ${status}`,
                },
              ],
            }
          : shipment
      )
    );
  };

  // Assign a shipment to a driver
  const assignShipmentToDriver = (shipmentId, driverId) => {
    setShipments((prev) =>
      prev.map((shipment) =>
        shipment.id === shipmentId
          ? { ...shipment, assignedDriverId: driverId, status: 'assigned' }
          : shipment
      )
    );
  };

  // Get shipments by customer
  const getShipmentsByUserId = (userId) => {
    return shipments.filter((shipment) => shipment.customerId === userId);
  };

  // Get available shipments for drivers (created and unassigned)
  const getAvailableShipments = async () => {
    // simulate async call
    await new Promise((resolve) => setTimeout(resolve, 300));
    return shipments.filter(
      (shipment) => shipment.status === 'created' && !shipment.assignedDriverId
    );
  };

  // Simple cost calculator
  const calculateCost = (pkg) => {
    const baseRate = 10;
    const weightRate = pkg.weight * 2;
    const typeMultiplier = pkg.type === 'fragile' ? 1.5 : 1;
    return Math.round((baseRate + weightRate) * typeMultiplier);
  };

  return (
    <ShipmentContext.Provider
      value={{
        shipments,
        activeShipment,
        createShipment,
        updateShipmentStatus,
        assignShipmentToDriver,
        getShipmentsByUserId,
        getAvailableShipments,
      }}
    >
      {children}
    </ShipmentContext.Provider>
  );
}
