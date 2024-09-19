import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddVehicale.css"
import { Link } from "react-router-dom";

function AddVehicale() {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    Vehicale_Type: "",
    RecivedDate: "",
    LastMaintanceDate: "",
    ReserveStatues: "",
    Descrption: "",
  });

  const [errors, setErrors] = useState({
    RecivedDate: "",
    LastMaintanceDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Current date in YYYY-MM-DD format
    const currentDate = new Date().toISOString().split("T")[0];

    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Validate the date fields to ensure they are not future dates
    if (
      (name === "RecivedDate" || name === "LastMaintanceDate") &&
      value > currentDate
    ) {
      setErrors((prevState) => ({
        ...prevState,
        [name]: "Date cannot be in the future.",
      }));
    } else {
      setErrors((prevState) => ({
        ...prevState,
        [name]: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Check for any errors before allowing submission
    if (errors.RecivedDate || errors.LastMaintanceDate) {
      alert("Please correct the dates before submitting.");
      return;
    }
  
    // Check if any of the date fields are still in the future
    const currentDate = new Date().toISOString().split("T")[0];
    if (inputs.RecivedDate > currentDate || inputs.LastMaintanceDate > currentDate) {
      alert("Dates cannot be in the future. Please correct the dates.");
      return;
    }
  
    // If no errors, proceed to submit the form
    sendRequest().then(() => history("/vehicaleall"));
  };
  

  const sendRequest = async () => {
    await axios.post("http://localhost:8070/vehicles/add", {
        Vehicale_Type: inputs.Vehicale_Type,
        RecivedDate: inputs.RecivedDate,
        LastMaintanceDate: inputs.LastMaintanceDate,
        ReserveStatues: inputs.ReserveStatues,
        Descrption: inputs.Descrption,
      }).then((res) => res.data);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="Vehicale_Type">Vehicle Type:</label>
          <input type="text" placeholder="Enter vehicale number along with brand"className="Vehicale_Type" name="Vehicale_Type" onChange={handleChange} value={inputs.Vehicale_Type} required/>
        </div>

        <div>
          <label htmlFor="RecivedDate">Received Date:</label>
          <input type="date" className="RecivedDate" name="RecivedDate" onChange={handleChange} value={inputs.RecivedDate} required/>
        </div>

        <div>
          <label htmlFor="LastMaintanceDate">Last Maintenance Date:</label>
          <input type="date" className="LastMaintanceDate" name="LastMaintanceDate" onChange={handleChange} value={inputs.LastMaintanceDate} required/>
        </div>

        <div>
          <label htmlFor="ReserveStatues">Reserve Status:</label>
          <select className="ReserveStatues" name="ReserveStatues" onChange={handleChange} value={inputs.ReserveStatues} required>
            <option value="">Select Status</option>
            <option value="Reserved">Reserved</option>
            <option value="Available">Available</option>
            <option value="Out of Service">Out of Service</option>
          </select>
        </div>

        <div>
          <label htmlFor="Descrption">Description:</label>
          <textarea className="Descrption" placeholder="Enter any other specifiaction of vehicale"name="Descrption" onChange={handleChange} value={inputs.Descrption} required></textarea>
        </div>
        <div className="button-container">
        <button type="submit">Submit</button>
        <Link to="/VehicaleAll">
          <button type="button" className="back">✖ Close</button>
        </Link>
        </div>
      </form>
    </div>
  );
}

export default AddVehicale;
