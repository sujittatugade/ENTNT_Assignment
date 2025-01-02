import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook for page navigation


const AdminCommunicationMethod = () => {
  // State to hold the list of communication methods
  const [methods, setMethods] = useState([]);
  // State for managing the input form for new communication methods
  const [newMethod, setNewMethod] = useState({
    name: "",
    description: "",
    sequenceNumber: null,
    mandatory: false,
    customName: "",
  });

  // Dropdown options for communication method names
  const methodOptions = ["LinkedIn", "LinkedIn Message", "Email", "Phone Call"];
  
  // Use navigate hook for redirection
  const navigate = useNavigate();

  // Load existing communication methods from localStorage on component mount
  useEffect(() => {
    const savedMethods = JSON.parse(localStorage.getItem("communicationMethods")) || [];
    setMethods(savedMethods);
  }, []);

  // Save the updated list of methods back to localStorage
  const saveMethods = (updatedMethods) => {
    localStorage.setItem("communicationMethods", JSON.stringify(updatedMethods));
    setMethods(updatedMethods);
  };

  // Handler for adding a new communication method
  const addMethod = () => {
    // Ensure a valid method name is selected or entered
    if (!newMethod.name.trim() || (newMethod.name === "Other" && !newMethod.customName.trim())) {
      alert("Please select or provide a valid method name.");
      return;
    }

    // Add the new method to the list with the correct sequence number
    const updatedMethods = [
      ...methods,
      {
        ...newMethod,
        name: newMethod.name === "Other" ? newMethod.customName : newMethod.name,
        id: Date.now(),
        sequenceNumber: methods.length + 1, // Assign a sequence number based on the current methods length
      },
    ];
    saveMethods(updatedMethods); // Save the updated list to localStorage

    // Reset the form state
    setNewMethod({
      name: "",
      description: "",
      sequenceNumber: null,
      mandatory: false,
      customName: "",
    });
  };

  // Handler for deleting a communication method
  const deleteMethod = (id) => {
    // Remove the method by its ID and adjust the sequence number for remaining methods
    const updatedMethods = methods
      .filter((method) => method.id !== id)
      .map((method, index) => ({
        ...method,
        sequenceNumber: index + 1, // Reassign sequence numbers after deletion
      }));
    saveMethods(updatedMethods); // Save the updated list to localStorage
  };

  // Handler for editing a communication method's attributes
  const editMethod = (id, field, value) => {
    const updatedMethods = methods.map((method) =>
      method.id === id ? { ...method, [field]: value } : method
    );
    saveMethods(updatedMethods); // Save the updated list to localStorage
  };

  // Navigate back to the admin page
  const navigateToAdmin = () => {
    navigate("/admin");
  };

  return (
    <div>
      <Navbar />
      <div className="admin-module mt-4">
        <h1 className="text-xl text-center font-bold mb-4">Communication Method Management</h1>

        {/* Add Method Form */}
        <div className="mt-4 border border-gray-300 rounded p-4 shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Add New Communication Method</h2>
          
          {/* Method Name Dropdown */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">Method Name</label>
            <select
              value={newMethod.name}
              onChange={(e) => setNewMethod({ ...newMethod, name: e.target.value })}
              className="border px-2 py-1 w-full rounded"
            >
              <option value="">Select a Method</option>
              {methodOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Custom Name Input if "Other" is selected */}
          {newMethod.name === "Other" && (
            <div className="mb-4">
              <label className="block mb-2 font-medium">Custom Method Name</label>
              <input
                type="text"
                placeholder="Enter custom method name"
                value={newMethod.customName}
                onChange={(e) => setNewMethod({ ...newMethod, customName: e.target.value })}
                className="border px-2 py-1 w-full rounded"
              />
            </div>
          )}

          {/* Description Input */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">Description</label>
            <input
              type="text"
              placeholder="Enter description"
              value={newMethod.description}
              onChange={(e) => setNewMethod({ ...newMethod, description: e.target.value })}
              className="border px-2 py-1 w-full rounded"
            />
          </div>

          {/* Mandatory Checkbox */}
          <div className="mb-4 flex items-center">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={newMethod.mandatory}
                onChange={(e) => setNewMethod({ ...newMethod, mandatory: e.target.checked })}
                className="mr-2"
              />
              <span className="font-medium">Mandatory</span>
            </label>
          </div>

          {/* Add Method Button */}
          <button
            onClick={addMethod}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Method
          </button>
        </div>

        {/* List of Existing Methods */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-4">Existing Communication Methods</h2>
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="border border-gray-300 px-4 py-2 text-center">Sequence</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Description</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Mandatory</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {methods.map((method) => (
                <tr key={method.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {method.sequenceNumber}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <select
                      value={method.name}
                      onChange={(e) => editMethod(method.id, "name", e.target.value)}
                      className="border px-2 py-1"
                    >
                      {methodOptions.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="text"
                      value={method.description}
                      onChange={(e) => editMethod(method.id, "description", e.target.value)}
                      className="border px-2 py-1 w-full"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <input
                      type="checkbox"
                      checked={method.mandatory}
                      onChange={(e) => editMethod(method.id, "mandatory", e.target.checked)}
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => deleteMethod(method.id)}
                      className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Back Button */}
        <button
          onClick={navigateToAdmin}
          className="bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-600"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default AdminCommunicationMethod;
