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
import AIPipeline from "./Pages/AIPipeline";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Context } from "./main";
import Login from "./Pages/Login";
import "react-toastify/dist/ReactToastify.css";
import "tailwindcss/tailwind.css";
import Treatment from "./Pages/Treatment";
import SeverityLevels from "./Pages/SeverityLevels";

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
          <Route path="/ai-pipeline" element={<AIPipeline />} />

          <Route path="/treatments/ai" element={<Treatment />} />
          <Route path="/output" element={<SeverityLevels />} />

        </Routes>
        <Footer />
        <ToastContainer position="top-center" />
      </Router>
    </>
  );
};

export default App;
