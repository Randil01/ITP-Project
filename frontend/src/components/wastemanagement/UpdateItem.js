import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import './itemupdate.css';

function UpdateItem() {
    const { id } = useParams();
    const navigate = useNavigate(); // Initialize useNavigate
    const [updateorder, setupdateorder] = useState({
        Last_garbage: "",
        rouly_garbage: "",
        vehcile: "",
        autoselect: "",
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/item_order/${id}`);
                const data = await response.json();
                console.log(data);

                if (data.success) {
                    setupdateorder(data.data);
                } else {
                    console.error(data.message);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [id]);

    const validate = () => {
        const newErrors = {};

        if (!updateorder.Last_garbage) newErrors.Last_garbage = "Last garbage collected date is required.";
        if (!updateorder.rouly_garbage) {
            newErrors.rouly_garbage = "Roughly garbage weight is required.";
        } else if (isNaN(updateorder.rouly_garbage)) {
            newErrors.rouly_garbage = "Roughly garbage weight must be a number.";
        }
        if (!updateorder.autoselect) newErrors.autoselect = "Automatic garbage collection date is required.";
        if (!updateorder.vehcile) newErrors.vehcile = "Garbage collection vehicle is required.";

        return newErrors;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Update state
        setupdateorder((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Clear individual field errors on change
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
            const response = await fetch(`http://localhost:5000/item_update`, {
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
                navigate('/itemdetails'); // Redirect to all details page
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <div className='item-update'>
            <h2>Update Form</h2>

            <label>Select the last garbage collected date:</label>
            <input 
                type="text" 
                id="Last_garbage" 
                name="Last_garbage" 
                onChange={handleInputChange} 
                value={updateorder?.Last_garbage} 
            />
            {errors.Last_garbage && <span className="error">{errors.Last_garbage}</span>}
            <br />

            <label>Edit the roughly weight of garbage:</label>
            <input 
                type="text" 
                id="rouly_garbage" 
                name="rouly_garbage" 
                onChange={handleInputChange} 
                value={updateorder?.rouly_garbage} 
            />
            {errors.rouly_garbage && <span className="error">{errors.rouly_garbage}</span>}
            <br />

            <label>Select the latest garbage collection date:</label>
            <input 
                type="text" 
                id="autoselect" 
                name="autoselect" 
                onChange={handleInputChange} 
                value={updateorder?.autoselect} 
            />
            {errors.autoselect && <span className="error">{errors.autoselect}</span>}
            <br />

            <label>Select the garbage collection vehicle:</label>
            <select 
                id="vehcile" 
                name="vehcile" 
                onChange={handleInputChange} 
                value={updateorder?.vehcile}>
                <option value="">Select a vehicle</option>
                <option value="Car">Car</option>
                <option value="Lorry">Lorry</option>
                <option value="Van">Van</option>
            </select>
            {errors.vehcile && <span className="error">{errors.vehcile}</span>}
            <br />

            <button onClick={handleUpdate}>Update</button>
        </div>
    );
}

export default UpdateItem;
