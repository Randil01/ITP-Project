import React, { useEffect, useState, useRef} from 'react';
import Header from '../header';
import axios from "axios";
import "./VehicaleAll.css"
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {useReactToPrint} from 'react-to-print'

const URL = "http://localhost:8070/publicAssets/displayAssets"

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
            await axios.delete(`http://localhost:8070/publicAssets/deleteAssets/${id}`);
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
            <Link to="/addAssets"><button className="btn-add">Add New Assets </button></Link>
            <button className="btn-pdf" onClick={handlePrint}>Downlod report in PDF</button>
            <h1 class="head1">Public assets and Others</h1>
            <input type="text" className="search" placeholder="Search assets by id or type" value={searchQuery} onChange={handleSearch}/>
            <div class="display" ref={ComponetsRef}>
            {filterAssets&& filterAssets.map((Assets,i)=>(
                  <div key={i} className="vehicle-item">
                  <h3>Type: {Assets.Assets_Type}</h3>
                  <p>System ID:{Assets._id}</p>
                  <p>Received Date: {new Date(Assets.RecivedDate).toLocaleDateString()}</p>
                  <p>Reserve Status: {Assets.ReserveStatues}</p>
                  <p>Reseved Till: {new Date(Assets.RecivaedTimePeriod).toLocaleDateString()}</p>
                  <p>Maintance Cost: {Assets.maintanceCost}</p>
                  <p>Description: {Assets.Description}</p>
                  <Link to={`/updateAssets/${Assets._id}`}><button className="btn-update"> Update </button></Link>
                  <button className="btn-delete" onClick={()=> deleteHandler(Assets._id)}>Delete</button>
              </div>
            ))}
            </div>
        </div>
    );
}

export default PublicAssetsAll;