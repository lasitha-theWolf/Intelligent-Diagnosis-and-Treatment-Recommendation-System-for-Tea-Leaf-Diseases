import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUpload, FaBrain, FaSpinner, FaArrowRight, FaArrowDown } from "react-icons/fa";
import { motion } from "framer-motion";

const AIPipeline = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pipelineResult, setPipelineResult] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPipelineResult(null);
    }
  };

  const handleSubmit = async () => {
    if (selectedImage) {
      setIsLoading(true);
      try {
        const formData = new FormData();
        formData.append("image", selectedImage);

        const response = await axios.post(
          "http://localhost:5001/segmentation/ai-pipeline",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        setPipelineResult(response.data);
      } catch (error) {
        console.error("Error in pipeline:", error);
        setPipelineResult({
          error: error.response?.data?.error || "Analysis failed",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      transition: { 
        duration: 0.6, 
        ease: "easeOut",
        type: "spring",
        bounce: 0.3
      } 
    },
    hover: { 
      scale: 1.03, 
      boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.3)",
      transition: { duration: 0.3 } 
    }
  };

  const arrowVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.5, 
        ease: "easeOut",
        repeat: Infinity,
        repeatType: "reverse",
        repeatDelay: 0.5
      } 
    }
  };

  const renderPipelineCard = (title, content, delay, isError = false) => (
    <motion.div
      className="w-full max-w-lg"
      initial="hidden"
      animate={pipelineResult ? "visible" : "hidden"}
      variants={cardVariants}
      whileHover="hover"
      transition={{ delay }}
    >
      <div
        className={`p-6 rounded-2xl shadow-lg transform transition-all duration-300 ${
          isError ? "bg-red-900/80" : "bg-teal-800/80"
        } backdrop-blur-md border border-teal-500/50`}
      >
        <h3 className="text-xl font-semibold text-teal-100 mb-3">{title}</h3>
        <p
          className={`text-base leading-relaxed ${
            isError ? "text-red-200" : "text-teal-50"
          } bg-gray-900/40 p-3 rounded-lg`}
        >
          {content.split("\n").map((line, index) => (
            <span key={index} className="block">
              {line}
            </span>
          ))}
        </p>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-teal-950 to-emerald-900 py-16 px-6">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-center text-teal-200 mb-8 flex items-center justify-center gap-3"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <FaBrain className="text-teal-300" /> AI Pipeline Analysis
        </motion.h1>

        {/* Description */}
        <motion.p
          className="text-lg text-teal-100/80 text-center max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Upload a leaf image to analyze its type, health, potential diseases, and treatment recommendations using our advanced AI pipeline. Experience a seamless flow of cutting-edge technology in a sleek, modern interface.
        </motion.p>

        {/* Upload Section */}
        <motion.div
          className="bg-gray-800/80 p-8 rounded-2xl shadow-xl mb-16 border border-teal-600/30"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <label
              htmlFor="image-upload"
              className="w-full md:w-1/2 h-72 rounded-lg border-4 border-dashed border-teal-500/60 flex items-center justify-center cursor-pointer hover:border-teal-400 transition-all duration-300"
            >
              {selectedImage ? (
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="Uploaded leaf"
                  className="max-w-full max-h-full object-contain rounded-lg"
                />
              ) : (
                <div className="text-center text-teal-100">
                  <FaUpload className="text-4xl mb-3" />
                  <p className="text-lg font-medium">Upload Leaf Image</p>
                </div>
              )}
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
            <button
              onClick={handleSubmit}
              disabled={!selectedImage || isLoading}
              className="w-full md:w-1/2 bg-teal-600 py-3 px-6 rounded-lg text-lg font-semibold flex items-center justify-center gap-2 hover:bg-teal-700 transition-all duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <FaSpinner className="animate-spin text-xl" /> Processing...
                </>
              ) : (
                <>
                  Analyze <FaArrowRight className="text-lg" />
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* Pipeline Flowchart */}
        {pipelineResult && (
          <div className="flex flex-col items-center gap-10">
            {/* Step 1: Leaf Identification */}
            {renderPipelineCard(
              "Step 1: Leaf Identification",
              pipelineResult.leafType
                ? `Identified as: ${pipelineResult.leafType}`
                : "Unable to identify leaf type",
              0,
              pipelineResult.error
            )}

            {pipelineResult.leafType && (
              <motion.div
                className="text-teal-300"
                initial="hidden"
                animate="visible"
                variants={arrowVariants}
              >
                <FaArrowDown size={28} />
              </motion.div>
            )}

            {/* Step 2: Tea Leaf Health */}
            {pipelineResult.leafType?.toLowerCase().includes("tea") && (
              <>
                {renderPipelineCard(
                  "Step 2: Health Check",
                  pipelineResult.isHealthy !== undefined
                    ? pipelineResult.isHealthy
                      ? "Leaf is Healthy"
                      : "Leaf is Unhealthy"
                    : "Health check failed",
                  0.2,
                  pipelineResult.error
                )}

                {pipelineResult.isHealthy === false && (
                  <motion.div
                    className="text-teal-300"
                    initial="hidden"
                    animate="visible"
                    variants={arrowVariants}
                  >
                    <FaArrowDown size={28} />
                  </motion.div>
                )}
              </>
            )}

            {/* Step 3: Disease Detection */}
            {pipelineResult.leafType?.toLowerCase().includes("tea") &&
              pipelineResult.isHealthy === false && (
                <>
                  {renderPipelineCard(
                    "Step 3: Disease Detection",
                    pipelineResult.disease
                      ? `Detected: ${pipelineResult.disease} (Method: ${pipelineResult.method}, Accuracy: ${pipelineResult.accuracy}%)`
                      : "Disease detection failed",
                    0.4,
                    pipelineResult.error
                  )}

                  {pipelineResult.disease && pipelineResult.disease !== "Unknown" && (
                    <motion.div
                      className="text-teal-300"
                      initial="hidden"
                      animate="visible"
                      variants={arrowVariants}
                    >
                      <FaArrowDown size={28} />
                    </motion.div>
                  )}
                </>
              )}

            {/* Step 4: Severity & Treatment */}
            {pipelineResult.leafType?.toLowerCase().includes('tea') &&
              pipelineResult.isHealthy === false &&
              pipelineResult.disease &&
              pipelineResult.disease !== "Unknown" && (
                renderPipelineCard(
                  "Step 4: Severity & Treatment",
                  (() => {
                    const severity = pipelineResult.severity || "Moderate";
                    let treatment = pipelineResult.treatment;
                    
                    // Fallback treatments based on disease type if no treatment is provided
                    if (!treatment) {
                      const fallbackTreatments = {
                        "Algal Leaf Spot": "Apply copper-based fungicide and ensure proper air circulation between plants. Prune affected leaves.",
                        "Grey Blight Disease": "Remove infected leaves and apply systemic fungicide. Maintain proper spacing between plants.",
                        "Brown Blight": "Apply appropriate fungicides and improve drainage. Remove severely infected leaves.",
                        "Red Leaf Spot": "Use copper oxychloride spray and maintain field sanitation. Avoid overhead irrigation.",
                        "White Spot": "Apply suitable fungicide and maintain proper plant spacing. Remove infected plant debris."
                      };
                      treatment = fallbackTreatments[pipelineResult.disease] || "Apply appropriate fungicide and consult a tea cultivation expert for specific treatment recommendations.";
                    }
                    
                    return `Severity: ${severity}\nTreatment: ${treatment}`;
                  })(),
                  0.6,
                  pipelineResult.error
                )
              )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIPipeline;