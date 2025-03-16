import React from "react";
import {
  CameraIcon,
  BeakerIcon,
  CogIcon,
  AcademicCapIcon,
  ChartBarIcon,
  ScaleIcon,
  CubeIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

const DualClassifierPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-teal-50 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Hero Section */}
      <div className="relative max-w-5xl mx-auto text-center mb-16">
        <div className="absolute inset-0 bg-gradient-to-r from-green-200/30 to-teal-200/30 rounded-full blur-3xl transform -translate-y-20 scale-150 opacity-50" />
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
          Dual Classifier Module
        </h1>
        <p className="mt-4 text-xl md:text-2xl text-gray-700 font-light">
          Precision Diagnosis for Tea Leaf Diseases
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Data Collection */}
        <Section
          icon={<CameraIcon className="h-10 w-10 text-teal-500" />}
          title="Data Collection"
          description="Gather a dataset of tea leaf images affected by various diseases. Research and list the most prevalent diseases affecting tea plants in different regions."
        />

        {/* Feature Extraction */}
        <Section
          icon={<BeakerIcon className="h-10 w-10 text-teal-500" />}
          title="Feature Extraction"
          description="Implement methods to capture disease-specific characteristics from images, including color analysis for disease-related changes, texture analysis for surface patterns, and shape analysis for structural alterations. Custom algorithms detect specific indicators like leaf spots or lesions."
        />

        {/* Model Development */}
        <Section
          icon={<CogIcon className="h-10 w-10 text-teal-500" />}
          title="Model Development"
          description="Create a dual classifier system combining approaches like CNN and SVM for robust disease identification."
          subItems={[
            {
              title: "CNN",
              text: "Learns hierarchical features from raw image data, excelling at capturing complex patterns and spatial relationships.",
            },
            {
              title: "SVM",
              text: "Finds optimal decision boundaries in high-dimensional spaces, ideal for well-defined feature classification.",
            },
          ]}
        />

        {/* Training */}
        <Section
          icon={<AcademicCapIcon className="h-10 w-10 text-teal-500" />}
          title="Training"
          description="Train the dual classifier model using preprocessed images and corresponding disease labels."
        />

        {/* Evaluation */}
        <Section
          icon={<ChartBarIcon className="h-10 w-10 text-teal-500" />}
          title="Evaluation"
          description="Assess model performance with metrics like accuracy, precision, recall, and F1-score on a test dataset."
        />

        {/* Comparison */}
        <Section
          icon={<ScaleIcon className="h-10 w-10 text-teal-500" />}
          title="Comparison"
          description="Analyze the dual classifier’s performance against single-method approaches."
        />

        {/* Dual Classifier Approach */}
        <Section
          icon={<CubeIcon className="h-10 w-10 text-teal-500" />}
          title="Dual Classifier Approach"
          description="Combines Custom CNN and Xception classifiers, leveraging their strengths for enhanced disease identification accuracy."
        />

        {/* Ensemble Technique */}
        <Section
          icon={<SparklesIcon className="h-10 w-10 text-teal-500" />}
          title="Ensemble Technique"
          description="The dual classifier acts as a simple ensemble, boosting robustness and accuracy over single-model methods."
        />
      </div>

      {/* Decorative Element */}
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-teal-100 rounded-full opacity-20 transform translate-x-1/3 translate-y-1/3 blur-3xl" />
    </div>
  );
};

// Reusable Section Component with Glassmorphism
const Section = ({ icon, title, description, subItems }) => {
  return (
    <div className="relative bg-white/70 backdrop-blur-lg shadow-xl rounded-xl p-6 border border-gray-100/50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl">
      <div className="flex items-start space-x-5">
        <div className="flex-shrink-0 p-2 bg-teal-50 rounded-full">{icon}</div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">{title}</h2>
          <p className="mt-3 text-gray-600 leading-relaxed">{description}</p>
          {subItems && (
            <ul className="mt-4 space-y-4">
              {subItems.map((item, index) => (
                <li key={index} className="flex flex-col">
                  <span className="font-semibold text-teal-600">{item.title}</span>
                  <span className="text-gray-500">{item.text}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default DualClassifierPage;