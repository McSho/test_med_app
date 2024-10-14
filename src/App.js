// Import necessary modules from React library
import React, { useState, useEffect } from 'react';

// Import Instant Consultation component
import InstantConsultation from './Components/InstantConsultation/InstantConsultation';

// Import components for routing from react-router-dom library
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import custom Navbar component
import Navbar from './Components/Navbar/Navbar';

// Import the LandingPage component
import LandingPage from './Components/Landing_Page/Landing_Page'; // Ensure the correct import path

// Import the SignUp component
import SignUp from './Components/Sign_Up/Sign_Up'; // Ensure the correct import path

// Import the Login component
import Login from './Components/Login/Login';

// Import FindDoctorSearch component
import FindDoctorSearch from './Components/FindDoctorSearch/FindDoctorSearch';

// Import the Notification component
import Notification from './Components/Notification/Notification';

// Import CSS for Notification (make sure Notification.css exists in the correct path)
import './Components/Notification/Notification.css';

// Import the ReviewForm component
import ReviewForm from './Components/ReviewForm/ReviewForm';

// Import the AppointmentForm component
import AppointmentForm from './Components/AppointmentForm/AppointmentForm';

// Import the MyAppointments component
import Appointments from './Components/Appointments/Appointments'; // Ensure you create and place this component

function App() {
  const [appointmentBooked, setAppointmentBooked] = useState(false);

  useEffect(() => {
    const storedAppointment = localStorage.getItem('doctorData');
    if (storedAppointment) {
      setAppointmentBooked(true);
    }
  }, []);

  const handleCancelAppointment = () => {
    localStorage.removeItem('doctorData');
    localStorage.removeItem('appointmentData');
    setAppointmentBooked(false);
  };

  const handleAppointmentSubmit = () => {
    setAppointmentBooked(true);
  };

  return (
    <div className="App">
      {/* Set up BrowserRouter for routing */}
      <BrowserRouter>
        {/* Always render the Navbar */}
        <Navbar />

        {/* Conditionally render the Notification if an appointment is booked */}
        {appointmentBooked && (
          <Notification onCancel={handleCancelAppointment} />
        )}

        {/* Wrap Routes inside BrowserRouter */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/instant-consultation" element={<InstantConsultation />} />
          <Route path="/find-doctor-search" element={<FindDoctorSearch />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reviews" element={<ReviewForm />} />
          
          {/* Route for AppointmentForm */}
          <Route
            path="/book-appointment"
            element={<AppointmentForm doctorName="Dr. John Doe" doctorSpeciality="Dentist" onSubmit={handleAppointmentSubmit} />}
          />
          
          {/* Route for MyAppointments */}
          <Route path="/appointments" element={<Appointments />} /> {/* New Route for showing booked appointments */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

// Export the App component as the default export
export default App;
