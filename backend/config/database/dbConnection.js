import mongoose from "mongoose";
import { config } from "dotenv"; // Import dotenv
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from the config.env file
config({ path: path.join(__dirname, "../config.env") });

export const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "hospital_Management", // Ensure this matches your actual MongoDB database name
    })
    .then(() => {
      console.log("Connected to database!");
    })
    .catch((err) => {
      console.log("Some error occurred while connecting to database:", err);
    });
};
