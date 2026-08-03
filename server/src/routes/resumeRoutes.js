import express from "express";
import { createResume } from "../controllers/resumeController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createResume);

export default router;