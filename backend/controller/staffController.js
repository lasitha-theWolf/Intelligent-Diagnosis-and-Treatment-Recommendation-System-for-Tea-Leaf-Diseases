import { Staff } from "../models/staffSchema.js"; // Import your staff model
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js"; 
import ErrorHandler from "../middlewares/error.js";

// Function to add staff
export const addStaff = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, role } = req.body;

  // Validation
  if (!firstName || !lastName || !email || !phone || !role) {
    return next(new ErrorHandler("Please fill all fields!", 400));
  }

  const newStaff = await Staff.create({
    firstName,
    lastName,
    email,
    phone,
    role,
  });

  res.status(201).json({
    success: true,
    message: "Staff added successfully!",
    staff: newStaff,
  });
});

// Function to get all staff members
export const getAllStaff = catchAsyncErrors(async (req, res, next) => {
  const staffMembers = await Staff.find(); // Fetch all staff members

  // Check if any staff members exist
  if (staffMembers.length === 0) {
    return next(new ErrorHandler("No staff found!", 404));
  }

  res.status(200).json({
    success: true,
    staff: staffMembers, // Send the staff details in the response
  });
});
