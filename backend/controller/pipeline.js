import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";
import OpenAI from "openai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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
              text: "Identify if this leaf is a tea leaf, coconut leaf, or mango leaf. Return only the leaf type as plain text.if image not leaf return not a leaf",
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
        model: "gpt-4o-mini",
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

      // Step 3: Disease Detection (if unhealthy tea leaf)
      if (!isHealthy) {
        // CNN Path
        const cnnResponse = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: "Identify the tea leaf disease using CNN. Options: Algal Leaf Spot, Grey Blight Disease, Brown Blight, Red Leaf Spot, White Spot. Return as JSON in this format: {\"disease\": \"disease_name\", \"accuracy\": number}. If unable to identify, return {\"disease\": \"Unknown\", \"accuracy\": 0}.",
                },
                {
                  type: "image_url",
                  image_url: { url: `data:image/jpeg;base64,${base64Image}` },
                },
              ],
            },
          ],
          max_tokens: 100,
        });
        let cnnResult;
        try {
          cnnResult = JSON.parse(cnnResponse.choices[0].message.content);
          console.log("Step 3 - CNN Raw Response:", cnnResponse.choices[0].message.content);
        } catch (parseError) {
          console.error("CNN JSON Parse Error:", parseError.message);
          console.log("CNN Raw Response:", cnnResponse.choices[0].message.content);
          cnnResult = { disease: "Unknown", accuracy: 0 }; // Fallback
        }

        // Semantic Segmentation Path
        const segResponse = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: "Identify the tea leaf disease using semantic segmentation. Options: Algal Leaf Spot, Grey Blight Disease, Brown Blight, Red Leaf Spot, White Spot. Return as JSON in this format: {\"disease\": \"disease_name\", \"accuracy\": number}. If unable to identify, return {\"disease\": \"Unknown\", \"accuracy\": 0}.",
                },
                {
                  type: "image_url",
                  image_url: { url: `data:image/jpeg;base64,${base64Image}` },
                },
              ],
            },
          ],
          max_tokens: 100,
        });
        let segResult;
        try {
          segResult = JSON.parse(segResponse.choices[0].message.content);
          console.log("Step 3 - Segmentation Raw Response:", segResponse.choices[0].message.content);
        } catch (parseError) {
          console.error("Segmentation JSON Parse Error:", parseError.message);
          console.log("Segmentation Raw Response:", segResponse.choices[0].message.content);
          segResult = { disease: "Unknown", accuracy: 0 }; // Fallback
        }

        // Choose higher accuracy
        const bestResult = cnnResult.accuracy > segResult.accuracy ? cnnResult : segResult;
        result.disease = bestResult.disease;
        result.method = cnnResult.accuracy > segResult.accuracy ? "CNN" : "Semantic Segmentation";
        result.accuracy = bestResult.accuracy;
        console.log("Step 3 - Best result:", bestResult);

        // Step 4: Severity and Treatment (only if disease identified)
        if (bestResult.disease !== "Unknown") {
          const severityResponse = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
              {
                role: "user",
                content: [
                  {
                    type: "text",
                    text: `For a tea leaf with ${bestResult.disease}, determine severity (Mild, Moderate, Severe) and recommend treatment. Return as JSON in this format: {"severity": "value", "treatment": "value"}. If unable to determine, return {"severity": "Unknown", "treatment": "Contact a specialist"}.`,
                  },
                  {
                    type: "image_url",
                    image_url: { url: `data:image/jpeg;base64,${base64Image}` },
                  },
                ],
              },
            ],
            max_tokens: 200,
          });
          let severityResult;
          try {
            severityResult = JSON.parse(severityResponse.choices[0].message.content);
            console.log("Step 4 - Severity Raw Response:", severityResponse.choices[0].message.content);
          } catch (parseError) {
            console.error("Severity JSON Parse Error:", parseError.message);
            console.log("Severity Raw Response:", severityResponse.choices[0].message.content);
            severityResult = { severity: "Unknown", treatment: "Contact a specialist" }; // Fallback
          }
          result.severity = severityResult.severity;
          result.treatment = severityResult.treatment;
          console.log("Step 4 - Severity and Treatment:", severityResult);
        } else {
          result.severity = "Unknown";
          result.treatment = "Unable to identify disease";
          console.log("Step 4 - Skipped: No valid disease identified");
        }
      }
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