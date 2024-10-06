import React, { useEffect, useState, useRef } from 'react';
import Header from '../header/header';
import axios from "axios";
import "./VehicaleAll.css";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import logo2 from '../header/images/panadura_mn.png';

const URL = "http://localhost:5000/vehicles/displayVehi";

const fetchHandler = async () => {
    return await axios.get(URL).then((res) => res.data);
};

function Vehicale() {
    const [vehicales, setVehicales] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchHandler().then((data) => setVehicales(data));
    }, []);

    const history = useNavigate();

    const deleteHandler = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/vehicles/deleteVehi/${id}`);
            alert("Vehicle successfully removed from inventory");
            setVehicales(vehicales.filter((vehicale) => vehicale._id !== id));
        } catch (error) {
            console.error("Error deleting vehicle:", error);
        }
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
    };

    const filterVehicales = vehicales.filter((vehicale) =>
        vehicale.Vehicale_Type.toLowerCase().includes(searchQuery) ||
        vehicale._id.toLowerCase().includes(searchQuery)
    );

    const ComponetsRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => ComponetsRef.current,
        documentTitle: "Vehicle Lists in MCP",
        onAfterPrint: () => alert("Vehicle report successfully downloaded!")
    });

    return (
        <div>
            <Header />
            <Link to="/AddVehicale"><button className="assets-btn-add"> Add New Vehicle </button></Link>
            <button className="assets-btn-pdf" onClick={handlePrint}>Download report in PDF</button>
            <h1 className="assets-head1">Vehicles and Accessories</h1>
            <input type="text" className="assets-search" placeholder="Search vehicle by id or type" value={searchQuery} onChange={handleSearch} />
            <div className="assets-display">
                {filterVehicales && filterVehicales.map((vehicale, i) => (
                    <div key={i} className="assets-vehicle-item">
                        <h3>Type: {vehicale.Vehicale_Type}</h3>
                        <p>Vehicle Number: {vehicale.Vehicale_Number}</p>
                        <p>System ID: {vehicale._id}</p>
                        <p>Received Date: {new Date(vehicale.RecivedDate).toLocaleDateString()}</p>
                        <p>Last Maintenance Date: {new Date(vehicale.LastMaintanceDate).toLocaleDateString()}</p>
                        <p>Reserve Status: {vehicale.ReserveStatues}</p>
                        <p>Description: {vehicale.Descrption}</p>
                        <Link to={`/VehicaleUpdate/${vehicale._id}`}><button className="assets-btn-update"> Update </button></Link>
                        <button className="assets-btn-delete" onClick={() => deleteHandler(vehicale._id)}>Delete</button>
                    </div>
                ))}
            </div>
            <div className="printonly-assets" ref={ComponetsRef}>
                <div className="print-header-assets">
                    <img src={logo2} alt="Company logo" className="company-logo-assets" />
                    <div className="header-text-assets">
                        <h1>Panadura Municipal Council</h1>
                        <h3>Vehicle Report</h3>
                        <p>Generated on {new Date().toLocaleDateString()}</p>
                    </div>
                </div>
                <hr />
                <table className="vehicle-table-assets">
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Vehicle Number</th>
                            <th>Received Date</th>
                            <th>Last Maintenance Date</th>
                            <th>Reserve Status</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filterVehicales && filterVehicales.map((vehicale, i) => (
                            <tr key={i} className="vehicle-row">
                                <td>{vehicale.Vehicale_Type}</td>
                                <td>{vehicale.Vehicale_Number}</td>
                                <td>{new Date(vehicale.RecivedDate).toLocaleDateString()}</td>
                                <td>{new Date(vehicale.LastMaintanceDate).toLocaleDateString()}</td>
                                <td>{vehicale.ReserveStatues}</td>
                                <td>{vehicale.Descrption}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="page-footer">
                    <p>Date: {new Date().toLocaleDateString()}</p>
                    <p>Signature: ____________________</p>
                </div>
            </div>
        </div>
    );
}

export default Vehicale;
