import React from "react";
import { FaLinkedin } from "react-icons/fa";

const Team = () => {
  // Team data
  const supervisor = {
    name: "Prof. Pradeep Abeygunawardhana",
    role: "Dean/Faculty of Computing (FOC) and Professor in Computer Systems Engineering at SLIIT",
    image: "/team/professor.jpg",
    description: "Leading the research initiative on AI-powered tea disease detection and treatment recommendation systems with extensive expertise in computer systems engineering and academic leadership.",
    linkedin: "https://www.linkedin.com/in/pradeep-abeygunawardhana-3a788126/"
  };

  const teamMembers = [
    {
      name: "Lasitha Heenkenda",
      role: "Software Engineer",
      image: "/team/developer1.jpeg",
      description: "Developed the 'Find the Disease using Semantic Segmentation' feature with pixel-level AI segmentation that identifies disease spread with precision and integrated all 4 models into the comprehensive AI Pipeline.",
      linkedin: "https://www.linkedin.com/in/lasitha-heenkenda/"
    },
    {
      name: "Sasika Rathnayake", 
      role: "Quality Assurance Engineer",
      image: "/team/developer2.jpeg",
      description: "Developed the 'Find the Leaf' feature with AI-powered leaf recognition achieving real-time analysis and 98% accuracy in tea leaf identification.",
      linkedin: "https://www.linkedin.com/in/sasika-rathnayake/"
    },
    {
      name: "Maneesha Palihawadana",
      role: "Quality Assurance Engineer", 
      image: "/team/developer3.jpeg",
      description: "Developed the 'Find the Disease using Modern CNN' feature with deep learning CNN model that processes leaf images to detect disease patterns.",
      linkedin: "https://www.linkedin.com/in/maneeshapalihawadana/"
    },
    {
      name: "Ishara Ranaweera",
      role: "Software Engineer",
      image: "/team/developer4.jpeg", 
      description: "Developed the 'Find the Tea Disease Treatments' feature providing AI-recommended treatments based on disease analysis and historical data.",
      linkedin: "https://www.linkedin.com/in/ishara-pramod-ranaweera/"
    }
  ];

  return (
    <div className="relative container mx-auto px-4 py-16 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Particles */}
        <div className="absolute top-10 left-10 w-4 h-4 bg-green-300 rounded-full opacity-60 animate-float-slow"></div>
        <div className="absolute top-32 right-20 w-6 h-6 bg-emerald-400 rounded-full opacity-50 animate-float-medium"></div>
        <div className="absolute top-64 left-1/4 w-3 h-3 bg-teal-300 rounded-full opacity-70 animate-float-fast"></div>
        <div className="absolute bottom-32 right-1/3 w-5 h-5 bg-green-400 rounded-full opacity-40 animate-float-slow"></div>
        <div className="absolute bottom-64 left-16 w-4 h-4 bg-emerald-300 rounded-full opacity-60 animate-float-medium"></div>
        <div className="absolute top-1/2 right-10 w-3 h-3 bg-teal-400 rounded-full opacity-50 animate-float-fast"></div>
        
        {/* Additional Floating Elements */}
        <div className="absolute top-16 left-1/2 w-2 h-2 bg-lime-300 rounded-full opacity-80 animate-orbit"></div>
        <div className="absolute bottom-40 right-16 w-7 h-7 bg-cyan-300 rounded-full opacity-45 animate-float-reverse"></div>
        <div className="absolute top-80 left-20 w-5 h-5 bg-emerald-200 rounded-full opacity-65 animate-spiral"></div>
        <div className="absolute bottom-16 left-1/2 w-3 h-3 bg-green-200 rounded-full opacity-75 animate-zigzag"></div>
        
        {/* Geometric Shapes */}
        <div className="absolute top-20 right-1/4 w-12 h-12 border-2 border-green-300 rotate-45 opacity-30 animate-spin-slow"></div>
        <div className="absolute bottom-20 left-1/3 w-8 h-8 border-2 border-emerald-400 opacity-40 animate-pulse-slow"></div>
        <div className="absolute top-1/3 left-10 w-6 h-6 bg-gradient-to-r from-green-300 to-emerald-300 transform rotate-12 opacity-50 animate-bounce-slow"></div>
        
        {/* Advanced Geometric Shapes */}
        <div className="absolute top-40 right-12 w-10 h-10 border-2 border-teal-400 rounded-full opacity-35 animate-morph"></div>
        <div className="absolute bottom-60 left-8 w-14 h-14 border-2 border-lime-300 opacity-25 animate-hexagon-spin"></div>
        <div className="absolute top-72 right-1/3 w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-400 opacity-40 animate-diamond-pulse"></div>
        <div className="absolute bottom-80 right-8 w-6 h-6 border-2 border-green-400 rounded-full opacity-50 animate-elastic"></div>
        
        {/* DNA Helix Animation */}
        <div className="absolute top-0 left-1/4 w-1 h-full opacity-20">
          <div className="relative h-full">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 bg-green-400 rounded-full animate-dna-helix"
                style={{
                  top: `${i * 5}%`,
                  left: '50%',
                  animationDelay: `${i * 0.2}s`,
                  transform: 'translateX(-50%)'
                }}
              ></div>
            ))}
          </div>
        </div>
        
        {/* Neural Network Pattern */}
        <div className="absolute top-1/4 right-1/4 w-32 h-32 opacity-15">
          <svg className="w-full h-full animate-neural-pulse" viewBox="0 0 100 100">
            <circle cx="20" cy="20" r="3" fill="#10b981" className="animate-pulse">
              <animate attributeName="r" values="2;4;2" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="80" cy="20" r="3" fill="#059669" className="animate-pulse">
              <animate attributeName="r" values="2;4;2" dur="2.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="50" cy="80" r="3" fill="#047857" className="animate-pulse">
              <animate attributeName="r" values="2;4;2" dur="3s" repeatCount="indefinite" />
            </circle>
            <line x1="20" y1="20" x2="80" y2="20" stroke="#10b981" strokeWidth="1" opacity="0.5" className="animate-pulse" />
            <line x1="20" y1="20" x2="50" y2="80" stroke="#059669" strokeWidth="1" opacity="0.5" className="animate-pulse" />
            <line x1="80" y1="20" x2="50" y2="80" stroke="#047857" strokeWidth="1" opacity="0.5" className="animate-pulse" />
          </svg>
        </div>
        
        {/* Particle System */}
        <div className="absolute inset-0 opacity-30">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-emerald-400 rounded-full animate-particle-system"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            ></div>
          ))}
        </div>
        
        {/* Constellation Pattern */}
        <div className="absolute top-1/3 left-1/3 w-40 h-40 opacity-20">
          <div className="relative w-full h-full animate-constellation-rotate">
            <div className="absolute top-0 left-1/2 w-2 h-2 bg-green-400 rounded-full animate-twinkle"></div>
            <div className="absolute top-1/4 right-0 w-1 h-1 bg-emerald-400 rounded-full animate-twinkle" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute bottom-1/4 left-0 w-1 h-1 bg-teal-400 rounded-full animate-twinkle" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-0 right-1/3 w-2 h-2 bg-lime-400 rounded-full animate-twinkle" style={{ animationDelay: '1.5s' }}></div>
            <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-cyan-400 rounded-full animate-twinkle" style={{ animationDelay: '2s' }}></div>
          </div>
        </div>
        
        {/* Ripple Effects */}
        <div className="absolute top-1/4 left-1/4 w-20 h-20 border border-green-300 rounded-full opacity-20 animate-ripple"></div>
        <div className="absolute bottom-1/3 right-1/4 w-16 h-16 border border-emerald-300 rounded-full opacity-25 animate-ripple" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-2/3 left-1/2 w-24 h-24 border border-teal-300 rounded-full opacity-15 animate-ripple" style={{ animationDelay: '2s' }}></div>
        
        {/* Matrix Rain Effect */}
        <div className="absolute top-0 right-1/6 w-1 h-full opacity-10">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-4 bg-green-400 animate-matrix-rain"
              style={{
                top: `${i * 3.33}%`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: '4s'
              }}
            ></div>
          ))}
        </div>
        
        {/* Floating Code Symbols */}
        <div className="absolute top-20 left-1/6 text-green-400 opacity-20 animate-code-float text-xs font-mono">{'<AI/>'}</div>
        <div className="absolute bottom-32 right-1/6 text-emerald-400 opacity-25 animate-code-float text-xs font-mono" style={{ animationDelay: '1s' }}>{'{ }'}</div>
        <div className="absolute top-1/2 left-1/8 text-teal-400 opacity-20 animate-code-float text-xs font-mono" style={{ animationDelay: '2s' }}>{'[]'}</div>
        <div className="absolute bottom-1/4 left-3/4 text-lime-400 opacity-25 animate-code-float text-xs font-mono" style={{ animationDelay: '3s' }}>{'()'}</div>
        
        {/* Energy Beams */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-30 animate-energy-beam"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-25 animate-energy-beam" style={{ animationDelay: '2s' }}></div>
        
        {/* Morphing Blobs */}
        <div className="absolute top-16 right-1/6 w-16 h-16 bg-gradient-to-br from-green-300 to-emerald-300 rounded-full opacity-20 animate-blob-morph"></div>
        <div className="absolute bottom-20 left-1/6 w-12 h-12 bg-gradient-to-br from-emerald-300 to-teal-300 rounded-full opacity-25 animate-blob-morph" style={{ animationDelay: '1.5s' }}></div>
        
        {/* Wave Animation */}
        <div className="absolute bottom-0 left-0 w-full h-32 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z" fill="url(#waveGradient)" className="animate-wave">
              <animateTransform
                attributeName="transform"
                type="translate"
                values="0 0; -100 0; 0 0"
                dur="8s"
                repeatCount="indefinite"
              />
            </path>
            <defs>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="50%" stopColor="#059669" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-12 gap-4 h-full">
            {Array.from({ length: 48 }).map((_, i) => (
              <div key={i} className="border border-green-400 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}></div>
            ))}
          </div>
        </div>
        
        {/* Quantum Dots */}
        <div className="absolute inset-0 opacity-25">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-quantum-dot"
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + (i % 3) * 25}%`,
                animationDelay: `${i * 0.7}s`
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Content with relative positioning */}
      <div className="relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4 animate-fade-in-up">Our Research Team</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Meet the dedicated team of researchers and developers working to revolutionize tea disease detection through cutting-edge AI technology.
          </p>
        </div>

        {/* Supervisor Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>Project Supervisor</h3>
          <div className="flex justify-center">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 max-w-md text-center transform hover:scale-105 transition-all duration-300 border-t-4 border-green-600 animate-fade-in-up hover:shadow-2xl" style={{ animationDelay: '0.6s' }}>
              <div className="mb-6">
                <img
                  src={supervisor.image}
                  alt={supervisor.name}
                  className="w-32 h-32 rounded-full mx-auto object-cover shadow-lg border-4 border-green-100 hover:border-green-300 transition-all duration-300"
                />
              </div>
              <h4 className="text-2xl font-bold text-gray-800 mb-2">{supervisor.name}</h4>
              <p className="text-green-600 font-semibold text-lg mb-4">{supervisor.role}</p>
              <p className="text-gray-600 leading-relaxed mb-4">{supervisor.description}</p>
              <a
                href={supervisor.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                <FaLinkedin className="text-lg" />
                LinkedIn Profile
              </a>
              <div className="mt-6 flex justify-center space-x-4">
                <div className="w-12 h-1 bg-green-600 rounded animate-pulse"></div>
                <div className="w-12 h-1 bg-emerald-500 rounded animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <div className="w-12 h-1 bg-teal-500 rounded animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Developers & Researchers Section */}
        <div>
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>Developers & Researchers</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 text-center transform hover:scale-105 hover:shadow-xl transition-all duration-300 border-t-4 border-emerald-500 animate-fade-in-up hover:border-emerald-600"
                style={{ animationDelay: `${1 + index * 0.2}s` }}
              >
                <div className="mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto object-cover shadow-md border-3 border-emerald-100 hover:border-emerald-300 transition-all duration-300 hover:shadow-lg"
                  />
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h4>
                <p className="text-emerald-600 font-semibold mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{member.description}</p>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg text-sm transform hover:scale-105"
                >
                  <FaLinkedin className="text-base" />
                  LinkedIn
                </a>
                <div className="mt-4 flex justify-center">
                  <div className="w-8 h-1 bg-emerald-500 rounded animate-pulse" style={{ animationDelay: `${index * 0.3}s` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Industry Recommendation Section */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12 animate-fade-in-up" style={{ animationDelay: '1.8s' }}>Industry Recognition</h3>
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border-t-4 border-yellow-500 animate-fade-in-up hover:shadow-3xl transition-all duration-500" style={{ animationDelay: '2s' }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Letter Image */}
              <div className="order-2 lg:order-1">
                <div className="relative group">
                  <img
                    src="/letter.jpeg"
                    alt="Recommendation Letter from Andaradeniya Estate"
                    className="w-full h-auto rounded-2xl shadow-xl border-4 border-yellow-100 group-hover:border-yellow-300 transition-all duration-300 transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
              
              {/* Letter Content */}
              <div className="order-1 lg:order-2">
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h4 className="text-2xl font-bold text-gray-800">Official Recommendation</h4>
                  </div>
                  <p className="text-lg font-semibold text-yellow-600 mb-2">Andaradeniya Estate (Pvt) Limited</p>
                  <p className="text-sm text-gray-600 mb-4">Batuwangala Tea Factory, Morawaka Rd, Lelwala, Neluwa, Sri Lanka</p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 mb-6">
                  <h5 className="text-lg font-bold text-gray-800 mb-3">Key Highlights:</h5>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700"><strong>Proven Effectiveness:</strong> System has proven to be effective and practical for identifying tea leaf diseases accurately</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700"><strong>Improved Disease Management:</strong> Significant improvements in disease management and reduced chemical usage</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700"><strong>Sustainable Production:</strong> Valuable tool for modernizing tea cultivation practices and ensuring sustainable production</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700"><strong>Industry Recommendation:</strong> Confidently recommended to others in the tea industry</span>
                    </li>
                  </ul>
                </div>
                
                <blockquote className="border-l-4 border-yellow-500 pl-6 italic text-gray-700 text-lg leading-relaxed">
                  "We are pleased to recommend the Tea Leaf Disease Identification and Treatment Recommendation System developed by SLIIT CAMPUS. This system has proven to be effective and practical for identifying tea leaf diseases accurately and providing timely treatment suggestions."
                </blockquote>
                
                <div className="mt-6 flex items-center gap-4">
                  <div className="flex-1 h-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded"></div>
                  <span className="text-sm font-semibold text-gray-600">May 24, 2025</span>
                  <div className="flex-1 h-1 bg-gradient-to-r from-orange-500 to-yellow-500 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Decoration */}
        <div className="mt-16 text-center animate-fade-in-up" style={{ animationDelay: '2s' }}>
          <div className="flex justify-center items-center space-x-4">
            <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded animate-pulse"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce"></div>
            <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(90deg); }
        }
        
        @keyframes float-fast {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(270deg); }
        }
        
        @keyframes float-reverse {
          0%, 100% { transform: translateY(0px) rotate(360deg); }
          50% { transform: translateY(25px) rotate(180deg); }
        }
        
        @keyframes orbit {
          0% { transform: rotate(0deg) translateX(30px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(30px) rotate(-360deg); }
        }
        
        @keyframes spiral {
          0% { transform: rotate(0deg) translateX(20px) scale(1); }
          50% { transform: rotate(180deg) translateX(40px) scale(1.2); }
          100% { transform: rotate(360deg) translateX(20px) scale(1); }
        }
        
        @keyframes zigzag {
          0%, 100% { transform: translateX(0) translateY(0); }
          25% { transform: translateX(15px) translateY(-10px); }
          50% { transform: translateX(0) translateY(-20px); }
          75% { transform: translateX(-15px) translateY(-10px); }
        }
        
        @keyframes morph {
          0%, 100% { border-radius: 50%; transform: scale(1) rotate(0deg); }
          25% { border-radius: 0%; transform: scale(1.1) rotate(90deg); }
          50% { border-radius: 50% 0%; transform: scale(0.9) rotate(180deg); }
          75% { border-radius: 0% 50%; transform: scale(1.1) rotate(270deg); }
        }
        
        @keyframes hexagon-spin {
          0% { transform: rotate(0deg) scale(1); clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%); }
          50% { transform: rotate(180deg) scale(1.2); clip-path: polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%); }
          100% { transform: rotate(360deg) scale(1); clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%); }
        }
        
        @keyframes diamond-pulse {
          0%, 100% { transform: rotate(45deg) scale(1); opacity: 0.4; }
          50% { transform: rotate(45deg) scale(1.3); opacity: 0.8; }
        }
        
        @keyframes elastic {
          0%, 100% { transform: scale(1) rotate(0deg); }
          25% { transform: scale(1.3, 0.7) rotate(90deg); }
          50% { transform: scale(0.7, 1.3) rotate(180deg); }
          75% { transform: scale(1.3, 0.7) rotate(270deg); }
        }
        
        @keyframes dna-helix {
          0% { transform: translateX(-50%) rotateY(0deg) translateZ(20px); }
          100% { transform: translateX(-50%) rotateY(360deg) translateZ(20px); }
        }
        
        @keyframes neural-pulse {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.1); }
        }
        
        @keyframes particle-system {
          0% { transform: translateY(0) scale(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh) scale(1); opacity: 0; }
        }
        
        @keyframes constellation-rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        
        @keyframes ripple {
          0% { transform: scale(0.5); opacity: 0.8; }
          100% { transform: scale(2); opacity: 0; }
        }
        
        @keyframes matrix-rain {
          0% { transform: translateY(-100%); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        
        @keyframes code-float {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.2; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 0.6; }
        }
        
        @keyframes energy-beam {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes blob-morph {
          0%, 100% { 
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
            transform: scale(1) rotate(0deg);
          }
          25% { 
            border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
            transform: scale(1.1) rotate(90deg);
          }
          50% { 
            border-radius: 50% 60% 30% 60% / 60% 40% 60% 40%;
            transform: scale(0.9) rotate(180deg);
          }
          75% { 
            border-radius: 60% 40% 60% 40% / 30% 60% 40% 70%;
            transform: scale(1.1) rotate(270deg);
          }
        }
        
        @keyframes quantum-dot {
          0%, 100% { 
            transform: scale(1) rotate(0deg);
            opacity: 0.25;
            box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4);
          }
          50% { 
            transform: scale(1.5) rotate(180deg);
            opacity: 0.8;
            box-shadow: 0 0 0 10px rgba(16, 185, 129, 0);
          }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(45deg); }
          to { transform: rotate(405deg); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0) rotate(12deg); }
          50% { transform: translateY(-10px) rotate(12deg); }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes wave {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100px); }
        }
        
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        
        .animate-float-medium {
          animation: float-medium 4s ease-in-out infinite;
        }
        
        .animate-float-fast {
          animation: float-fast 3s ease-in-out infinite;
        }
        
        .animate-float-reverse {
          animation: float-reverse 5s ease-in-out infinite;
        }
        
        .animate-orbit {
          animation: orbit 8s linear infinite;
        }
        
        .animate-spiral {
          animation: spiral 6s ease-in-out infinite;
        }
        
        .animate-zigzag {
          animation: zigzag 4s ease-in-out infinite;
        }
        
        .animate-morph {
          animation: morph 6s ease-in-out infinite;
        }
        
        .animate-hexagon-spin {
          animation: hexagon-spin 10s linear infinite;
        }
        
        .animate-diamond-pulse {
          animation: diamond-pulse 3s ease-in-out infinite;
        }
        
        .animate-elastic {
          animation: elastic 4s ease-in-out infinite;
        }
        
        .animate-dna-helix {
          animation: dna-helix 4s linear infinite;
        }
        
        .animate-neural-pulse {
          animation: neural-pulse 3s ease-in-out infinite;
        }
        
        .animate-particle-system {
          animation: particle-system linear infinite;
        }
        
        .animate-constellation-rotate {
          animation: constellation-rotate 20s linear infinite;
        }
        
        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }
        
        .animate-ripple {
          animation: ripple 3s ease-out infinite;
        }
        
        .animate-matrix-rain {
          animation: matrix-rain linear infinite;
        }
        
        .animate-code-float {
          animation: code-float 5s ease-in-out infinite;
        }
        
        .animate-energy-beam {
          animation: energy-beam 4s ease-in-out infinite;
        }
        
        .animate-blob-morph {
          animation: blob-morph 8s ease-in-out infinite;
        }
        
        .animate-quantum-dot {
          animation: quantum-dot 3s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-wave {
          animation: wave 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Team; 