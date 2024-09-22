import React, { useState } from 'react';
import './Navbar.css';
import logo1 from './img/logo1.png'; // Adjust the path based on your folder structure
import logo2 from './img/logo2.png'; // Adjust the path based on your folder structure

function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo1} alt="Logo 1" />
        <img src={logo2} alt="Logo 2" />
      </div>
      <div className="navbar-links">
        <a href="/feedbackForm">HOME</a>
        <a href="/AdminFeedbackView">Administration & Controlling</a>
        <a href="/health">Health</a>
        <a href="/city-monitoring">City Monitoring</a>
        <div className="dropdown">
          <button className="dropdown-toggle" onClick={toggleDropdown}>
            Feedbacks
          </button>
          {dropdownOpen && (
            <div className="dropdown-menu">
              <a href="/feedbackForm">Add Feedback</a>
              <a href="/feedbackList">View Feedbacks</a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
