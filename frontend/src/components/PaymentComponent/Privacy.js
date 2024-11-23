import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Privacy.css';

const Privacy = () => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className="privacy-container">
            <button onClick={() => handleNavigation('/add-item')}>Add Permit & License</button>&nbsp;
            <button onClick={() => handleNavigation('/itemdetails')}>Submitted Permit & License</button>&nbsp;
            <button onClick={() => handleNavigation('/add-pay')}>Make A Payment</button>&nbsp;
            <button onClick={() => handleNavigation('/paydetails')}>Payment Details</button>&nbsp;
            <button onClick={() => handleNavigation('/Help')}>Help</button>&nbsp;

            <h2>Privacy Policy for Permits and Licenses</h2>
            <p><strong>Effective Date:</strong> [2024.12.31]</p>
            <p>At Smart City Infrastructure Management System (SCIMS), we value your privacy and are committed to protecting your personal information when you apply for permits and licenses. This policy outlines our practices regarding the collection, use, and disclosure of your information.</p>

            <h3>Information Collection</h3>
            <p>We collect personal information necessary for processing your permit and license applications, including:</p>
            <ul>
                <li><strong>Identifying Information:</strong> Name, address, contact details, identification numbers, and date of birth.</li>
                <li><strong>Application Data:</strong> Details regarding the type and purpose of the permit or license.</li>
                <li><strong>Payment Information:</strong> Credit/debit card details, billing address, and transaction history.</li>
                <li><strong>Communication Records:</strong> Any correspondence between you and our support team.</li>
            </ul>

            <h3>Use of Information</h3>
            <p>Your information is used to:</p>
            <ul>
                <li>Process and manage your permit and license applications efficiently.</li>
                <li>Communicate with you regarding the status of your applications, including approvals, denials, and renewals.</li>
                <li>Ensure compliance with local regulations and policies, conducting necessary background checks.</li>
                <li>Analyze data to improve our services and user experience.</li>
            </ul>

            <h3>Data Security</h3>
            <p>We implement robust security measures to protect your data from unauthorized access, alteration, or destruction. This includes:</p>
            <ul>
                <li>Encryption of sensitive data during transmission and storage.</li>
                <li>Regular security assessments and audits of our systems.</li>
                <li>Access controls that limit data access to authorized personnel only.</li>
            </ul>

            <h3>Healthcare Management</h3>
            <p>You have the right to:</p>
            <ul>
                <li>Access your personal information and request copies.</li>
                <li>Request corrections to inaccurate or incomplete data.</li>
                <li>Request deletion of your data when it is no longer necessary for the purposes for which it was collected.</li>
                <li>Withdraw consent for data processing where applicable.</li>
            </ul>

            <h3>Waste Management</h3>
            <p>We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy and to comply with our legal obligations.</p>

            <h3>Changes to This Policy</h3>
            <p>We may update this policy occasionally. Any changes will be communicated to you via email or through notifications on our platform. Your continued use of our services after changes indicates your acceptance of the updated policy.</p>

            <h3>Contact Us</h3>
            <p>If you have any questions about this privacy policy, please contact us at: Link[Panadura@gmail.com]</p>
        </div>
    );
}

export default Privacy;
