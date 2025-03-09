import React, { useContext, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Appointment from "./Pages/Appointment";
import AboutUs from "./Pages/AboutUs";
import Register from "./Pages/Register";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import LeafRecognition from "./Pages/LeafRecognition";
import Segmentation from "./Pages/Segmentation";
import CnnDetection from "./Pages/CnnDetection";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Context } from "./main";
import Login from "./Pages/Login";
import "react-toastify/dist/ReactToastify.css";
import "tailwindcss/tailwind.css";

const App = () => {

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cnn-detection/ai" element={<CnnDetection/>} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/leaf-recognition/ai" element={<LeafRecognition />} />
          <Route path="/segmentation/ai" element={<Segmentation />} />

        </Routes>
        <Footer />
        <ToastContainer position="top-center" />
      </Router>
    </>
  );
};

export default App;
