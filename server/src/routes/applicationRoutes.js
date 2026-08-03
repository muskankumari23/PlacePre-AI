import express from "express";

import { protect } from "../middlewares/authMiddleware.js";

import { applyJob } from "../controllers/applicationController.js";

const router = express.Router();

router.post("/:id", protect, applyJob);

export default router;