import express from "express";
import { createShipment, getUserShipments, updateShipmentStatus } from "../controllers/shipmentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/", protect, createShipment);
router.get("/", protect, getUserShipments);
router.put("/:shipmentId/status", protect, updateShipmentStatus);

export default router;
    