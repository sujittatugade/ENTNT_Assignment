// HomePage.jsx
import React from 'react';
import Navbar from './Navbar';  // Importing Navbar component for consistent site navigation
import { useNavigate } from 'react-router-dom';  // Importing useNavigate hook from react-router-dom for navigation

const HomePage = () => {
  const navigate = useNavigate();  // Hook to handle navigation

  // Function to handle navigation based on the provided path
  const handleNavigation = (path) => {
    navigate(path);  // Navigate to the specified path
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar Component to display the navigation bar */}
      <Navbar />

      {/* Main Content Section */}
      <main className="flex-grow bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Grid layout for different feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card for managing companies */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-gray-800">Companies</h2>
              <p className="text-gray-600 mt-4">Manage your company list and associated details.</p>
              <button
                className="mt-4 text-blue-500"
                onClick={() => handleNavigation('/login')}  // Navigate to login for managing companies
              >
                Manage Companies
              </button>
            </div>

            {/* Card for viewing calendar and communication schedules */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-gray-800">Calendar</h2>
              <p className="text-gray-600 mt-4">Track your communication schedule and manage important dates.</p>
              <button
                className="mt-4 text-blue-500"
                onClick={() => handleNavigation('/calendarview')}  // Navigate to the calendar view
              >
                Calendar View
              </button>
            </div>

            {/* Card for user dashboard */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-gray-800">User Dashboard</h2>
              <p className="text-gray-600 mt-4">Stay updated with alerts for new and upcoming communication tasks.</p>
              <button
                className="mt-4 text-blue-500"
                onClick={() => handleNavigation('/userdashboard')}  // Navigate to the user dashboard
              >
                Dashboard
              </button>
            </div>

            {/* Card for notifications */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-gray-800">Alert</h2>
              <p className="text-gray-600 mt-4">Stay updated with alerts for new and upcoming communication tasks.</p>
              <button
                className="mt-4 text-blue-500"
                onClick={() => handleNavigation('/notification')}  // Navigate to notifications page
              >
                Notification
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer section (currently not implemented, can be added as needed) */}
    </div>
  );
};

export default HomePage;
