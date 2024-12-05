import React, { useContext } from "react";
import { TiHome } from "react-icons/ti";
import { RiLogoutBoxFill } from "react-icons/ri"; // You can keep this if you want
import { AiFillMessage, AiOutlineLogout } from "react-icons/ai"; // Import the logout icon here
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUser, FaUserInjured, FaUserPlus } from "react-icons/fa"; // Use FaUser instead of FaUserDoctor
import { MdAddModerator } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// Styled components for the sidebar
const SidebarContainer = styled.nav`
  display: flex;
  flex-direction: column;
  width: 120px; /* Set sidebar width to 120px */
  background: #ffffff;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  padding: 20px;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  overflow-y: auto; /* Add vertical scrolling */
  z-index: 1000;
`;

const LinkItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* Center align icons and text */
  padding: 10px 0;
  cursor: pointer;
  color: #555;
  transition: color 0.3s;
  border-bottom: 1px solid #ddd; /* Divider line between icons */
  
  &:hover {
    color: #007bff;
  }

  svg {
    font-size: 24px; /* Icon size */
    margin-bottom: 5px; /* Space between icon and text */
  }

  span {
    font-size: 12px; /* Text size */
    white-space: nowrap; /* Prevent text wrapping */
  }
`;

const Wrapper = styled.div`
  display: flex;
  margin-top: 10px;
`;

const MainContent = styled.div`
  margin-left: 100px; /* Adjust to match sidebar width */
  padding: 20px;
  width: calc(100% - 100px);
`;

const Sidebar = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    await axios
      .get("http://localhost:4000/api/v1/user/admin/logout", {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setIsAuthenticated(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const gotoHomePage = () => navigateTo("/");
  const gotoDoctorsPage = () => navigateTo("/doctors");
  const gotoMessagesPage = () => navigateTo("/messages");
  const gotoAddNewDoctor = () => navigateTo("/doctor/addnew");
  const gotoAddNewAdmin = () => navigateTo("/admin/addnew");
  const gotoAddNewStaff = () => navigateTo("/staff/addnew");
  const gotoPatientDetails = () => navigateTo("/patient/details"); // Patient Details Link
  const gotoStaffDetails = () => navigateTo("/staff/details"); // Staff Details Link

  return (
    <>
      <SidebarContainer
        style={!isAuthenticated ? { display: "none" } : { display: "flex" }}
      >
        <LinkItem onClick={gotoHomePage}>
          <TiHome />
          <span>Home</span>
        </LinkItem>
        <LinkItem onClick={gotoDoctorsPage}>
          <FaUser /> {/* Using FaUser instead of FaUserDoctor */}
          <span>Doctors</span>
        </LinkItem>
        <LinkItem onClick={gotoPatientDetails}>
          <FaUserInjured />
          <span>Patients</span>
        </LinkItem>
        <LinkItem onClick={gotoStaffDetails}> {/* Staff Details Link */}
          <FaUserPlus /> {/* Icon for Staff */}
          <span>Staff</span>
        </LinkItem>
        <LinkItem onClick={gotoAddNewAdmin}>
          <MdAddModerator />
          <span>Add Admin</span>
        </LinkItem>
        <LinkItem onClick={gotoAddNewDoctor}>
          <IoPersonAddSharp />
          <span>Add Doctor</span>
        </LinkItem>
        <LinkItem onClick={gotoMessagesPage}>
          <AiFillMessage />
          <span>Messages</span>
        </LinkItem>
        <LinkItem onClick={handleLogout}>
          <AiOutlineLogout /> {/* Using AiOutlineLogout for Logout */}
          <span>Logout</span>
        </LinkItem>
        <LinkItem onClick={gotoAddNewStaff}>
          <FaUserPlus />
          <span>Add Staff</span>
        </LinkItem>
      </SidebarContainer>
      <Wrapper>
        <GiHamburgerMenu className="hamburger" aria-label="Toggle Sidebar" />
      </Wrapper>
      <MainContent>{/* Your main content goes here */}</MainContent>
    </>
  );
};

export default Sidebar;
