import React, { useState, useEffect } from 'react';
import './Appointments.css'; // Corrected the path to DoctorCard.css
import { useNavigate } from 'react-router-dom';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
    setAppointments(storedAppointments);
  }, []);

  const handleCancelAppointment = (index) => {
    const updatedAppointments = appointments.filter((_, i) => i !== index);
    setAppointments(updatedAppointments);
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
  };

  const handleAddReview = (doctorName, speciality) => {
    navigate('/reviews', { state: { doctorName, speciality } });
  };

  if (appointments.length === 0) {
    return <p>No appointments booked yet.</p>;
  }

  return (
    <div className="appointments-page">
      <h2>My Appointments</h2>
      <div className="appointments-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {appointments.map((appointment, index) => (
          <div key={index} className="doctor-card-container">
            <div className="doctor-card-details-container">
              <div className="doctor-card-details">
                <p className="doctor-card-detail-name"><strong>Doctor:</strong> {appointment.doctorName}</p>
                <p className="doctor-card-detail-speciality"><strong>Speciality:</strong> {appointment.speciality}</p>
                <p><strong>Date:</strong> {appointment.appointmentDate}</p>
                <p><strong>Time:</strong> {appointment.appointmentTime}</p>
              </div>
              <div>
                <button
                  className="cancel-appointment-btn"
                  onClick={() => handleCancelAppointment(index)}
                >
                  Cancel Appointment
                </button>


                <button
                  className="add-review-btn" // Use the new CSS class
                  onClick={() => handleAddReview(appointment.doctorName, appointment.speciality)}
                  
                >
                  Add Review
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Appointments;
