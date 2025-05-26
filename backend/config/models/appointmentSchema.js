import mongoose from "mongoose";
import validator from "validator";

const appointmentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First Name Is Required!"],
        minLength: [3, "First Name Must Contain At Least 3 Characters!"],
    },
    lastName: {
        type: String,
        required: [true, "Last Name Is Required!"],
        minLength: [3, "Last Name Must Contain At Least 3 Characters!"],
    },
    email: {
        type: String,
        required: [true, "Email Is Required!"],
        validate: [validator.isEmail, "Provide A Valid Email!"],
    },
    phone: {
        type: String,
        required: [true, "Phone Is Required!"],
        validate: {
            validator: (v) => /^\d{10}$/.test(v),
            message: "Phone Number Must Contain Exactly 10 Digits!",
        },
    },
    nic: {
        type: String,
        required: [true, "NIC Is Required!"],
        validate: {
            validator: (v) => /^\d{12}$/.test(v),
            message: "NIC Must Contain Exactly 12 Digits!",
        },
    },
    dob: {
        type: Date,
        required: [true, "DOB Is Required!"],
    },
    gender: {
        type: String,
        required: [true, "Gender Is Required!"],
        enum: ["Male", "Female"],
    },
    appointment_date: {
        type: Date, // Changed to Date type
        required: [true, "Appointment Date Is Required!"],
    },
    department: {
        type: String,
        required: [true, "Department Name Is Required!"],
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Doctor Id Is Required!"],
        ref: "User", // Reference to the User model (doctors are in the users collection)
    },
    hasVisited: {
        type: Boolean,
        default: false,
    },
    address: {
        type: String,
        required: [true, "Address Is Required!"],
    },
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Assuming patients are also in the users collection
        required: [true, "Patient Id Is Required!"],
    },
    status: {
        type: String,
        enum: ["Pending", "Accepted", "Rejected"],
        default: "Pending",
    },
});

export const Appointment = mongoose.model("Appointment", appointmentSchema);
