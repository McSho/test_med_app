import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Notification.css';

const Notification = ({ onCancel }) => {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('auth-token');
    if (!token) {
      setAppointments([]);
      return;
    }

    const storedAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
    setAppointments(storedAppointments);
  }, []);

  const handleAddReview = (doctorName, speciality) => {
    navigate('/reviews', { state: { doctorName, speciality } });
  };

  const handleCancel = (index) => {
    onCancel(index); // Call the function passed from App to update appointments state
    const updatedAppointments = appointments.filter((_, i) => i !== index);
    setAppointments(updatedAppointments);
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
};

  if (appointments.length === 0) {
    return <div>No notifications available.</div>;
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
          <button className="cancel-btn" onClick={() => handleCancel(index)}>Cancel Appointment</button>
        </div>
      ))}
    </div>
  );
};

export default Notification;
