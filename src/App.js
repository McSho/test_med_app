// Import necessary modules from React library
import React from 'react';

// Import Instant Conslutation component
import InstantConsultation from './Components/InstantConsultation/InstantConsultation'

// Import components for routing from react-router-dom library
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import custom Navbar component
import Navbar from './Components/Navbar/Navbar';

// Import the LandingPage component
import LandingPage from './Components/Landing_Page/Landing_Page'; // Ensure the correct import path

// Import the SignUp component
import SignUp from './Components/Sign_Up/Sign_Up'; // Ensure the correct import path

//Import the Login component
import Login from './Components/Login/Login';

import FindDoctorSearch from './Components/FindDoctorSearch/FindDoctorSearch';

// Function component for the main App
function App() {

  // Render the main App component
  return (
    <div className="App">
      {/* Set up BrowserRouter for routing */}
      <BrowserRouter>
        {/* Display the Navbar component */}
        <Navbar/>

        {/* Set up the Routes for different pages */}
        <Routes>
          {/* Define the route for the LandingPage component */}
          <Route path="/" element={<LandingPage />} />

          <Route path="/instant-consultation" element={<InstantConsultation />} />
          <Route path="/find-doctor-search" element={<FindDoctorSearch />} />
          
          {/* Define the route for the SignUp component */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} /> {/* Route for Login component */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

// Export the App component as the default export
export default App;
