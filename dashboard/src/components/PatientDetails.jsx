// PatientDetails.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom"; // You might need this for navigation

const PatientDetails = () => {
  const [patients, setPatients] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Adjust based on your auth logic

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/appointment/getall",
          { withCredentials: true }
        );
        // Extract patient details from appointments
        const patientDetails = data.appointments.map((appointment) => ({
          firstName: appointment.patient.firstName,
          lastName: appointment.patient.lastName,
          email: appointment.patient.email,
          phone: appointment.patient.phone,
          nic: appointment.patient.nic,
          dob: appointment.patient.dob,
          gender: appointment.patient.gender,
        }));
        setPatients(patientDetails);
      } catch (error) {
        console.error("Error fetching patients:", error);
        toast.error("Failed to fetch patients.");
      }
    };

    fetchPatients();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <section style={styles.section}>
      <h1 style={styles.title}>PATIENTS WHO SENT APPOINTMENTS</h1>
      <div style={styles.banner}>
        {patients && patients.length > 0 ? (
          patients.map((patient, index) => (
            <div style={styles.card} key={index}>
              <h4 style={styles.cardTitle}>{`${patient.firstName} ${patient.lastName}`}</h4>
              <div style={styles.details}>
                <p>
                  Email: <span>{patient.email}</span>
                </p>
                <p>
                  Phone: <span>{patient.phone}</span>
                </p>
                <p>
                  DOB: <span>{patient.dob.substring(0, 10)}</span>
                </p>
                <p>
                  NIC: <span>{patient.nic}</span>
                </p>
                <p>
                  Gender: <span>{patient.gender}</span>
                </p>
              </div>
            </div>
          ))
        ) : (
          <h1>No Patients Found!</h1>
        )}
      </div>
    </section>
  );
};

const styles = {
  section: {
    padding: "20px",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  banner: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "center",
  },
  card: {
    background: "#f9f9f9",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "15px",
    width: "300px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  },
  cardTitle: {
    marginBottom: "10px",
    textAlign: "center",
  },
  details: {
    textAlign: "left",
  },
};

export default PatientDetails;
