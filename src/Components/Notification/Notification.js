import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Notification.css';

const Notification = ({ onCancel }) => {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
    if (storedAppointments.length > 0) {
      setAppointments(storedAppointments);
    }
  }, []);

  const handleAddReview = (doctorName, speciality) => {
    navigate('/reviews', { state: { doctorName, speciality } });
  };

  if (appointments.length === 0) {
    return null;
  }

  return (
    <div className="notifications-container">
      {appointments.map((appointment, index) => (
        <div key={index} className="notification-card">
          <h3 className="notification-card__title">Appointment with Dr. {appointment.doctorName}</h3>
          <p><strong>Speciality:</strong> {appointment.speciality}</p>
          <p><strong>Date:</strong> {appointment.appointmentDate}</p>
          <p><strong>Time:</strong> {appointment.appointmentTime}</p>
          <button className="review-btn" onClick={() => handleAddReview(appointment.doctorName, appointment.speciality)}>Add Review</button>
          <button className="cancel-btn" onClick={() => onCancel(index)}>Cancel Appointment</button>
        </div>
      ))}
    </div>
  );
};

export default Notification;
