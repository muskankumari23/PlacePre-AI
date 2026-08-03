import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  generateQuestions,
  submitAnswers,
  getInterviewHistory,
  getInterviewById,
  deleteInterview,
} from "../controllers/interviewController.js";

const router = express.Router();

router.post("/generate", protect, generateQuestions);
router.post("/submit", protect, submitAnswers);
router.get("/history", protect, getInterviewHistory);
router.get("/:id", protect, getInterviewById);
router.delete("/:id", protect, deleteInterview);

export default router;
