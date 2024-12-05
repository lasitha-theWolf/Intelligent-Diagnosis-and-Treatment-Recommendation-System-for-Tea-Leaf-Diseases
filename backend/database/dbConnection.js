import mongoose from "mongoose";
import { config } from "dotenv"; // Import dotenv

// Load environment variables from the .env file
config({ path: "./config/.env" }); // Adjust the path if necessary



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
