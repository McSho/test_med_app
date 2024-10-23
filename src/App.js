import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import LandingPage from './Components/Landing_Page/Landing_Page';
import SignUp from './Components/Sign_Up/Sign_Up';
import Login from './Components/Login/Login';
import ProfileCard from './Components/ProfileCard/ProfileCard';
import FindDoctorSearch from './Components/FindDoctorSearch/FindDoctorSearch';
import ReviewForm from './Components/ReviewForm/ReviewForm';
import AppointmentForm from './Components/AppointmentForm/AppointmentForm';
import Appointments from './Components/Appointments/Appointments';
import InstantConsultation from './Components/InstantConsultation/InstantConsultation';
import Notification from './Components/Notification/Notification';
import ReportsLayout from './Components/ReportsLayout/ReportsLayout';

function App() {
  const [auth, setAuth] = useState(null);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem('auth-token');
    const userName = sessionStorage.getItem('userName');

    if (token && userName) {
      setAuth({ token, userName });
    }

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
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
  };

  return (
    <BrowserRouter>
      <Navbar auth={auth} setAuth={setAuth} />
      {auth && (
        <Notification
          appointments={appointments}
          onCancel={handleCancelAppointment}
        />
      )}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login setAuth={setAuth} />} />
        <Route path="/profile" element={<ProfileCard />} />
        <Route path="/reports" element={<ReportsLayout />} />
        <Route path="/find-doctor-search" element={<FindDoctorSearch />} />
        <Route path="/instant-consultation" element={<InstantConsultation />} />
        <Route
          path="/appointments"
          element={
            <Appointments
              appointments={appointments}
              onCancel={handleCancelAppointment}
            />
          }
        />
        <Route
          path="/book-appointment"
          element={
            <AppointmentForm onSubmit={handleAppointmentSubmit} />
          }
        />
        <Route path="/reviews" element={<ReviewForm />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
