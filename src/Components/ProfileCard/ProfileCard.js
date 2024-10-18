// src/components/ProfileCard/ProfileCard.js
import React, { useEffect, useState } from "react";
import { API_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import "./ProfileCard.css";

const ProfileForm = () => {
  const [userDetails, setUserDetails] = useState({});
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("auth-token");
    if (!token) {
      navigate("/login");
    } else {
      fetchUserProfile();
    }
  }, [navigate]);

  const fetchUserProfile = async () => {
    try {
      const token = sessionStorage.getItem("auth-token");
      const email = sessionStorage.getItem("email");
      const response = await fetch(`${API_URL}/api/auth/user`, {
        headers: { Authorization: `Bearer ${token}`, Email: email },
      });
      if (response.ok) {
        const user = await response.json();
        setUserDetails(user);
      }
    } catch (error) {
      console.error("Failed to fetch user profile", error);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-details">
        <h2>Profile Information</h2>
        <p><b>Name:</b> {userDetails.name}</p>
        <p><b>Phone:</b> {userDetails.phone}</p>
        <p><b>Email:</b> {userDetails.email}</p>
      </div>
    </div>
  );
};

export default ProfileForm;
