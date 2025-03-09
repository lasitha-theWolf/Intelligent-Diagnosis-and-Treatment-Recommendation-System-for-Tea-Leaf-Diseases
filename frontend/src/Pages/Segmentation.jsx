import React, { useState } from "react";
import { FaBrain, FaUpload, FaRocket, FaSpinner } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios"; // For HTTP requests

const Segmentation = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file); // Store the file object directly
      setResult(null); // Reset result when new image is uploaded
    }
  };

  const handleSubmit = async () => {
    if (selectedImage) {
      setIsLoading(true);
      try {
        const formData = new FormData();
        formData.append("image", selectedImage);
        console.log("Sending form data with image:", selectedImage.name); // Debug log
  
        const response = await axios.post("http://localhost:5001/segmentation", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
  
        setResult(response.data.disease);
      } catch (error) {
        console.error("Error analyzing image:", error);
        setResult(
          error.response?.data?.details
            ? `Error: ${error.response.data.details}`
            : `Error: ${error.response?.data?.message || "Could not analyze the image"}`
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white py-16 px-6 overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ y: [0, -20, 0], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="w-full h-full bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10"
        />
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight flex items-center justify-center gap-4">
            <FaRocket className="text-cyan-400" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
              SegmaTron AI
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mt-4 max-w-2xl mx-auto">
            Unleash the future of leaf analysis with pixel-perfect semantic segmentation, powered by next-gen AI technology.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gray-900/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-cyan-500/20"
        >
          <div className="flex flex-col md:flex-row gap-8">
            <motion.div
              className="flex-1 relative"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <label
                htmlFor="segmentation-upload"
                className={`w-full h-[400px] rounded-2xl overflow-hidden bg-gray-950 flex items-center justify-center cursor-pointer transition-all duration-500 ${
                  selectedImage
                    ? "border-2 border-cyan-400"
                    : "border-2 border-gray-800 hover:border-cyan-400/50"
                }`}
              >
                {selectedImage ? (
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Uploaded leaf"
                    className="w-full h-full object-contain rounded-2xl"
                  />
                ) : (
                  <motion.div
                    className="text-center"
                  >
                    <FaUpload className="text-6xl text-cyan-400 mb-4" />
                    <p className="text-xl font-medium text-gray-200">Drop or Click to Upload</p>
                    <p className="text-sm text-gray-400 mt-2">JPG/PNG, Max 20MB</p>
                  </motion.div>
                )}
                <input
                  id="segmentation-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            </motion.div>

            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-cyan-400 mb-4">
                  Futuristic Segmentation
                </h3>
                <p className="text-gray-300 mb-6">
                  SegmaTron AI maps disease patterns with atomic precision, transforming leaf health analysis into a visual masterpiece.
                </p>
              </div>

              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 0px 20px rgba(34, 211, 238, 0.5)",
                }}
                whileTap={{ scale: 0.95 }}
                disabled={!selectedImage || isLoading}
                onClick={handleSubmit}
                className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white py-4 px-8 rounded-xl font-semibold flex items-center justify-center gap-3 shadow-lg hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <FaSpinner className="animate-spin text-xl" />
                    Processing...
                  </>
                ) : (
                  <>
                    <FaBrain className="text-xl" />
                    Launch Segmentation
                  </>
                )}
              </motion.button>
            </div>
          </div>

          {/* Result Display */}
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-6 bg-gray-800 rounded-xl border border-cyan-500/30"
            >
              <h3 className="text-xl font-semibold text-cyan-400 mb-2">Analysis Result</h3>
              <p className="text-gray-200">{result}</p>
            </motion.div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          {[
            { title: "Precision", value: "99.9%", desc: "Pixel-perfect accuracy" },
            { title: "Speed", value: "2s", desc: "Instant results" },
            { title: "Innovation", value: "Next-Gen", desc: "AI-powered future" },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 + index * 0.2 }}
              whileHover={{ y: -10, borderColor: "rgba(34, 211, 238, 0.8)" }}
              className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 text-center"
            >
              <p className="text-3xl font-bold text-cyan-400">{feature.value}</p>
              <h4 className="text-lg font-semibold text-white mt-2">{feature.title}</h4>
              <p className="text-sm text-gray-400">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Segmentation;