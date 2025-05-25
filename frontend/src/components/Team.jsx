import React from "react";

const Team = () => {
  // Team data
  const supervisor = {
    name: "Prof. Pradeep Abeygunawardhana",
    role: "Dean/Faculty of Computing (FOC) and Professor in Computer Systems Engineering at SLIIT",
    image: "/team/professor.jpg",
    description: "Leading the research initiative on AI-powered tea disease detection and treatment recommendation systems with extensive expertise in computer systems engineering and academic leadership."
  };

  const teamMembers = [
    {
      name: "Lasitha Heenkenda",
      role: "Software Engineer",
      image: "/team/developer1.jpeg",
      description: "Developing robust software solutions and implementing machine learning algorithms for tea disease detection systems."
    },
    {
      name: "Developer 2", 
      role: "Quality Assurance Engineer",
      image: "/team/developer2.jpeg",
      description: "Building scalable applications and creating intuitive user interfaces for the tea disease detection platform."
    },
    {
      name: "Developer 3",
      role: "Quality Assurance Engineer", 
      image: "/team/developer3.jpeg",
      description: "Ensuring software quality through comprehensive testing and validation of AI models and system functionality."
    },
    {
      name: "Developer 4",
      role: "Software Engineer",
      image: "/team/developer4.jpeg", 
      description: "Conducting thorough quality assessments and performance testing to guarantee reliable disease detection accuracy."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16 bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Research Team</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Meet the dedicated team of researchers and developers working to revolutionize tea disease detection through cutting-edge AI technology.
        </p>
      </div>

      {/* Supervisor Section */}
      <div className="mb-16">
        <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">Project Supervisor</h3>
        <div className="flex justify-center">
          <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md text-center transform hover:scale-105 transition-all duration-300 border-t-4 border-green-600">
            <div className="mb-6">
              <img
                src={supervisor.image}
                alt={supervisor.name}
                className="w-32 h-32 rounded-full mx-auto object-cover shadow-lg border-4 border-green-100"
              />
            </div>
            <h4 className="text-2xl font-bold text-gray-800 mb-2">{supervisor.name}</h4>
            <p className="text-green-600 font-semibold text-lg mb-4">{supervisor.role}</p>
            <p className="text-gray-600 leading-relaxed">{supervisor.description}</p>
            <div className="mt-6 flex justify-center space-x-4">
              <div className="w-12 h-1 bg-green-600 rounded"></div>
              <div className="w-12 h-1 bg-emerald-500 rounded"></div>
              <div className="w-12 h-1 bg-teal-500 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Developers & Researchers Section */}
      <div>
        <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">Developers & Researchers</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 text-center transform hover:scale-105 hover:shadow-xl transition-all duration-300 border-t-4 border-emerald-500"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-4">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto object-cover shadow-md border-3 border-emerald-100"
                />
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h4>
              <p className="text-emerald-600 font-semibold mb-3">{member.role}</p>
              <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
              <div className="mt-4 flex justify-center">
                <div className="w-8 h-1 bg-emerald-500 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Decoration */}
      <div className="mt-16 text-center">
        <div className="flex justify-center items-center space-x-4">
          <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default Team; 