import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectDB from "./config/database.js";

const PORT = process.env.PORT || 5000;

// console.log("Mongo URI:", process.env.MONGODB_URI);

connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});