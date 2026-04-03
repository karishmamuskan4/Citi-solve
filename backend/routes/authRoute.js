import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddileware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/dashboard", protect, (req, res) => {
  res.json({
    message: "Protected route working",
    user: req.user,
  });
});

export default router;
