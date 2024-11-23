import { useState } from "react";
import axios from "axios";
import './addorder.css';
import { useNavigate } from 'react-router-dom';

function AddPayment() {
    const navigate = useNavigate();
    const [payment, setPayment] = useState({
        U_name: "",
        card_number: "",
        card_holder: "",
        expir_date: "",
        cvc: "",
        coupon_code: "",
        card_type: "", // New field for card type
    });
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!payment.U_name.trim()) {
            newErrors.U_name = "User Name is required.";
        }
        if (!payment.card_holder.trim()) {
            newErrors.card_holder = "Card Holder name is required.";
        }
        if (!payment.card_number.trim()) {
            newErrors.card_number = "Card Number is required.";
        } else if (!/^\d{16}$/.test(payment.card_number)) {
            newErrors.card_number = "Card Number must be 16 digits.";
        }
        if (!payment.expir_date.trim()) {
            newErrors.expir_date = "Expiry Date is required.";
        } else if (new Date(payment.expir_date) <= new Date()) {
            newErrors.expir_date = "Expiry Date must be a future date.";
        }
        if (!payment.cvc.trim()) {
            newErrors.cvc = "CVC is required.";
        } else if (!/^\d{3,4}$/.test(payment.cvc)) {
            newErrors.cvc = "CVC must be 3 or 4 digits.";
        }
        if (payment.coupon_code && !/^\d+$/.test(payment.coupon_code)) {
            newErrors.coupon_code = "Coupon Code must be a numeric value.";
        }
        if (!payment.card_type) {
            newErrors.card_type = "Card Type is required.";
        }
        return newErrors;
    };

    const handleOnChange = (e) => {
        const { value, name } = e.target;
        setPayment(prevState => ({
            ...prevState,
            [name]: value
        }));
        setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form submitted!"); // Debugging log
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await axios.post("http://localhost:5001/create_payment", payment);
            console.log(response.data);
            alert("Payment confirmed!");
            navigate("/paydetails");
        } catch (error) {
            console.error("Error submitting payment:", error);
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
            <button onClick={() => handleNavigation('/Help')}>Help</button>&nbsp;

            <div className="add-order">
                <h1>Payment Section</h1>
                
                    <form onSubmit={handleSubmit}>
                    <div className="input-group card-type">
    <label>Card Type:</label>
    <label>
        <input 
            type="radio" 
            name="card_type" 
            value="Visa" 
            id="visa"
            checked={payment.card_type === "Visa"} 
            onChange={handleOnChange} 
        />
        Visa.
    </label>
    
    <label>
        <input 
            type="radio" 
            name="card_type" 
            value="MasterCard" 
            id="mastercard"
            checked={payment.card_type === "MasterCard"} 
            onChange={handleOnChange} 
        />
        MasterCard.
    </label>
    {errors.card_type && <span className="error">{errors.card_type}</span>}
</div>




                        <div className="input-group">
                            <label>User Name:</label>
                            <input type="text" id="U_name" name="U_name" value={payment.U_name} onChange={handleOnChange} />
                            {errors.U_name && <span className="error">{errors.U_name}</span>}
                        </div>

                        <div className="input-group">
                            <label>Card Holder:</label>
                            <input 
                                type="text" 
                                id="card_holder" 
                                name="card_holder" 
                                value={payment.card_holder} 
                                onChange={handleOnChange} 
                                onKeyPress={(e) => {
                                    const charCode = e.charCode;
                                    if (!/^[a-zA-Z\s]+$/.test(String.fromCharCode(charCode))) {
                                        e.preventDefault();
                                    }
                                }}
                            />
                            {errors.card_holder && <span className="error">{errors.card_holder}</span>}
                        </div>

                        <div className="input-group">
                            <label>Card Number:</label>
                            <input 
                                type="text" 
                                id="card_number" 
                                name="card_number" 
                                value={payment.card_number} 
                                onChange={handleOnChange} 
                                onKeyPress={(e) => {
                                    if (!/^\d+$/.test(e.key)) {
                                        e.preventDefault();
                                    }
                                }} 
                                maxLength={16}  // Restricting to 16 characters
                            />
                            {errors.card_number && <span className="error">{errors.card_number}</span>}
                        </div>

                        <div className="input-group">
                            <label>Expiry Date:</label>
                            <input type="date" id="expir_date" name="expir_date" value={payment.expir_date} onChange={handleOnChange} />
                            {errors.expir_date && <span className="error">{errors.expir_date}</span>}
                        </div>

                        <div className="input-group">
                            <label>CVC:</label>
                            <input 
                                type="text" 
                                id="cvc" 
                                name="cvc" 
                                value={payment.cvc} 
                                onChange={handleOnChange} 
                                onKeyPress={(e) => {
                                    if (!/^\d+$/.test(e.key)) {
                                        e.preventDefault();
                                    }
                                }} 
                                maxLength={4}  // Restricting to 4 digits
                            />
                            {errors.cvc && <span className="error">{errors.cvc}</span>}
                        </div>

                        <div className="input-group">
                            <label>Coupon Code:</label>
                            <input 
                                type="text" 
                                id="coupon_code" 
                                name="coupon_code" 
                                value={payment.coupon_code} 
                                onChange={handleOnChange} 
                                onKeyPress={(e) => {
                                    if (!/^\d+$/.test(e.key)) {
                                        e.preventDefault();
                                    }
                                }} 
                                maxLength={6}  // Restricting to 6 digits
                            />
                            {errors.coupon_code && <span className="error">{errors.coupon_code}</span>}
                        </div>

                        <button type="submit" id="cbtn">Confirm Payment</button>
                    </form>

            </div>
        </div>
    );
}

export default AddPayment;
