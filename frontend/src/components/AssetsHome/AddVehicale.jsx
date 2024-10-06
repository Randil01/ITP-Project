import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./AddVehicale.css";

function AddVehicale() {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    Vehicale_Number: "",
    Vehicale_Type: "",
    RecivedDate: "",
    LastMaintanceDate: "",
    ReserveStatues: "",
    Descrption: "",
  });

  const [errors, setErrors] = useState({
    Vehicale_Number: "",
    RecivedDate: "",
    LastMaintanceDate: "",
  });

  const validateInputs = () => {
    const currentDate = new Date().toISOString().split("T")[0];
    let validationErrors = {};

    const validNumberPattern = /^(?:[A-Z]{3}[0-9]{4}|[A-Z]{2}[0-9]{4})$/;
    if (!validNumberPattern.test(inputs.Vehicale_Number)) {
      validationErrors.Vehicale_Number = "Vehicle vehicale number again";
    } else {
      validationErrors.Vehicale_Number = "";
    }

    if (inputs.RecivedDate > currentDate) {
      validationErrors.RecivedDate = "Date cannot be in the future.";
    } else {
      validationErrors.RecivedDate = "";
    }

    if (inputs.LastMaintanceDate > currentDate) {
      validationErrors.LastMaintanceDate = "Date cannot be in the future.";
    } else {
      validationErrors.LastMaintanceDate = "";
    }

    return validationErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    const validationErrors = validateInputs();
    setErrors(validationErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateInputs();
    setErrors(validationErrors);
  
    if(Object.values(validationErrors).some((error)=>error)){
      alert("please correct erros before submiting");
      return;
    }

    await sendRequest();
    history("/vehicaleall");
  };

  const sendRequest = async () => {
    await axios.post("http://localhost:5000/vehicles/add", {
      Vehicale_Number: inputs.Vehicale_Number,
      Vehicale_Type: inputs.Vehicale_Type,
      RecivedDate: inputs.RecivedDate,
      LastMaintanceDate: inputs.LastMaintanceDate,
      ReserveStatues: inputs.ReserveStatues,
      Descrption: inputs.Descrption,
    });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
      <h2>Add Vehicale</h2>
        <div>
          <label htmlFor="Vehicale_Number">Vehicle Number:</label>
          <input
            type="text"
            placeholder="Enter vehicle number (Use Capital letters)"
            className="Vehicale_Number"
            name="Vehicale_Number"
            onChange={handleChange}
            value={inputs.Vehicale_Number}
            required
          />
          {errors.Vehicale_Number && <span className="error">{errors.Vehicale_Number}</span>}
        </div>

        <div>
          <label htmlFor="Vehicale_Type">Vehicle Type:</label>
          <input
            type="text"
            placeholder="Enter vehicle brand with type"
            className="Vehicale_Type"
            name="Vehicale_Type"
            onChange={handleChange}
            value={inputs.Vehicale_Type}
            required
          />
        </div>

        <div>
          <label htmlFor="RecivedDate">Received Date:</label>
          <input
            type="date"
            className="RecivedDate"
            name="RecivedDate"
            onChange={handleChange}
            value={inputs.RecivedDate}
            required
          />
          {errors.RecivedDate && <span className="error">{errors.RecivedDate}</span>}
        </div>

        <div>
          <label htmlFor="LastMaintanceDate">Last Maintenance Date:</label>
          <input
            type="date"
            className="LastMaintanceDate"
            name="LastMaintanceDate"
            onChange={handleChange}
            value={inputs.LastMaintanceDate}
            required
          />
          {errors.LastMaintanceDate && <span className="error">{errors.LastMaintanceDate}</span>}
        </div>

        <div>
          <label htmlFor="ReserveStatues">Reserve Status:</label>
          <select
            className="ReserveStatues"
            name="ReserveStatues"
            onChange={handleChange}
            value={inputs.ReserveStatues}
            required
          >
            <option value="">Select Status</option>
            <option value="Reserved">Reserved</option>
            <option value="Available">Available</option>
            <option value="Out of Service">Out of Service</option>
          </select>
        </div>

        <div>
          <label htmlFor="Descrption">Description:</label>
          <textarea
            className="Descrption-new"
            placeholder="Enter any other specifications of vehicle"
            name="Descrption"
            onChange={handleChange}
            value={inputs.Descrption}
            required
          ></textarea>
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
