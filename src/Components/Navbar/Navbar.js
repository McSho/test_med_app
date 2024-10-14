import React, { useState, useEffect } from 'react';
import './Navbar.css'; 
import { Link, useNavigate } from 'react-router-dom'; 
import logo from '../../Assets/logo.jpg';

function Navbar() {
  const [auth, setAuth] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('auth-token');
    const userEmail = sessionStorage.getItem('email');
    if (token && userEmail) {
      const userName = userEmail.split('@')[0];
      setAuth({ token, userName });
    }
  }, []);

  const logout = () => {
    sessionStorage.clear(); 
    setAuth(null);
    navigate('/'); 
    window.location.reload();
  };

  const handleClick = () => {
    const navLinks = document.querySelector('.nav__links');
    navLinks.classList.toggle('active');
  };

  return (
    <nav>
      <div className="nav__logo">
        <a href="/">
          <div className="logo-container">
            <img src={logo} alt="StayHealthy Logo" className="nav-logo-image" />
            <p className="nav-logo-text">Stay Healthy</p>
          </div>
        </a>
      </div>

      <div className="nav__icon" onClick={handleClick}>
        <i className="fa fa-times fa fa-bars"></i>
      </div>

      <ul className="nav__links active">
        <li className="link">
          <Link to="/">Home</Link>
        </li>
        <li className="link">
          <Link to="/appointments">Appointments</Link> {/* Updated to show Appointments */}
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
