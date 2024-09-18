import React, { useEffect, useState } from 'react';
import Header from '../header';
import axios from "axios";
import "./VehicaleAll.css"

const URL = "http://localhost:8070/vehicles/displayVehi"

const fetchHandler = async() =>{
    return await axios.get(URL).then((res) => res.data)
}

function Vehicale(){

    const [vehicales, setVehicales] = useState();
    useEffect(()=>{
        fetchHandler().then((data)=>setVehicales(data))
    },[])

    return(
        <div>
            <Header/>
            <h1 class="head1">Vehicles and Accessories</h1>
            <div class="display">
            {vehicales&& vehicales.map((vehicale,i)=>(
                  <div key={i} className="vehicle-item">
                  <h3>Type: {vehicale.Vehicale_Type}</h3>
                  <p>Received Date: {new Date(vehicale.RecivedDate).toLocaleDateString()}</p>
                  <p>Last Maintenance Date: {new Date(vehicale.LastMaintanceDate).toLocaleDateString()}</p>
                  <p>Reserve Status: {vehicale.ReserveStatues}</p>
                  <p>Description: {vehicale.Descrption}</p>
                  <button /*onClick={() => handleUpdate(vehicale._id)}*/ className="btn-update"> Update </button>
                <button /*onClick={() => handleDelete(vehicale._id)}*/ className="btn-delete">Delete</button>
              </div>
            ))}
            </div>
        </div>
    );
}

export default Vehicale;