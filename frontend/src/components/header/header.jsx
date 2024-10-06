import React, { useState } from "react";
import logo1 from "./images/Gov_sl.png";
import logo2 from "./images/panadura_mn.png";
import "./header.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserShield } from "@fortawesome/free-solid-svg-icons";

function Header() {
  return (
    <header className="hdr-wrapper-uniqueee">
      <div className="bar-green-uniqueee-header">
        <nav>
          <ul className="nav-uniqueee">
            <li>
              <Link to="/"className="nav-link-uniqueee">
                Home
              </Link>
            </li>
            <li className="nav-item-uniqueee">
              <button className="nav-buttonhead-uniqueee">
                Administration & Controlling
              </button>
              <div className="button-menu-uniqueee">
                <Link to="/login" className="button-item-uniqueee">
                  Employee Supervision
                </Link>
                <Link to="/login" className="button-item-uniqueee">
                  Assets Controlling
                </Link>
                <button className="button-item-uniqueee">
                  Permits & Licenses
                </button>
              </div>
            </li>
            <li className="nav-item-uniqueee">
              <button className="nav-buttonhead-uniqueee">Health</button>
              <div className="button-menu-uniqueee">
                <button className="button-item-uniqueee">
                  Healthcare & Social
                </button>
              </div>
            </li>
            <li className="nav-item-uniqueee">
              <button className="nav-buttonhead-uniqueee">
                City Monitoring
              </button>
              <div className="button-menu-uniqueee">
                <Link to="/login" className="button-item-uniqueee">
                  Street Controlling
                </Link>
                <Link to="/login" className="button-item-uniqueee">
                  Waste Management
                </Link>
              </div>
            </li>
            <li className="nav-item-uniqueee">
              <button className="nav-buttonhead-uniqueee">Feedbacks</button>
              <div className="button-menu-uniqueee">
                <Link to="/FeedbackForm" className="button-item-uniqueee">
                  Add Feedback
                </Link>
                <Link to="/FeedbackList" className="button-item-uniqueee">
                  View Feedback
                </Link>
              </div>
            </li>
            {/* New Admin Section */}
            <li className="nav-item-uniqueee">
              <Link to="/AdminLogin" className="nav-link-uniqueee">
                <FontAwesomeIcon icon={faUserShield} size="lg" /> Admin
              </Link>
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
