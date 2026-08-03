import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  createJob,
  getAllJobs,
  getJobById,
  applyJob,
  getAppliedJobs,
  updateJob,
  deleteJob,
} from "../controllers/jobController.js";
const router = express.Router();

router.get("/", getAllJobs);
router.get("/applied", protect, getAppliedJobs);
router.get("/:id", getJobById);
router.post("/", protect, createJob);
router.post("/:id/apply", protect, applyJob);
router.put("/:id", protect, updateJob);
router.delete("/:id", protect, deleteJob);
export default router;