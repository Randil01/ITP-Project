import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './itemupdate.css';

function UpdatePermit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [updateorder, setUpdateOrder] = useState({
        permit_type: "",
        license_type: "",
        permit_plane: "",
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:5001/item_order/${id}`);
                const data = await response.json();

                if (data.success) {
                    setUpdateOrder(data.data);
                } else {
                    alert(data.message);
                }
            } catch (error) {
                alert('Error fetching user data: ' + error.message);
            }
        };

        fetchUserData();
    }, [id]);

    const validate = () => {
        const newErrors = {};
        
        if (!updateorder.permit_type) newErrors.permit_type = "Permit type is required.";
        if (!updateorder.license_type) newErrors.license_type = "License type is required.";
        if (!updateorder.permit_plane) newErrors.permit_plane = "Permit plan is required.";

        return newErrors;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setUpdateOrder((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    const handleUpdate = async () => {
        const newErrors = validate();

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await fetch(`http://localhost:5001/item_update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: updateorder._id,
                    ...updateorder,
                }),
            });

            const data = await response.json();

            if (data.success) {
                alert("Item updated successfully");
                navigate('/itemdetails');
            } else {
                alert(data.message);
            }
        } catch (error) {
            alert('Error updating user: ' + error.message);
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
            <div className='item-update'>
                <h1>Update Form</h1>
                
                <label>Select Your Need Permit Type:</label>
                <select 
                    id="permit_type"
                    name="permit_type"
                    value={updateorder?.permit_type}
                    onChange={handleInputChange}>
                    <option value="">Select Permit Type</option>
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

                <label>Select Your Needs License Type:</label>
                <select 
                    id="license_type"
                    name="license_type"
                    value={updateorder?.license_type}
                    onChange={handleInputChange}>
                    <option value="">Select License Type</option>
                    <option>Driving License</option>
                    <option>Business License</option>
                    <option>Food Service License</option>
                    <option>Taxi License</option>
                    <option>Insurance License</option>
                    <option>Environmental License</option>
                    <option>Software License</option>
                    <option>Selling License</option>
                </select>a
                {errors.license_type && <span className="error">{errors.license_type}</span>}
                <br />

                <label>Permit Plan:</label>
                <select 
                    id="permit_plane"
                    name="permit_plane"
                    value={updateorder?.permit_plane}
                    onChange={handleInputChange}>
                    <option value="">Select Permit Plan</option>
                    <option>Silver Plan</option>
                    <option>Gold Plan</option>
                    <option>Diamond Plan</option>
                </select>
                {errors.permit_plane && <span className="error">{errors.permit_plane}</span>}
                <br />
                
                <button onClick={handleUpdate}>Update</button>
            </div>
        </div>
    );
}

export default UpdatePermit;