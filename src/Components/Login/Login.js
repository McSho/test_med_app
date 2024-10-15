// Import necessary hooks and modules
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate for navigation
import { API_URL } from '../../config'; // Import API_URL from config
import './Login.css'; // Import CSS for styling

const Login = () => {
  // State variables for email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Navigation function from react-router-dom
  const navigate = useNavigate();

  // Check if user is already authenticated and redirect to home page if they are
  useEffect(() => {
    if (sessionStorage.getItem("auth-token")) {
      navigate("/");
    }
  }, [navigate]);

  // Function to handle login form submission
  const login = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Validate input fields
    setEmailError('');
    setPasswordError('');

    if (!email) {
      setEmailError('Please enter your email.');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email address.');
    }

    if (!password) {
      setPasswordError('Please enter your password.');
    } else if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long.');
    }

    // Return if there are validation errors
    if (emailError || passwordError) return;

    // API call to login the user
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const json = await res.json(); // Parse the response JSON

    if (json.authtoken) {
      // Store the auth token and email in session storage
      sessionStorage.setItem('auth-token', json.authtoken);
      sessionStorage.setItem('email', email);

      // Redirect to home page and reload the window
      navigate('/');
      window.location.reload();
    } else {
      // Handle errors if login fails
      if (json.errors) {
        for (const error of json.errors) {
          alert(error.msg);
        }
      } else {
        alert(json.error);
      }
    }
  };

  return (
    <div>
      <div className="container">
        <div className="login-grid">
          <div className="login-text">
            <h2>Login</h2>
          </div>
          <div className="login-text">
            Are you a new member? 
            <span>
              <Link to="/signup" style={{ color: '#58d86a' }}>
                Sign Up Here
              </Link>
            </span>
          </div>
          <br />
          <div className="login-form">
            <form onSubmit={login}>
              {/* Email field */}
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  name="email"
                  id="email"
                  className="form-control"
                  placeholder="Enter your email"
                  aria-describedby="helpId"
                  required
                />
                {emailError && <p className="error-text">{emailError}</p>}
              </div>

              {/* Password field */}
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  name="password"
                  id="password"
                  className="form-control"
                  placeholder="Enter your password"
                  aria-describedby="helpId"
                  required
                />
                {passwordError && <p className="error-text">{passwordError}</p>}
              </div>

              {/* Submit button */}
              <div className="btn-group">
                <button type="submit" className="btn btn-primary mb-2 mr-1 waves-effect waves-light">Login</button>
                <button type="reset" className="btn btn-danger mb-2">Reset</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
