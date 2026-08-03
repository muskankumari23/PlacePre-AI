import express from "express";
import { createJob } from "../controllers/jobController.js";
import { protect } from "../middlewares/authMiddleware.js";
import {
  createJob,
  getAllJobs,
  getJobById,
  applyJob,
} from "../controllers/jobController.js";
const router = express.Router();

router.post("/", protect, createJob);
router.get("/", protect, getAllJobs);
router.get("/:id", protect, getJobById);
router.post("/:id/apply", protect, applyJob);

export default router;