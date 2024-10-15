import React, { useState } from 'react';
import './Sign_Up.css';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

const SignUp = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [nameError, setNameError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let hasError = false;

        // Validation checks
        if (name.length < 4) {
            setNameError(true);
            hasError = true;
        } else {
            setNameError(false);
        }

        if (phone.length !== 10) {
            setPhoneError(true);
            hasError = true;
        } else {
            setPhoneError(false);
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError(true);
            hasError = true;
        } else {
            setEmailError(false);
        }

        if (password.length < 8) {
            setPasswordError(true);
            hasError = true;
        } else {
            setPasswordError(false);
        }

        if (hasError) return; // Stop submission if there are validation errors

        try {
            const response = await fetch(`${API_URL}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, phone, email, password }),
            });

            const data = await response.json();
            if (!response.ok) {
                setError(data.error[0].msg); // Show the first error message
                return;
            }

            // Successful registration logic here
            navigate('/'); // Navigate to the home page or any other page

        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred during registration. Please try again.');
        }
    };

    return (
        <div className="container">
            <h2>Sign Up</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        value={name}
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        name="name"
                        id="name"
                        className="form-control"
                        placeholder="Enter your name"
                        required
                    />
                    {nameError && <p className="requirement">Name must be at least 4 characters long.</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                        value={phone}
                        type="tel"
                        onChange={(e) => setPhone(e.target.value)}
                        name="phone"
                        id="phone"
                        className="form-control"
                        placeholder="Enter your phone number"
                        required
                    />
                    {phoneError && <p className="requirement">Phone number should be 10 digits long.</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        value={email}
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        name="email"
                        id="email"
                        className="form-control"
                        placeholder="Enter your email"
                        required
                    />
                    {emailError && <p className="requirement">Please enter a valid email address.</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        value={password}
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        name="password"
                        id="password"
                        className="form-control"
                        placeholder="Enter your password"
                        required
                    />
                    {passwordError && <p className="requirement">Password must be at least 8 characters long.</p>}
                </div>
                <div className="btn-group">
                    <button type="submit" className="btn btn-primary">Sign Up</button>
                    <button type="button" className="btn btn-danger" onClick={() => {
                        setName('');
                        setPhone('');
                        setEmail('');
                        setPassword('');
                        setError('');
                    }}>Reset</button>
                </div>
            </form>
        </div>
    );
};

export default SignUp;
