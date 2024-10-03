import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sign_Up.css'; // Importing CSS

function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    role: ''
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

    // Name validation
    if (!formData.name) {
      formErrors.name = 'Name is required';
    }

    // Phone number validation
    const phoneRegex = /^\d{0,10}$/;
    if (!phoneRegex.test(formData.phone)) {
      formErrors.phone = 'Phone number must not exceed 10 digits';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      formErrors.email = 'Invalid email format';
    }

    // Password validation
    if (!formData.password) {
      formErrors.password = 'Password is required';
    }

    // Role validation
    if (!formData.role) {
      formErrors.role = 'Role is required';
    }

    return formErrors;
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      // No errors, submit the form (you can integrate API here)
      console.log('Form submitted successfully!', formData);
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="container" style={{ marginTop: '5%' }}>
      <div className="signup-grid">
        <div className="signup-text">
          <h1>Sign Up</h1>
        </div>
        <div className="signup-text1" style={{ textAlign: 'left' }}>
          Already a member? <span><Link to="/login" style={{ color: '#58d86a' }}>Login</Link></span>
        </div>
        <div className="signup-form">
          <form onSubmit={handleSubmit}>
            {/* Role Field */}
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select name="role" id="role" value={formData.role} onChange={handleChange} className="form-control" required>
                <option value="">Select your role</option>
                <option value="doctor">Doctor</option>
                <option value="patient">Patient</option>
              </select>
              {errors.role && <p className="error">{errors.role}</p>}
            </div>
            {/* Name Field */}
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="form-control" placeholder="Enter your name" />
              {errors.name && <p className="error">{errors.name}</p>}
            </div>
            {/* Phone Number Field */}
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} className="form-control" placeholder="Enter your phone number" />
              {errors.phone && <p className="error">{errors.phone}</p>}
            </div>
            {/* Email Field */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="form-control" placeholder="Enter your email" />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>
            {/* Password Field */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} className="form-control" placeholder="Enter your password" />
              {errors.password && <p className="error">{errors.password}</p>}
            </div>
            {/* Submit and Reset Buttons */}
            <div className="btn-group">
              <button type="submit" className="btn btn-primary mb-2">Submit</button>
              <button type="reset" className="btn btn-danger mb-2" onClick={() => setFormData({ name: '', phone: '', email: '', password: '', role: '' })}>Reset</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
