import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import StarRating from './StarRating';
import Navbar from '../Navbar'; // Import the Navbar component
import './FeedbackForm.css';

function FeedbackForm() {
  const [employeeName, setEmployeeName] = useState('');
  const [employeeEmail, setEmployeeEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [rating, setRating] = useState(1);
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^[a-zA-Z\s]+$/.test(employeeName)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Name',
        text: 'Employee Name must contain only letters and spaces.',
      });
      return;
    }

    if (!employeeName || !employeeEmail || !department || !feedback) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in all fields!',
      });
      return;
    }

    if (!/\S+@\S+\.\S+/.test(employeeEmail)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Email',
        text: 'Please enter a valid email address.',
      });
      return;
    }

    if (rating < 1 || rating > 5) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Rating',
        text: 'Rating must be between 1 and 5.',
      });
      return;
    }

    try {
      await axios.post('http://localhost:3001/api/createfeedback', {
        employeeName,
        employeeEmail,
        department,
        rating,
        feedback,
      });

      Swal.fire({
        icon: 'success',
        title: 'Feedback Submitted!',
        text: 'Your feedback has been successfully submitted.',
      });

      setEmployeeName('');
      setEmployeeEmail('');
      setDepartment('');
      setRating(1);
      setFeedback('');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Submission Error',
        text: 'There was an error submitting your feedback. Please try again.',
      });
      console.error(error);
    }
  };

  const handleClear = () => {
    setEmployeeName('');
    setEmployeeEmail('');
    setDepartment('');
    setRating(1);
    setFeedback('');
  };

  return (
    <div>
      <Navbar /> {/* Add the Navbar component here */}

      <div className="feedback-form-container">
        <h2>Feedback Form</h2>
        <form onSubmit={handleSubmit} className="feedback-form">
          <div className="form-group">
            <input
              id="employeeName"
              type="text"
              placeholder="Enter your Username"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
              required
              aria-required="true"
            />
          </div>
          <div className="form-group">
            <input
              id="employeeEmail"
              type="email"
              placeholder="Enter your Email"
              value={employeeEmail}
              onChange={(e) => setEmployeeEmail(e.target.value)}
              required
              aria-required="true"
            />
          </div>
          <div className="form-group">
            <select
              id="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
              aria-required="true"
            >
              <option value="">Select Department</option>
              <option value="Healthcare and Social">Healthcare and Social</option>
              <option value="Street Controlling">Street Controlling</option>
              <option value="Waste Management">Waste Management</option>
              <option value="Event & Places Management">Event & Places Management</option>
            </select>
          </div>
          <div className="form-group">
            <StarRating rating={rating} onRatingChange={setRating} />
          </div>
          <div className="form-group">
            <textarea
              id="feedback"
              placeholder="Add your Feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              required
              aria-required="true"
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="submit-button">Submit Feedback</button>
            <button type="button" className="clear-button" onClick={handleClear}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FeedbackForm;
