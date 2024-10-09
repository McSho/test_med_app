import React, { useState } from 'react';
import './ReviewForm.css';
import { useLocation } from 'react-router-dom';

const ReviewForm = () => {
  const location = useLocation(); // Access passed doctor name and speciality from notification
  const [reviews, setReviews] = useState([
    { id: 1, doctorName: location.state?.doctorName || '', speciality: location.state?.speciality || '', feedback: '' },
  ]);

  const [showPopup, setShowPopup] = useState(false);
  const [currentDoctor, setCurrentDoctor] = useState(null);
  const [formData, setFormData] = useState({ name: '', review: '', rating: 0 });

  const handleFeedbackClick = (doctor) => {
    setCurrentDoctor(doctor);
    setShowPopup(true); // Show the popup when "Click Here" is clicked
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRatingChange = (rating) => {
    setFormData({ ...formData, rating });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save the feedback, hide the popup
    const updatedReviews = reviews.map((review) =>
      review.id === currentDoctor.id ? { ...review, feedback: formData.review } : review
    );
    setReviews(updatedReviews);
    setShowPopup(false);
    setFormData({ name: '', review: '', rating: 0 });
  };

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
              <td>{review.doctorName || 'Doctor not available'}</td>
              <td>{review.speciality || 'Speciality not available'}</td>
              <td>
                <button 
                  className={`feedback-btn ${review.feedback ? 'disabled-btn' : ''}`} 
                  onClick={() => handleFeedbackClick(review)}
                  disabled={review.feedback !== ''}
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
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />

              <label htmlFor="review">Review:</label>
              <textarea id="review" name="review" value={formData.review} onChange={handleChange} />
               
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
