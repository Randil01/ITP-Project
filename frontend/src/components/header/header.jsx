import React, { useState } from 'react';
import logo1 from './images/Gov_sl.png';
import logo2 from './images/panadura_mn.png';
import './header.css'; 
import { Link } from 'react-router-dom';

function Header() {
    
    return (
        <header className="hdr-wrapper-uniqueee">
        <div className="bar-green-uniqueee">
            <nav>
                <ul className="nav-uniqueee">
                    <li><a href="#" className="nav-link-uniqueee">Home</a></li>
                    <li className="nav-item-uniqueee">
                        <button className="nav-buttonhead-uniqueee">Administration & Controlling</button>
                        <div className="button-menu-uniqueee">
                            <Link to ="/employee" className="button-item-uniqueee">Employee Supervision</Link>
                            <Link to="/assetsHome" className="button-item-uniqueee">Assets Controlling</Link>
                            <button className="button-item-uniqueee">Permits & Licenses</button>
                        </div>
                    </li>
                    <li className="nav-item-uniqueee">
                        <button className="nav-buttonhead-uniqueee">Health</button>
                        <div className="button-menu-uniqueee">
                            <button className="button-item-uniqueee">Healthcare & Social</button>
                        </div>
                    </li>
                    <li className="nav-item-uniqueee">
                        <button className="nav-buttonhead-uniqueee">City Monitoring</button>
                        <div className="button-menu-uniqueee">
                            <Link to ="/street" className="button-item-uniqueee">Street Controlling</Link>
                            <Link to ="/itemdetails" className="button-item-uniqueee">Waste Management</Link>
                            <button className="button-item-uniqueee">Contact Us</button>
                        </div>
                    </li>
                    <li className="nav-item-uniqueee">
                        <button className="nav-buttonhead-uniqueee">Feedbacks</button>
                        <div className="button-menu-uniqueee">
                        <Link to ="/FeedbackForm" className="button-item-uniqueee">Add Feedback</Link>
                        <Link to="/FeedbackList" className="button-item-uniqueee">View Feedback</Link>
                        </div>
                    </li>
                </ul>
            </nav>
            <div className="council-head-uniqueee">
                <h2>PANADURA</h2>
                <h3>MUNICIPAL COUNCIL</h3>
            </div>
        </div>
        <div className="logo-container-uniqueee">
            <img src={logo1} alt="Logo 1" className="logo-uniqueee" />
            <img src={logo2} alt="Logo 2" className="logo-uniqueee" />
        </div>
        <hr className="divider-uniqueee" />
    </header>
    );
}

export default Header;
