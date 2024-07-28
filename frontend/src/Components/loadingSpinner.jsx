import React from "react";

const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="w-10 h-10 border-4 border-t-transparent border-gray-500 border-solid rounded-full animate-spin"></div>
  </div>
);

export default LoadingSpinner;
