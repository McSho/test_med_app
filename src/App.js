import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar/Navbar';
import LandingPage from './Components/Landing_Page/Landing_Page';
import SignUp from './Components/Sign_Up/Sign_Up';
import Login from './Components/Login/Login';
import FindDoctorSearch from './Components/FindDoctorSearch/FindDoctorSearch';
import Notification from './Components/Notification/Notification';
import ReviewForm from './Components/ReviewForm/ReviewForm';
import AppointmentForm from './Components/AppointmentForm/AppointmentForm';
import Appointments from './Components/Appointments/Appointments';

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
          <Route path="/find-doctor-search" element={<FindDoctorSearch />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
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
