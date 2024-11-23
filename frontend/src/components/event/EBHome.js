import React from 'react';
import { Link } from 'react-router-dom';
import './EBHomePage.css'; // For the CSS styles

const EBHome = () => {
  return (
    <div className="ebhome-container">
      <header className="ebhero">
        <h1>WELCOME TO PANADURA MUNICIPLE COUNCIL</h1>
        <p>Efficient management of public spaces and events for a smarter city.</p>
        <Link to="/event-booking" className="ebcta-button">Book an Event Now</Link>
      </header>
      <section className="ebfeatures">
        <div className="ebfeature-item">
          <h2>Upcoming Events</h2>
          <p>Stay updated on all the events happening in the city.</p>
          <Link to="/upcoming-events" className="eblink-button">View Events</Link>
        </div>
        <div className="ebfeature-item">
          <h2>Book an Event</h2>
          <p>Host your own event by booking public spaces easily.</p>
          <Link to="/event-booking" className="eblink-button">Book an Event</Link>
        </div>
        <div className="ebfeature-item">
          <h2>Report Issues</h2>
          <p>Help us keep the city running smoothly by reporting any issues.</p>
          <Link to="/reporting-issues" className="eblink-button">Report an Issue</Link>
        </div>
      </section>
    </div>
  );
};

export default EBHome;
