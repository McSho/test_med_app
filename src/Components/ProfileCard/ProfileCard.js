import React, { useEffect, useState } from 'react';
import { API_URL } from '../../config';
import { useNavigate } from 'react-router-dom';
import './ProfileCard.css';

const ProfileForm = () => {
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('auth-token');
    const email = sessionStorage.getItem('email');

    if (!token || !email) {
      navigate('/login');
    } else {
      fetchUserProfile(token, email);
    }
  }, [navigate]);

  const fetchUserProfile = async (token, email) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Email: email,
        },
      });

      if (response.ok) {
        const user = await response.json();
        setUserDetails(user);
      } else {
        console.error('Failed to fetch user profile');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setError(null);
  };

  const handleSave = async () => {
    const token = sessionStorage.getItem('auth-token');
    try {
      const response = await fetch(`${API_URL}/api/auth/user`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          Email: sessionStorage.getItem('email'),
        },
        body: JSON.stringify(userDetails),
      });

      if (response.status === 401 || response.status === 403) {
        console.error('Unauthorized. Redirecting to login.');
        navigate('/login');
        return;
      }

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        setError(errorText || 'Failed to update profile');
        return;
      }

      const data = await response.json();
      setSuccess(true);
      setIsEditing(false);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="profile-container">
      <h2>Profile Information</h2>

      {success && <div className="success-message">Profile updated successfully!</div>}
      {error && <div className="error-message">{error}</div>}

      <div className="profile-details">
        <div className="form-group">
          <label>Name:</label>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={userDetails.name}
              onChange={handleChange}
              required
            />
          ) : (
            <p>{userDetails.name}</p>
          )}
        </div>

        <div className="form-group">
          <label>Phone:</label>
          {isEditing ? (
            <input
              type="tel"
              name="phone"
              value={userDetails.phone}
              onChange={handleChange}
              required
            />
          ) : (
            <p>{userDetails.phone}</p>
          )}
        </div>

        <div className="form-group">
          <label>Email:</label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={userDetails.email}
              onChange={handleChange}
              required
            />
          ) : (
            <p>{userDetails.email}</p>
          )}
        </div>

        {isEditing ? (
          <div>
            <button className="btn-primary" onClick={handleSave}>
              Save Changes
            </button>
            <button className="btn-secondary" onClick={handleEditToggle}>
              Cancel
            </button>
          </div>
        ) : (
          <button className="btn-primary" onClick={handleEditToggle}>
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileForm;
