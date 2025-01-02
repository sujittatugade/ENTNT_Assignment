// LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import "./UserModule/Calendar.css";  // Importing custom CSS for styling
import Navbar from './Navbar';  // Importing Navbar component for consistent navigation

const LoginPage = () => {
  // State hooks to manage form input and error message
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const navigate = useNavigate();  // Hook for programmatic navigation
  const location = useLocation();  // Hook to get the location object for redirect after login
  const from = location.state?.from || '/admin';  // Default redirect path if no state is passed

  // Handle login submission
  const handleLogin = async (e) => {
    e.preventDefault();  // Prevent default form submission behavior

    try {
      // Sending login credentials to the backend server
      const response = await axios.post('http://localhost:4000/login', {
        username,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // If login is successful, redirect to the previous page or the default '/admin'
      if (response.status === 200) {
        navigate(from);
      } else {
        setErrorMessage('Invalid response from server');
      }
    } catch (error) {
      // Handle any errors, including server or network issues
      setErrorMessage(error.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div>
      {/* Navbar for consistent header across pages */}
      <Navbar />

      {/* Main container for the login form */}
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-6">
          {/* Login Form */}
          <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>

          <form className="mt-4" onSubmit={handleLogin}>
            {/* Username Input */}
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}  // Handle change for username
                className="mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}  // Handle change for password
                className="mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Login
            </button>
          </form>

          {/* Error Message */}
          {errorMessage && (
            <p className="mt-4 text-sm text-center text-red-600">{errorMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
