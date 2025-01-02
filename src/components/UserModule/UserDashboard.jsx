import React, { useState, useEffect } from "react";
import moment from "moment";
import Navbar from "../Navbar";
import "./UserDashboard.css";

const UserDashboard = () => {
  // State hooks to manage companies, communications, highlights, selected company, and new communication form
  const [companies, setCompanies] = useState([]);
  const [communications, setCommunications] = useState([]);
  const [highlightOverrides, setHighlightOverrides] = useState({});
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [newCommunication, setNewCommunication] = useState({
    communicationType: "LinkedIn Message",
    date: "",
    notes: "",
  });

  // useEffect hook to load data from localStorage when the component mounts
  useEffect(() => {
    const storedCompanies = JSON.parse(localStorage.getItem("companies")) || [];
    const storedCommunications = JSON.parse(localStorage.getItem("communications")) || [];
    setCompanies(storedCompanies);
    setCommunications(storedCommunications);
  }, []);

  // Helper function to retrieve the last five communications for a specific company
  const getLastFiveCommunications = (companyId) => {
    const companyCommunications = communications.filter(
      (com) => com.companyId === companyId
    );
    const sortedCommunications = companyCommunications
      .filter((com) => moment(com.date).isBefore(moment())) // Only include past communications
      .sort((a, b) => moment(b.date).diff(moment(a.date))); // Sort by most recent
    return sortedCommunications.slice(0, 5); // Return the most recent five
  };

  // Helper function to retrieve the next scheduled communication for a specific company
  const getNextScheduledCommunication = (companyId) => {
    const companyCommunications = communications.filter(
      (com) => com.companyId === companyId
    );
    const upcomingCommunication = companyCommunications
      .filter((com) => moment(com.date).isSameOrAfter(moment())) // Include only future communications
      .sort((a, b) => moment(a.date).diff(moment(b.date)))[0]; // Sort to get the earliest upcoming communication
    return upcomingCommunication || null; // Return the next communication or null if none
  };

  // Helper function to determine the row highlight based on communication's date
  const getRowHighlight = (communication) => {
    if (!communication) return "";

    // Always highlight today's date with a yellow background
    if (moment(communication.date).isSame(moment(), "day")) return "bg-yellow-100";

    // If there's a manual override, don't apply any highlight
    if (highlightOverrides[communication.id]) return "";

    // Apply a red highlight for overdue communications
    if (moment(communication.date).isBefore(moment())) return "bg-red-100";

    return ""; // No highlight for future communications
  };

  // Toggle the highlight override for a specific communication
  const toggleHighlightOverride = (communicationId) => {
    setHighlightOverrides((prev) => ({
      ...prev,
      [communicationId]: !prev[communicationId],
    }));
  };

  // Handle the action of logging a new communication for a selected company
  const handleLogCommunication = (companyId) => {
    setSelectedCompany(companyId); // Set the selected company
    setNewCommunication({ communicationType: "LinkedIn Message", date: "", notes: "" }); // Reset new communication form
  };

  // Handle the submission of a new communication
  const handleSubmitCommunication = () => {
    const updatedCommunications = [
      ...communications,
      { ...newCommunication, companyId: selectedCompany, id: Date.now() }, // Add new communication with unique ID
    ];
    setCommunications(updatedCommunications);
    localStorage.setItem("communications", JSON.stringify(updatedCommunications)); // Save to localStorage
    setSelectedCompany(null); // Reset the selected company
  };

  // Handle the cancellation of logging a new communication
  const handleCancel = () => {
    setSelectedCompany(null); // Close the modal and reset selected company
  };

  return (
    <div>
      {/* Render the Navbar */}
      <Navbar />
      <div className="user-dashboard">
        <div>
          {/* Dashboard header */}
          <h2 className="text-lg py-2 text-center font-semibold mb-2">Company Communication Summary</h2>
          {/* Table displaying companies and their communication details */}
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border px-4 py-2">Company Name</th>
                <th className="border px-4 py-2">Last Five Communications</th>
                <th className="border px-4 py-2">Next Scheduled Communication</th>
                <th className="border px-4 py-2">Log Communication</th>
              </tr>
            </thead>
            <tbody>
              {/* Loop through each company and display their communication summary */}
              {companies.map((company) => {
                const lastFiveCommunications = getLastFiveCommunications(company.id);
                const nextCommunication = getNextScheduledCommunication(company.id);

                return (
                  <tr key={company.id}>
                    <td className="border px-4 py-2">{company.name}</td>
                    <td className="border px-4 py-2">
                      {/* Display last five communications or a message if none */}
                      {lastFiveCommunications.length > 0 ? (
                        <ul>
                          {lastFiveCommunications.map((com) => (
                            <li
                              key={com.id}
                              className={getRowHighlight(com)} // Apply dynamic highlight based on date
                            >
                              {`${com.communicationType} on ${moment(com.date).format("Do MMMM YYYY")}`}
                              <button
                                onClick={() => toggleHighlightOverride(com.id)} // Toggle highlight override
                                className="ml-2 text-sm text-blue-500"
                              >
                                Toggle Highlight
                              </button>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <span className="text-gray-500">No performed communications</span>
                      )}
                    </td>
                    <td className="border px-4 py-2">
                      {/* Display next scheduled communication or a message if none */}
                      {nextCommunication ? (
                        <div className={getRowHighlight(nextCommunication)}>
                          {`${nextCommunication.communicationType} on ${moment(nextCommunication.date).format("Do MMMM YYYY")}`}
                        </div>
                      ) : (
                        <span className="text-gray-500">No upcoming communication</span>
                      )}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      <button
                        onClick={() => handleLogCommunication(company.id)} // Open the communication log form
                        className="bg-green-500 text-white px-2 py-1 rounded"
                      >
                        Log Communication
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Modal to log new communication */}
        {selectedCompany && (
          <div className="modal">
            <div className="modal-content">
              <h2>Log Communication</h2>
              {/* Communication type selection */}
              <div>
                <label>Type</label>
                <select
                  value={newCommunication.communicationType}
                  onChange={(e) =>
                    setNewCommunication({ ...newCommunication, communicationType: e.target.value })
                  }
                >
                  <option value="LinkedIn Message">LinkedIn Message</option>
                  <option value="Email">Email</option>
                  <option value="Phone Call">Phone Call</option>
                </select>
              </div>
              {/* Date input */}
              <div>
                <label>Date</label>
                <input
                  type="date"
                  value={newCommunication.date}
                  onChange={(e) =>
                    setNewCommunication({ ...newCommunication, date: e.target.value })
                  }
                />
              </div>
              {/* Notes textarea */}
              <div>
                <label>Notes</label>
                <textarea
                  value={newCommunication.notes}
                  onChange={(e) =>
                    setNewCommunication({ ...newCommunication, notes: e.target.value })
                  }
                />
              </div>
              {/* Submit and Cancel buttons */}
              <button onClick={handleSubmitCommunication} className="bg-green-500 px-4 py-2 text-white rounded">
                Submit
              </button>
              <button onClick={handleCancel} className="bg-red-500 px-4 py-2 text-white rounded ml-2">
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
