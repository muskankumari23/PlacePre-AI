import express from "express";
import { createResume } from "../controllers/resumeController.js";
import { protect } from "../middlewares/authMiddleware.js";
import {
  createResume,
  getResume,
  updateResume,
} from "../controllers/resumeController.js";

const router = express.Router();

router.post("/", protect, createResume);
router.get("/", protect, getResume);
router.put("/", protect, updateResume);

export default router;