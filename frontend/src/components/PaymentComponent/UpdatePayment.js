import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import './orderupdate.css';

function UpdatePayment() {
    const { id } = useParams();
    const navigate = useNavigate(); // Initialize navigate
    const [updateorder, setupdateorder] = useState({
        U_name: "", // Ensure these match your form inputs
        card_number: "",
        card_holder: "",
        expir_date: "",
        cvc: "",
        coupon_code: "",
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:5001/order_payment/${id}`);
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

    const handleInputChange = (e) => {
        setupdateorder({
            ...updateorder,
            [e.target.name]: e.target.value,
        });
    };

    const handleUpdate = async () => {
        try {
            const response = await fetch(`http://localhost:5001/update_payment`, {
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
                console.log('Order updated successfully');
                alert("Order updated successfully");
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleNavigation = (path) => {
        navigate(path); // Use navigate to change routes
    };

    return (
        <div>
            <button onClick={() => handleNavigation('/add-item')}>Add Permit & License</button>&nbsp;
            <button onClick={() => handleNavigation('/itemdetails')}>Submitted Permit & License</button>&nbsp;
            <button onClick={() => handleNavigation('/add-pay')}>Make A Payment</button>&nbsp;
            <button onClick={() => handleNavigation('/paydetails')}>Payment Details</button>&nbsp;
            <button onClick={() => handleNavigation('/Help')}>Help</button>&nbsp;

            <div className='order-update'>
                <h2>Update Details</h2>
                <br />
                <label>User Name:</label>
                <input type="text" id="U_name" name="U_name" onChange={handleInputChange} value={updateorder.U_name || ""} /><br />
                <label>Card Number:</label>
                <input type="text" id="card_number" name="card_number" onChange={handleInputChange} value={updateorder.card_number || ""} /><br />
                <label>Card Holder:</label>
                <input type="text" id="card_holder" name="card_holder" onChange={handleInputChange} value={updateorder.card_holder || ""} /><br />
                <label>Expiry Date:</label>
                <input type="date" id="expir_date" name="expir_date" onChange={handleInputChange} value={updateorder.expir_date || ""} /><br />
                <label>CVC:</label>
                <input type="text" id="cvc" name="cvc" onChange={handleInputChange} value={updateorder.cvc || ""} /><br />
                <label>Coupon Code:</label>
                <input type="text" id="coupon_code" name="coupon_code" onChange={handleInputChange} value={updateorder.coupon_code || ""} /><br />
                <button onClick={handleUpdate}>Update</button><br /><br />
            </div>
        </div>
    );
}

export default UpdatePayment;
