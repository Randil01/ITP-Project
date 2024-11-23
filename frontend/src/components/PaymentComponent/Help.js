import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Help.css';

const Help = () => {
    const navigate = useNavigate(); // Import and use useNavigate

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div>
            <button onClick={() => handleNavigation('/add-item')}>Add Permit & License</button>&nbsp;
            <button onClick={() => handleNavigation('/itemdetails')}>Submitted Permit & License</button>&nbsp;
            <button onClick={() => handleNavigation('/add-pay')}>Make A Payment</button>&nbsp;
            <button onClick={() => handleNavigation('/paydetails')}>Payment Details</button>&nbsp;
            <button onClick={() => handleNavigation('/help')}>Help</button>&nbsp;

            <div className="help-container">
                <h2>Help & Support</h2>
                <div className="faq-section">
                    <h3>Frequently Asked Questions</h3>
                    <div className="faq-item">
                        <h4>1. How do I update my payment details?</h4>
                        <p>You can update your payment details by navigating to the "Payment" section and selecting "Update Payment." Follow the prompts to edit your information.</p>
                    </div>
                    <div className="faq-item">
                        <h4>2. What should I do if my payment fails?</h4>
                        <p>If your payment fails, check your card details for accuracy or try a different payment method. If issues persist, contact support.</p>
                    </div>
                    <div className="faq-item">
                        <h4>3. How can I contact customer support?</h4>
                        <p>You can contact customer support via the "Contact Us" page or email support@example.com for assistance.</p>
                    </div>
                </div>
                <div className="navigation">
                    <Link to='/add-pay'>Back to Payment</Link>
                    <Link to='/add-item'>Home</Link>
                </div>
            </div>
        </div>
    );
}

export default Help;
