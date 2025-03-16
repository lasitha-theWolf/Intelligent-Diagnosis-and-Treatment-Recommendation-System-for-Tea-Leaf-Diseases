import React from "react";
import { FaFilter, FaEye, FaCode, FaMagic, FaClock } from "react-icons/fa"; // Font Awesome icons

const LeafDifferentiationPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-tl from-emerald-50 via-white to-gray-50 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Hero Section */}
      <div className="relative max-w-5xl mx-auto text-center mb-16">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-200/40 to-gray-200/40 rounded-full blur-3xl transform -translate-y-16 scale-125 opacity-60" />
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
          Intelligent Leaf Differentiation Module
        </h1>
        <p className="mt-4 text-xl md:text-2xl text-gray-700 font-light">
          Smart Solutions for Leaf Disease Detection
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Data Preprocessing */}
        <Section
          icon={<FaFilter className="h-10 w-10 text-emerald-500" />}
          title="Data Preprocessing"
          description="Develop techniques to remove noise from images effectively, ensuring high-quality input for accurate analysis."
        />

        {/* Feature Extraction */}
        <Section
          icon={<FaEye className="h-10 w-10 text-emerald-500" />}
          title="Feature Extraction"
          description="Design convolutional layers to capture essential visual features from input images. Experiment with various architectures and parameters to optimize feature extraction for tea leaf differentiation."
        />

        {/* Model Training */}
        <Section
          icon={<FaCode className="h-10 w-10 text-emerald-500" />}
          title="Model Training"
          description="Train the model with a focus on spatial and temporal patterns of tea leaves, enhancing its ability to distinguish disease characteristics."
        />

        {/* Advanced Preprocessing Techniques */}
        <Section
          icon={<FaMagic className="h-10 w-10 text-emerald-500" />}
          title="Advanced Preprocessing Techniques"
          description="Innovate new preprocessing methods tailored for leaf image data, improving noise reduction and data size reduction without compromising critical features."
        />

        {/* Real-time Application */}
        <Section
          icon={<FaClock className="h-10 w-10 text-emerald-500" />}
          title="Real-time Application"
          description="Develop a real-time application integrating the classification model, enabling users to quickly identify leaf diseases with ease."
        />
      </div>

      {/* Decorative Element */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-emerald-100 rounded-full opacity-20 transform -translate-x-1/3 -translate-y-1/3 blur-3xl" />
    </div>
  );
};

// Reusable Section Component with Glassmorphism
const Section = ({ icon, title, description }) => {
  return (
    <div className="relative bg-white/80 backdrop-blur-md shadow-xl rounded-xl p-6 border border-gray-100/60 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl">
      <div className="flex items-start space-x-5">
        <div className="flex-shrink-0 p-2 bg-emerald-50 rounded-full">{icon}</div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">{title}</h2>
          <p className="mt-3 text-gray-600 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default LeafDifferentiationPage;