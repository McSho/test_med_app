import React, { useState } from 'react';

const AppointmentForm = ({ doctorName, doctorSpeciality, onSubmit }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [errors, setErrors] = useState({});

  // Helper function to get today's date in yyyy-mm-dd format
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // Validate if the selected appointment time is within the selected time slot
  const validateTimeSlot = (time, slot) => {
    const [hours, minutes] = time.split(':');
    const timeInMinutes = parseInt(hours) * 60 + parseInt(minutes);

    switch (slot) {
      case 'Morning':
        return timeInMinutes >= 480 && timeInMinutes <= 720;  // 8am - 12pm
      case 'Afternoon':
        return timeInMinutes > 720 && timeInMinutes <= 960;  // 12pm - 4pm
      case 'Evening':
        return timeInMinutes > 960 && timeInMinutes <= 1200;  // 4pm - 8pm
      default:
        return false;
    }
  };

  // Handle form submission with validation
  const handleFormSubmit = (e) => {
    e.preventDefault();

    let formErrors = {};

    // Check if the date is not in the past
    if (appointmentDate < getTodayDate()) {
      formErrors.appointmentDate = 'Appointment date cannot be in the past.';
    }

    // Check if the time matches the selected slot
    if (!validateTimeSlot(appointmentTime, selectedSlot)) {
      formErrors.appointmentTime = `Appointment time must be within the ${selectedSlot} slot.`;
    }

    // If there are any errors, set them to the state
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      // If no errors, submit the form data and clear the fields
      onSubmit({ name, phoneNumber, appointmentDate, appointmentTime, selectedSlot });
      setName('');
      setPhoneNumber('');
      setAppointmentDate('');
      setAppointmentTime('');
      setSelectedSlot('');
      setErrors({});
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="appointment-form">
      <h3>Book Appointment with Dr. {doctorName} ({doctorSpeciality})</h3>

      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="tel"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="appointmentDate">Appointment Date:</label>
        <input
          type="date"
          id="appointmentDate"
          value={appointmentDate}
          min={getTodayDate()}  // Set min date to today
          onChange={(e) => setAppointmentDate(e.target.value)}
          required
        />
        {errors.appointmentDate && <p className="error">{errors.appointmentDate}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="appointmentTime">Appointment Time:</label>
        <input
          type="time"
          id="appointmentTime"
          value={appointmentTime}
          onChange={(e) => setAppointmentTime(e.target.value)}
          required
        />
        {errors.appointmentTime && <p className="error">{errors.appointmentTime}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="selectedSlot">Select Time Slot:</label>
        <select
          id="selectedSlot"
          value={selectedSlot}
          onChange={(e) => setSelectedSlot(e.target.value)}
          required
        >
          <option value="">Choose a slot</option>
          <option value="Morning">Morning (8am - 12pm)</option>
          <option value="Afternoon">Afternoon (12pm - 4pm)</option>
          <option value="Evening">Evening (4pm - 8pm)</option>
        </select>
      </div>

      <button type="submit">Book Now</button>
    </form>
  );
};

export default AppointmentForm;
