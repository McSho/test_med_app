// Import necessary hooks and modules
import React, { useState } from 'react';
import './Sign_Up.css';
import { Link, useNavigate } from 'react-router-dom'; // Using Link for navigation
import { API_URL } from '../../config'; // Assuming you have this configured properly

const Sign_Up = () => {
    // State variables for form inputs
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [showerr, setShowerr] = useState(''); // For showing error messages
    const navigate = useNavigate(); // For navigation

    // Function to handle form submission
    const register = async (e) => {
        e.preventDefault(); // Prevent page refresh

        // API call to register the user
        const response = await fetch(`${API_URL}/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                phone: phone,
            }),
        });

        const json = await response.json(); // Parse response

        if (json.authtoken) {
            // Save user data in session storage
            sessionStorage.setItem('auth-token', json.authtoken);
            sessionStorage.setItem('name', name);
            sessionStorage.setItem('phone', phone);
            sessionStorage.setItem('email', email);

            // Redirect to home page
            navigate('/');
            window.location.reload(); // Reload the page
        } else {
            if (json.errors) {
                // Show error messages if any
                for (const error of json.errors) {
                    setShowerr(error.msg);
                }
            } else {
                setShowerr(json.error);
            }
        }
    };

    return (
        <div>
        <div className="container" style={{ marginTop: '5%' }}>
          {/* Page Title */}
          <div className="login-text" style={{ marginTop: '20px', textAlign: 'left' }}>
            <h2>Sign Up</h2>
          </div>
  
            {/* Already a member? Login section */}
            <div className="login-text">
              Already a member? 
              <span>
                <Link to="/login" style={{ color: '#58d86a' }}>
                  Login Here
                </Link>
              </span>
            </div>
            <br />
  
            {/* Sign-Up Form */}
            <div className="signup-grid">
              <div className="signup-form">
                <form method="POST" onSubmit={register}>
                  {/* Name Field */}
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                      name="name"
                      id="name"
                      className="form-control"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
  
                  {/* Phone Field */}
                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      type="tel"
                      name="phone"
                      id="phone"
                      className="form-control"
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
  
                  {/* Email Field */}
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
                      required
                    />
                    {showerr && <div className="err" style={{ color: 'red' }}>{showerr}</div>}
                  </div>
  
                  {/* Password Field */}
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
                      required
                    />
                  </div>
  
                  {/* Submit and Reset Buttons */}
                  <div className="btn-group">
                    <button type="submit" className="btn btn-primary mb-2">Sign Up</button>
                    <button type="reset" className="btn btn-danger mb-2">Reset</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
  };
  
  export default Sign_Up;
