import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function getGeminiResponse(prompt) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const result = await model.generateContent(prompt);
  return result.response.text();
}

app.post("/api/analyze", async (req, res) => {
  const inputData = req.body; // whatever data the client sends

  if (!inputData) {
    return res.status(400).json({ error: "Missing input data" });
  }

  // ✅ build your full critic prompt dynamically
  const prompt = `
You are an environmental critic assessing the sustainability of products and services.
Decide how gravely each of the following data points affects the environment.
Research the product and brand and grant it a rating from 1-5.
(p=product, s=service)

Consider:
- Pollution and emissions
- Ecosystem and resource damage
- Use of recycled/reused materials
- Local production
- Certifications (Green Seal, FSC, Rainforest Alliance, Energy Star, Fair Trade, GOTS, ISO 14001, GBB, USDA Organic, One Percent for the Planet, Carbon Neutral, GREENGUARD, Certified Vegan, etc.)

Be critical and strict (but still fair: with a soft spot for environmental alternatives) and provide in THE EXACT FORMAT...:
A rating from 1 to 5  (rating/5): Rating can have one decimal points at random.
THREE-FOUR SENTENCE EXPLANATION (100 chars max)
Don't include extra text OR ANY numbers in the explanation. Just provide the rating and explanation. No emojis.

Product data: ${JSON.stringify(inputData, null, 2)}
`;

  try {
    const response = await getGeminiResponse(prompt);
    console.log("Gemini response:", response);
    res.json({ response });
  } catch (error) {
    console.error("Error getting response from Gemini:", error);
    res.status(500).json({ error: "Failed to get response from Gemini" });
  }
});

app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});
