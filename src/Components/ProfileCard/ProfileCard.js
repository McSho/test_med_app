import React, { useEffect, useState } from 'react';
import { API_URL } from '../../config';
import { useNavigate } from 'react-router-dom';
import './ProfileCard.css';

const ProfileForm = () => {
  const [userDetails, setUserDetails] = useState({});
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
        headers: { Authorization: `Bearer ${token}`, Email: email },
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

  return (
    <div className="profile-container">
      <h2>Profile Information</h2>
      <p><b>Name:</b> {userDetails.name}</p>
      <p><b>Phone:</b> {userDetails.phone}</p>
      <p><b>Email:</b> {userDetails.email}</p>
    </div>
  );
};

export default ProfileForm;
