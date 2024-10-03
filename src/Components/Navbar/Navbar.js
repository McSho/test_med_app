import React from 'react';
import './Navbar.css'; // Import CSS for styling
import { Link } from 'react-router-dom'; // Import Link from react-router-dom for internal navigation

function Navbar() {
  const handleClick = () => {
    const navLinks = document.querySelector('.nav__links');
    navLinks.classList.toggle('active');
  };

  return (
    <nav>
      {/* Navigation logo section */}
      <div className="nav__logo">
        <Link to="/"> {/* Use Link instead of <a> for internal navigation */}
          StayHealthy
          <svg xmlns="http://www.w3.org/2000/svg" height="26" width="26" viewBox="0 0 1000 1000" style={{ fill: '#3685fb' }}>
            {/* SVG icon content */}
          </svg>
        </Link>
        <span>.</span>
      </div>

      {/* Navigation icon section */}
      <div className="nav__icon" onClick={handleClick}>
        <i className="fa fa-times fa fa-bars"></i>
      </div>

      {/* Unordered list for navigation links */}
      <ul className="nav__links active">
        <li className="link">
          <Link to="/">Home</Link> {/* Use Link for navigation */}
        </li>
        <li className="link">
          <Link to="/appointments">Appointments</Link> {/* Placeholder link */}
        </li>
        <li className="link">
          <Link to="/signup">
            <button className="btn1">Sign Up</button> {/* Use Link for navigation */}
          </Link>
        </li>
        <li className="link">
          <Link to="/login">
            <button className="btn1">Login</button> {/* Use Link for navigation */}
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
