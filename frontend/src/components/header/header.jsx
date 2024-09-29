import React, { useState } from 'react';
import logo1 from './images/Gov_sl.png';
import logo2 from './images/panadura_mn.png';
import './header.css'; 
import { Link } from 'react-router-dom';

function Header() {
    const [activeDropdown, setActiveDropdown] = useState(null);

    const handleMouseEnter = (dropdownName) => {
        setActiveDropdown(dropdownName);
    };

    const handleMouseLeave = () => {
        setActiveDropdown(null);
    };

    return (
        <header className="header">
        <div className="green-bar">
            <nav>
                <ul className="nav">
                    <li><a href="#" className="nav-link">Home</a></li>
                    <li className="nav-item">
                        <button className="nav-buttonhead">Administration & Controlling</button>
                        <div className="button-menu">
                            <Link to ="/employee" button className="button-item">Employee Supervision</Link>
                            <Link to="/assetsHome" className="button-item">Assets Controlling</Link>
                            <button className="button-item">Permits & Licenses</button>
                        </div>
                    </li>
                    <li className="nav-item">
                        <button className="nav-buttonhead">Health</button>
                        <div className="button-menu">
                            <button className="button-item">Healthcare & Social</button>
                        </div>
                    </li>
                    <li className="nav-item">
                        <button className="nav-buttonhead">City Monitoring</button>
                        <div className="button-menu">
                            <Link to="/street" button className="button-item">Street Controlling</Link>
                            <button className="button-item">Waste Management</button>
                            <button className="button-item">Contact Us</button>
                        </div>
                    </li>
                    <li className="nav-item">
                        <button className="nav-buttonhead">Feedbacks</button>
                        <div className="button-menu">
                        <Link to ="/FeedbackForm" button className="button-item">Add Feedback</Link>
                            <Link to="/FeedbackList" className="button-item">View Feedback</Link>
                        </div>
                    </li>
                </ul>
            </nav>
            <div className="council-name-head">
                <h2>PANADURA</h2>
                <h3>MUNICIPAL COUNCIL</h3>
            </div>
        </div>
        <div className="logo-container">
            <img src={logo1} alt="Logo 1" className="logo" />
            <img src={logo2} alt="Logo 2" className="logo" />
        </div>
        <hr className="divider" />
    </header>
    );
}

export default Header;
