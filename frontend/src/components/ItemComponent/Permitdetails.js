import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './itemdetails.css';
import { useReactToPrint } from 'react-to-print';

function PermitDetails() {
    const navigate = useNavigate();
    const componentPDF = useRef();
    const [showdiscounts, setshowdiscounts] = useState([]);
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
    const [searchkey, setsearchkey] = useState('');
    const [originalData, setOriginalData] = useState([]);

    const getfetchdata = async () => {
        try {
            const response = await axios.get('http://localhost:5001/item');
            if (response.data.success) {
                setshowdiscounts(response.data.data);
                setOriginalData(response.data.data);
            }
        } catch (err) {
            alert(err.message);
        }
    };

    useEffect(() => {
        getfetchdata();
    }, []);

    const handledelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5001/item_delete/${id}`);
            if (response.data.success) {
                getfetchdata();
                alert('Deleted Successfully!');
            }
        } catch (err) {
            alert(err.message);
        }
    };

    const generatePDF = useReactToPrint({
        content: () => componentPDF.current,
        documentTitle: 'Permit Report',
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
        if (searchkey.trim() === '') {
            setshowdiscounts(originalData);
        } else {
            const filteredData = originalData.filter(item =>
                item && item.permit_type && item.permit_type.toLowerCase().includes(searchkey.toLowerCase())
            );
            setshowdiscounts(filteredData);
        }
    };

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

            <h1 style={{ margin: 0 }}>Total Details</h1>
            <div className="showitems">
                <div className='searchbtn'>
                    <input 
                        type="search" 
                        onChange={(e) => setsearchkey(e.target.value)} 
                        placeholder='Permit Type' 
                        className='in'
                    /> 
                    <button id='search-btn' onClick={handlesearch}>Search</button>
                </div>
                <div ref={componentPDF} style={{ width: '100%' }}>
                    <table>
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Address</th>
                                <th>Your need permit Type</th>
                                <th>Your needs license Type</th>
                                <th>Permit Plan</th>
                                {!isGeneratingPDF && <th>Action</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {showdiscounts.map((e1) => (
                                <tr key={e1._id}>
                                    <td>rannidu</td>
                                    <td>games</td>
                                    <td>games</td>
                                    <td>{e1.permit_type}</td>
                                    <td>{e1.license_type}</td>
                                    <td>{e1.permit_plane}</td>
                                    {!isGeneratingPDF && (
                                        <td>
                                            <Link to={`/itemupdate/${e1._id}`}>
                                                <button style={{
                                                    backgroundColor: 'red',
                                                    color: 'white',
                                                    border: 'none',
                                                    padding: '5px 10px',
                                                    borderRadius: '5px',
                                                    cursor: 'pointer',
                                                    fontSize: '14px',
                                                    marginRight: '5px'
                                                }}>Edit</button>
                                            </Link>
                                            <button onClick={() => handledelete(e1._id)} style={{
                                                backgroundColor: 'red',
                                                color: 'white',
                                                border: 'none',
                                                padding: '5px 10px',
                                                borderRadius: '5px',
                                                cursor: 'pointer',
                                                fontSize: '14px'
                                            }}>Delete</button>
                                        </td>
                                    )}
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

export default PermitDetails;
