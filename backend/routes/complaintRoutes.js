import express from "express";
import {
  submitComplaint,
  getMyComplaints,
  getAllComplaints,
  updateStatus,
} from "../controllers/complaintController.js";
import { protect } from "../middleware/authMiddileware.js";
import { isAdmin } from "../middleware/isAdmin.js";

const router = express.Router();

// Citizen routes
router.post("/", protect, submitComplaint);
router.get("/my", protect, getMyComplaints);

// Admin routes
router.get("/all", protect, isAdmin, getAllComplaints);
router.patch("/:id/status", protect, isAdmin, updateStatus);

export default router;
