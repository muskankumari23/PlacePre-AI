import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { getStudentDashboard } from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/", protect, getStudentDashboard);

export default router;