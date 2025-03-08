import React, { useState } from "react";
import { FaSearch, FaUpload, FaBrain, FaSpinner } from "react-icons/fa";
import { FaCheck, FaClock, FaDatabase, FaLeaf } from "react-icons/fa";
import { motion } from "framer-motion";

const CnnDetection = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    if (selectedImage) {
      setIsLoading(true);
      // Simulate CNN processing
      setTimeout(() => {
        setIsLoading(false);
        alert("CNN Disease Detection Complete! (Demo)");
      }, 2500);
    }
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
            <FaBrain className="text-teal-300" /> NeuralVision CNN
          </h1>
          <p className="text-lg text-teal-100  max-w-xl text-center mx-auto mt-4">
            Advanced Convolutional Neural Network technology scans leaf images
            to detect disease patterns with precision and speed.
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
                htmlFor="cnn-upload"
                className={`w-full h-[350px] rounded-xl overflow-hidden border-2 border-teal-400 flex items-center justify-center cursor-pointer transition-all duration-500 ${
                  selectedImage
                    ? "border-opacity-100"
                    : "border-opacity-50 hover:border-opacity-80"
                }`}
              >
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt="Uploaded leaf"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <motion.div className="text-center text-teal-200">
                    <FaUpload className="text-4xl mb-3" />
                    <p className="text-lg">Upload Leaf Image</p>
                    <p className="text-sm opacity-70">JPG/PNG, Max 15MB</p>
                  </motion.div>
                )}
                <input
                  id="cnn-upload"
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
                  CNN Analysis
                </h3>
                <p className="text-teal-100 mb-6">
                  Our deep learning model processes leaf images through multiple
                  convolutional layers to identify disease signatures.
                </p>
              </div>

              <button
                disabled={!selectedImage || isLoading}
                onClick={handleSubmit}
                className="w-full bg-green-600 py-4 rounded-lg font-bold flex items-center justify-center gap-3 shadow-lg hover:bg-gradient-to-r hover:from-teal-500 hover:to-teal-700 hover:text-white transition-all duration-300 hover:cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <FaSpinner className="animate-spin text-xl" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <FaSearch className="text-xl" />
                    Scan with NeuralVision
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
          className="mt-10 mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5"
        >
          {/* Card 1: Detection Accuracy */}
          <div className="bg-teal-800 bg-opacity-60 p-6 rounded-lg text-center flex flex-col items-center shadow-lg">
            <FaCheck className="text-4xl text-teal-200 mb-2" />
            <p className="text-3xl font-bold text-teal-200">95%</p>
            <p className="text-sm text-teal-100 mt-1">Detection Accuracy</p>
          </div>

          {/* Card 3: Parameters */}
          <div className="bg-teal-800 bg-opacity-60 p-6 rounded-lg text-center flex flex-col items-center shadow-lg">
            <FaDatabase className="text-4xl text-teal-200 mb-2" />
            <p className="text-3xl font-bold text-teal-200">100M+</p>
            <p className="text-sm text-teal-100 mt-1">Parameters</p>
          </div>

          {/* Card 4: About Tea Leaf Disease */}
          <div className="bg-green-800 bg-opacity-60 p-6 rounded-lg text-center flex flex-col items-center shadow-lg">
            <FaLeaf className="text-4xl text-green-200 mb-2" />
            <p className="text-xl font-bold text-green-200">Tea Leaf Disease</p>
            <p className="text-sm text-green-100 mt-1">
              Detect early signs of tea leaf disease to protect crop health and
              maximize yield.
            </p>
          </div>

          {/* Card 5: About NeuralVision CNN */}
          <div className="bg-purple-800 bg-opacity-60 p-6 rounded-lg text-center flex flex-col items-center shadow-lg">
            <FaBrain className="text-4xl text-purple-200 mb-2" />
            <p className="text-xl font-bold text-purple-200">
              NeuralVision CNN
            </p>
            <p className="text-sm text-purple-100 mt-1">
              Powered by a state‑of‑the‑art CNN model for accurate and fast
              disease detection.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CnnDetection;
