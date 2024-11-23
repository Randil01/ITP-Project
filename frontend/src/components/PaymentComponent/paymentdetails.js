import { useEffect, useState, useRef } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import './orderdetails.css';
import { useReactToPrint } from "react-to-print";

function PaymentDetails() {
    const navigate = useNavigate();
    const componentPDF = useRef();
    const [showdiscounts, setshowdiscounts] = useState([]);
    const [searchkey, setsearchkey] = useState('');
    const [originalData, setOriginalData] = useState([]);

    // Read
    const getfetchdata = async () => {
        try {
            const response = await axios.get("http://localhost:5001/_payment");
            if (response.data.success) {
                setshowdiscounts(response.data.data);
                setOriginalData(response.data.data);
            }
        } catch (err) {
            alert("Error fetching data: " + err.message);
        }
    };

    useEffect(() => {
        getfetchdata();
    }, []);

    // Delete
    const handledelete = async (id) => {
        try {
            const response = await axios.delete("http://localhost:5001/delete_payment/" + id);
            if (response.data.success) {
                getfetchdata();
                alert("Payment deleted Successfully!");
            }
        } catch (err) {
            alert("Error deleting payment: " + err.message);
        }
    };

    // Generate PDF
    const generatePDF = useReactToPrint({
        content: () => componentPDF.current,
        documentTitle: "Payment Details",
        onAfterPrint: () => alert("Data saved in PDF")
    });

    // Search
    const handlesearch = () => {
        if (searchkey.trim() === '') {
            setshowdiscounts(originalData);
        } else {
            const filteredData = originalData.filter(customer =>
                customer.U_name.toLowerCase().includes(searchkey.toLowerCase())
            );
            setshowdiscounts(filteredData);
        }
    };

    // Navigation
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
            <h1>Payment Details</h1>
            <div className="showorders">
                <div className='searchbtn'>
                    <input 
                        type="search" 
                        onChange={(e) => setsearchkey(e.target.value)} 
                        placeholder='User Name' 
                        className='in'
                    /> 
                    <button id='search-btn' onClick={handlesearch}>Search</button>
                </div>
                <div ref={componentPDF} style={{width:'100%'}}>
                    <table>
                        <thead>
                            <tr>
                                <th>User Name</th>
                                <th>Card Number</th>
                                <th>Card Holder</th>
                                <th>Expiry Date</th>
                                <th>CVC</th>
                                <th>Coupon Code</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {showdiscounts.map((e1) => (
                                <tr key={e1._id}>
                                    <td>{e1.U_name}</td>
                                    <td>{e1.card_number}</td>
                                    <td>{e1.card_holder}</td>
                                    <td>{e1.expir_date}</td>
                                    <td>{e1.cvc}</td>
                                    <td>{e1.coupon_code}</td>
                                    <td>
                                        <button onClick={() => handleNavigation(`/payupdate/${e1._id}`)}>Edit</button>
                                        <button onClick={() => handledelete(e1._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                                    <button 
                        style={{
                            backgroundColor: '#007bff', // Change this to your desired color
                            color: 'white',
                            border: 'none',
                            padding: '10px 20px',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontSize: '16px'
                        }} 
                        onClick={generatePDF}
                    >
                        Download Report
                    </button>

            </div>
        </div>
    );
}

export default PaymentDetails;