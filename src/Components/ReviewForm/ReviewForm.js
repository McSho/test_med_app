import React, { useState } from 'react';
import './ReviewForm.css';

const ReviewForm = () => {
  const [reviews, setReviews] = useState([
    { id: 1, doctorName: 'Dr. John Doe', speciality: 'Cardiology', feedback: '' },
    { id: 2, doctorName: 'Dr. Jane Smith', speciality: 'Dermatology', feedback: '' },
  ]);

  const handleFeedbackClick = (id) => {
    alert(`Provide feedback for doctor ID: ${id}`);
    // Here you can implement navigation to the feedback form or a modal to collect feedback.
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
                  className="feedback-btn" 
                  onClick={() => handleFeedbackClick(review.id)}
                >
                  Click Here
                </button>
              </td>
              <td>{review.feedback ? review.feedback : 'No Review Given'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReviewForm;
