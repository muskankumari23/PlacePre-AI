import express from "express";
import { createResume } from "../controllers/resumeController.js";
import { protect } from "../middlewares/authMiddleware.js";
import {
  createResume,
  getResume,
} from "../controllers/resumeController.js";

const router = express.Router();

router.post("/", protect, createResume);
router.get("/", protect, getResume);

export default router;