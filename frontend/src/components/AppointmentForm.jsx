import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AppointmentForm = () => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [detectionResult, setDetectionResult] = useState(null);

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); // Display image preview
    }
  };

  // Handle disease detection
  const detectDisease = async () => {
    if (!image) {
      toast.error('Please upload an image first!');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:4000/api/v1/tea-leaves-detect', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setDetectionResult(response.data); // Assume the response contains disease info
      toast.success('Disease detection completed!');
    } catch (error) {
      toast.error('Error detecting disease!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-xl w-full p-6 bg-white shadow-lg rounded-lg flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4 text-center px-20">Tea Leaves Disease Detector</h2>

        {/* Image Upload Section */}
        <div className="mb-6 w-full">
          <div className="flex justify-center items-center border-4 border-dashed border-gray-300 p-12 rounded-lg">
            {/* Large Image Box */}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                className="max-w-full max-h-60 object-contain"
              />
            ) : (
              <p className="text-gray-500">Click or drag an image here</p>
            )}
          </div>
        </div>

        {/* Button to trigger disease detection */}
        <button
          onClick={detectDisease}
          className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition"
          disabled={loading}
        >
          {loading ? 'Detecting...' : 'Detect Disease'}
        </button>

        {/* Display disease detection result */}
        {detectionResult && (
          <div className="mt-6 p-4 bg-green-100 text-green-800 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">Detection Result</h3>
            <p>{detectionResult.disease}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentForm;
