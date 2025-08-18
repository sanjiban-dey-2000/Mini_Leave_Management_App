// src/pages/EmployeeAuthPage.jsx
import React, { useState } from "react";
import toast from "react-hot-toast";
import { employeeLogin, employeeSignup } from "../service/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const EmployeeAuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  // Signup state
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  // Login state
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { login: setUser } = useAuth();

  const handleSignupChange = (e) =>
    setSignupData({ ...signupData, [e.target.name]: e.target.value });

  const handleLoginChange = (e) =>
    setLoginData({ ...loginData, [e.target.name]: e.target.value });

  const postSignup = async (data) => {
    try {
      const res = await employeeSignup(data);
      toast.success(res.data?.message);
      setIsLogin(true); // Switch to login after signup
    } catch (err) {
      console.log(err.message);
      toast.error("Signup failed. Try again!");
    }
  };

  const postLogin = async (data) => {
    try {
      const res = await employeeLogin(data);
      toast.success(res.data?.message);
      setUser(res.data.user);
      navigate("/employee_dashboard");
    } catch (err) {
      console.log(err.message);
      toast.error("Login failed. Try again!");
    }
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    postSignup(signupData);
    setSignupData({ fullName: "", email: "", password: "" });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    postLogin(loginData);
    setLoginData({ email: "", password: "" });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4">
      <div className="w-full max-w-4xl bg-gray-100 shadow-lg rounded-lg overflow-hidden relative">
        {/* Sliding container */}
        <div
          className={`flex transition-transform duration-500 ease-in-out`}
          style={{
            width: "200%",
            transform: isLogin ? "translateX(0%)" : "translateX(-50%)",
          }}
        >
          {/* Login Form */}
          <div className="w-1/2 p-8">
            <h2 className="text-2xl font-bold text-center text-gray-800">
              Employee Login
            </h2>
            <form className="mt-6 space-y-4" onSubmit={handleLoginSubmit}>
              <input
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleLoginChange}
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                required
              />
              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleLoginChange}
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                required
              />
              <button
                type="submit"
                className="w-full py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
              >
                Login
              </button>
            </form>
            <p className="mt-4 text-sm text-center text-gray-600">
              Don’t have an account?{" "}
              <button
                className="text-indigo-600 font-semibold hover:underline"
                onClick={() => setIsLogin(false)}
              >
                Sign up
              </button>
            </p>
          </div>

          {/* Signup Form */}
          <div className="w-1/2 p-8">
            <h2 className="text-2xl font-bold text-center text-gray-800">
              Employee Signup
            </h2>
            <form className="mt-6 space-y-4" onSubmit={handleSignupSubmit}>
              <input
                type="text"
                name="fullName"
                value={signupData.fullName}
                onChange={handleSignupChange}
                placeholder="Full Name"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                required
              />
              <input
                type="email"
                name="email"
                value={signupData.email}
                onChange={handleSignupChange}
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                required
              />
              <input
                type="password"
                name="password"
                value={signupData.password}
                onChange={handleSignupChange}
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                required
              />
              <button
                type="submit"
                className="w-full py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
              >
                Sign Up
              </button>
            </form>
            <p className="mt-4 text-sm text-center text-gray-600">
              Already have an account?{" "}
              <button
                className="text-indigo-600 font-semibold hover:underline"
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeAuthPage;
