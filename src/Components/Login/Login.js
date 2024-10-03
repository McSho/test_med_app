import React, { useState } from 'react';
import './Login.css'; // Importing the CSS for styling

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Validate the form on submit
  const validateForm = () => {
    let formErrors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      formErrors.email = 'Invalid email format';
    }

    // Password validation
    if (!formData.password) {
      formErrors.password = 'Password is required';
    }

    return formErrors;
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      // No errors, submit the form (you can integrate API here)
      console.log('Login successful!', formData);
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="container"> {/* Main container for the page content */}
      <div className="login-grid"> {/* Grid layout for the login form */}
        <div className="login-text">
          <h2>Login</h2>
        </div>
        <div className="login-text"> {/* Link to Sign Up page */}
          Are you a new member? <span><a href="/signup" style={{ color: '#58d86a' }}> Sign Up Here</a></span>
        </div>
        <br />
        <div className="login-form"> {/* Form for user login */}
          <form onSubmit={handleSubmit}>
            {/* Form group for email input */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                name="email" 
                id="email" 
                className="form-control" 
                value={formData.email} 
                onChange={handleChange} 
                placeholder="Enter your email" 
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>
            {/* Form group for password input */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                name="password" 
                id="password" 
                className="form-control" 
                value={formData.password}
                onChange={handleChange} 
                placeholder="Enter your password" 
              />
              {errors.password && <p className="error">{errors.password}</p>}
            </div>
            {/* Button group for login and reset buttons */}
            <div className="btn-group">
              <button type="submit" className="btn btn-primary mb-2">Login</button>
              <button type="reset" className="btn btn-danger mb-2" onClick={() => setFormData({ email: '', password: '' })}>Reset</button>
            </div>
            <br />
            {/* Additional login text for 'Forgot Password' option */}
            <div className="login-text">
              Forgot Password?
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
