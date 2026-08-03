import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  createResume,
  getResume,
  updateResume,
  deleteResume,
  addEducation,
  updateEducation,
  deleteEducation,
  addExperience,
  updateExperience,
  deleteExperience,
  addProject,
  updateProject,
  deleteProject,
  downloadResume,
} from "../controllers/resumeController.js";

const router = express.Router();

router.post("/", protect, createResume);
router.get("/", protect, getResume);
router.put("/", protect, updateResume);
router.delete("/", protect, deleteResume);

router.post("/education", protect, addEducation);
router.put("/education/:id", protect, updateEducation);
router.delete("/education/:id", protect, deleteEducation);

router.post("/experience", protect, addExperience);
router.put("/experience/:id", protect, updateExperience);
router.delete("/experience/:id", protect, deleteExperience);

router.post("/project", protect, addProject);
router.put("/project/:id", protect, updateProject);
router.delete("/project/:id", protect, deleteProject);

router.get("/download", protect, downloadResume);

export default router;