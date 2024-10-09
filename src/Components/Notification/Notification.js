import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Notification.css';

const formatTime = (time) => {
  const [hours, minutes] = time.split(':').map(Number);
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;
  return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
};

const Notification = ({ onCancel }) => {
  const [appointmentData, setAppointmentData] = useState(null);
  const [doctorData, setDoctorData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedAppointmentData = JSON.parse(localStorage.getItem('appointmentData'));
    const storedDoctorData = JSON.parse(localStorage.getItem('doctorData'));

    if (storedAppointmentData) {
      setAppointmentData(storedAppointmentData);
    }

    if (storedDoctorData) {
      setDoctorData({
        name: storedDoctorData.doctorName,  // Use doctorName instead of just name
        speciality: storedDoctorData.speciality,
      });
    }
  }, []);

  const handleAddReview = () => {
    navigate('/reviews', { state: { doctorName: doctorData.name, speciality: doctorData.speciality } });
  };

  if (!appointmentData || !doctorData) {
    return null;
  }

  return (
    <div className="notification-card notification-bottom-right">
      <h3 className="notification-card__title">Appointment Details</h3>
      <p><strong>Doctor:</strong> {doctorData.name}</p>
      <p><strong>Speciality:</strong> {doctorData.speciality}</p>
      <p><strong>Patient Name:</strong> {appointmentData.name}</p>
      <p><strong>Phone Number:</strong> {appointmentData.phoneNumber}</p>
      <p><strong>Date of Appointment:</strong> {appointmentData.appointmentDate}</p>
      <p><strong>Time Slot:</strong> {formatTime(appointmentData.appointmentTime)}</p>
      <button className="cancel-btn" onClick={onCancel}>Cancel Appointment</button>
      <button className="review-btn" onClick={handleAddReview}>Add Review</button>
    </div>
  );
};

export default Notification;
