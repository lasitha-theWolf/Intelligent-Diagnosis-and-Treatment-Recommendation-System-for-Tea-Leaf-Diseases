import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getTreatment } from "../api/openai";
import { CheckCircle } from "lucide-react";

const SeverityLevels = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { result, disease } = location.state || {};
  const [treatment, setTreatment] = useState(null); // State to store the treatment plan

  if (!result) return <p>No result found.</p>;

  const { predicted_class, percentages, marked_image } = result;

  // Calculate normalized percentages
  const total = percentages.Mild + percentages.Moderate + percentages.Severe;
  const normalizedPercentages = {
    Mild: (percentages.Mild / total) * 100,
    Moderate: (percentages.Moderate / total) * 100,
    Severe: (percentages.Severe / total) * 100,
  };

  // Custom colors for each severity level
  const severityColors = {
    Mild: "#31c48d", // Green
    Moderate: "#4299E1", // Blue
    Severe: "#F56565", // Red
  };

  // Calculate stroke dasharray and dashoffset for each segment
  const calculateSegments = () => {
    const segments = [];
    let cumulativeOffset = 0;

    // Sort by size (smallest to largest for correct layering)
    const sortedData = Object.entries(percentages).sort((a, b) => a[1] - b[1]);

    sortedData.forEach(([category, value]) => {
      const percentage = (value / total) * 100;
      segments.push({
        category,
        percentage,
        dasharray: `${percentage} 100`,
        dashoffset: -cumulativeOffset,
        color: severityColors[category],
      });
      cumulativeOffset += percentage;
    });

    return segments;
  };

  const segments = calculateSegments();

  // Handler for the "Generate Medication" button
  const handleGenerateMedication = async () => {
    const predictedPercentage = percentages[predicted_class];

    // Call the getTreatment function
    const treatmentPlan = await getTreatment(
      disease,
      predicted_class,
      predictedPercentage
    );
    setTreatment(treatmentPlan); // Set the result in state
  };

  // Handler for the "Done" button
  const handleDone = () => {
    navigate("/dashboard"); // Adjust this route as needed
  };

  return (
    <div
      className="min-h-screen py-8"
      style={{
        background: "linear-gradient(135deg, #0a8270 0%, #7cff6b 100%)",
      }}
    >
      <h3 className="text-3xl font-bold text-white text-center mt-5 mb-8 drop-shadow-lg">
        Severity of Disease
      </h3>

      <div className="flex flex-col md:flex-row items-center justify-center text-white p-6 space-y-6 md:space-y-0 md:space-x-6 my-5 mx-10 border border-white/20 rounded-xl bg-white/10 backdrop-blur-sm shadow-xl">
        {/* Left Side - Leaf Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative">
            <img
              src={marked_image}
              alt="Leaf with disease"
              className="max-w-full h-auto rounded-lg w-full md:w-[32rem] shadow-lg"
            />
          </div>
        </div>

        {/* Right Side - Information and Chart */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <div className="w-full bg-white rounded-lg shadow-lg p-4 flex-row flex flex-wrap justify-around backdrop-blur-sm">
            {/* Donut Chart Section */}
            <div className="flex items-center justify-center">
              <div className="w-40 h-40 relative">
                <svg viewBox="0 0 36 36" className="circular-chart">
                  {/* Background Circle */}
                  <path
                    className="circle-bg"
                    d="M18 2.0845
                       a 15.9155 15.9155 0 0 1 0 31.831
                       a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#ffffff50"
                    strokeWidth="1"
                  />

                  {/* Dynamic Segments */}
                  {segments.map((segment, index) => (
                    <path
                      key={index}
                      className={`circle ${segment.category.toLowerCase()}`}
                      d="M18 2.0845
                         a 15.9155 15.9155 0 0 1 0 31.831
                         a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke={segment.color}
                      strokeWidth="2.5"
                      strokeDasharray={segment.dasharray}
                      strokeDashoffset={segment.dashoffset}
                      strokeLinecap="round"
                    />
                  ))}
                </svg>

                {/* Center text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-black">
                    {Math.round(percentages[predicted_class])}%
                  </span>
                  <span className="text-sm text-black">{predicted_class}</span>
                </div>
              </div>
            </div>

            {/* Severity Level Details */}
            <div className="flex flex-col items-left mt-4">
              <h2 className="text-black font-medium">Disease</h2>
              <p className="text-2xl font-semibold text-green-700 mb-4">
                {disease}
              </p>
              <p className="text-black font-medium">Predicted Severity Level</p>
              <p
                className="text-3xl font-extrabold"
                style={{ color: severityColors[predicted_class] }}
              >
                {predicted_class}
              </p>

              <ul className="mt-6 space-y-2">
                <li className="flex items-center text-black">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: severityColors.Mild }}
                  ></div>
                  Mild:{" "}
                  <span
                    className="ml-1 font-medium"
                    style={{ color: severityColors.Mild }}
                  >
                    {percentages.Mild.toFixed(1)}%
                  </span>
                </li>
                <li className="flex items-center text-black">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: severityColors.Moderate }}
                  ></div>
                  Moderate:{" "}
                  <span
                    className="ml-1 font-medium"
                    style={{ color: severityColors.Moderate }}
                  >
                    {percentages.Moderate.toFixed(1)}%
                  </span>
                </li>
                <li className="flex items-center text-black">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: severityColors.Severe }}
                  ></div>
                  Severe:{" "}
                  <span
                    className="ml-1 font-medium"
                    style={{ color: severityColors.Severe }}
                  >
                    {percentages.Severe.toFixed(1)}%
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="w-full bg-green-900 rounded-lg shadow-lg p-6 backdrop-blur-sm">
            <div>
              {/* Additional Description */}
              <p className="text-white leading-relaxed">
                Based on the analysis, your plant appears to have{" "}
                <span className="font-semibold">{disease}</span> with a{" "}
                <span
                  className="font-semibold"
                  style={{ color: severityColors[predicted_class] }}
                >
                  {predicted_class.toLowerCase()}
                </span>{" "}
                severity level. The chart shows the probability distribution
                across different severity categories. For specific treatment
                recommendations, click the "Generate Medication" button below.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons for Done & Generate Medication */}
      <div className="flex flex-col md:flex-row items-center justify-center text-white p-6 space-y-6 md:space-y-0 md:space-x-6 my-5 mx-10">
        <div className="flex flex-col md:flex-row items-center justify-center text-white w-full md:w-1/2">
          <button
            type="button"
            className="w-full text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-xl px-5 py-2.5 me-2 mb-2 focus:outline-none transition duration-200 shadow-lg"
            onClick={handleGenerateMedication}
          >
            Generate Medication
          </button>
        </div>
      </div>

      {/* Treatment Recommendation Section - Only shown when treatment is available */}
      {treatment && (
        <div className="mx-10 mb-10">
          <div className="mt-8 relative overflow-hidden">
            {/* Gradient background */}
            <div className="absolute inset-0 bg-emerald-500/20 backdrop-blur-md rounded-lg"></div>

            {/* Content container */}
            <div className="relative p-8 text-white bg-green-800">
              {/* Header with icon */}
              <div className="flex items-center mb-4">
                <CheckCircle className="w-6 h-6 mr-2 text-emerald-300" />
                <h3 className="text-2xl font-bold text-white">
                  Treatment Recommendation
                </h3>
              </div>

              {/* Decorative element */}
              <div className="w-16 h-1 bg-emerald-300 mb-6"> </div>

              {/* Treatment content */}
              <div className="prose prose-lg max-w-none">
                {treatment && (
                  <div className="text-white">
                    {treatment.split("\n").map((line, index) => {
                      // Title with ##
                      if (line.startsWith("##")) {
                        return (
                          <h2
                            key={index}
                            className="text-2xl font-bold text-white mb-4"
                          >
                            {line.replace(/##/, "").replace(/\*\*/g, "")}
                          </h2>
                        );
                      }
                      // Main numbered sections (1., 2., 3.)
                      else if (line.match(/^\d+\.\s+\*\*[A-Z]/)) {
                        const cleanLine = line.replace(/\*\*/g, "");
                        return (
                          <h3
                            key={index}
                            className="text-xl font-bold mt-6 mb-3 text-white"
                          >
                            {cleanLine}
                          </h3>
                        );
                      }
                      // Lettered subsections like A., B.
                      else if (line.match(/^\s+\*\*[A-Z]\./)) {
                        const cleanLine = line.replace(/\*\*/g, "").trim();
                        return (
                          <h4
                            key={index}
                            className="text-lg font-bold mt-4 mb-2 text-white"
                          >
                            {cleanLine}
                          </h4>
                        );
                      }
                      // Numbered items within subsections
                      else if (line.match(/^\s+\d+\.\s+\*\*/)) {
                        const parts = line.split(/\*\*(.+?)\*\*/);
                        const label = parts[1];
                        const content = parts.slice(2).join("");

                        return (
                          <div key={index} className="flex mb-2 ml-4">
                            <div className="font-bold mr-2 text-emerald-300">
                              {line.match(/^\s+\d+\./)[0].trim()}
                            </div>
                            <div>
                              <span className="font-bold text-emerald-300">
                                {label}:
                              </span>
                              <span>{content}</span>
                            </div>
                          </div>
                        );
                      }
                      // Bulleted items with bold text
                      else if (
                        line.match(/^\s+\*\*/) &&
                        !line.match(/^\s+\*\*[A-Z]\./)
                      ) {
                        const cleanLine = line.trim();
                        const parts = cleanLine.split(/\*\*(.+?)\*\*/);
                        const label = parts[1];
                        const content = parts.slice(2).join("");

                        return (
                          <div key={index} className="flex my-1 ml-4">
                            <div className="w-3 h-3 mt-1.5 mr-2 rounded-full bg-emerald-300 flex-shrink-0"></div>
                            <div>
                              <span className="font-bold text-emerald-300">
                                {label}:
                              </span>
                              <span>{content}</span>
                            </div>
                          </div>
                        );
                      }
                      // Normal paragraph with ** for emphasis
                      else if (line.includes("**")) {
                        const parts = line.split(/\*\*(.+?)\*\*/g);
                        return (
                          <p key={index} className="my-2 ml-4">
                            {parts.map((part, i) => {
                              // Every odd index is inside ** markers
                              return i % 2 === 1 ? (
                                <strong
                                  key={i}
                                  className="font-bold text-emerald-300"
                                >
                                  {part}
                                </strong>
                              ) : (
                                <span key={i}>{part}</span>
                              );
                            })}
                          </p>
                        );
                      }
                      // Normal paragraph
                      else if (line.trim()) {
                        return (
                          <p key={index} className="my-2 ml-4">
                            {line}
                          </p>
                        );
                      }
                      // Empty line becomes spacing
                      return <div key={index} className="h-2"></div>;
                    })}
                  </div>
                )}
              </div>

              {/* Additional decorative elements */}
              <div className="absolute top-4 right-4 w-24 h-24 rounded-full bg-emerald-500 opacity-20 blur-xl"></div>
              <div className="absolute bottom-4 left-4 w-16 h-16 rounded-full bg-teal-500 opacity-20 blur-xl"></div>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col md:flex-row justify-center items-center w-full md:w-1/2 mx-auto">
        <button
          type="button"
          className="w-full md:w-auto text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-xl px-10 py-2.5 mb-2 focus:outline-none transition duration-200 shadow-lg flex items-center justify-center"
          //onClick={handleGenerateMedication}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SeverityLevels;
