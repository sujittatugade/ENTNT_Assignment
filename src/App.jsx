import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';

import AdminCompanyManagement from './components/AdminModule/AdminCompanyManagment';
import AdminCommunicationMethod from './components/AdminModule/AdminCommunicationMethod';
import HomePage from './components/HomePage';
import CalendarView from "./components/UserModule/CalendarView";

import Notification from './components/UserModule/Notification';
import UserDashboard from './components/UserModule/UserDashboard';


function App() {
  return (
    
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminCompanyManagement />} />
          <Route path="/communicationmethod" element={<AdminCommunicationMethod/>} />
          <Route path="/notification" element={<Notification/>} />
          <Route path="/calendarview" element={<CalendarView/>} />
          <Route path='/userdashboard' element={<UserDashboard/>}/>
        </Routes>
      );
}

export default App;
