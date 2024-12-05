import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom"; // You might need this for navigation

const StaffDetails = () => {
  const [staffMembers, setStaffMembers] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Adjust based on your auth logic

  useEffect(() => {
    const fetchStaffMembers = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/api/v1/staff", {
          withCredentials: true,
        });
        setStaffMembers(data.staff);
      } catch (error) {
        console.error("Error fetching staff members:", error);
        toast.error("Failed to fetch staff members.");
      }
    };

    fetchStaffMembers();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <section style={styles.section}>
      <h1 style={styles.title}>STAFF MEMBERS</h1>
      <div style={styles.banner}>
        {staffMembers && staffMembers.length > 0 ? (
          staffMembers.map((member, index) => (
            <div style={styles.card} key={index}>
              <h4 style={styles.cardTitle}>{`${member.firstName} ${member.lastName}`}</h4>
              <div style={styles.details}>
                <p>
                  Email: <span>{member.email}</span>
                </p>
                <p>
                  Phone: <span>{member.phone}</span>
                </p>
                <p>
                  Role: <span>{member.role}</span>
                </p>
              </div>
            </div>
          ))
        ) : (
          <h1>No Staff Found!</h1>
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

export default StaffDetails;
