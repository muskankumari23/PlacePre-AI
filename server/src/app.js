import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🚀 PlacePrep AI Backend Running");
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes); 

export default app;