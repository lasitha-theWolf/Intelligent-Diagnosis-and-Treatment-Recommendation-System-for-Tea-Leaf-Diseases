import React from "react";
import {
  FaCamera,
  FaSyncAlt,
  FaFilter,
  FaBrain,
  FaImage,
  FaTools,
  FaMagic,
  FaBullseye,
} from "react-icons/fa"; 

const TeaLeafSegmentationPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-emerald-50 via-white to-gray-50 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Hero Section */}
      <div className="relative max-w-5xl mx-auto text-center mb-16">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-200/40 to-gray-200/40 rounded-full blur-3xl transform -translate-y-16 scale-125 opacity-60" />
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
          Tea Leaf Preprocessing & Segmentation
        </h1>
        <p className="mt-4 text-xl md:text-2xl text-gray-700 font-light">
          Denoising Autoencoder and Semantic Segmentation
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Data Preparation */}
        <Section
          icon={<FaCamera className="h-10 w-10 text-emerald-500" />}
          title="Data Preparation"
          description="Gather images of tea leaves affected by various diseases to build a robust dataset for analysis."
        />

        {/* Data Augmentation */}
        <Section
          icon={<FaSyncAlt className="h-10 w-10 text-emerald-500" />}
          title="Data Augmentation"
          description="Use techniques like rotation, flipping, zoom, and color adjustments to increase the dataset's size and diversity."
        />

        {/* Preprocessing */}
        <Section
          icon={<FaFilter className="h-10 w-10 text-emerald-500" />}
          title="Preprocessing"
          description="Reduce noise using filters and standardize image size and shape for consistent model input."
          subItems={[
            { title: "Noise Reduction", text: "Reducing details and noise using filters." },
            { title: "Resize and Reshape", text: "Standardize the size and shape of images." },
          ]}
        />

        {/* Deep Learning-Based Image Processing */}
        <Section
          icon={<FaBrain className="h-10 w-10 text-emerald-500" />}
          title="Deep Learning-Based Image Processing"
          description="Train an autoencoder to remove noise from images, enhancing input quality for segmentation."
        />

        {/* Image Segmentation */}
        <Section
          icon={<FaImage className="h-10 w-10 text-emerald-500" />}
          title="Image Segmentation"
          description="Train a segmentation model on the prepared dataset, optimizing for accuracy and generalization."
        />

        {/* Post-Processing */}
        <Section
          icon={<FaTools className="h-10 w-10 text-emerald-500" />}
          title="Post-Processing"
          description="Use the trained model to predict segmentation masks and overlay them on original images to highlight diseased areas."
        />

        {/* Combination of Classical and Deep Learning Techniques */}
        <Section
          icon={<FaMagic className="h-10 w-10 text-emerald-500" />}
          title="Combination of Classical and Deep Learning Techniques"
          description="Integrate classical image processing with deep learning methods to leverage the strengths of both for robust preprocessing and segmentation."
        />

        {/* Denoising Autoencoder */}
        <Section
          icon={<FaBrain className="h-10 w-10 text-emerald-500" />}
          title="Denoising Autoencoder"
          description="Utilize a denoising autoencoder to improve the quality of noisy images for better analysis."
        />

        {/* Disease-Specific Segmentation */}
        <Section
          icon={<FaBullseye className="h-10 w-10 text-emerald-500" />}
          title="Disease-Specific Segmentation"
          description="Train the segmentation model on the prepared dataset, optimizing for accuracy in identifying disease-specific features."
        />
      </div>

      {/* Decorative Element */}
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-100 rounded-full opacity-20 transform translate-x-1/3 translate-y-1/3 blur-3xl" />
    </div>
  );
};

// Reusable Section Component with Glassmorphism
const Section = ({ icon, title, description, subItems }) => {
  return (
    <div className="relative bg-white/80 backdrop-blur-md shadow-xl rounded-xl p-6 border border-gray-100/60 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl">
      <div className="flex items-start space-x-5">
        <div className="flex-shrink-0 p-2 bg-emerald-50 rounded-full">{icon}</div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">{title}</h2>
          <p className="mt-3 text-gray-600 leading-relaxed">{description}</p>
          {subItems && (
            <ul className="mt-4 space-y-4">
              {subItems.map((item, index) => (
                <li key={index} className="flex flex-col">
                  <span className="font-semibold text-emerald-600">{item.title}</span>
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

export default TeaLeafSegmentationPage;