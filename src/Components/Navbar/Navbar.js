import React, { useState, useEffect } from 'react';
import './Navbar.css'; // Import CSS for styling
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate from react-router-dom for internal navigation
import logo from '../../Assets/logo.jpg';

function Navbar() {
  const [auth, setAuth] = useState(null); // State to manage authentication and user info
  const navigate = useNavigate();

  // Check if the user is authenticated by looking for the token in session storage
  useEffect(() => {
    const token = sessionStorage.getItem('auth-token');
    const userEmail = sessionStorage.getItem('email');
    if (token && userEmail) {
      const userName = userEmail.split('@')[0]; // Extract the name from the email (before the "@" symbol)
      setAuth({ token, userName });
    }
  }, []);

  // Handle logout by clearing session storage and updating auth state
  const logout = () => {
    sessionStorage.clear(); // Clear session storage on logout
    setAuth(null); // Clear auth state
    navigate('/'); // Navigate to home page
    window.location.reload(); // Reload the page to reflect the changes
  };

  const handleClick = () => {
    const navLinks = document.querySelector('.nav__links');
    navLinks.classList.toggle('active');
  };

  return (
    <nav>
      {/* Navigation logo section */}
      <div className="nav__logo">
        <a href="/">
          <div className="logo-container">
            <img src={logo} alt="StayHealthy Logo" className="nav-logo-image" />
            <p className="nav-logo-text">Stay Healthy</p>
          </div>
        </a>
      </div>

      {/* Navigation icon section */}
      <div className="nav__icon" onClick={handleClick}>
        <i className="fa fa-times fa fa-bars"></i>
      </div>

      {/* Unordered list for navigation links */}
      <ul className="nav__links active">
        <li className="link">
          <Link to="/">Home</Link>
        </li>
        <li className="link">
          <Link to="/appointments">Appointments</Link>
        </li>
        <li className="link">
          <Link to="/find-doctor-search"> {/* New button for Find a Doctor */}
            <button className="btn1">Find a Doctor</button>
          </Link>
        </li>
        <li className="link">
          <Link to="/instant-consultation">
            <button className="btn1">Instant Booking</button> {/* Button for instant consultation */}
          </Link>
        </li>

        {auth ? (
          <>
            <li className="link">Welcome, {auth.userName}</li>
            <li className="link">
              <button className="btn1" onClick={logout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li className="link">
              <Link to="/signup">
                <button className="btn1">Sign Up</button>
              </Link>
            </li>
            <li className="link">
              <Link to="/login">
                <button className="btn1">Login</button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
