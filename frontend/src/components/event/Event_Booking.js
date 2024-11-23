import React, { useEffect, useState } from 'react';
import './EventBooking.css';

function EventBooking() {
  // State hooks for form fields
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [eventType, setEventType] = useState('');
  const [venue, setVenue] = useState('');
  const [organizerName, setOrganizerName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [description, setDescription] = useState('');
  const [attendees, setAttendees] = useState('');
  const [permits, setPermits] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  
  // State for managing bookings and errors
  const [bookings, setBookings] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false); // Editing mode flag
  const [editingBookingId, setEditingBookingId] = useState(null); // ID of the booking being edited

  // Event types and venue options
  const eventTypes = ['Conference', 'Workshop', 'Seminar', 'Charity', 'Other'];
  const venues = ['Hall A', 'Hall B', 'Outdoor Area', 'Auditorium', 'Other'];

  // Helper function to format date to YYYY-MM-DD
  const formatDate = (date) => date.toISOString().split('T')[0];

  // Get minimum date (tomorrow) for the event date field
  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return formatDate(tomorrow);
  };

  // Get maximum date (60 days from today) for the event date field
  const getMaxDate = () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 60);
    return formatDate(futureDate);
  };

  // Field validation function
const validateField = (name, value) => {
  // Regular expressions for validation
  const alphanumericPattern = /^[a-zA-Z0-9\s]*$/;
  const specialCharsPattern = /^[a-zA-Z0-9\s.,]*$/;
  const phonePattern = /^07[0-9]{8}$/;
  const validEmailPattern = /^[a-zA-Z0-9](\.?[a-zA-Z0-9_-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/;

  switch (name) {
    case 'eventName':
      if (!alphanumericPattern.test(value)) {
        return 'Event name can only contain letters and numbers.';
      }
      break;
    case 'organizerName':
      if (!alphanumericPattern.test(value)) {
        return 'Organizer name can only contain letters and numbers.';
      }
      break;
    case 'description':
      if (!specialCharsPattern.test(value)) {
        return 'Description can only contain letters, numbers, commas, and periods.';
      }
      break;
    case 'permits':
      if (value && !specialCharsPattern.test(value)) {
        return 'Permits can only contain letters, numbers, commas, and periods.';
      }
      break;
    case 'specialRequests':
      if (value && !specialCharsPattern.test(value)) {
        return 'Special requests can only contain letters, numbers, commas, and periods.';
      }
      break;
    case 'contactPhone':
      if (!phonePattern.test(value)) {
        return 'Please enter a valid phone number starting with "07" and containing exactly 10 digits (e.g., 0788888888).';
      }
      break;
      case 'contactEmail':
        // Check if the input email is empty or exceeds the length limit
        if (value.trim() === '') {
          return 'Email cannot be empty.';
        }
        if (value.length > 100) {
          return 'Email must not exceed 100 characters.';
        }
        // Validate email pattern
        if (!validEmailPattern.test(value)) {
          return 'Please enter a valid email address (e.g., user@example.com). Special characters like !, # are not allowed.';
        }
        break;
        case 'attendees':
  const attendeesCount = parseInt(value, 10);
  if (isNaN(attendeesCount) || attendeesCount <= 0) {
    return 'Number of attendees must be a positive number.';
  }
  break;

      break;
    default:
      break;
  }
  return '';
};

  // Handle input changes in form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update state based on the field name
    switch (name) {
      case 'eventName': setEventName(value); break;
      case 'eventDate': setEventDate(value); break;
      case 'startTime': setStartTime(value); break;
      case 'endTime': setEndTime(value); break;
      case 'eventType': setEventType(value); break;
      case 'venue': setVenue(value); break;
      case 'organizerName': setOrganizerName(value); break;
      case 'contactEmail': setContactEmail(value); break;
      case 'contactPhone': setContactPhone(value); break;
      case 'description': setDescription(value); break;
      case 'attendees': setAttendees(value); break;
      case 'permits': setPermits(value); break;
      case 'specialRequests': setSpecialRequests(value); break;
      case 'searchQuery': setSearchQuery(value); break;
      default: break;
    }

    // Validate the field and update errors state
    const error = validateField(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  // Handle phone input - digits only, with "07" at the start
  const handlePhoneInput = (e) => {
    const inputValue = e.target.value.replace(/\D/g, ''); // Remove non-digits
    if (inputValue.length <= 10 && inputValue.startsWith('07')) {
      setContactPhone(inputValue);
    } else if (inputValue.length < 2 && inputValue.startsWith('0')) {
      setContactPhone(inputValue);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate the phone number pattern
    const phonePattern = /^07[0-9]{8}$/;
    if (!phonePattern.test(contactPhone)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        contactPhone: 'Please enter a valid phone number starting with 07 and containing exactly 10 digits (e.g., 0788888888).'
      }));
      return;
    }

    // Validate other fields
    const formErrors = {};
    Object.keys({ eventName, organizerName, contactPhone, contactEmail, description }).forEach((field) => {
      const error = validateField(field, eval(field));
      if (error) formErrors[field] = error;
    });

    setErrors(formErrors);
    if (Object.keys(formErrors).length > 0) return;

    const bookingData = {
      eventName, eventDate, startTime, endTime, eventType, venue,
      organizerName, contactEmail, contactPhone, description,
      attendees, permits, specialRequests,
    };

    try {
      let response;
      // Update booking if editing
      if (isEditing) {
        response = await fetch(`http://localhost:5000/api/booking/${editingBookingId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bookingData),
        });
      } else {
        // Create new booking
        response = await fetch('http://localhost:5000/api/booking', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bookingData),
        });
      }

      if (!response.ok) throw new Error('Failed to submit booking');

      const data = await response.json();
      if (isEditing) {
        // Update booking list if editing
        setBookings(bookings.map((booking) => (booking._id === data._id ? data : booking)));
        setIsEditing(false);
        setEditingBookingId(null);
      } else {
        // Add new booking to list
        setBookings([...bookings, data]);
      }

      resetForm(); // Reset the form after submission
    } catch (err) {
      console.error('Error:', err);
      setErrors({ form: 'Failed to submit the booking. Please try again later.' });
    }
  };

  // Handle booking edit
  const handleEdit = (booking) => {
    // Populate form fields with booking details
    setEventName(booking.eventName);
    setEventDate(booking.eventDate);
    setStartTime(booking.startTime);
    setEndTime(booking.endTime);
    setEventType(booking.eventType);
    setVenue(booking.venue);
    setOrganizerName(booking.organizerName);
    setContactEmail(booking.contactEmail);
    setContactPhone(booking.contactPhone);
    setDescription(booking.description);
    setAttendees(booking.attendees);
    setPermits(booking.permits);
    setSpecialRequests(booking.specialRequests);
    
    setEditingBookingId(booking._id);
    setIsEditing(true); // Set editing mode to true
  };

  // Handle booking delete
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        await fetch(`http://localhost:5000/api/booking/${id}`, { method: 'DELETE' });
        setBookings(bookings.filter((booking) => booking._id !== id));
      } catch (error) {
        console.error('Error:', error);
        alert('Failed to delete booking. Please try again later.');
      }
    }
  };

  // Reset the form fields
  const resetForm = () => {
    setEventName('');
    setEventDate('');
    setStartTime('');
    setEndTime('');
    setEventType('');
    setVenue('');
    setOrganizerName('');
    setContactEmail('');
    setContactPhone('');
    setDescription('');
    setAttendees('');
    setPermits('');
    setSpecialRequests('');
    setErrors({});
  };

  // Print bookings
  const handlePrint = () => {
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    if (!printWindow) return; // Check if window was opened successfully

    // Prepare table rows for bookings
    const bookingRows = bookings.map((booking) => `
      <tr>
        <td>${booking.eventName}</td>
        <td>${booking.eventDate}</td>
        <td>${booking.startTime}</td>
        <td>${booking.endTime}</td>
        <td>${booking.eventType}</td>
        <td>${booking.venue}</td>
        <td>${booking.organizerName}</td>
        <td>${booking.contactEmail}</td>
        <td>${booking.contactPhone}</td>
        <td>${booking.description}</td>
        <td>${booking.attendees}</td>
        <td>${booking.permits}</td>
        <td>${booking.specialRequests}</td>
      </tr>
    `).join('');

    // Define HTML content for print window
    const content = `
      <html>
  <head>
    <title>Event Booking Details</title>
    <style>
      body { 
        font-family: Arial, sans-serif; 
        text-align: center;
      }
      table { 
        border-collapse: collapse; 
        width: 100%; 
        margin-top: 20px;
      }
      th, td { 
        border: 1px solid #dddddd; 
        text-align: left; 
        padding: 8px;
      }
      th { 
        background-color: green; 
        color: white;
      }
    </style>
  </head>
  <body>
    <h1>Event Booking Details</h1>
    <table>
      <thead>
        <tr>
          <th>Event Name</th>
          <th>Event Date</th>
          <th>Start Time</th>
          <th>End Time</th>
          <th>Event Type</th>
          <th>Venue</th>
          <th>Organizer Name</th>
          <th>Contact Email</th>
          <th>Contact Phone</th>
          <th>Description</th>
          <th>Attendees</th>
          <th>Permits</th>
          <th>Special Requests</th>
        </tr>
      </thead>
      <tbody>
        ${bookingRows}
      </tbody>
    </table>
  </body>
</html>
    `;

    printWindow.document.write(content); // Write content to print window
    printWindow.document.close();
    printWindow.print(); // Trigger the print dialog
  };

  // Fetch bookings on component mount
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/booking');
        const data = await response.json();
        setBookings(data); // Set fetched bookings to state
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []); // Run once when component mounts

  return (
    <div className="event-booking-container">
    <div>
      <h1>Event Booking Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Event Name:</label>
          <input type="text" name="eventName" value={eventName} onChange={handleInputChange} required />
          {errors.eventName && <span>{errors.eventName}</span>} {/* Display validation errors */}
        </div>
        <div>
          <label>Event Date:</label>
          <input type="date" name="eventDate" min={getMinDate()} max={getMaxDate()} value={eventDate} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Start Time:</label>
          <input type="time" name="startTime" value={startTime} onChange={handleInputChange} required />
        </div>
        <div>
          <label>End Time:</label>
          <input type="time" name="endTime" value={endTime} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Event Type:</label>
          <select name="eventType" value={eventType} onChange={handleInputChange} required>
            <option value="">Select</option>
            {eventTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Venue:</label>
          <select name="venue" value={venue} onChange={handleInputChange} required>
            <option value="">Select</option>
            {venues.map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Organizer Name:</label>
          <input type="text" name="organizerName" value={organizerName} onChange={handleInputChange} required />
          {errors.organizerName && <span>{errors.organizerName}</span>}
        </div>
        
        <div>
          <label>Contact Phone:</label>
          <input type="text" name="contactPhone" value={contactPhone} onChange={handlePhoneInput} required />
          {errors.contactPhone && <span>{errors.contactPhone}</span>}
        </div>
        <div>
          <label>Description:</label>
          <textarea name="description" value={description} onChange={handleInputChange}></textarea>
          {errors.description && <span>{errors.description}</span>}
        </div>
        <div>
          <label>Number of Attendees:</label>
          <input type="number" name="attendees" value={attendees} onChange={handleInputChange} required />
          {errors.attendees && <span>{errors.attendees}</span>}
        </div>
        <div>
          <label>Permits:</label>
          <textarea name="permits" value={permits} onChange={handleInputChange}></textarea>
          {errors.permits && <span>{errors.permits}</span>}
        </div>
        <div>
          <label>Special Requests:</label>
          <textarea name="specialRequests" value={specialRequests} onChange={handleInputChange}></textarea>
          {errors.specialRequests && <span>{errors.specialRequests}</span>}
        </div>
        {/* Changed button class to btn-medium */}
        <button type="submit" className="btn-medium" style={{ width: '500px' }}>{isEditing ? 'Update Booking' : 'Submit Booking'}</button>
        <button type="button" className="btn-medium" style={{ width: '200px' }} onClick={resetForm}>Reset</button>
        <button type="button" className="btn-medium" style={{ width: '200px' }} onClick={handlePrint}>Print Bookings</button>
      </form>

      <h2>Booking List</h2>
      {/* Search input for filtering bookings */}
      <div className="event-search-container">
      <input
        type="text"
        name="searchQuery"
        placeholder="Search bookings..."
        value={searchQuery}
        onChange={handleInputChange}
      />
</div>
      <ul>
        {bookings.filter((booking) => booking.eventName.toLowerCase().includes(searchQuery.toLowerCase()))
          .map((booking) => (
            <li key={booking._id} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', margin: '10px 0' }}>
              {booking.eventName} - {new Date(booking.eventDate).toLocaleDateString('en-US')} {/* Format date */}
              <button 
                style={{
                  padding: '10px 20px',
                  width: '500px',
                  fontSize: '14px',
                  borderRadius: '10px',
                  border: 'none',
                  background: 'linear-gradient(45deg, #6a11cb, #2575fc)',
                  color: '#fff',
                  cursor: 'pointer',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => handleEdit(booking)}
                onMouseOver={(e) => e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)'}
                onMouseOut={(e) => e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)'}
              >
                Edit
              </button>
              <br />
              <button 
                style={{
                  padding: '10px 20px',
                  width: '500px',
                  fontSize: '14px',
                  borderRadius: '10px',
                  border: 'none',
                  background: 'linear-gradient(45deg, #f85032, #e73827)',
                  color: '#fff',
                  cursor: 'pointer',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease',
                  marginTop: '10px'
                }}
                onClick={() => handleDelete(booking._id)}
                onMouseOver={(e) => e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)'}
                onMouseOut={(e) => e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)'}
              >
                Delete
              </button>
            </li>
          ))}
      </ul>
    </div>
    </div>
  );
}

export default EventBooking;
