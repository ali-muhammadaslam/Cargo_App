import Shipment from "../models/Shipment.js";

export const createShipment = async (req, res) => {
  try {
    const shipment = await Shipment.create({ ...req.body, customerId: req.user.id });
    res.status(201).json(shipment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserShipments = async (req, res) => {
  try {
    const shipments = await Shipment.find({ customerId: req.user.id });
    res.json(shipments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateShipmentStatus = async (req, res) => {
  try {
    const { shipmentId } = req.params;
    const { status } = req.body;
    const shipment = await Shipment.findByIdAndUpdate(shipmentId, { status }, { new: true });
    res.json(shipment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
