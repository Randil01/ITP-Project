import React, { useEffect, useState, useRef} from 'react';
import Header from '../header/header';
import axios from "axios";
import "./VehicaleAll.css"
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {useReactToPrint} from 'react-to-print'
import logo2 from '../header/images/panadura_mn.png';

const URL = "http://localhost:5000/publicAssets/displayAssets"

const fetchHandler = async() =>{
    return await axios.get(URL).then((res) => res.data)
}

function PublicAssetsAll(){

    const [assets, setAssets] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(()=>{
        fetchHandler().then((data)=>setAssets(data))
    },[])

    //delete
    const history = useNavigate();

    const deleteHandler = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/publicAssets/deleteAssets/${id}`);
            alert("Vehicale sucessfully removed from inventory");
            // Remove the deleted vehicle from the state
            setAssets(assets.filter((Assets) => Assets._id !== id));
        } catch (error) {
            console.error("Error deleting vehicle:", error);
        }
    };

    const handleSearch = (e) =>{
        setSearchQuery(e.target.value.toLowerCase());
    }

    const filterAssets = assets.filter((assets)=>
        assets.Assets_Type.toLowerCase().includes(searchQuery) ||
        assets._id.toLowerCase().includes(searchQuery)
    )

    //report genarate
    const ComponetsRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => ComponetsRef.current,
        DocumentTitle:"Assets Lists in MCP",
        onAfterPrint:()=>alert("Assets report sucesfully downloded!!")
    })
    return(
        <div>
            <Header/>
            <Link to="/addAssets"><button className="assets-btn-add">Add New Assets </button></Link>
            <button className="assets-btn-pdf" onClick={handlePrint}>Downlod report in PDF</button>
            <h1 class="assets-head1">Public assets and Others</h1>
            <input type="text" className="assets-search" placeholder="Search assets by id or type" value={searchQuery} onChange={handleSearch}/>
            <div class="assets-display">
            {filterAssets&& filterAssets.map((Assets,i)=>(
                  <div key={i} className="assets-vehicle-item">
                  <h3>Type: {Assets.Assets_Type}</h3>
                  <p>System ID:{Assets._id}</p>
                  <p>Received Date: {new Date(Assets.RecivedDate).toLocaleDateString()}</p>
                  <p>Reserve Status: {Assets.ReserveStatues}</p>
                  <p>Reseved Till: {new Date(Assets.RecivaedTimePeriod).toLocaleDateString()}</p>
                  <p>Maintance Cost: {Assets.maintanceCost}</p>
                  <p>Description: {Assets.Description}</p>
                  <Link to={`/updateAssets/${Assets._id}`}><button className="assets-btn-update"> Update </button></Link>
                  <button className="assets-btn-delete" onClick={()=> deleteHandler(Assets._id)}>Delete</button>
              </div>
            ))}
            </div>
            <div className="printonly-assets" ref={ComponetsRef}>
                <div className="print-header-assets">
                    <img src={logo2} alt="Company logo" className="company-logo-assets" />
                    <div className="header-text-assets">
                        <h1>Panadura Municipal Council</h1>
                        <h3>Assets Report</h3>
                        <p>Generated on {new Date().toLocaleDateString()}</p>
                    </div>
                </div>
                <hr />
                <table className="vehicle-table-assets">
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Received Date</th>
                            <th>Reserve Status</th>
                            <th>Reseved Till</th>
                            <th>Maintance Cost</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filterAssets && filterAssets.map((Assets, i) => (
                            <tr key={i} className="vehicle-row">
                                <td>{Assets.Assets_Type}</td>
                                <td>{new Date(Assets.RecivedDate).toLocaleDateString()}</td>
                                <td>{Assets.ReserveStatues}</td>
                                <td>{new Date(Assets.RecivaedTimePeriod).toLocaleDateString()}</td>
                                <td>{Assets.maintanceCost}</td>
                                <td>{Assets.Description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="page-footer">
                    <hr />
                    <p>Date: {new Date().toLocaleDateString()}</p>
                    <p>Signature: ____________________</p>
                </div>
            </div>
        </div>
    );
}

export default PublicAssetsAll;