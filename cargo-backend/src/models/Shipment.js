import mongoose from "mongoose";

const shipmentSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  pickupAddress: {
    street: String, city: String, state: String, zipCode: String,
    coordinates: { latitude: Number, longitude: Number }
  },
  deliveryAddress: {
    street: String, city: String, state: String, zipCode: String,
    coordinates: { latitude: Number, longitude: Number }
  },
  package: {
    weight: Number,
    dimensions: { length: Number, width: Number, height: Number },
    type: { type: String, enum: ["fragile", "standard", "electronics", "documents"] }
  },
  status: { type: String, enum: ["created", "assigned", "picked_up", "in_transit", "delivered", "cancelled"], default: "created" },
  estimatedCost: Number,
  estimatedDeliveryTime: String,
  paymentMethod: { type: String, enum: ["stripe", "paypal", "cash"] },
  paymentStatus: { type: String, enum: ["pending", "paid", "failed"], default: "pending" }
}, { timestamps: true });

export default mongoose.model("Shipment", shipmentSchema);
