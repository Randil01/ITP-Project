import React, { useState } from 'react';
import { FaPhoneAlt, FaAmbulance, FaFireExtinguisher, FaWater, FaExclamationTriangle } from 'react-icons/fa';
import './Chatbot.css';  // Ensure this points to the correct CSS file

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const toggleChatbot = () => {
    setOpen(!open);
    setMessage(''); // Clear message when toggled
  };

  const handleServiceClick = (service) => {
    let phoneNumber;

    switch (service) {
      case 'police':
        phoneNumber = '119';
        break;
      case 'fire':
        phoneNumber = '110';
        break;
      case 'ambulance':
        phoneNumber = '1990';
        break;
      case 'waterBoard':
        phoneNumber = ''; // You can add a number if applicable
        break;
      case 'disaster':
        phoneNumber = ''; // You can add a number if applicable
        break;
      default:
        phoneNumber = '';
    }

    if (phoneNumber) {
      window.open(`tel:${phoneNumber}`);
      setMessage(`Calling ${service.charAt(0).toUpperCase() + service.slice(1)}...`);
    } else {
      setMessage(`No number available for ${service.charAt(0).toUpperCase() + service.slice(1)}.`);
    }
  };

  return (
    <div className="chatbot-container">
      <div className={`chatbot-icon ${open ? 'open' : ''}`} onClick={toggleChatbot}>
        <FaPhoneAlt size={30} color="#fff" />
      </div>

      {open && (
        <div className="chatbot-popup animate-popup">
          <h3>Select Emergency Service</h3>
          <button onClick={() => handleServiceClick('police')}>
            <FaPhoneAlt /> Police (119)
          </button>
          <button onClick={() => handleServiceClick('fire')}>
            <FaFireExtinguisher /> Fire Station (110)
          </button>
          <button onClick={() => handleServiceClick('ambulance')}>
            <FaAmbulance /> Ambulance (1990)
          </button>
          <button onClick={() => handleServiceClick('waterBoard')}>
            <FaWater /> Water Board
          </button>
          <button onClick={() => handleServiceClick('disaster')}>
            <FaExclamationTriangle /> Disaster Services
          </button>
          {message && <p>{message}</p>}
        </div>
      )}
    </div>
  );
};

export default Chatbot;
