// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar/Navbar';
import LandingPage from './Components/Landing_Page/Landing_Page'; // Ensure this component exists
import SignUp from './Components/Sign_Up/Sign_Up'; // Ensure this component exists
import Login from './Components/Login/Login'; // Ensure this component exists
import FindDoctorSearch from './Components/FindDoctorSearch/FindDoctorSearch'; // Ensure this component exists
import Notification from './Components/Notification/Notification'; // Ensure this component exists
import ReviewForm from './Components/ReviewForm/ReviewForm'; // Ensure this component exists
import AppointmentForm from './Components/AppointmentForm/AppointmentForm'; // Ensure this component exists
import Appointments from './Components/Appointments/Appointments'; // Ensure this component exists
import InstantConsultation from "./Components/InstantConsultation/InstantConsultation"; // Ensure this component exists
import ProfileCard from "./Components/ProfileCard/ProfileCard"; // Ensure this component exists
import ReportsLayout from './Components/ReportsLayout/ReportsLayout';

function App() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Fetch appointments from localStorage on component mount
    const storedAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
    setAppointments(storedAppointments);
  }, []);

  const handleAppointmentSubmit = (newAppointment) => {
    const updatedAppointments = [...appointments, newAppointment];
    setAppointments(updatedAppointments);
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
  };

  const handleCancelAppointment = (index) => {
    const updatedAppointments = appointments.filter((_, i) => i !== index);
    setAppointments(updatedAppointments);
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments)); // Update localStorage
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        
        {/* Conditionally render the Notification based on appointments length */}
        {appointments.length > 0 && (
          <Notification onCancel={handleCancelAppointment} />
        )}

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/instant-consultation" element={<InstantConsultation />} />
          <Route path="/find-doctor-search" element={<FindDoctorSearch />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<ProfileCard />} /> {/* Profile route */}
          <Route path="/reports" element={<ReportsLayout />} /> {/* Reports route */}
          <Route path="/reviews" element={<ReviewForm />} />
          <Route
            path="/book-appointment"
            element={<AppointmentForm onSubmit={handleAppointmentSubmit} />}
          />
          <Route path="/appointments" element={<Appointments appointments={appointments} onCancel={handleCancelAppointment} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
