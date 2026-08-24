import { Router } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { authenticate, requireRole } from '../middlewares/auth.js';
import type { AuthRequest } from '../middlewares/auth.js';

const router = Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

router.post('/classify', authenticate, requireRole(['CITIZEN']), async (req: AuthRequest, res) => {
  try {
    const { image } = req.body; // base64 image string

    if (!image) {
      return res.status(400).json({ error: 'Image is required' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: 'Gemini API key is missing on the server' });
    }

    // Prepare image for Gemini
    // base64 image usually comes as: data:image/jpeg;base64,/9j/4AAQ...
    const base64Data = image.split(',')[1];
    const mimeType = image.split(';')[0].split(':')[1];

    const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash" });

    const prompt = `
      You are an expert waste classification AI for a smart-city system.
      Analyze the provided image and classify the waste into exactly one of the following categories:
      Organic, Plastic, Paper, Glass, Metal, E-Waste, Mixed, Other.

      IMPORTANT INSTRUCTION FOR RECYCLABLES: Empty bottles, jars, containers, cans, and cartons (whether clean, new-looking, or dirty) should ALWAYS be classified as waste/recyclables. For example, a glass bottle or mason jar is "Glass", a plastic water bottle is "Plastic", and an aluminum can is "Metal". 
      
      Only if the image is clearly a living person, animal, natural landscape, or an active vehicle, should you respond that it is NOT waste.

      Respond STRICTLY in the following JSON format without markdown blocks:
      {
        "category": "Organic" | "Plastic" | "Paper" | "Glass" | "Metal" | "E-Waste" | "Mixed" | "Other" | "Not Waste",
        "confidence": 0.95,
        "isWaste": true/false
      }
    `;

    const imageParts = [
      {
        inlineData: {
          data: base64Data,
          mimeType
        }
      }
    ];

    const result = await model.generateContent([prompt, ...imageParts]);
    const responseText = result.response.text();
    
    // Parse the JSON string
    try {
      // Remove any potential markdown block markers
      const cleanText = responseText.replace(/```json/gi, '').replace(/```/gi, '').trim();
      const parsed = JSON.parse(cleanText);
      res.json(parsed);
    } catch (parseError) {
      console.error('Failed to parse Gemini response:', responseText);
      res.status(500).json({ error: 'AI generated invalid response format' });
    }

  } catch (error) {
    console.error('AI Classification Error:', error);
    res.status(500).json({ error: 'Failed to classify image' });
  }
});

export default router;
