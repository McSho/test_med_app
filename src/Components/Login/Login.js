import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { API_URL } from '../../config';
import './Login.css'; // Import CSS for styling

const Login = ({ setAuth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false); // Success state for login
  const navigate = useNavigate();

  const handleLogin = async (e) => {
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
        sessionStorage.setItem('email', email);

        const userResponse = await fetch(`${API_URL}/api/auth/user`, {
          headers: { Authorization: `Bearer ${data.authToken}`, Email: email },
        });
        const userData = await userResponse.json();
        sessionStorage.setItem('userName', userData.name);

        setAuth({ token: data.authToken, userName: userData.name });

        // Set success message and navigate after a short delay
        setSuccess(true);
        setTimeout(() => {
          navigate('/');
        }, 3000); // 3-second delay before redirecting
      } else {
        setError(data.error || 'Invalid login credentials');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <div className="error-message">{error}</div>}
      {success && (
        <div className="success-message">
          Login successful! Redirecting to homepage...
        </div>
      )}
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn-primary">
          Login
        </button>
        <div className="info-text">
          Not a member? <Link to="/signup">Sign up here</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
