import express from "express";
import { addStaff, getAllStaff } from "../controller/staffController.js"; // Import the controller including getAllStaff
import { isAdminAuthenticated } from "../middlewares/auth.js"; // Import authentication middleware

const router = express.Router();

// Route to add new staff
router.post("/add", isAdminAuthenticated, addStaff);

// Route to get all staff
router.get("/", isAdminAuthenticated, getAllStaff); // Ensure this route is defined

export default router;
