import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useReactToPrint } from 'react-to-print';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './itemdetails.css';
import logo from '../header/images/panadura_mn.png'
import Header from '../header/header';

function ItemDetails() {
    const componentPDF = useRef();
    const navigate = useNavigate(); // useNavigate hook for navigation

    const [showdiscounts, setshowdiscounts] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
    const [searchkey, setsearchkey] = useState('');
    const [signature, setSignature] = useState(''); // State for signature input

    const getfetchdata = async () => {
        try {
            const data = await axios.get('http://localhost:5000/item');
            if (data.data.success) {
                setshowdiscounts(data.data.data);
            }
        } catch (err) {
            alert(err);
        }
    };

    useEffect(() => {
        getfetchdata();
    }, []);

    useEffect(() => {
        setFilteredData(showdiscounts);
    }, [showdiscounts]);

    const handledelete = async (id) => {
        const data = await axios.delete('http://localhost:5000/item_delete/' + id);
        if (data.data.success) {
            getfetchdata();
            alert('Item deleted Successfully!');
        }
    };

    const generatePDF = useReactToPrint({
        content: () => componentPDF.current,
        documentTitle: 'Total Item Report',
        onBeforeGetContent: () => {
            setIsGeneratingPDF(true);
            return Promise.resolve();
        },
        onAfterPrint: () => {
            setIsGeneratingPDF(false);
            alert('Data saved in PDF');
        }
    });

    const handlesearch = () => {
        const filtered = showdiscounts.filter(item =>
            item && item.rouly_garbage && item.rouly_garbage.toLowerCase().includes(searchkey.toLowerCase())
        );
        setFilteredData(filtered);
    };

    return (
        <div>
            <Header/>
        <div className="showitems">
            <div className='searchbtn'>
                <input type="search" onChange={(e) => setsearchkey(e.target.value)} placeholder='Enter roughly weight' className='in' />
                <button id='search-btn' onClick={handlesearch}>Search</button>
            </div>

            {/* PDF Content */}
            <div ref={componentPDF} style={{ width: '100%' }}>
                {/* Header Section */}
                <header style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <img src={logo} alt="Panadura Municipal Council Logo" style={{ width: '100px', marginBottom: '10px' }} />
                    <h1>Panadura Municipal Council</h1>
                    <h2>Garbage Report</h2>
                    <p>Generated on: {new Date().toLocaleDateString()}</p>
                </header>

                {/* Table for data */}
                
                <table>
                    <thead>
                        <tr>
                            <th>Last Garbage Collected Date</th>
                            <th>Roughly Weight of Garbage</th>
                            <th>Garbage Collection Vehicle</th>
                            <th>Next Garbage Collection Date</th>
                            {!isGeneratingPDF && <th>Action</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((e1) => (
                            <tr key={e1._id}>
                                <td>{e1.Last_garbage}</td>
                                <td>{e1.rouly_garbage}</td>
                                <td>{e1.vehcile}</td>
                                <td>{e1.autoselect}</td>
                                {!isGeneratingPDF && (
                                    <td>
                                        <a href={`/itemupdate/${e1._id}`}>Edit</a>
                                        <button onClick={() => handledelete(e1._id)}>Delete</button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Footer with Date and Signature */}
                <footer className="footer-container">
                    <p className="date">Date: {new Date().toLocaleDateString()}</p>
                    <div className="signature">
                        <label htmlFor="signature-input">Signature:</label>
                        <input
                            type="text"
                            id="signature-input"
                            value={signature}
                            onChange={(e) => setSignature(e.target.value)}
                            style={{
                                marginLeft: '10px',
                                width: '300px',
                                border: 'none', // No border
                                borderBottom: '1px solid black', // Underline style
                                outline: 'none', // Remove outline
                                padding: '5px 0' // Adjust padding
                            }}
                        />
                    </div>
                </footer>
            </div>

            {/* Button to generate PDF */}
            <button onClick={generatePDF}>Order Report</button>

            {/* New Navigation Buttons */}
            <div style={{ marginTop: '20px' }}>
                <button onClick={() => navigate('/dashboard')}>Dash Board</button>
                <button onClick={() => navigate('/add-item')}>Add Details</button>
            </div>
        </div>
        </div>
    );
}

export default ItemDetails;
