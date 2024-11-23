import React, { useState } from 'react';
import './UpcomingEvents.css';

const UpcomingEvents = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const events = [
    {
      id: 1,
      name: 'Community Festival',
      date: '2024-10-05',
      time: '10:00 AM - 5:00 PM',
      location: 'Outdoor Area',
      description: 'Join us for a day of fun with food, games, and entertainment for all ages!',
    },
    {
      id: 2,
      name: 'Charity Run',
      date: '2024-11-12',
      time: '8:00 AM - 12:00 PM',
      location: 'Hall A',
      description: 'Participate in our charity run to support local causes!',
    },
    {
      id: 3,
      name: 'Drama',
      date: '2024-12-01',
      time: '6:00 PM - 10:00 PM',
      location: 'Auditorium',
      description: 'Enjoy a movie under the stars with family and friends!',
    },
  ];

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredEvents = events.filter(event =>
    event.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="ebupcoming-events">
      <h2>Upcoming Events</h2>
      <div className="ebsearch-bar">
        <input
          type="text"
          name="searchQuery"
          placeholder="Search bookings..."
          value={searchQuery}
          onChange={handleInputChange}
        />
      </div>
      <div className="ebevents-list">
        {filteredEvents.length > 0 ? (
          filteredEvents.map(event => (
            <div key={event.id} className="ebevent-card">
              <h3>{event.name}</h3>
              <p><strong>Date:</strong> {event.date}</p>
              <p><strong>Time:</strong> {event.time}</p>
              <p><strong>Location:</strong> {event.location}</p>
              <p>{event.description}</p>
            </div>
          ))
        ) : (
          <p>No events found.</p>
        )}
      </div>
    </div>
  );
};

export default UpcomingEvents;
