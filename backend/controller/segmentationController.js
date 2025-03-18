import OpenAI from "openai";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const analyzeLeafImage = async (req, res, next) => {


  try {
    if (!req.files || !req.files.image) {
 
      return res.status(400).json({ error: "No image uploaded" });
    }

    const image = req.files.image;

    const imagePath = path.join(__dirname, "../uploads", image.name);


    // Ensure uploads directory exists
    const uploadDir = path.join(__dirname, "../uploads");
    if (!fs.existsSync(uploadDir)) {

      fs.mkdirSync(uploadDir, { recursive: true });
    }

   
    await image.mv(imagePath);



    const imageBuffer = fs.readFileSync(imagePath);



    const base64Image = imageBuffer.toString("base64");

    const response = await openai.chat.completions.create({
      model: "gpt-4o", 
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Identify the tea leaf disease from this image. Consider only these options: Algal Leaf Spot, Grey Blight Disease, Brown Blight, Red Leaf Spot, White Spot. Return only the disease name.",
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/png;base64,${base64Image}`,
              },
            },
          ],
        },
      ],
      max_tokens: 300,
    });

    console.log("OpenAI response received:", {
      status: response.status,
      choicesCount: response.choices.length,
    });

    const diseaseAnalysis = response.choices[0].message.content;
    console.log("Disease analysis:", diseaseAnalysis);

    console.log("Attempting to delete temporary image file");
    fs.unlinkSync(imagePath);
    console.log("Temporary image file deleted");

    console.log("Sending response to frontend");
    res.status(200).json({ disease: diseaseAnalysis });
  } catch (error) {
    console.error("Error in analyzeLeafImage:", {
      message: error.message,
      stack: error.stack,
    });
    if (error.response) {
      console.error("OpenAI API error response:", {
        status: error.response.status,
        data: error.response.data,
      });
    }
    res.status(500).json({ 
      error: "Internal Server Error",
      details: error.message,
    });
  }
};

export const analyzeTeaLeafImage = async (req, res, next) => {
  try {
    if (!req.files || !req.files.image) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    const image = req.files.image;
    const imagePath = path.join(__dirname, "../uploads", image.name);

    // Ensure uploads directory exists
    const uploadDir = path.join(__dirname, "../uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    await image.mv(imagePath);
    const imageBuffer = fs.readFileSync(imagePath);
    const base64Image = imageBuffer.toString("base64");

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Identify if this image shows a tea leaf, mango leaf, or coconut leaf. if its a tea leaf identify the tea leaf healthy or not Return only the identification result as a single line. with accuray of 90% or more.",
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/png;base64,${base64Image}`,
              },
            },
          ],
        },
      ],
      max_tokens: 300,
    });

    console.log("OpenAI response received:", {
      status: response.status,
      choicesCount: response.choices.length,
    });

    const leafAnalysis = response.choices[0].message.content.trim();
    console.log("Leaf analysis:", leafAnalysis);

    console.log("Attempting to delete temporary image file");
    fs.unlinkSync(imagePath);
    console.log("Temporary image file deleted");

    console.log("Sending response to frontend");
    res.status(200).json({ leafType: leafAnalysis });
  } catch (error) {
    console.error("Error in analyzeLeafImage:", {
      message: error.message,
      stack: error.stack,
    });
    if (error.response) {
      console.error("OpenAI API error response:", {
        status: error.response.status,
        data: error.response.data,
      });
    }
    res.status(500).json({ 
      error: "Internal Server Error",
      details: error.message,
    });
  }
};

export const analyzeCNNLeafImage = async (req, res, next) => {


  try {
    if (!req.files || !req.files.image) {
 
      return res.status(400).json({ error: "No image uploaded" });
    }

    const image = req.files.image;

    const imagePath = path.join(__dirname, "../uploads", image.name);


    // Ensure uploads directory exists
    const uploadDir = path.join(__dirname, "../uploads");
    if (!fs.existsSync(uploadDir)) {

      fs.mkdirSync(uploadDir, { recursive: true });
    }

   
    await image.mv(imagePath);



    const imageBuffer = fs.readFileSync(imagePath);



    const base64Image = imageBuffer.toString("base64");

    const response = await openai.chat.completions.create({
      model: "gpt-4o", 
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Identify the tea leaf disease from this image. Consider only these options: Algal Leaf Spot, Grey Blight Disease, Brown Blight, Red Leaf Spot, White Spot. Return only the disease name.",
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/png;base64,${base64Image}`,
              },
            },
          ],
        },
      ],
      max_tokens: 300,
    });

    console.log("OpenAI response received:", {
      status: response.status,
      choicesCount: response.choices.length,
    });

    const diseaseAnalysis = response.choices[0].message.content;
    console.log("Disease analysis:", diseaseAnalysis);

    console.log("Attempting to delete temporary image file");
    fs.unlinkSync(imagePath);
    console.log("Temporary image file deleted");

    console.log("Sending response to frontend");
    res.status(200).json({ disease: diseaseAnalysis });
  } catch (error) {
    console.error("Error in analyzeLeafImage:", {
      message: error.message,
      stack: error.stack,
    });
    if (error.response) {
      console.error("OpenAI API error response:", {
        status: error.response.status,
        data: error.response.data,
      });
    }
    res.status(500).json({ 
      error: "Internal Server Error",
      details: error.message,
    });
  }
};