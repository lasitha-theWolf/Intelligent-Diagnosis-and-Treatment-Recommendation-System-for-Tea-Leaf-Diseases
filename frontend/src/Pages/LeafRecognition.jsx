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

const LeafRecognition = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setResult(null);
    }
  };

  const handleSubmit = async () => {
    if (selectedImage) {
      setIsLoading(true);
      try {
        const formData = new FormData();
        formData.append("image", selectedImage);

        const response = await axios.post(
          "http://localhost:5001/segmentation/leaf-recognition",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        setResult({ type: "success", leafType: response.data.leafType });
      } catch (error) {
        console.error("Error analyzing image:", error);
        setResult({
          type: "error",
          message: error.response?.data?.details
            ? error.response.data.details
            : error.response?.data?.error || "Could not analyze the image"
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Helper function to render leaf analysis result
  const renderLeafAnalysis = (leafType) => {
    // Parse the leafType string: "Tea leaf (not healthy)" or similar
    const match = leafType.match(/^(.*?)\s*\((.*?)\)$/);
    let type = leafType;
    let condition = null;

    if (match) {
      type = match[1].trim(); // "Tea leaf"
      condition = match[2].trim(); // "not healthy" or "healthy"
    }

    const isTeaLeaf = type.toLowerCase().includes("tea");
    const isHealthy = condition && condition.toLowerCase().includes("healthy");

    return (
      <div>
        <p className="text-lg text-green-700 font-medium">
          Leaf Type: {type}
        </p>
        {isTeaLeaf && condition && (
          <p className="text-sm text-gray-600 mt-1">
            Condition: {isHealthy ? "Healthy" : "Unhealthy"}
          </p>
        )}
        <p className="text-sm text-gray-600 mt-1">
          Accuracy: ≥90%
        </p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 pt-40 pb-12 px-4">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-green-800 flex items-center justify-center gap-3">
            <FaLeaf className="text-green-600" /> LeafSense AI
          </h1>
          <p className="text-xl text-gray-600 mt-4 max-w-2xl mx-auto">
            Advanced technology to identify tea, mango, or coconut leaves
            and assess tea leaf health with over 90% accuracy.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-2xl p-8"
        >
          <div className="flex flex-col items-center">
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
                  src={URL.createObjectURL(selectedImage)}
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
                  Analyze Leaf
                </>
              )}
            </motion.button>

            {/* Result Display */}
            {result && (
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
            )}
          </div>
        </motion.div>

        {/* Additional Info Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
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
              Get quick results using our advanced technology.
            </p>
          </motion.div>

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
              Over 90% accuracy in leaf identification and health assessment.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition transform"
          >
            <div className="flex items-center gap-3 mb-4">
              <FaBrain className="text-green-700 text-2xl" />
              <h3 className="text-lg font-semibold text-green-700">
                Smart Technology
              </h3>
            </div>
            <p className="text-gray-600">
              Utilizes cutting-edge analysis for precise results.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default LeafRecognition;