import React, { useState } from 'react';
import './DoctorCard.css';
import Popup from 'reactjs-popup';  // Import Popup component
import 'reactjs-popup/dist/index.css';  // Import Popup styles
import AppointmentForm from '../AppointmentForm/AppointmentForm';  // Import AppointmentForm

const DoctorCard = ({ name, speciality, experience, ratings, profilePic }) => {
  const [isBooking, setIsBooking] = useState(false);  // State to manage the popup visibility

  // Function to handle form submission
  const handleFormSubmit = (appointmentData) => {
    console.log("Appointment booked with details:", appointmentData);
    setIsBooking(false);  // Close the form after submission
  };

  return (
    <div className="doctor-card-container">
      <div className="doctor-card-details-container">
        <div className="doctor-card-profile-image-container">
          {profilePic ? (
            <img src={profilePic} alt={`${name}'s profile`} style={{ width: '120px', height: '120px', borderRadius: '50%' }} />
          ) : (
            <p>Image not available</p>
          )}
        </div>
        <div className="doctor-card-details">
          <div className="doctor-card-detail-name">{name}</div>
          <div className="doctor-card-detail-speciality">{speciality}</div>
          <div className="doctor-card-detail-experience">{experience} years experience</div>
          <div className="doctor-card-detail-ratings">Ratings: {ratings} </div>
        </div>
      </div>

      {/* Button to open the popup */}
      <div>
        <Popup
          trigger={
            <button className="book-appointment-btn">
              <div>Book Appointment</div>
              <div>No Booking Fee</div>
            </button>
          }
          modal
          open={isBooking}
          onClose={() => setIsBooking(false)}
        >
          <div className="popup-content">
            <AppointmentForm
              doctorName={name}
              doctorSpeciality={speciality}
              onSubmit={handleFormSubmit}  // Handle form submission
            />
          </div>
        </Popup>
      </div>
    </div>
  );
};

export default DoctorCard;
