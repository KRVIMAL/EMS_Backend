import express from "express";
import {
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  authUser,
} from "../controllers/userController";
import { protect } from "../middlewares/authMiddlerware";
const router = express.Router();

router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
