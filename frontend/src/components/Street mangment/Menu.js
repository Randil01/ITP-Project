import React , {useState} from "react";
import './menu.css';
import { useNavigate } from "react-router-dom";
import road from '../header/images/road1.jpg'
import Header from '../header/header'


function Menu(){

    const navigate = useNavigate();
    const [selectedArea, setSelectedArea] = useState('');
    return(
        <div>
          <Header/>
             {/* Main Content */}
      <main>
        <div className="content-container">
          <div className="map-area-selection">
            <h4>Map Area:</h4>
            <img style={{ width: "400px", height: "500px" }}  src={road} alt="" className="header-image" />
          </div>

          {/* Buttons Section */}
          
        </div>
      </main>
      <div className="button-container">
            <button onClick={() => navigate("/add")} className="btn"><i style={{fontSize:"23px"}} class="fa fa-long-arrow-right" aria-hidden="true"></i>&emsp; Report An Issue</button>
            <button onClick={() => navigate("/issues")} className="btn"><i style={{fontSize:"23px"}} class="fa fa-long-arrow-right" aria-hidden="true"></i>&emsp; View Schedule</button>
            <button onClick={() => navigate("/notification")} className="btn"><i style={{fontSize:"23px"}} class="fa fa-long-arrow-right" aria-hidden="true"></i>&emsp; Notifications</button>
          </div>
          <br /><br /><br />
        </div>
    )

}
export default Menu;