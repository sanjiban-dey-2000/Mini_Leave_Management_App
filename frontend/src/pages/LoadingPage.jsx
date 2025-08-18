import React from "react";

const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-indigo-600 border-dashed rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-700 text-lg font-medium">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingPage;
