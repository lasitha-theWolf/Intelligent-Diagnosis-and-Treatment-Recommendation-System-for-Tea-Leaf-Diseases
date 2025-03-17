import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaLeaf, FaUpload, FaRobot, FaSpinner } from "react-icons/fa";
import { motion } from "framer-motion";
import {
  FaBolt,
  FaCheck,
  FaClock,
  FaBrain,
  FaStethoscope,
} from "react-icons/fa";
import { GiMedicines } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

const Treatment = () => {
  const [file, setFile] = useState(null);
  const [disease, setDisease] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // React Router's hook for navigation

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleDiseaseChange = (event) => {
    setDisease(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file || !disease) {
      setError("Please provide both an image and a disease name.");
      return;
    }

    setError(null); // Reset error state

    const formData = new FormData();
    formData.append("file", file);
    formData.append("disease", disease);

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch results.");
      }

      const data = await response.json();
      console.log(data);
      // Navigate to the output page with result data as state
      navigate("/output", { state: { result: data, disease } });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a8270] to-[#7cff6b] pt-40 pb-12 px-4">
      <div className="containerr w-full mx-auto ">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-green-900 flex items-center justify-center gap-3">
            <GiMedicines className="text-yellow-400 text-6xl" /> Disease
            Severity & Treatment Guide
          </h1>
          <p className="text-xl text-white mt-4 max-w-2xl mx-auto">
            Identify the severity of tea leaf diseases and get accurate
            treatment recommendations for healthier crops.
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-3xl shadow-2xl p-8 mx-20"
          >
            <div className="flex flex-col items-center">
              <label
                htmlFor="image-upload"
                className="w-full h-[400px] border-4 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300 border-green-400 bg-green-50"
                // className={`w-full h-[400px] border-4 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
                //   selectedImage
                //     ? "border-green-500 bg-green-50"
                //     : "border-gray-300 hover:border-green-400 hover:bg-green-50"
                // }`}
              >
                {/* {selectedImage ? (
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Uploaded leaf"
                className="w-full h-full object-contain rounded-xl"
              />
            ) : (*/}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-center"
                >
                  <FaUpload className="text-5xl text-green-500 mb-4" />
                  <p className="text-xl text-gray-600">
                    Drag & Drop or Click to Upload Leaf Image
                  </p>
                  <p className="text-sm text-gray-400 mt-2">
                    Supports JPG, PNG (Max 10MB)
                  </p>
                </motion.div>
                {/*   )} */}
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
              <input
                type="text"
                className="w-full p-2 mt-4 border-2 border-green-400 bg-green-50 rounded-xl"
                placeholder="Enter the disease name"
                value={disease}
                onChange={handleDiseaseChange}
                required
              />
              <motion.button
                //   whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                // disabled={!selectedImage || isLoading}
                // onClick={handleSubmit}
                className={`mt-8 bg-green-600 text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-3 shadow-lg hover:bg-green-700 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed`}
              >
                {/* {isLoading ? (
              <>
                <FaSpinner className="animate-spin text-xl" />
                Processing...
              </>
            ) : ( */}
                <>
                  <FaRobot className="text-xl" />
                  Analyze Severity
                </>
                {/* )} */}
              </motion.button>

              {/* Result Display */}
              {/* {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`mt-8 w-full p-6 rounded-xl shadow-md ${
                result.type === "success"
                  ? "bg-green-100 border-2 border-green-500"
                  : "bg-red-100 border-2 border-red-500"
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className={`text-xl font-semibold mb-3 ${
                    result.type === "success" ? "text-green-800" : "text-red-800"
                  }`}>
                    {result.type === "success" ? "Leaf Analysis Result" : "Analysis Error"}
                  </h3>
                  {result.type === "success" ? (
                    renderLeafAnalysis(result.leafType)
                  ) : (
                    <p className="text-lg text-red-700">{result.message}</p>
                  )}
                </div>
                <div className={`p-3 rounded-full ${
                  result.type === "success" ? "bg-green-200" : "bg-red-200"
                }`}>
                  {result.type === "success" ? (
                    <FaCheck className="text-2xl text-green-600" />
                  ) : (
                    <FaLeaf className="text-2xl text-red-600" />
                  )}
                </div>
              </div>
              {result.type === "success" && (
                <p className="mt-4 text-sm text-gray-600">
                  Analysis completed using LeafSense AI technology
                </p>
              )}
            </motion.div>
          )} */}
            </div>
          </motion.div>
        </form>
        {/* Additional Info Section */}
        <motion.div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-4 overflow-hidden p-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="bg-[#2fa98c] p-6 rounded-xl shadow-md hover:shadow-xl transition transform"
          >
            <div className="flex items-center gap-3 mb-4">
              <FaBolt className="text-white text-2xl" />
              <h3 className="text-lg font-semibold text-white">
                Severity Detection
              </h3>
            </div>
            <p className="text-white text-base">
              Instantly assess the severity level of tea leaf diseases.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="bg-[#17876d] p-6 rounded-xl shadow-md hover:shadow-xl transition transform"
          >
            <div className="flex items-center gap-3 mb-4">
              <FaCheck className="text-white text-2xl" />
              <h3 className="text-lg font-semibold text-white">
                Personalized Treatment
              </h3>
            </div>
            <p className="text-white text-base">
              Receive best medication recommendations based on disease severity.{" "}
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="bg-[#095544] p-6 rounded-xl shadow-md hover:shadow-xl transition transform"
          >
            <div className="flex items-center gap-3 mb-4">
              <FaBrain className="text-white text-2xl" />
              <h3 className="text-lg font-semibold text-white">
                Crop Health Monitoring
              </h3>
            </div>
            <p className="text-white text-base">
              Track and maintain the health of your tea plantation with ease.{" "}
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="bg-[#0b453a] p-6 rounded-xl shadow-md hover:shadow-xl transition transform"
          >
            <div className="flex items-center gap-3 mb-4">
              <FaBrain className="text-white text-2xl" />
              <h3 className="text-lg font-semibold text-white">
                User-Friendly Interface{" "}
              </h3>
            </div>
            <p className="text-white text-base">
              Easily navigate and get insights with a simple, intuitive design.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Treatment;
