import React from 'react';
import './home.css';
import Header from '../header/header';
import logo1 from '../header/images/road1.jpg'
import logo from '../header/images/council.png'

function Home() {
    return (
        <div>
            <Header/>
            <section className="urban-home-hero">
                <div className="urban-home-description">
                <img src={logo}  img style={{ width: "1150px", height: "400px" }} alt="City Infrastructure" />
                    <h1>Welcome to Smart City Infrastructure Management Potral</h1>
                    <p>Your gateway to managing the urban landscape. The system ensures efficient handling of public assets, street maintenance, vehicle management, and much more.</p>
                    <p>Exclusively accessible to employees of the Urban Council to drive innovation and ensure a sustainable, modern city infrastructure.</p>
                </div>
            </section>

            <section className="urban-home-map">
                <h2>City Overview</h2>
                <img src={logo1} alt="City Map" img style={{ width: "300px", height: "400px" }}/>
            </section>

            <footer className="urban-home-footer">
                <p>&copy; 2024 Smart City Infrastructure. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Home;
