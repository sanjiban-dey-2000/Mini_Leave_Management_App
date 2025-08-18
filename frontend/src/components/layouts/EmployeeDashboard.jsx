// src/components/layouts/EmployeeDashboard.jsx
import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FaHome, FaSignOutAlt, FaRegCalendarAlt } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const EmployeeDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/employee-login");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md z-50 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:flex md:flex-col`}
      >
        <div className="flex items-center justify-center h-20 border-b">
          <h1 className="text-2xl font-bold text-indigo-600">Employee</h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link
            to="/employee_dashboard"
            className="flex items-center gap-2 p-2 rounded hover:bg-indigo-100 transition"
          >
            <FaHome /> Home
          </Link>
          <Link
            to="/employee_dashboard/leaves"
            className="flex items-center gap-2 p-2 rounded hover:bg-indigo-100 transition"
          >
            <FaRegCalendarAlt /> Leave Applications
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 p-2 rounded hover:bg-red-100 transition w-full"
          >
            <FaSignOutAlt /> Logout
          </button>
        </nav>
      </div>

      {/* Mobile menu toggle */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 bg-indigo-600 text-white rounded-md"
        >
          {isSidebarOpen ? "Close" : "Menu"}
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 p-4 md:ml-10 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default EmployeeDashboard;
