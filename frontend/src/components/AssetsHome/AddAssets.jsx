import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddVehicale.css";
import { Link } from "react-router-dom";

function AddAsset() {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    Assets_Type: "",
    RecivedDate: "",
    ReserveStatues: "",
    RecivaedTimePeriod: "",
    maintanceCost: "",
    Description: "",
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

    // Validate the date fields
    if (name === "RecivedDate" && value > currentDate) {
      setErrors((prevState) => ({
        ...prevState,
        RecivedDate: "Received Date cannot be in the future.",
      }));
    } else if (name === "RecivaedTimePeriod" && value <= currentDate) {
      setErrors((prevState) => ({
        ...prevState,
        RecivaedTimePeriod: "Reserve till Date must be in the future.",
      }));
    } else {
      setErrors((prevState) => ({
        ...prevState,
        [name]: "", // Clear error if the condition is satisfied
      }));
    }

    //cost validating
    if (name === "maintanceCost") {
      const regex = /^\d+(LKR|lkr)$/; // Regex to match integers followed by LKR or lkr
      if (!regex.test(value)) {
        setErrors((prevState) => ({
          ...prevState,
          maintanceCost:
            "Maintenance cost must be an integer followed by LKR or lkr.",
        }));
      } else {
        setErrors((prevState) => ({
          ...prevState,
          maintanceCost: "",
        }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const currentDate = new Date().toISOString().split("T")[0]; // Get the current date

    if (inputs.RecivedDate > currentDate) {
      alert("Received Date cannot be in the future.");
      return;
    }

    if (inputs.RecivaedTimePeriod <= currentDate) {
      alert("Reserve till Date must be a future date.");
      return;
    }

    // Validate maintanceCost to ensure it ends with LKR or lkr
    const maintanceCostRegex = /^\d+(LKR|lkr)$/;
    if (!maintanceCostRegex.test(inputs.maintanceCost)) {
      alert("Maintenance cost must be an integer followed by LKR or lkr.");
      return;
    }

    // If no errors, proceed to submit the form
    sendRequest().then(() => history("/pAssetsAll"));
  };

  const sendRequest = async () => {
    await axios
      .post("http://localhost:5000/publicAssets/addAssets", {
        Assets_Type: inputs.Assets_Type,
        RecivedDate: inputs.RecivedDate,
        ReserveStatues: inputs.ReserveStatues,
        RecivaedTimePeriod: inputs.RecivaedTimePeriod,
        maintanceCost: inputs.maintanceCost,
        Description: inputs.Description,
      })
      .then((res) => res.data);
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <h2>Add Assets</h2>
        <div>
          <label htmlFor="Assets_Type">Assets Type:</label>
          <input type="text" placeholder="Enter Asset number with location" className="Vehicale_Type" name="Assets_Type" onChange={handleChange} value={inputs.Assets_Type} required/>
        </div>

        <div>
          <label htmlFor="RecivedDate">Received Date:</label>
          <input type="date" className="RecivedDate" name="RecivedDate" onChange={handleChange} value={inputs.RecivedDate} required/>
        </div>

        <div>
          <label htmlFor="ReserveStatues">Reserve Status:</label>
          <select className="ReserveStatues" name="ReserveStatues" onChange={handleChange} value={inputs.ReserveStatues} required>
            <option value="">Select Status</option>
            <option value="Reserved">Reserved for MCP</option>
            <option value="Available">Reserved for public</option>
            <option value="Out of Service">Out for Maintance</option>
          </select>
        </div>

        <div>
          <label htmlFor="RecivaedTimePeriod">Reserve till Date:</label>
          <input type="date" className="LastMaintanceDate" name="RecivaedTimePeriod" onChange={handleChange} value={inputs.RecivaedTimePeriod} required/>
        </div>

        <div>
          <label htmlFor="maintanceCost">Maintance Cost:</label>
          <input type="text" placeholder=".LKR" className="Vehicale_Type" name="maintanceCost" onChange={handleChange} value={inputs.maintanceCost} required/>
        </div>

        <div>
          <label htmlFor="Descrption">Description:</label>
          <textarea className="Descrption" placeholder="Enter any other specifiaction of the assets" name="Description"  onChange={handleChange} value={inputs.Description} required></textarea>
        </div>
        <div className="button-container">
          <button type="submit">Submit</button>

          <Link to="/pAssetsAll">
            <button type="button" className="back">
              ✖ Close
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default AddAsset;
