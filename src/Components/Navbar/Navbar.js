// src/Components/Navbar/Navbar.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../../Assets/logo.jpg';

const Navbar = ({ auth, setAuth }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('auth-token');
    const userName = sessionStorage.getItem('userName');
    if (token && userName) {
      setAuth({ token, userName });
    }
  }, [setAuth]);

  const handleLogout = () => {
    sessionStorage.clear();
    setAuth(null);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo-container">
        <p className="nav-logo-text">Stay Healthy</p>
        <img src={logo} alt="StayHealthy Logo" className="nav-logo-image" />
      </Link>

      <ul className="nav__links">
        <li className="link">
          <Link to="/">Home</Link>
        </li>
        <li className="link">
          <Link to="/appointments">Appointments</Link>
        </li>
        <li className="link">
          <Link to="/find-doctor-search">
            <button className="btn1">Find a Doctor</button>
          </Link>
        </li>
        <li className="link">
          <Link to="/instant-consultation">
            <button className="btn1">Instant Booking</button>
          </Link>
        </li>
        {auth ? (
          <>
            <li className="link">
              <button
                className="btn1 welcome-user"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                Welcome, {auth.userName}
              </button>
              {showDropdown && (
                <div className="profile-dropdown">
                  <button onClick={() => navigate('/profile')}>My Profile</button>
                  <button onClick={() => navigate('/reports')}>My Reports</button>
                </div>
              )}
            </li>
            <li className="link">
              <button className="btn1" onClick={handleLogout}>
                Logout
              </button>
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
};

export default Navbar;
