import express from "express";

import {
  generateQuestions,
  submitAnswers,
  getInterviewHistory,
  getInterviewById,
  deleteInterview,
} from "../controllers/interviewController.js";

import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Generate Interview Questions
router.post("/generate", protect, generateQuestions);

// Submit Interview Answers
router.post("/submit", protect, submitAnswers);

// Interview History
router.get("/history", protect, getInterviewHistory);

// Single Interview
router.get("/:id", protect, getInterviewById);

// Delete Interview
router.delete("/:id", protect, deleteInterview);

export default router;