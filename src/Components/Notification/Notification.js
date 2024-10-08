import React, { useEffect, useState } from 'react';
import './Notification.css';

// Helper function to format time with AM/PM
const formatTime = (time) => {
  const [hours, minutes] = time.split(':').map(Number);
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;  // Convert 24-hour to 12-hour format
  return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
};

const Notification = ({ onCancel }) => {
  const [appointmentData, setAppointmentData] = useState(null);
  const [doctorData, setDoctorData] = useState(null);

  // Fetch data from localStorage when the component mounts
  useEffect(() => {
    const storedAppointmentData = JSON.parse(localStorage.getItem('appointmentData')); // Get appointment details
    const storedDoctorData = JSON.parse(localStorage.getItem('doctorData')); // Get doctor details

    if (storedAppointmentData) {
      setAppointmentData(storedAppointmentData); // Set appointment data from localStorage
    }

    if (storedDoctorData) {
      setDoctorData(storedDoctorData); // Set doctor data from localStorage
    }
  }, []);

  // If no data is found, don't render the notification
  if (!appointmentData || !doctorData) {
    return null;
  }

  return (
    <div className="notification-card">
      <h3 className="notification-card__title">Appointment Details</h3>
      {/* Ensure that both the doctor and appointment details are shown */}
      <p><strong>Doctor:</strong> {doctorData.doctorName}</p> {/* Doctor Name */}
      <p><strong>Speciality:</strong> {doctorData.speciality}</p> {/* Speciality */}
      <p><strong>Name:</strong> {appointmentData.name}</p> {/* User's Name */}
      <p><strong>Phone Number:</strong> {appointmentData.phoneNumber}</p> {/* Phone Number */}
      <p><strong>Date of Appointment:</strong> {appointmentData.date}</p> {/* Date */}
      <p><strong>Time Slot:</strong> {formatTime(appointmentData.time)}</p> {/* Time with AM/PM */}
      <button onClick={onCancel}>Cancel Appointment</button>
    </div>
  );
};

export default Notification;
