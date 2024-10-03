// Import necessary modules from React library
import React from 'react';

// Import components for routing from react-router-dom library
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import custom Navbar component
import Navbar from './Components/Navbar/Navbar';

// Import the LandingPage component
import LandingPage from './Components/Landing_Page/Landing_Page'; // Ensure the correct import path

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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

// Export the App component as the default export
export default App;
