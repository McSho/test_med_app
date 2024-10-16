// src/components/Navbar/Navbar.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../Assets/logo.jpg";
import "./Navbar.css";

const Navbar = () => {
  const [auth, setAuth] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("auth-token");
    const userEmail = sessionStorage.getItem("email");
    if (token && userEmail) {
      const userName = userEmail.split("@")[0];
      setAuth({ token, userName, email: userEmail });
    }
  }, []);

  const logout = () => {
    sessionStorage.clear();
    setAuth(null);
    navigate("/");
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  return (
    <nav>
      <div className="nav__logo">
        <Link to="/">
          <div className="logo-container">
            <img src={logo} alt="StayHealthy Logo" className="nav-logo-image" />
            <p className="nav-logo-text">Stay Healthy</p>
          </div>
        </Link>
      </div>
      <ul className="nav__links">
        <li className="link"><Link to="/">Home</Link></li>
        <li className="link"><Link to="/appointments">Appointments</Link></li>
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
            <li className="link profile-container" onClick={toggleDropdown}>
              Welcome, {auth.userName}
              {showDropdown && (
                <div className="profile-dropdown active">
                  <button onClick={() => navigate("/profile")}>My Profile</button>
                  <button onClick={() => navigate("/reports")}>My Reports</button>
                </div>
              )}
            </li>
            <li className="link">
              <button className="btn1" onClick={logout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li className="link"><Link to="/signup"><button className="btn1">Sign Up</button></Link></li>
            <li className="link"><Link to="/login"><button className="btn1">Login</button></Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
