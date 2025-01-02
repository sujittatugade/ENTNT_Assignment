import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

const AdminCompanyManagement = () => {
  const [companies, setCompanies] = useState([]);
  const [newCompany, setNewCompany] = useState({
    name: "",
    location: "",
    linkedIn: "",
    emails: "",
    phoneNumbers: "",
    comments: "",
    periodicity: { count: 2, unit: "weeks" },
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const companyNames = ["HCL", "TCS", "Wipro", "DXC", "Infosys"];
  const locations = ["Pune", "Mumbai", "Bangalore"];
  const periodicityUnits = ["days", "weeks", "months"];

  useEffect(() => {
    const savedCompanies = JSON.parse(localStorage.getItem("companies")) || [];
    setCompanies(savedCompanies);
  }, []);

  const saveCompanies = (updatedCompanies) => {
    localStorage.setItem("companies", JSON.stringify(updatedCompanies));
    setCompanies(updatedCompanies);
  };

  const validateFields = () => {
    const newErrors = {};

    if (!newCompany.name) newErrors.name = "Company name is required.";
    if (!newCompany.location) newErrors.location = "Location is required.";
    if (!newCompany.linkedIn) newErrors.linkedIn = "LinkedIn profile is required.";
    if (!newCompany.emails) {
      newErrors.emails = "Email(s) cannot be empty.";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}(, *[\w-.]+@([\w-]+\.)+[\w-]{2,4})*$/.test(newCompany.emails)) {
      newErrors.emails = "Please enter valid email(s). Use commas for multiple emails.";
    }
    if (!newCompany.phoneNumbers) {
      newErrors.phoneNumbers = "Phone number(s) cannot be empty.";
    } else if (!/^\d{10}(, *\d{10})*$/.test(newCompany.phoneNumbers)) {
      newErrors.phoneNumbers = "Please enter valid phone number(s). Use commas for multiple numbers.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addCompany = () => {
    if (!validateFields()) return;

    const updatedCompanies = [
      ...companies,
      { ...newCompany, id: Date.now() },
    ];
    saveCompanies(updatedCompanies);

    setNewCompany({
      name: "",
      location: "",
      linkedIn: "",
      emails: "",
      phoneNumbers: "",
      comments: "",
      periodicity: { count: 2, unit: "weeks" },
    });
    setErrors({});
  };

  const deleteCompany = (id) => {
    const updatedCompanies = companies.filter((company) => company.id !== id);
    saveCompanies(updatedCompanies);
  };

  return (
    <div>
      <Navbar />
      <div className="admin-module mt-2">
        <h1 className="text-xl text-center font-bold mb-4">Company Management</h1>
      </div>

      <div className="admin-module p-4 border border-gray-300 rounded-md">
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Add New Company</h2>

          <div className="mb-2">
            <select
              value={newCompany.name}
              onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
              className="border px-2 py-1 mr-2"
            >
              <option value="">Select Company</option>
              {companyNames.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Or add company"
              value={newCompany.name && !companyNames.includes(newCompany.name) ? newCompany.name : ""}
              onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
              className="border px-2 py-1 mt-2"
            />
            {errors.name && <p className="text-red-500">{errors.name}</p>}
          </div>

          <div className="mb-2">
            <select
              value={newCompany.location}
              onChange={(e) => setNewCompany({ ...newCompany, location: e.target.value })}
              className="border px-2 py-1 mr-2"
            >
              <option value="">Select Location</option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Or add location"
              value={newCompany.location && !locations.includes(newCompany.location) ? newCompany.location : ""}
              onChange={(e) => setNewCompany({ ...newCompany, location: e.target.value })}
              className="border px-2 py-1 mt-2"
            />
            {errors.location && <p className="text-red-500">{errors.location}</p>}
          </div>

          <input
            type="text"
            placeholder="LinkedIn Profile"
            value={newCompany.linkedIn}
            onChange={(e) => setNewCompany({ ...newCompany, linkedIn: e.target.value })}
            className="border px-2 py-1 mt-2 mr-2"
          />
          {errors.linkedIn && <p className="text-red-500">{errors.linkedIn}</p>}

          <input
            type="text"
            placeholder="Emails"
            value={newCompany.emails}
            onChange={(e) => setNewCompany({ ...newCompany, emails: e.target.value })}
            className="border px-2 py-1 mr-2"
          />
          {errors.emails && <p className="text-red-500">{errors.emails}</p>}

          <input
            type="text"
            placeholder="Phone Numbers"
            value={newCompany.phoneNumbers}
            onChange={(e) => setNewCompany({ ...newCompany, phoneNumbers: e.target.value })}
            className="border px-2 py-1 mr-2"
          />
          {errors.phoneNumbers && <p className="text-red-500">{errors.phoneNumbers}</p>}

          <textarea
            placeholder="Comments"
            value={newCompany.comments}
            onChange={(e) => setNewCompany({ ...newCompany, comments: e.target.value })}
            className="border px-2 py-1 mr-2"
          />

          <div className="flex items-center mt-2">
            <input
              type="number"
              min="1"
              value={newCompany.periodicity.count}
              onChange={(e) =>
                setNewCompany({
                  ...newCompany,
                  periodicity: { ...newCompany.periodicity, count: e.target.value },
                })
              }
              className="border px-2 py-1 mr-2 w-16"
            />
            <select
              value={newCompany.periodicity.unit}
              onChange={(e) =>
                setNewCompany({
                  ...newCompany,
                  periodicity: { ...newCompany.periodicity, unit: e.target.value },
                })
              }
              className="border px-2 py-1"
            >
              {periodicityUnits.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={addCompany}
            className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
          >
            Add Company
          </button>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Existing Companies</h2>
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Location</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company) => (
                <tr key={company.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{company.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{company.location}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => deleteCompany(company.id)}
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

        <div className="mt-4">
          <button
            onClick={() => navigate("/communicationmethod")}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Manage Communication Methods
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminCompanyManagement;

