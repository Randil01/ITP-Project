import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import './AddVehicale.css'

function UpdateVehicale() {
    const [inputs, setInputs] = useState({
        Vehicale_Number: '',
        Vehicale_Type: '',
        RecivedDate: '',
        LastMaintanceDate: '',
        ReserveStatues: '',
        Descrption: ''
    });
    const [errors, setErrors] = useState({});
    const history = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchHandler = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/vehicles/displayVehione/${id}`);
                setInputs(response.data);
                const date = response.data;

                const formattedRecivedDate = new Date(date.RecivedDate).toISOString().split("T")[0];
                const formattedLastMaintanceDate = new Date(date.LastMaintanceDate).toISOString().split("T")[0];

                setInputs({
                    ...date,
                    RecivedDate: formattedRecivedDate,
                    LastMaintanceDate: formattedLastMaintanceDate
                });
            } catch (error) {
                console.error("Error fetching vehicle data:", error);
            }
        };
        fetchHandler();
    }, [id]);

    const validateInputs = () => {
        const currentDate = new Date().toISOString().split("T")[0];
        let validationErrors = {};

        const validNumberPattern = /^(?:[A-Z]{3}[0-9]{4}|[A-Z]{2}[0-9]{4})$/;
        if (!validNumberPattern.test(inputs.Vehicale_Number)) {
            validationErrors.Vehicale_Number = "Vehicle number must be in the format of 3 letters and 4 digits or 2 letters and 4 digits.";
        }

        if (inputs.RecivedDate > currentDate) {
            validationErrors.RecivedDate = "Received date cannot be in the future.";
        }

        if (inputs.LastMaintanceDate > currentDate) {
            validationErrors.LastMaintanceDate = "Last maintenance date cannot be in the future.";
        }

        return validationErrors;
    };

    const sendRequest = async () => {
        await axios.put(`http://localhost:5000/vehicles/updateVehi/${id}`, inputs);
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

        if (Object.keys(validationErrors).length > 0) {
            alert("Please correct errors before submitting.");
            return;
        }

        // If no errors, proceed to submit the form
        await sendRequest();
        history("/vehicaleall");
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
            <h2>Update Vehicale Details</h2>
                <div>
                    <label htmlFor="Vehicale_Number">Vehicle Number:</label>
                    <input
                        type="text"
                        placeholder="Enter vehicle number"
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
                        placeholder="Enter vehicle type along with brand"
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

export default UpdateVehicale;
