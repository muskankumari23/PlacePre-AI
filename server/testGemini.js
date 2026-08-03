import dotenv from "dotenv";
import genAI from "./src/config/gemini.js";

dotenv.config();

console.log(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

async function test() {
  const result = await model.generateContent("Say Hello from Gemini");
  console.log(result.response.text());
}

test();