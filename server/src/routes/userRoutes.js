import express from "express";
import {
  getProfile,
  updateProfile,
  getAllUsers,
} from "../controllers/userController.js";

import { protect } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.get("/profile", protect, getProfile);

router.put("/profile", protect, updateProfile);

// Only Admin
router.get("/", protect, authorizeRoles("admin"), getAllUsers);

export default router;