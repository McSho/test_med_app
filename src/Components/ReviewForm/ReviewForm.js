import React, { useState } from 'react';
import './ReviewForm.css';

const ReviewForm = () => {
  const [reviews, setReviews] = useState([
    { id: 1, doctorName: 'Dr. John Doe', speciality: 'Cardiology', feedback: '' },
    { id: 2, doctorName: 'Dr. Jane Smith', speciality: 'Dermatology', feedback: '' },
  ]);

  const [showPopup, setShowPopup] = useState(false);
  const [currentDoctor, setCurrentDoctor] = useState(null);
  const [formData, setFormData] = useState({ name: '', review: '', rating: 0 });

  // Function to handle feedback click and open form for the selected doctor
  const handleFeedbackClick = (doctor) => {
    setCurrentDoctor(doctor);
    setShowPopup(true); // Show the popup
  };

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle rating change
  const handleRatingChange = (rating) => {
    setFormData({ ...formData, rating });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Save the feedback, hide the popup, and disable the feedback button for the current doctor
    const updatedReviews = reviews.map((review) =>
      review.id === currentDoctor.id ? { ...review, feedback: formData.review } : review
    );
    setReviews(updatedReviews);
    setShowPopup(false);
    setFormData({ name: '', review: '', rating: 0 });
  };

  // Close the feedback popup
  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="review-container">
      <h2>Reviews</h2>
      <table className="review-table">
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Doctor Name</th>
            <th>Doctor Speciality</th>
            <th>Provide Feedback</th>
            <th>Review Given</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review, index) => (
            <tr key={review.id}>
              <td>{index + 1}</td>
              <td>{review.doctorName}</td>
              <td>{review.speciality}</td>
              <td>
                <button
                  className={`feedback-btn ${review.feedback ? 'disabled-btn' : ''}`} // Add disabled class
                  onClick={() => handleFeedbackClick(review)}
                  disabled={!!review.feedback} // Disable if feedback is already given
                >
                  {review.feedback ? 'Feedback Given' : 'Click Here'}
                </button>
              </td>
              <td>{review.feedback ? review.feedback : 'No Review Given'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showPopup && (
        <>
          <div className="feedback-overlay" onClick={closePopup}></div>
          <div className="feedback-popup">
            <h2>Give Your Review</h2>
            <form onSubmit={handleSubmit} className="review-form">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />

              <label htmlFor="review">Review:</label>
              <textarea id="review" name="review" value={formData.review} onChange={handleChange} required />

              <label>Rating:</label>
              <div className="rating-selector">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`star ${formData.rating >= star ? 'selected' : ''}`}
                    onClick={() => handleRatingChange(star)}
                  >
                    ★
                  </span>
                ))}
              </div>

              <button type="submit">Submit</button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default ReviewForm;
