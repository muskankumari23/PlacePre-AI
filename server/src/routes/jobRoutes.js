import express from "express";
import { createJob } from "../controllers/jobController.js";
import { protect } from "../middlewares/authMiddleware.js";
import {
  createJob,
  getAllJobs,
  getJobById,
  applyJob,
  getAppliedJobs
} from "../controllers/jobController.js";
const router = express.Router();

router.get("/", getAllJobs);
router.get("/applied", protect, getAppliedJobs);
router.get("/:id", getJobById);
router.post("/", protect, createJob);
router.post("/:id/apply", protect, applyJob);
export default router;