import React, { useState } from 'react';
import logo1 from '../images/Gov_sl.png';
import logo2 from '../images/panadura_mn.png';
import './header.css'; 

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
                        <li>
                            <a href="#" className="nav-link">Home</a>
                        </li>
                        <li 
                            className="dropdown-container"
                            onMouseEnter={() => handleMouseEnter('admin')}
                            onMouseLeave={handleMouseLeave}
                        >
                            <a href="#" className="nav-link">Administration & Controlling</a>
                            {activeDropdown === 'admin' && (
                                <ul className="dropdown">
                                    <li className="dropdown-item"><a href="#" className="dropdown-link">Employee Supervision</a></li>
                                    <li className="dropdown-item"><a href="#" className="dropdown-link">Assets Controlling</a></li>
                                    <li className="dropdown-item"><a href="#" className="dropdown-link">Permits & Licenses</a></li>
                                </ul>
                            )}
                        </li>
                        <li 
                            className="dropdown-container"
                            onMouseEnter={() => handleMouseEnter('health')}
                            onMouseLeave={handleMouseLeave}
                        >
                            <a href="#" className="nav-link">Health</a>
                            {activeDropdown === 'health' && (
                                <ul className="dropdown">
                                    <li className="dropdown-item"><a href="#" className="dropdown-link">Healthcare & Social</a></li>
                                </ul>
                            )}
                        </li>
                        <li 
                            className="dropdown-container"
                            onMouseEnter={() => handleMouseEnter('city')}
                            onMouseLeave={handleMouseLeave}
                        >
                            <a href="#" className="nav-link">City Monitoring</a>
                            {activeDropdown === 'city' && (
                                <ul className="dropdown">
                                    <li className="dropdown-item"><a href="#" className="dropdown-link">Street Controlling</a></li>
                                    <li className="dropdown-item"><a href="#" className="dropdown-link">Waste Management</a></li>
                                    <li className="dropdown-item"><a href="#" className="dropdown-link">Contact Us</a></li>
                                </ul>
                            )}
                        </li>
                        <li>
                            <a href="#" className="nav-link">Feedbacks</a>
                        </li>
                    </ul>
                </nav>
                <div className="council-name">
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
