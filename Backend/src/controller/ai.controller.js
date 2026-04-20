import { config } from "../config/config.js";
import axios from "axios";

export const aiAutomationDescriptionController = async (req, res) => {
  try {
    const { foodName } = req.body;

    if (!foodName || foodName.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Food name is required",
      });
    }

    const prompt = `Generate a short (max 20 words), attractive food description for "${foodName}". Make it suitable for a food delivery app menu. Do not use emojis.`;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${config.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }
    );

    // Safe response extraction
    let description =
      response?.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    // Fallback if no description is returned
    if (!description) {
      description = "Delicious food made with fresh ingredients.";
    }

    // Clean text
    description = description.replace(/\n/g, "").trim();

    res.status(201).json({
      success: true,
      message: "Description generated successfully",
      data: description,
    });
  } catch (error) {
    console.log("AI ERROR:", error?.response?.data || error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to generate description",
    });
  }
};