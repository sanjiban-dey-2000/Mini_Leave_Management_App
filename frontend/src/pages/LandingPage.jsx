import React from "react";

const LandingPage = () => {
  return (
    <section className="relative bg-white text-gray-900 min-h-[80vh] flex items-center justify-center px-4 sm:px-6">
      <div className="text-center max-w-xl sm:max-w-3xl">
        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold leading-snug sm:leading-tight">
          Simplify Leave Management for Your Organization
        </h1>

        {/* Subtext */}
        <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-gray-600">
          Empower employees and administrators with an easy-to-use leave tracking system.
          Apply, approve, and manage leaves seamlessly.
        </p>

        {/* Buttons */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <button className="px-5 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition w-full sm:w-auto">
            Employee Login
          </button>
          <button className="px-5 py-3 bg-gray-800 text-white font-semibold rounded-lg shadow-md hover:bg-gray-900 transition w-full sm:w-auto">
            Admin Login
          </button>
        </div>
      </div>
    </section>
  );
};

export default LandingPage;
