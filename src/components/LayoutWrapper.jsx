import React from "react";

// Wrapper component for global layout and styling
const LayoutWrapper = ({ children }) => {
  return (
    <div className="bg-lightBg dark:bg-darkBg transition-all duration-300 min-h-screen animate-fadeIn">
      <div className="flex flex-col min-h-screen space-y-8 p-6">
        {children} {/* Render child components dynamically */}
      </div>
    </div>
  );
};

export default LayoutWrapper;
