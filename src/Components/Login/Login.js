// src/Components/Login/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';
import './Login.css';

const Login = ({ setAuth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState(''); // State for displaying messages
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        sessionStorage.setItem('auth-token', data.authToken);
        sessionStorage.setItem('userName', data.userName);
        setAuth({ token: data.authToken, userName: data.userName });
        setLoginMessage('Login successful!'); // Display success message
        setTimeout(() => {
          navigate('/');
        }, 2000); // Redirect to landing page after 2 seconds
      } else {
        setLoginMessage(data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setLoginMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
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
        </div>
        <button type="submit" className="btn-primary">Login</button>
      </form>
      {loginMessage && <p className="login-message">{loginMessage}</p>} {/* Display login message */}
    </div>
  );
};

export default Login;
