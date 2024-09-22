import React, { useEffect, useState, useRef} from 'react';
import Header from '../header';
import axios from "axios";
import "./VehicaleAll.css"
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {useReactToPrint} from 'react-to-print'

const URL = "http://localhost:8070/vehicles/displayVehi"

const fetchHandler = async() =>{
    return await axios.get(URL).then((res) => res.data)
}

function Vehicale(){

    const [vehicales, setVehicales] = useState([]);
    //search
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(()=>{
        fetchHandler().then((data)=>setVehicales(data))
    },[])

    //delete
    const history = useNavigate();

    const deleteHandler = async (id) => {
        try {
            await axios.delete(`http://localhost:8070/vehicles/deleteVehi/${id}`);
            alert("Vehicale sucessfully removed from inventory");
            // Remove the deleted vehicle from the state
            setVehicales(vehicales.filter((vehicale) => vehicale._id !== id));
        } catch (error) {
            console.error("Error deleting vehicle:", error);
        }
    };

    //handle serch
    const handleSearch = (e) =>{
        setSearchQuery(e.target.value.toLowerCase());
    }

    const filterVehicales = vehicales.filter((vehicale)=>
        vehicale.Vehicale_Type.toLowerCase().includes(searchQuery) ||
        vehicale._id.toLowerCase().includes(searchQuery)
    )


    //report genarate
    const ComponetsRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => ComponetsRef.current,
        DocumentTitle:"Vehicale Lists in MCP",
        onAfterPrint:()=>alert("Vehicale report sucesfully downloded!!")
    })
    return(
        <div>
            <Header/>
            <Link to="/AddVehicale"><button className="btn-add"> Add New Vehicale </button></Link>
            <button className="btn-pdf" onClick={handlePrint}>Downlod report in PDF</button>
            <h1 class="head1">Vehicles and Accessories</h1>
            <input type="text" className="search" placeholder="Search vehicale by id or type" value={searchQuery} onChange={handleSearch}/>
            <div class="display" ref={ComponetsRef}>
            {filterVehicales && filterVehicales .map((vehicale,i)=>(
                  <div key={i} className="vehicle-item">
                  <h3>Type: {vehicale.Vehicale_Type}</h3>
                  <p>Vehicale Number:{vehicale.Vehicale_Number}</p>
                  <p>System ID:{vehicale._id}</p>
                  <p>Received Date: {new Date(vehicale.RecivedDate).toLocaleDateString()}</p>
                  <p>Last Maintenance Date: {new Date(vehicale.LastMaintanceDate).toLocaleDateString()}</p>
                  <p>Reserve Status: {vehicale.ReserveStatues}</p>
                  <p>Description: {vehicale.Descrption}</p>
                  <Link to={`/VehicaleUpdate/${vehicale._id}`}><button className="btn-update"> Update </button></Link>
                  <button className="btn-delete" onClick={()=> deleteHandler(vehicale._id)}>Delete</button>
              </div>
            ))}
            </div>
        </div>
    );
}

export default Vehicale;