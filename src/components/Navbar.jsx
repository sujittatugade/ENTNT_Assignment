// Navbar.jsx
import React from 'react';
import { BellIcon } from '@heroicons/react/24/outline';  // Importing the Bell icon from Heroicons
import { useNavigate } from 'react-router-dom';  // useNavigate hook for navigation

const Navbar = () => {
  const navigate = useNavigate();  // Hook to navigate between pages

  // Function to handle navigation on button clicks
  const handleNavigation = (path) => {
    navigate(path);  // Navigates to the specified path
  };

  return (
    <div className="bg-blue-800 text-white py-2 px-6"> {/* Container with blue background and white text */}
      <div className="container mx-auto flex justify-between items-center mt-2">
        {/* Title of the navbar */}
        <h1 className="text-2xl text-white font-bold">Communication Tracking</h1>

        {/* Navigation buttons */}
        <div className="flex items-center space-x-6">
          {/* Home Page Button */}
          <button
            onClick={() => handleNavigation('/')}
            className="text-white rounded-lg px-4 py-2 hover:text-gray-200"
          >
            Home
          </button>

          {/* Manage Companies Button */}
          <button
            onClick={() => handleNavigation('/login')}
            className="text-white rounded-lg px-4 py-2 hover:text-gray-200"
          >
            Manage Companies
          </button>

          {/* User Dashboard Button */}
          <button
            onClick={() => handleNavigation('/userdashboard')}
            className="text-white rounded-lg px-4 py-2 hover:text-gray-200"
          >
            Dashboard
          </button>

          {/* Calendar View Button */}
          <button
            onClick={() => handleNavigation('/calendarview')}
            className="text-white rounded-lg px-4 py-2 hover:text-gray-200"
          >
            Calendar View
          </button>

          {/* Notification Icon */}
          <button className="relative" onClick={() => handleNavigation('/notification')}>
            {/* Bell Icon with hover effect */}
            <BellIcon className="w-6 h-6 text-white hover:text-gray-300" />
            {/* Optional: Notification Badge can be added here if needed */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
