import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { GiMedicines } from "react-icons/gi";
import { FaHome, FaBrain, FaLeaf, FaImage, FaInfoCircle } from "react-icons/fa";

const Navbar = () => {
  const [show, setShow] = useState(false);

  return (
    <nav className="bg-transparent py-6 px-6 sticky top-0 z-50 backdrop-blur-lg">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-20 w-auto transition-transform duration-300 hover:scale-110"
          />
        </div>

        {/* Navigation Links */}
        <div
          className={`${
            show ? "block" : "hidden"
          } md:flex md:items-center absolute md:static top-20 left-0 w-full md:w-auto bg-white/95 md:bg-transparent backdrop-blur-lg md:backdrop-blur-none shadow-xl md:shadow-none p-6 md:p-0 rounded-b-xl md:rounded-none transition-all duration-500 ease-in-out`}
        >
          <div className="flex flex-col md:flex-row md:space-x-10 space-y-6 md:space-y-0 text-gray-900">
            <NavLink
              to="/"
              icon={<FaHome className="h-5 w-5 text-emerald-500" />}
              text="Home"
              onClick={() => setShow(false)}
            />
            <NavLink
              to="/cnn-detection/ai"
              icon={<FaBrain className="h-5 w-5 text-emerald-500" />}
              text="CNN Detection"
              onClick={() => setShow(false)}
            />
            <NavLink
              to="/leaf-recognition/ai"
              icon={<FaLeaf className="h-5 w-5 text-emerald-500" />}
              text="Leaf Recognition"
              onClick={() => setShow(false)}
            />
            <NavLink
              to="/segmentation/ai"
              icon={<FaImage className="h-5 w-5 text-emerald-500" />}
              text="Segmentation"
              onClick={() => setShow(false)}
            />
            <NavLink
              to="/treatments/ai"
              icon={<GiMedicines className="h-5 w-5 text-emerald-500" />}
              text="Treatment"
              onClick={() => setShow(false)}
            />
            <NavLink
              to="/about"
              icon={<FaInfoCircle className="h-5 w-5 text-emerald-500" />}
              text="About Us"
              onClick={() => setShow(false)}
            />
          </div>
        </div>

        {/* Hamburger Menu (Mobile) */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setShow(!show)}
            className="text-gray-900 hover:text-emerald-600 focus:outline-none transition-colors duration-300"
          >
            <GiHamburgerMenu className="h-8 w-8" />
          </button>
        </div>
      </div>
    </nav>
  );
};

// Reusable NavLink Component
const NavLink = ({ to, icon, text, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="flex items-center space-x-3 text-xl font-semibold text-gray-900 hover:text-emerald-600 transition-all duration-300 group"
  >
    {icon}
    <span className="relative">
      {text}
      <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-emerald-500 transition-all duration-300 group-hover:w-full" />
    </span>
  </Link>
);

export default Navbar;