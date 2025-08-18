import { Link } from "react-router-dom";
import { FaUserTie, FaUser, FaBars } from "react-icons/fa";
import { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl md:text-2xl font-bold tracking-wide">
          <span className="text-white">WorkFlow</span>
          <span className="text-indigo-200">.app</span>
        </Link>

        {/* Hamburger for mobile */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FaBars />
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 font-medium">
          <Link to="/" className="hover:text-indigo-200 transition">Home</Link>
          <Link to="/about" className="hover:text-indigo-200 transition">About</Link>
          <Link to="/services" className="hover:text-indigo-200 transition">Services</Link>
          <Link to="/contact" className="hover:text-indigo-200 transition">Contact</Link>
        </nav>

        {/* Login Options (Desktop) */}
        <div className="hidden md:flex space-x-3">
          <Link
            to="/admin-login"
            className="flex items-center gap-2 bg-white text-indigo-700 px-3 md:px-4 py-2 rounded-full font-medium hover:bg-indigo-100 transition text-sm md:text-base"
          >
            <FaUserTie /> Admin
          </Link>
          <Link
            to="/employee-login"
            className="flex items-center gap-2 bg-indigo-500 px-3 md:px-4 py-2 rounded-full font-medium hover:bg-indigo-400 transition text-sm md:text-base"
          >
            <FaUser /> Employee
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-indigo-700 px-4 py-3 space-y-3">
          <nav className="flex flex-col space-y-2 font-medium">
            <Link to="/" className="hover:text-indigo-200 transition">Home</Link>
            <Link to="/about" className="hover:text-indigo-200 transition">About</Link>
            <Link to="/services" className="hover:text-indigo-200 transition">Services</Link>
            <Link to="/contact" className="hover:text-indigo-200 transition">Contact</Link>
          </nav>

          {/* Login Options (Mobile) */}
          <div className="flex flex-col space-y-2 pt-3 border-t border-indigo-500">
            <Link
              to="/admin-login"
              className="flex items-center gap-2 bg-white text-indigo-700 px-3 py-2 rounded-full font-medium hover:bg-indigo-100 transition text-sm"
            >
              <FaUserTie /> Admin
            </Link>
            <Link
              to="/employee-login"
              className="flex items-center gap-2 bg-indigo-500 px-3 py-2 rounded-full font-medium hover:bg-indigo-400 transition text-sm"
            >
              <FaUser /> Employee
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
