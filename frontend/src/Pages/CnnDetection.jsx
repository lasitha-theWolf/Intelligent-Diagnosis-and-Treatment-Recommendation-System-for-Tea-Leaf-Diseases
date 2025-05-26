import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch, FaUpload, FaBrain, FaSpinner } from "react-icons/fa";
import { FaCheck, FaClock, FaDatabase } from "react-icons/fa";
import { motion } from "framer-motion";

const LeafSenseAnalysis = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [accuracy, setAccuracy] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setResult(null);
      setAccuracy(null);
    }
  };

  const handleSubmit = async () => {
    if (selectedImage) {
      setIsLoading(true);
      try {
        const formData = new FormData();
        formData.append("image", selectedImage);

        const response = await axios.post(
          "http://localhost:5001/segmentation/cnn-detection",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        console.log("Leaf analysis response:", response.data);

        setResult({ 
          type: "success", 
          disease: response.data.disease || "Unknown disease" 
        });
        setAccuracy(response.data.accuracy);
      } catch (error) {
        console.error("Error analyzing image:", error);
        setResult({
          type: "error",
          message: error.response?.data?.details
            ? error.response.data.details
            : error.response?.data?.error || error.message || "Could not analyze the image",
        });
        setAccuracy(null);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const renderLeafAnalysis = (disease) => {
    if (!disease || typeof disease !== "string") {
      return (
        <div className="text-red-400">
          <p>Unable to identify disease. Invalid data received.</p>
        </div>
      );
    }

    return (
      <div className="text-teal-100">
        <p className="text-lg font-medium">Detected Disease: {disease}</p>
        <p className="text-sm mt-1">Accuracy level: {accuracy ? `${accuracy}%` : "≥90%"}</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-teal-900 via-emerald-800 to-green-900 pt-48 pb-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-20"
        >
          <h1 className="text-3xl font-bold text-center text-green-600 flex items-center gap-4 justify-center">
            <FaBrain className="text-teal-300" /> LeafSense Analysis
          </h1>
          <p className="text-lg text-teal-100 max-w-xl text-center mx-auto mt-4">
            Advanced technology scans leaf images to identify diseases with precision and speed.
          </p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gray-800 bg-opacity-80 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-teal-500 mt-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Upload Section */}
            <div className="relative">
              <label
                htmlFor="leaf-upload"
                className={`w-full h-[350px] rounded-xl overflow-hidden border-2 border-teal-400 flex items-center justify-center cursor-pointer transition-all duration-500 ${
                  selectedImage
                    ? "border-opacity-100"
                    : "border-opacity-50 hover:border-opacity-80"
                }`}
              >
                {selectedImage ? (
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Uploaded leaf"
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <motion.div className="text-center text-teal-200">
                    <FaUpload className="text-4xl mb-3" />
                    <p className="text-lg">Upload Leaf Image</p>
                    <p className="text-sm opacity-70">JPG/PNG, Max 15MB</p>
                  </motion.div>
                )}
                <input
                  id="leaf-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            </div>

            {/* Action Section */}
            <div className="flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-semibold text-white mb-4">
                  Leaf Analysis
                </h3>
                {result ? (
                  result.type === "success" ? (
                    renderLeafAnalysis(result.disease)
                  ) : (
                    <p className="text-red-400 mb-6">{result.message}</p>
                  )
                ) : (
                  <p className="text-teal-100 mb-6">
                    Our advanced system processes leaf images to identify diseases accurately.
                  </p>
                )}
              </div>

              <button
                disabled={!selectedImage || isLoading}
                onClick={handleSubmit}
                className="w-full bg-green-600 py-4 rounded-lg font-bold flex items-center justify-center gap-3 shadow-lg hover:bg-gradient-to-r hover:from-teal-500 hover:to-teal-700 hover:text-white transition-all duration-300 hover:cursor-pointer disabled:bg-gray-500 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <FaSpinner className="animate-spin text-xl" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <FaSearch className="text-xl" />
                    Scan with LeafSense
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-10 mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
        >
          {/* Card 1: Detection Accuracy */}
          <div className="bg-teal-800 bg-opacity-60 p-6 rounded-lg text-center flex flex-col items-center shadow-lg">
            <FaCheck className="text-4xl text-teal-200 mb-2" />
            <p className="text-3xl font-bold text-teal-200">
              {accuracy ? `${accuracy}%` : "90%+"}
            </p>
            <p className="text-sm text-teal-100 mt-1">
              {accuracy ? "Current Accuracy" : "Detection Accuracy"}
            </p>
          </div>

          {/* Card 2: Processing Speed */}
          <div className="bg-teal-800 bg-opacity-60 p-6 rounded-lg text-center flex flex-col items-center shadow-lg">
            <FaClock className="text-4xl text-teal-200 mb-2" />
            <p className="text-3xl font-bold text-teal-200">Fast</p>
            <p className="text-sm text-teal-100 mt-1">Processing Speed</p>
          </div>

          {/* Card 3: CNN Technology */}
          <div className="bg-green-800 bg-opacity-60 p-6 rounded-lg text-center flex flex-col items-center shadow-lg">
            <FaBrain className="text-4xl text-green-200 mb-2" />
            <p className="text-xl font-bold text-green-200">CNN Powered</p>
            <p className="text-sm text-green-100 mt-1">
              Uses Convolutional Neural Networks
            </p>
          </div>

          {/* Card 4: About LeafSense */}
          <div className="bg-purple-800 bg-opacity-60 p-6 rounded-lg text-center flex flex-col items-center shadow-lg">
            <FaBrain className="text-4xl text-purple-200 mb-2" />
            <p className="text-xl font-bold text-purple-200">LeafSense</p>
            <p className="text-sm text-purple-100 mt-1">
              Cutting-edge technology for precise leaf analysis
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LeafSenseAnalysis;