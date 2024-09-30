import { useState } from "react";
import axios from "axios";
import './additem.css';
import { useNavigate } from 'react-router-dom';

function Product() {
    const navigate = useNavigate();
    const [order, setOrder] = useState({
        Last_garbage: "",
        rouly_garbage: "",
        vehicle: "", // Corrected from vehcile to vehicle
        autoselect: "",
    });

    const [errors, setErrors] = useState({});

    const handleOnChange = (e) => {
        const { value, name } = e.target;

        // Numeric validation for rouly_garbage
        if (name === "rouly_garbage" && value && isNaN(value)) {
            setErrors((prev) => ({
                ...prev,
                rouly_garbage: "Roughly garbage weight must be a number.",
            }));
        } else {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
            setOrder((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const validate = () => {
        const newErrors = {};
        
        if (!order.Last_garbage) newErrors.Last_garbage = "Last garbage collected date is required.";
        if (!order.rouly_garbage) {
            newErrors.rouly_garbage = "Roughly garbage weight is required.";
        } else if (isNaN(order.rouly_garbage)) {
            newErrors.rouly_garbage = "Roughly garbage weight must be a number.";
        }
        if (!order.vehicle) newErrors.vehicle = "Garbage collection vehicle is required."; // Updated
        if (!order.autoselect) newErrors.autoselect = "Automatic garbage collection date is required.";
        
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/item_create", order);
            if (response.data.success) { // Check for success response
                alert("Item added successfully!");
                navigate("/itemdetails");
                setOrder({
                    Last_garbage: "",
                    rouly_garbage: "",
                    vehicle: "", // Reset to empty
                    autoselect: "",
                });
                setErrors({});
            } else {
                alert("Failed to add item. Please try again.");
            }
        } catch (error) {
            console.error("There was an error adding the item:", error);
            alert("There was an error adding the item. Please try again.");
        }
    };

    // Function to get today's date in the required format
    const getTodayDate = () => {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0
        const yyyy = today.getFullYear();
        return `${yyyy}-${mm}-${dd}`; // Format: YYYY-MM-DD
    };

    return (
        <div className="add-product">
            <h2>Add Details</h2>
            <form onSubmit={handleSubmit}>
                <label>Select the last garbage collected date:</label>
                <input
                    type="date"
                    id="Last_garbage"
                    name="Last_garbage"
                    value={order.Last_garbage}
                    onChange={handleOnChange}
                    max={getTodayDate()} // Set maximum date to today (only allow past dates)
                />
                {errors.Last_garbage && <span className="error">{errors.Last_garbage}</span>}
                <br />
                <br />

                <label>Enter the roughly weight of garbage in (kg):</label>
                <input
                    type="text"
                    id="rouly_garbage"
                    name="rouly_garbage"
                    value={order.rouly_garbage}
                    onChange={handleOnChange}
                />
                {errors.rouly_garbage && <span className="error">{errors.rouly_garbage}</span>}
                <br />

                <label>Enter the next garbage collection date:</label>
                <input
                    type="date"
                    id="autoselect"
                    name="autoselect"
                    value={order.autoselect}
                    onChange={handleOnChange}
                    min={getTodayDate()} // Set minimum date to today (optional, adjust as needed)
                />
                {errors.autoselect && <span className="error">{errors.autoselect}</span>}
                <br /><br />

                <label>Select the garbage collection vehicle:</label>
                <select
                    id="vehicle" 
                    name="vehicle"
                    value={order.vehicle}
                    onChange={handleOnChange}>
                    <option value="">Select a vehicle</option>
                    <option value="Car">Car</option>
                    <option value="Lorry">Lorry</option>
                    <option value="Van">Van</option>
                </select>
                {errors.vehicle && <span className="error">{errors.vehicle}</span>} 
                <br />

                <button type="submit">Submit</button>
            </form>
            <br />
        </div>
    );
}

export default Product;
