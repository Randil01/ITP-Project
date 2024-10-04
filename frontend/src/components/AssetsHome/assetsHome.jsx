import React, { useState } from 'react';
import Header from '../header/header';
import './assetsHome.css'
import { Link } from 'react-router-dom';

function AsetsHome(){
    
    return(
        <div>
            <Header/>
            <a href="/home" className="logout">Log out</a>

            <Link to="/VehicaleAll"className="button">Vehicles and Accessories</Link>
            <Link to="/pAssetsAll"className="button">Public Properties</Link> 
        </div>
        
    );
    
}

export default AsetsHome;