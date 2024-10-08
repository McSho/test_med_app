import React, { useState } from 'react';
import './DoctorCard.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import AppointmentForm from '../AppointmentForm/AppointmentForm';  // Import AppointmentForm
import { v4 as uuidv4 } from 'uuid';  // To generate unique IDs for appointments

const DoctorCard = ({ name, speciality, experience, ratings, profilePic }) => {
  const [appointments, setAppointments] = useState([]);  // Manage appointments
  const [showModal, setShowModal] = useState(false);  // Modal state

  // Function to handle form submission
  const handleFormSubmit = (appointmentData) => {
    const newAppointment = {
      id: uuidv4(),  // Generate a unique ID for the appointment
      ...appointmentData
    };
    setAppointments([...appointments, newAppointment]);
    setShowModal(false);  // Close the modal after booking
  };

  // Function to handle appointment cancellation
  const handleCancelAppointment = (appointmentId) => {
    const updatedAppointments = appointments.filter(appointment => appointment.id !== appointmentId);
    setAppointments(updatedAppointments);
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
          <div className="doctor-card-detail-ratings">Ratings: {ratings} ★</div>
        </div>
      </div>

      <div className="doctor-card-options-container">
        <Popup
          trigger={
            <button className={`book-appointment-btn ${appointments.length > 0 ? 'cancel-appointment' : ''}`}>
              {appointments.length > 0 ? (
                <div>Cancel Appointment</div>
              ) : (
                <div>Book Appointment</div>
              )}
              <div>No Booking Fee</div>
            </button>
          }
          modal
          open={showModal}
          onClose={() => setShowModal(false)}
        >
          <div className="popup-content">
            {appointments.length > 0 ? (
              <div>
                <h3>Appointment Booked!</h3>
                {appointments.map((appointment) => (
                  <div className="bookedInfo" key={appointment.id}>
                    <p>Name: {appointment.name}</p>
                    <p>Phone Number: {appointment.phoneNumber}</p>
                    <p>Date: {appointment.appointmentDate}</p>
                    <p>Time: {appointment.appointmentTime}</p>
                    <p>Slot: {appointment.selectedSlot}</p>
                    <button onClick={() => handleCancelAppointment(appointment.id)}>Cancel Appointment</button>
                  </div>
                ))}
              </div>
            ) : (
              <AppointmentForm
                doctorName={name}
                doctorSpeciality={speciality}
                onSubmit={handleFormSubmit}  // Handle booking
              />
            )}
          </div>
        </Popup>
      </div>
    </div>
  );
};

export default DoctorCard;
