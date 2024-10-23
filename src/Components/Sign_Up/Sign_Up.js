import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';
import './Sign_Up.css'; // Import CSS

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const [errors, setErrors] = useState({}); // Store individual field errors
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!name) {
      newErrors.name = 'Name is required.';
      isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = 'Email is required.';
      isValid = false;
    } else if (!emailPattern.test(email)) {
      newErrors.email = 'Invalid email format.';
      isValid = false;
    }

    if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long.';
      isValid = false;
    }

    const phonePattern = /^\d{10,15}$/;
    if (!phone) {
      newErrors.phone = 'Phone number is required.';
      isValid = false;
    } else if (!phonePattern.test(phone)) {
      newErrors.phone = 'Phone number must be 10-15 digits long.';
      isValid = false;
    }

    setErrors(newErrors); // Update state with the new errors
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, phone }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        setErrors({ form: data.error || 'Registration failed' });
      }
    } catch (error) {
      console.error('Signup failed:', error);
      setErrors({ form: 'Something went wrong. Please try again.' });
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      {success && <div className="success-message">Sign up successful! Redirecting to login...</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errors.password && <span className="error-text">{errors.password}</span>}
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input
            type="tel"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          {errors.phone && <span className="error-text">{errors.phone}</span>}
        </div>

        {errors.form && <div className="error-text">{errors.form}</div>}

        <button type="submit" className="btn-primary">
          Sign Up
        </button>
        <div className="info-text">
          Already have an account? <a href="/login">Login here</a>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
