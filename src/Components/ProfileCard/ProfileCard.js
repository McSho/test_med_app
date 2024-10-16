import React, { useState } from "react";
import "./ProfileCard.css";

const ProfileCard = () => {
  const [view, setView] = useState("profile"); // "profile" or "reports"
  const [isEditing, setIsEditing] = useState(false); // State to track edit mode
  const [userDetails, setUserDetails] = useState({
    name: "John Doe",
    phone: "1234567890",
    email: "john.doe@example.com",
  });

  const handleViewChange = (newView) => {
    setView(newView);
  };

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev); // Toggle edit mode
  };

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value }); // Update user details
  };

  return (
    <div className="profile-container">
      <div className="profile-navigation">
        <button onClick={() => handleViewChange("profile")}>My Profile</button>
        <button onClick={() => handleViewChange("reports")}>My Reports</button>
      </div>

      {view === "profile" ? (
        <div className="profile-details">
          <h2>Profile Information</h2> {/* Updated Title */}
          {isEditing ? (
            <div>
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={userDetails.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Phone:</label>
                <input
                  type="text"
                  name="phone"
                  className="form-control"
                  value={userDetails.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={userDetails.email}
                  onChange={handleChange}
                />
              </div>
              <button className="btn btn-primary" onClick={handleEditToggle}>
                Save
              </button>
            </div>
          ) : (
            <div>
              <p><b>Name:</b> {userDetails.name}</p>
              <p><b>Phone:</b> {userDetails.phone}</p>
              <p><b>Email:</b> {userDetails.email}</p>
              <button className="btn btn-secondary" onClick={handleEditToggle}>
                Edit Profile
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="reports-view">
          <h2>My Reports</h2>
          <p>No reports available yet.</p>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
