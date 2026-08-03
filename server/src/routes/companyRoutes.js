import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { getCompanyJobs } from "../controllers/companyController.js";
import {
  getCompanyJobs,
  getJobApplicants,
  updateApplicationStatus,
} from "../controllers/companyController.js";
const router = express.Router();

router.get("/jobs", protect, getCompanyJobs);
router.get("/jobs/:jobId/applicants", protect, getJobApplicants);
router.put("/applications/:applicationId/status", protect, updateApplicationStatus);

export default router;