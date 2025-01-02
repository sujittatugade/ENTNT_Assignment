import React, { useState, useEffect } from "react";
import "./Notification.css";
import Navbar from "../Navbar";
import moment from "moment";

const Notification = () => {
  // State hooks to manage companies and communications
  const [companies, setCompanies] = useState([]);
  const [communications, setCommunications] = useState([]);

  // useEffect hook to load data from localStorage when the component mounts
  useEffect(() => {
    const storedCompanies = JSON.parse(localStorage.getItem("companies")) || [];
    const storedCommunications = JSON.parse(localStorage.getItem("communications")) || [];
    setCompanies(storedCompanies);
    setCommunications(storedCommunications);
  }, []);

  // Helper function to filter overdue communications (i.e., communications due before today)
  const getOverdueCommunications = () => {
    return communications.filter((com) => moment(com.date).isBefore(moment(), "day"));
  };

  // Helper function to filter today's communications
  const getTodaysCommunications = () => {
    return communications.filter((com) => moment(com.date).isSame(moment(), "day"));
  };

  // Calculate badge counts for overdue and today's communications
  const overdueCount = getOverdueCommunications().length;
  const todaysCount = getTodaysCommunications().length;

  return (
    <div>
      {/* Render Navbar */}
      <Navbar />

      <div className="user-module">
        <header className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold">Notifications</h1>
        </header>

        {/* Overdue Communications Section */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2 flex items-center">
            Overdue Communications
            {/* Display badge with count if there are overdue communications */}
            {overdueCount > 0 && (
              <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                {overdueCount}
              </span>
            )}
          </h2>
          {/* Display overdue communications or a message if none */}
          {overdueCount > 0 ? (
            <ul className="list-disc pl-6">
              {getOverdueCommunications().map((com) => (
                <li key={com.id} className="bg-red-100 p-2 rounded">
                  {`${com.communicationType} with ${
                    companies.find((c) => c.id === com.companyId)?.name || "Unknown"
                  } was due on ${moment(com.date).format("Do MMMM YYYY")}`}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No overdue communications</p>
          )}
        </section>

        {/* Today's Communications Section */}
        <section>
          <h2 className="text-lg font-semibold mb-2 flex items-center">
            Today's Communications
            {/* Display badge with count if there are communications for today */}
            {todaysCount > 0 && (
              <span className="ml-2 bg-yellow-500 text-white text-xs rounded-full px-2 py-1">
                {todaysCount}
              </span>
            )}
          </h2>
          {/* Display today's communications or a message if none */}
          {todaysCount > 0 ? (
            <ul className="list-disc pl-6">
              {getTodaysCommunications().map((com) => (
                <li key={com.id} className="bg-yellow-100 p-2 rounded">
                  {`${com.communicationType} with ${
                    companies.find((c) => c.id === com.companyId)?.name || "Unknown"
                  } is scheduled for today`}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No communications scheduled for today</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default Notification;
