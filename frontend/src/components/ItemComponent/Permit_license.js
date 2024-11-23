import { useState } from "react";
import axios from "axios";
import './additem.css';
import { useNavigate } from 'react-router-dom';

function Permit() {
    const navigate = useNavigate();
    const [order, setOrder] = useState({
        permit_type: "",
        license_type: "",
        permit_plane: "",
    });

    const [errors, setErrors] = useState({});
    const [isChecked, setIsChecked] = useState(false);

    const handleOnChange = (e) => {
        const { value, name } = e.target;

        // Clear errors and update state
        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));

        // Validate name to not include numbers
        if (name === "name" && /[0-9]/.test(value)) {
            setErrors((prev) => ({
                ...prev,
                name: "Name cannot contain numbers.",
            }));
            return;
        }

        setOrder((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleOnChangePhone = (e) => {
        const { value, name } = e.target;

        // Clear errors and update state
        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));

        // Validate phone to allow only digits
        if (/[^0-9]/.test(value)) {
            setErrors((prev) => ({
                ...prev,
                phone: "Phone number must contain only digits.",
            }));
            return;
        }

        // Limit the phone number to a maximum of 10 digits
        if (value.length <= 10) {
            setOrder((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleOnChangeZip = (e) => {
        const { value, name } = e.target;

        // Clear errors and update state
        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));

        // Validate ZIP code to allow only digits
        if (/[^0-9]/.test(value)) {
            setErrors((prev) => ({
                ...prev,
                zip: "ZIP code must contain only digits.",
            }));
            return;
        }

        // Limit the ZIP code to a maximum of 5 digits
        if (value.length <= 5) {
            setOrder((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const validate = () => {
        const newErrors = {};

        // Validation checks
        if (!order.permit_type) newErrors.permit_type = "Permit type is required.";
        if (!order.permit_plane) newErrors.permit_plane = "Permit plan is required.";
        if (!order.name) newErrors.name = "Name is required.";
        if (!order.phone) newErrors.phone = "Phone number is required.";
        if (!order.email) newErrors.email = "Email is required.";
        if (!order.zip) newErrors.zip = "ZIP code is required.";
        if (!order.address) newErrors.address = "Address is required.";
        if (!order.city) newErrors.city = "City is required.";
        if (!isChecked) newErrors.privacy = "You must agree to the Privacy Policy.";

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
            const response = await axios.post("http://localhost:5001/item_create", order);
            console.log(response.data);
            alert("Successfully added!");
            navigate("/add-pay");
            setOrder({
                permit_type: "",
                license_type: "",
                permit_plane: "",
            });
            setErrors({});
        } catch (error) {
            console.error("There was an error adding the item:", error);
        }
    };

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div>
            <button onClick={() => handleNavigation('/add-item')}>Add Permit & License</button>&nbsp;
            <button onClick={() => handleNavigation('/itemdetails')}>Submitted Permit & License</button>&nbsp;
            <button onClick={() => handleNavigation('/add-pay')}>Make A Payment</button>&nbsp;
            <button onClick={() => handleNavigation('/paydetails')}>Payment Details</button>&nbsp;
            <button onClick={() => handleNavigation('/help')}>Help</button>&nbsp;
            <h1>Apply Permit & License</h1>

            <div className="form-wrapper">
                <div className="add-product">
                    <div className="form-container">
                        <form onSubmit={handleSubmit}>
                            <h2>Select Your Permit or License</h2>
                            <label htmlFor="name">Name:</label>
                            <input 
                                type="text" 
                                name="name" 
                                id="name"
                                value={order.name || ""} 
                                onChange={handleOnChange} 
                                placeholder="Enter your name" 
                            />
                            {errors.name && <span className="error">{errors.name}</span>}
                            <br />
                            
                            {/* Email */}
                            <label htmlFor="email">Email:</label>
                            <input 
                                type="email" 
                                name="email" 
                                id="email"
                                value={order.email || ""} 
                                onChange={handleOnChange} 
                                placeholder="Enter your email" 
                            />
                            {errors.email && <span className="error">{errors.email}</span>}
                            <br />

                            {/* Phone */}
                            <label htmlFor="phone">Phone:</label>
                            <input 
                                type="text" 
                                name="phone" 
                                id="phone"
                                value={order.phone || ""} 
                                onChange={handleOnChangePhone} 
                                placeholder="Enter your phone number" 
                            />
                            {errors.phone && <span className="error">{errors.phone}</span>}
                            <br />

                            {/* Address */}
                            <label htmlFor="address">Address:</label>
                            <input 
                                type="text" 
                                name="address" 
                                id="address"
                                value={order.address || ""} 
                                onChange={handleOnChange} 
                                placeholder="Enter your address" 
                            />
                            {errors.address && <span className="error">{errors.address}</span>}
                            <br />

                            {/* City */}
                            <label htmlFor="city">City:</label>
                            <input 
                                type="text" 
                                name="city" 
                                id="city"
                                value={order.city || ""} 
                                onChange={handleOnChange} 
                                placeholder="Enter your city" 
                            />
                            {errors.city && <span className="error">{errors.city}</span>}
                            <br />

                            {/* Zip */}
                            <label htmlFor="zip">Zip:</label>
                            <input 
                                type="text" 
                                name="zip" 
                                id="zip"
                                value={order.zip || ""} 
                                onChange={handleOnChangeZip} 
                                placeholder="Enter ZIP code" 
                            />
                            {errors.zip && <span className="error">{errors.zip}</span>}
                            <br />

                            {/* Permit Type */}
                            <label>Select Your need permit Type:</label>
                            <select 
                                id="permit_type"
                                name="permit_type"
                                value={order.permit_type}
                                onChange={handleOnChange}>
                                <option value="">-- Select Permit Type --</option>
                                <option>Building Permit</option>
                                <option>Registration Permit</option>
                                <option>Health Permit</option>
                                <option>Pet Permit</option>
                                <option>Parking Permit</option>
                                <option>Route Permit</option>
                                <option>Wild Permit</option>
                                <option>Land Permit</option>
                            </select>
                            {errors.permit_type && <span className="error">{errors.permit_type}</span>}
                            <br />

                            {/* License Type */}
                            <label>Select Your needs license Type:</label>
                            <select 
                                id="license_type"
                                name="license_type"
                                value={order.license_type}
                                onChange={handleOnChange}>
                                <option value="">-- Select License Type --</option>
                                <option>Business License</option>
                                <option>Health License</option>
                                <option>Pet License</option>
                                <option>Commercial License</option>
                            </select>
                            {errors.license_type && <span className="error">{errors.license_type}</span>}
                            <br />

                            {/* Permit Plan */}
                            <label>Permit Plan:</label>
                            <select 
                                id="permit_plane"
                                name="permit_plane"
                                value={order.permit_plane}
                                onChange={handleOnChange}>
                                <option value="">-- Select Permit Plan --</option>
                                <option>Silver Plan</option>
                                <option>Gold Plan</option>
                                <option>Diamond Plan</option>
                            </select>
                            {errors.permit_plane && <span className="error">{errors.permit_plane}</span>}
                            <br />

                            <label htmlFor="state">No of Need Years:</label>
                            <select 
                                id="state" 
                                name="state" 
                                value={order.state || ""} 
                                onChange={handleOnChange}>
                                <option value="">3 Month</option>
                                <option value="1">6 Month</option>
                                <option value="2">1 Year</option>
                                <option value="3">2 Year</option>
                                <option value="4">5 Year</option>
                                <option value="5">10 Year</option>
                            </select>
                            <br/>

                            <label>
                                <input
                                    id="check"
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={(e) => setIsChecked(e.target.checked)}
                                />
                                I agree to the 
                                <a href="/Privacy" target="_blank"> Privacy Policy</a>.
                            </label>
                            {errors.privacy && <span className="error">{errors.privacy}</span>}

                            {/* Submit Button */}
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Permit;
