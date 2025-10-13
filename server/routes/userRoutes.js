import express from "express";
import {
  registerUser,
  loginUser,
  updateUser,
  getUserById,
  getUserProfile,
  updateUserProfile,
  sendNotification,
} from "../controllers/userController.js";
import { protect } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

// Profile routes for logged-in User/Agent
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, upload.single("photo"), updateUserProfile); // ✅ only this one

// Register & Login
router.post("/register", upload.single("photo"), registerUser);
router.post("/login", loginUser);

// Other routes
router.put("/:id", updateUser);
router.get("/:id", getUserById);
router.post("/notify", sendNotification);

export default router;
