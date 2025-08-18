import React, { useState } from "react";
import toast from "react-hot-toast";
import { adminLogin, adminSingup } from "../service/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminAuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  //singup data
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    department: "",
    password: "",
  });

  //login data
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { login: newUser } = useAuth();

  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const postSignupData = async (data) => {
    try {
      const res = await adminSingup(data);
      console.log(res.data);
      toast.success(res.data?.message);
    } catch (err) {
      console.log(err.message);
      toast.error("Something went wrong.Please try again!!!");
    }
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    postSignupData(signupData);
    setSignupData({
      fullName: "",
      email: "",
      department: "",
      password: "",
    });
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const postLoginData = async (data) => {
    try {
      const res = await adminLogin(data);
      console.log(res.data);
      newUser(res.data?.admin);
      navigate("/admin_dashboard");
      toast.success(res.data?.message);
    } catch (error) {
      console.log(error.message);
      toast.error("Something went wrong.Please try again!!");
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    postLoginData(loginData);
    setLoginData({
      email: "",
      password: "",
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4">
      <div className="w-full max-w-4xl bg-gray-100 shadow-lg rounded-lg overflow-hidden relative">
        {/* Sliding container */}
        <div
          className={`flex transition-transform duration-500 ease-in-out ${
            isLogin ? "translate-x-0" : "-translate-x-1/2"
          }`}
          style={{ width: "200%" }}
        >
          {/* Login Form */}
          <div className="w-1/2 p-8">
            <h2 className="text-2xl font-bold text-center text-gray-800">
              Admin Login
            </h2>
            <form className="mt-6 space-y-4" onSubmit={handleLoginSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  placeholder="Enter email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  placeholder="Enter password"
                />
              </div>
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
              Admin Signup
            </h2>
            <form className="mt-6 space-y-4" onSubmit={handleSignupSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={signupData.fullName}
                  onChange={handleSignupChange}
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={signupData.email}
                  onChange={handleSignupChange}
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  placeholder="Enter email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Department
                </label>
                <input
                  type="text"
                  name="department"
                  value={signupData.department}
                  onChange={handleSignupChange}
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  placeholder="Enter your department"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={signupData.password}
                  onChange={handleSignupChange}
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  placeholder="Create password"
                />
              </div>
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

export default AdminAuthPage;
