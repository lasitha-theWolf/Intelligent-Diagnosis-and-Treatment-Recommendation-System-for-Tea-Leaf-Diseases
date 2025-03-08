import React from "react";
import Hero from "../components/Hero";
import Biography from "../components/Biography";
import MessageForm from "../components/MessageForm";
import Departments from "../components/Departments";
import {
  FaLeaf,
  FaSearch,
  FaBrain,
  FaSyringe,
  FaRobot,
  FaChartLine,
  FaNetworkWired,
} from "react-icons/fa";
import { AiOutlineExperiment } from "react-icons/ai";

const FeatureCard = ({ title, description, icon, gradient, delay }) => {
  return (
    <div
      className={`relative bg-white rounded-2xl shadow-xl p-8 h-[400px] flex flex-col justify-between transform hover:-translate-y-2 transition-all duration-500 border-t-4 ${gradient} animate-fadeIn w-full max-w-full`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
        <svg
          className="w-full h-full"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path
            d="M10 10h80M10 50h80M10 90h80M50 10v80"
            strokeWidth="1"
            strokeDasharray="5 5"
          />
        </svg>
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-3 break-words">
          {title}
        </h3>
        <p className="text-gray-600 text-lg break-words">{description}</p>
      </div>

      <div className="flex gap-4 mt-6 flex-wrap overflow-hidden">
        <button className="bg-green-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-all duration-300 shadow-md whitespace-nowrap flex-shrink-0">
          <FaRobot className="text-xl" /> Use AI
        </button>
        <button className="border-2 border-green-600 text-green-600 px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-green-50 transition-all duration-300 whitespace-nowrap flex-shrink-0">
          <FaChartLine /> Learn More
        </button>
      </div>
    </div>
  );
};

const MainPipelineCard = () => {
  return (
    <div className="relative min-h-[500px] bg-gradient-to-br from-green-600 via-emerald-500 to-teal-600 rounded-3xl shadow-2xl p-12 mb-12 text-white overflow-hidden transform transition-all duration-500">
      <div className="absolute inset-0 opacity-20 overflow-hidden">
        <svg
          className="w-full h-full animate-pulse"
          fill="none"
          stroke="white"
          viewBox="0 0 100 100"
        >
          <path
            d="M0 0 L100 100 M100 0 L0 100 M50 0 V100 M0 50 H100"
            strokeWidth="1"
            strokeDasharray="5 5"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            strokeWidth="1"
            strokeDasharray="10 10"
          />
        </svg>
      </div>

      <div className="absolute top-4 right-4 opacity-30">
        <div className="flex gap-2 animate-flow">
          <div className="w-3 h-3 bg-white rounded-full"></div>
          <div className="w-3 h-3 bg-white rounded-full"></div>
          <div className="w-3 h-3 bg-white rounded-full"></div>
          <div className="w-3 h-3 bg-white rounded-full"></div>
          <div className="w-3 h-3 bg-white rounded-full"></div>
          <div className="w-3 h-3 bg-white rounded-full animation-delay-200"></div>
          <div className="w-3 h-3 bg-white rounded-full animation-delay-400"></div>
        </div>
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-4 flex-wrap justify-center">
          <FaNetworkWired className="text-5xl animate-pulse" />
          <h2 className="text-3xl text-center font-bold break-words">
            TeaGuardian AI Pipeline
          </h2>
        </div>
        <p className="text-xl mt-4 max-w-3xl break-words text-center mx-auto">
          A state-of-the-art AI pipeline integrating leaf recognition, CNN-based
          detection, semantic segmentation, and treatment recommendation in one
          seamless flow
        </p>

        <div className="mt-8 flex flex-col md:flex-row gap-4 justify-between">
          <div className="flex items-center gap-2 animate-fadeInUp delay-0">
            <FaLeaf className="text-5xl transition-transform duration-300 hover:scale-110" />
            <span className="text-sm transition-colors duration-300 hover:text-green-600">
              Leaf Detection
            </span>
          </div>
          <div className="text-4xl animate-fadeInUp delay-100 transition-transform duration-300 hover:translate-y-1">
            →
          </div>
          <div className="flex items-center gap-2 animate-fadeInUp delay-200">
            <FaSearch className="text-5xl transition-transform duration-300 hover:scale-110" />
            <span className="text-sm transition-colors duration-300 hover:text-green-600">
              CNN Analysis
            </span>
          </div>
          <div className="text-4xl animate-fadeInUp delay-300 transition-transform duration-300 hover:translate-y-1">
            →
          </div>
          <div className="flex items-center gap-2 animate-fadeInUp delay-400">
            <FaBrain className="text-5xl transition-transform duration-300 hover:scale-110" />
            <span className="text-sm transition-colors duration-300 hover:text-green-600">
              Segmentation
            </span>
          </div>
          <div className="text-4xl animate-fadeInUp delay-500 transition-transform duration-300 hover:translate-y-1">
            →
          </div>
          <div className="flex items-center gap-2 animate-fadeInUp delay-600">
            <FaSyringe className="text-5xl transition-transform duration-300 hover:scale-110" />
            <span className="text-sm transition-colors duration-300 hover:text-green-600">
              Treatment
            </span>
          </div>
        </div>

        <button className="mt-8 mx-auto bg-white text-green-600 px-8 py-4 rounded-lg font-semibold flex items-center gap-2 hover:bg-green-50 hover:text-green-700 transition-all duration-300 shadow-lg hover:shadow-xl">
          <FaRobot className="text-xl" /> Explore the Pipeline
        </button>
      </div>
    </div>
  );
};

const PreviousCard = () => {
  return (
    <div className="relative bg-gradient-to-br from-green-600 via-emerald-500 to-teal-600 rounded-3xl shadow-2xl p-12 mb-12 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-20 overflow-hidden">
        <div className="animate-pulse">
          <svg
            className="w-full h-full"
            fill="none"
            stroke="white"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path
              d="M0 0 L100 100 M100 0 L0 100"
              strokeWidth="1"
              strokeDasharray="5 5"
            />
          </svg>
        </div>
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-4 flex-wrap">
          <AiOutlineExperiment className="text-4xl" />
          <h2 className="text-3xl font-bold break-words">
            Deep AI Finding the Tea Disease
          </h2>
        </div>
        <p className="text-xl mt-4 max-w-2xl break-words">
          Leveraging cutting-edge artificial intelligence and machine learning
          to protect tea plantations through advanced disease detection and
          predictive analytics
        </p>
      </div>
    </div>
  );
};

const Home = () => {
  const features = [
    {
      title: "Find the Leaf",
      description:
        "AI-powered leaf recognition with real-time analysis and 98% accuracy",
      icon: <FaLeaf className="text-green-600 text-3xl" />,
      gradient: "border-green-500",
      delay: 0.1,
    },
    {
      title: "Find the Disease using Modern CNN",
      description:
        "Deep learning CNN model processes leaf images to detect disease patterns",
      icon: <FaSearch className="text-green-600 text-3xl" />,
      gradient: "border-emerald-500",
      delay: 0.2,
    },
    {
      title: "Find the Disease using Semantic Segmentation",
      description:
        "Pixel-level AI segmentation identifies disease spread with precision",
      icon: <FaBrain className="text-green-600 text-3xl" />,
      gradient: "border-teal-500",
      delay: 0.3,
    },
    {
      title: "Find the Tea Disease Treatments",
      description:
        "AI-recommended treatments based on disease analysis and historical data",
      icon: <FaSyringe className="text-green-600 text-3xl" />,
      gradient: "border-lime-500",
      delay: 0.4,
    },
  ];

  return (
    <div className="w-full overflow-x-hidden">
      <Hero
        title={
          "TeaGuardian: AI-Powered Tea Disease Protection | Next-Gen Cultivation Intelligence"
        }
        imageUrl={"/hero.png"}
      />

      <div className="container mx-auto px-4 py-12">
        <MainPipelineCard />
        <PreviousCard />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              gradient={feature.gradient}
              delay={feature.delay}
            />
          ))}
        </div>
      </div>

      <Biography imageUrl={"/about.png"} />
      <Departments />
      <MessageForm />
    </div>
  );
};

const styles = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes flow {
    0% { transform: translateX(0); }
    100% { transform: translateX(20px); }
  }

  .animate-fadeIn {
    animation: fadeIn 0.6s ease-out forwards;
  }

  .animate-flow {
    animation: flow 2s infinite linear;
  }

  .animation-delay-200 {
    animation-delay: 0.2s;
  }

  .animation-delay-400 {
    animation-delay: 0.4s;
  }

  html, body {
    overflow-x: hidden;
    width: 100%;
  }

  .container {
    max-width: 100%;
    overflow-x: hidden;
  }

  * {
    box-sizing: border-box;
  }
`;

const styleSheet = document.createElement("style");
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

export default Home;
