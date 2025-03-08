import React, { useState, useEffect } from "react";
import { FaLeaf, FaUpload, FaRobot, FaSpinner } from "react-icons/fa";
import { motion } from "framer-motion"; // For animations
import {
  FaBolt,
  FaCheck,
  FaClock,
  FaBrain,
  FaStethoscope,
} from "react-icons/fa";

const LeafRecognition = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Scroll to the top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    if (selectedImage) {
      setIsLoading(true);
      // Simulate AI processing
      setTimeout(() => {
        setIsLoading(false);
        // Here you would typically handle the AI processing result
        alert("Leaf analysis complete! (This is a demo)");
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 pt-40 pb-12 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Title with Animation */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-green-800 flex items-center justify-center gap-3 ">
            <FaLeaf className="text-green-600" /> LeafSense AI
          </h1>
          <p className="text-xl text-gray-600 mt-4 max-w-2xl mx-auto">
            Harness the power of artificial intelligence to analyze tea leaves
            with 98% accuracy. Upload an image and let LeafSense AI detect
            potential diseases in real-time.
          </p>
        </motion.div>

        {/* Image Upload Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-2xl p-8"
        >
          <div className="flex flex-col items-center">
            {/* Upload Area */}
            <label
              htmlFor="image-upload"
              className={`w-full h-[400px] border-4 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
                selectedImage
                  ? "border-green-500 bg-green-50"
                  : "border-gray-300 hover:border-green-400 hover:bg-green-50"
              }`}
            >
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt="Uploaded leaf"
                  className="w-full h-full object-contain rounded-xl"
                />
              ) : (
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
              )}
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={!selectedImage || isLoading}
              onClick={handleSubmit}
              className={`mt-8 bg-green-600 text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-3 shadow-lg hover:bg-green-700 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed`}
            >
              {isLoading ? (
                <>
                  <FaSpinner className="animate-spin text-xl" />
                  Processing...
                </>
              ) : (
                <>
                  <FaRobot className="text-xl" />
                  Analyze with LeafSense AI
                </>
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Additional Info Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Fast Analysis */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition transform"
          >
            <div className="flex items-center gap-3 mb-4">
              <FaBolt className="text-green-700 text-2xl" />
              <h3 className="text-lg font-semibold text-green-700">
                Fast Analysis
              </h3>
            </div>
            <p className="text-gray-600">
              Rapid detection powered by an optimized CNN pipeline, delivering
              results in seconds for tea leaf analysis.
            </p>
          </motion.div>

          {/* High Accuracy */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition transform"
          >
            <div className="flex items-center gap-3 mb-4">
              <FaCheck className="text-green-700 text-2xl" />
              <h3 className="text-lg font-semibold text-green-700">
                High Accuracy
              </h3>
            </div>
            <p className="text-gray-600">
              Leveraging advanced convolutional neural networks, our model
              achieves over 98% accuracy in identifying tea leaf diseases.
            </p>
          </motion.div>

          {/* Real-Time Feedback */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition transform"
          >
            <div className="flex items-center gap-3 mb-4">
              <FaClock className="text-green-700 text-2xl" />
              <h3 className="text-lg font-semibold text-green-700">
                Real-Time Feedback
              </h3>
            </div>
            <p className="text-gray-600">
              Get instant processing and live feedback on tea leaf conditions,
              ensuring timely detection and monitoring.
            </p>
          </motion.div>

          {/* Advanced CNN Technology */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition transform"
          >
            <div className="flex items-center gap-3 mb-4">
              <FaBrain className="text-green-700 text-2xl" />
              <h3 className="text-lg font-semibold text-green-700">
                Advanced CNN Technology
              </h3>
            </div>
            <p className="text-gray-600">
              Our system utilizes state-of-the-art CNN architecture to extract
              intricate features from tea leaves for precise identification.
            </p>
          </motion.div>

          {/* Comprehensive Diagnosis */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition transform"
          >
            <div className="flex items-center gap-3 mb-4">
              <FaStethoscope className="text-green-700 text-2xl" />
              <h3 className="text-lg font-semibold text-green-700">
                Comprehensive Diagnosis
              </h3>
            </div>
            <p className="text-gray-600">
              Beyond simple detection, receive detailed insights into various
              tea leaf conditions to empower proactive care and maintenance.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default LeafRecognition;
