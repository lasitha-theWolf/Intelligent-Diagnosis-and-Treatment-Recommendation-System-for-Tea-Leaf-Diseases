import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";
import OpenAI from "openai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Expanded disease database with multiple treatment options
const diseaseDatabase = {
  "Algal Leaf Spot": {
    severity: "Moderate",
    treatments: [
      "Prune affected leaves and improve air circulation. Apply a copper-based fungicide if necessary.",
      "Use neem oil spray weekly to control algae growth.",
      "Avoid overhead watering and ensure proper drainage to reduce moisture.",
    ],
    accuracy: 75,
  },
  "Grey Blight Disease": {
    severity: "Mild",
    treatments: [
      "Remove and destroy affected leaves, then apply a fungicide like mancozeb.",
      "Spray with a mixture of baking soda and water (1 tsp per liter) as a natural remedy.",
      "Increase plant spacing to enhance airflow and reduce humidity.",
    ],
    accuracy: 80,
  },
  "Brown Blight": {
    severity: "Severe",
    treatments: [
      "Cut back affected areas and apply a systemic fungicide like thiophanate-methyl.",
      "Burn or bury pruned debris to prevent spore spread.",
      "Apply a compost tea spray to boost plant immunity.",
    ],
    accuracy: 65,
  },
  "Red Leaf Spot": {
    severity: "Moderate",
    treatments: [
      "Improve soil drainage and apply a sulfur-based fungicide.",
      "Use a potassium bicarbonate spray to reduce fungal growth.",
      "Mulch around the plant base to prevent soil splash onto leaves.",
    ],
    accuracy: 70,
  },
  "White Spot": {
    severity: "Mild",
    treatments: [
      "Increase sunlight exposure and apply a foliar fungicide like chlorothalonil.",
      "Spray with diluted milk (1:9 milk-to-water ratio) as an organic treatment.",
      "Remove infected leaves and avoid wetting foliage during watering.",
    ],
    accuracy: 85,
  },
};

export const analyzeAiPipeline = async (req, res) => {
  let imagePath;

  try {
    console.log("Route /segmentation/ai-pipeline hit");
    console.log("Request files:", req.files);

    if (!req.files || !req.files.image) {
      console.log("No image uploaded");
      return res.status(400).json({ error: "No image uploaded" });
    }

    const image = req.files.image;
    imagePath = path.join(__dirname, "../uploads", image.name);
    const uploadDir = path.join(__dirname, "../uploads");

    try {
      await fs.access(uploadDir);
    } catch {
      await fs.mkdir(uploadDir, { recursive: true });
      console.log("Uploads directory created");
    }

    await image.mv(imagePath);
    console.log(`Image moved to: ${imagePath}`);

    const imageBuffer = await fs.readFile(imagePath);
    const base64Image = imageBuffer.toString("base64");

    // Step 1: Identify Leaf Type
    const leafTypeResponse = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Identify if this leaf is a tea leaf, coconut leaf, or mango leaf. Return only the leaf type as plain text (e.g., 'tea leaf').",
            },
            {
              type: "image_url",
              image_url: { url: `data:image/jpeg;base64,${base64Image}` },
            },
          ],
        },
      ],
      max_tokens: 50,
    });
    const leafType = leafTypeResponse.choices[0].message.content.trim().toLowerCase();
    const result = { leafType };
    console.log("Step 1 - Leaf type identified:", leafType);

    // Step 2: Check Tea Leaf Health (if tea leaf)
    if (leafType.includes("tea")) {
      const healthResponse = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Is this tea leaf healthy? Return only 'healthy' or 'unhealthy' as plain text.",
              },
              {
                type: "image_url",
                image_url: { url: `data:image/jpeg;base64,${base64Image}` },
              },
            ],
          },
        ],
        max_tokens: 50,
      });
      const isHealthy = healthResponse.choices[0].message.content.trim() === "healthy";
      result.isHealthy = isHealthy;
      console.log("Step 2 - Health status:", isHealthy ? "healthy" : "unhealthy");

      // Step 3 & 4: Disease Detection and Treatment (if unhealthy tea leaf)
      if (!isHealthy) {
        // Simulate disease detection (replace this with a real ML model later)
        const diseaseOptions = Object.keys(diseaseDatabase);
        const simulatedDiseaseResponse = await openai.chat.completions.create({
          model: "gpt-4o",
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: `Based on the image, suggest a likely tea leaf disease from these options: ${diseaseOptions.join(", ")}. Return only the disease name as plain text (e.g., 'Algal Leaf Spot'). If uncertain, return 'Unknown'.`,
                },
                {
                  type: "image_url",
                  image_url: { url: `data:image/jpeg;base64,${base64Image}` },
                },
              ],
            },
          ],
          max_tokens: 50,
        });
        const detectedDisease = simulatedDiseaseResponse.choices[0].message.content.trim();
        console.log("Step 3 - Simulated disease detection:", detectedDisease);

        if (detectedDisease !== "Unknown" && diseaseDatabase[detectedDisease]) {
          const { severity, treatments, accuracy } = diseaseDatabase[detectedDisease];
          result.disease = detectedDisease;
          result.method = "Simulated Detection"; // Placeholder until ML model is integrated
          result.accuracy = accuracy;
          result.severity = severity;
          result.treatments = treatments; // Return array of treatments
          console.log("Step 3 & 4 - Disease result:", { disease: detectedDisease, accuracy, severity, treatments });
        } else {
          result.disease = "Unknown";
          result.method = "Simulated Detection";
          result.accuracy = 10;
          result.severity = "Unknown";
          result.treatments = ["Unable to identify disease with confidence. Consult a plant pathology expert."];
          console.log("Step 3 & 4 - Unknown disease detected");
        }
      } else {
        result.severity = "N/A";
        result.treatments = ["Leaf is healthy, no treatment required"];
        console.log("Step 3 & 4 - Skipped: Leaf is healthy");
      }
    } else {
      result.message = "This pipeline only processes tea leaves. Detected leaf type: " + leafType;
      console.log("Step 2 - Skipped: Not a tea leaf");
    }

    await fs.unlink(imagePath);
    console.log("Image file cleaned up");
    res.status(200).json(result);
  } catch (error) {
    console.error("Error in analyzeAiPipeline:", error);
    if (imagePath) {
      try {
        await fs.unlink(imagePath);
        console.log("Cleanup successful despite error");
      } catch (cleanupError) {
        console.error("Cleanup failed:", cleanupError);
      }
    }
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};