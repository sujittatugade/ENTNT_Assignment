import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Calendar.css";
import moment from "moment";
import Navbar from "../Navbar";

const CalendarView = () => {
  // State hooks to manage selected date, communications, and companies
  const [selectedDate, setSelectedDate] = useState(null);
  const [communications, setCommunications] = useState([]);
  const [companies, setCompanies] = useState([]);

  // Effect hook to synchronize data between localStorage and component state
  useEffect(() => {
    // Function to load and sync data from localStorage
    const syncData = () => {
      const storedCompanies = JSON.parse(localStorage.getItem("companies")) || [];
      const storedCommunications = JSON.parse(localStorage.getItem("communications")) || [];
      setCompanies(storedCompanies);
      setCommunications(
        storedCommunications.map((event) => ({
          ...event,
          date: new Date(event.date), // Ensure the date is in Date format
        }))
      );
    };

    syncData(); // Load data initially

    // Event listener to handle changes in localStorage
    window.addEventListener("storage", syncData);

    // Cleanup event listener when the component is unmounted
    return () => {
      window.removeEventListener("storage", syncData);
    };
  }, []);

  // Function to handle date click event
  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  // Function to get communications for a specific day
  const getCommunicationsForDay = (date) => {
    return communications.filter((com) => moment(com.date).isSame(date, "day"));
  };

  // Function to get company name by its ID
  const getCompanyNameById = (companyId) => {
    const company = companies.find((company) => company.id === companyId);
    return company ? company.name : "Unknown Company";
  };

  // Function to handle the deletion of an event
  const handleDeleteEvent = (eventId) => {
    const updatedCommunications = communications.filter((event) => event.id !== eventId);
    setCommunications(updatedCommunications);
    localStorage.setItem("communications", JSON.stringify(updatedCommunications));
  };

  return (
    <div>
      {/* Navbar */}
      <Navbar />
      
      <div className="app">
        <div className="container">
          <div className="calendar-container">
            <Calendar
              value={selectedDate} // Bind selected date to Calendar
              onClickDay={handleDateClick} // Handle day click
              tileClassName={({ date }) => {
                const hasEvent = getCommunicationsForDay(date).length > 0;
                const isSelected =
                  selectedDate && new Date(date).toDateString() === new Date(selectedDate).toDateString();

                // Add class for event-marked or selected days
                if (hasEvent) return "event-marked"; 
                if (isSelected) return "selected"; 
                return "";
              }}
            />
          </div>

          <div className="event-container">
            {/* Display event list for the selected day */}
            {selectedDate && getCommunicationsForDay(selectedDate).length > 0 && (
              <div className="event-list">
                <h2>Event List</h2>
                <div className="event-cards">
                  {getCommunicationsForDay(selectedDate).map((event) => (
                    <div key={event.id} className="event-card">
                      <div className="event-card-header">
                        <span className="event-date">{event.date.toDateString()}</span>
                        <button
                          onClick={() => handleDeleteEvent(event.id)}
                          className="delete-btn"
                        >
                          Delete
                        </button>
                      </div>
                      <div className="event-card-body">
                        <p className="event-company">
                          {getCompanyNameById(event.companyId)} - {event.communicationType}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Message if no events are present */}
            {selectedDate && getCommunicationsForDay(selectedDate).length === 0 && (
              <div className="no-events-message">No events for this day.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
