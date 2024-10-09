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

// Import the AppointmentForm component (if you use it elsewhere)
import AppointmentForm from './Components/AppointmentForm/AppointmentForm';

function App() {
  // State to track whether an appointment is booked
  const [appointmentBooked, setAppointmentBooked] = useState(false);

  // Use useEffect to check localStorage on initial render
  useEffect(() => {
    // Check if there is appointment data stored in localStorage
    const storedAppointment = localStorage.getItem('doctorData');
    if (storedAppointment) {
      setAppointmentBooked(true); // Set the appointment booked to true if data exists
    }
  }, []);

  // Function to handle appointment cancellation
  const handleCancelAppointment = () => {
    localStorage.removeItem('doctorData'); // Remove appointment from localStorage
    localStorage.removeItem('appointmentData'); // Remove any additional appointment data
    setAppointmentBooked(false); // Update state to hide the notification
  };

  // Function to handle when appointment is submitted
  const handleAppointmentSubmit = () => {
    setAppointmentBooked(true); // Show the notification
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
          {/* Define the route for the LandingPage component */}
          <Route path="/" element={<LandingPage />} />
          
          <Route path="/instant-consultation" element={<InstantConsultation />} />
          <Route path="/find-doctor-search" element={<FindDoctorSearch />} />
          
          {/* Define the route for the SignUp component */}
          <Route path="/signup" element={<SignUp />} />
          
          {/* Route for Login component */}
          <Route path="/login" element={<Login />} />

          {/* Route for the ReviewForm component */}
          <Route path="/reviews" element={<ReviewForm />} />

          {/* Route for AppointmentForm (pass handleAppointmentSubmit to show notification after booking) */}
          <Route
            path="/book-appointment"
            element={<AppointmentForm doctorName="Dr. John Doe" doctorSpeciality="Dentist" onSubmit={handleAppointmentSubmit} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

// Export the App component as the default export
export default App;
