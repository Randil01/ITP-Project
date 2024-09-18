import React, { useState } from 'react';
import Header from '../header';
import './assetsHome.css'
import { Link } from 'react-router-dom';

function AsetsHome(){
    
    return(
        <div>
            <Header/>
            <a href="/home" className="logout">Log out</a>

            <Link to="/VehicaleAll"className="button">Vehicles and Accessories</Link>
            <a href="/page2" className="button">Public Properties </a>
            <a href="/page3" className="button">Add a finacial record</a>
        </div>
        
    );
    
}

export default AsetsHome;