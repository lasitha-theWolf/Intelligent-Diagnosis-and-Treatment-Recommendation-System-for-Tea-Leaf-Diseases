// appointmentController.js
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Appointment } from "../models/appointmentSchema.js";
import { User } from "../models/userSchema.js";
import validator from "validator"; // Ensure you have this package installed

export const postAppointment = catchAsyncErrors(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    appointment_date,
    department,
    doctorId, // Changed to accept doctorId directly
    hasVisited,
    address,
    time, // Add time to appointment
  } = req.body;

  // Validate required fields
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !nic ||
    !dob ||
    !gender ||
    !appointment_date ||
    !department ||
    !doctorId || // Check for doctorId
    !address ||
    !time // Add time validation
  ) {
    return next(new ErrorHandler("Please fill the full form!", 400));
  }

  // Validate email and phone number
  if (!validator.isEmail(email)) {
    return next(new ErrorHandler("Invalid email format!", 400));
  }

  if (!validator.isMobilePhone(phone, 'any', { strictMode: false })) {
    return next(new ErrorHandler("Invalid phone number!", 400));
  }

  // Check for existing appointments on the same date for the user
  const existingAppointment = await Appointment.findOne({
    patientId: req.user._id,
    appointment_date,
  });
  if (existingAppointment) {
    return next(new ErrorHandler("You already have an appointment for this date!", 400));
  }

  // Check if the doctor exists
  const doctor = await User.findById(doctorId); // Fetch the doctor by ID
  if (!doctor) {
    return next(new ErrorHandler("Doctor not found", 404));
  }

  const appointment = await Appointment.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    appointment_date,
    department,
    hasVisited: hasVisited || false, // Default to false if not provided
    address,
    doctorId: doctor._id,
    patientId: req.user._id,
    time, // Store the time of appointment
  });

  res.status(201).json({
    success: true,
    appointment,
    message: "Appointment created successfully!",
  });
});

export const getAllAppointments = catchAsyncErrors(async (req, res, next) => {
  // Fetch appointments and populate patient details
  const appointments = await Appointment.find()
    .populate("patientId", "firstName lastName email phone nic dob gender") // Specify fields to return from User
    .populate("doctorId", "firstName lastName"); // Populate doctor details if needed

  res.status(200).json({
    success: true,
    appointments: appointments.map(appointment => ({
      id: appointment._id, // Include appointment ID
      ...appointment.toObject(), // Convert to plain object
      patient: {
        firstName: appointment.patientId.firstName,
        lastName: appointment.patientId.lastName,
        email: appointment.patientId.email,
        phone: appointment.patientId.phone,
        nic: appointment.patientId.nic,
        dob: appointment.patientId.dob,
        gender: appointment.patientId.gender,
      },
      doctor: {
        firstName: appointment.doctorId.firstName,
        lastName: appointment.doctorId.lastName,
      },
    })),
  });
});

export const updateAppointmentStatus = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const appointment = await Appointment.findById(id);
  if (!appointment) {
    return next(new ErrorHandler("Appointment not found!", 404));
  }

  const updatedAppointment = await Appointment.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    appointment: updatedAppointment, // Return updated appointment
    message: "Appointment status updated successfully!",
  });
});

export const deleteAppointment = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const appointment = await Appointment.findById(id);
  if (!appointment) {
    return next(new ErrorHandler("Appointment not found!", 404));
  }

  await appointment.deleteOne();
  res.status(200).json({
    success: true,
    appointmentId: id, // Optionally return the deleted appointment ID
    message: "Appointment deleted successfully!",
  });
});
