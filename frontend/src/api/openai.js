import axios from "axios";

const API_KEY = 'AIzaSyBoZImjE7DjOiuA5azFjq5lSEVYNxa5qOc';

export const getTreatment = async (disease, severity, percentage) => {
  const prompt = `
  Tea Leaf Disease: ${disease} (${severity} – ${percentage}%)
  
  Provide a detailed treatment plan, including:
  1. Symptoms & effects
  2. Step-by-step medication & treatment
  3. Preventive measures
  `;

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Error fetching treatment:", error);

    if (error.response) {
      const { status, data } = error.response;
      
      if (status === 429) {
        return "Error: Too many requests. Try again later.";
      }

      return `Error: ${data.error.message}`;
    }

    return "Failed to get treatment. Please try again.";
  }
};

