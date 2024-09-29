import React , { useState } from "react";
import './add.css';  // Assuming you will be creating a CSS file for styles
import axios from "axios";
import Header from '../header/header'

function Add(){

    const [category, setCategory] = useState("");
    const [area, setArea] = useState("");
    const [description, setDescription] = useState("");

    const [errors, setErrors] = useState({});

    const clearForm = () => {
        setCategory("");
        setArea("");
        setDescription("");
    };

    // Validate input fields
    const validateForm = () => {
        const newErrors = {};

        // Validate category selection
        if (!category || category === "Select a category") {
            newErrors.category = " * Please select a category.";
        }

        // Validate area selection
        if (!area || area === " * Select a map area") {
            newErrors.area = " * Please select a map area.";
        }

        // Validate description length
        if (!description.trim()) {
            newErrors.description = " * Description cannot be empty.";
        } else if (description.length < 10) {
            newErrors.description = " * Description must be at least 10 characters long.";
        }

        setErrors(newErrors);

        // Return true if there are no errors
        return Object.keys(newErrors).length === 0;
    };

    const sendData = (e) => {
        e.preventDefault();

        if (validateForm()) {
            const newIssue = { category, area, description };


            axios.post("http://localhost:5000/post/save", newIssue)
            .then(() => {
                alert("Issue reported successfully!");
                clearForm();
            })
            .catch((err) => {
                alert("Error: " + err.message);
            });
    }

};

    return(
        <div>
            <Header/>
        <div>
            <h1 className="title"><u>Report an Issue</u></h1>

            <div className="container">
                

                {/* Form */}
                <form onSubmit={sendData} className="form">

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="issueCategory">Issue Category :</label>
                            <select id="issueCategory" className="form-control" value={category} onChange={(e) => { setCategory(e.target.value);}}>
                                <option>Select a category</option>
                                <option>Traffic and Transportation</option>
                                <option> Waste Management</option>
                                <option>Road and Street Maintenance</option>
                                <option>Public Health and Sanitation</option>
                                <option>Environmental Issues</option>
                            </select>
                            {errors.category && <div className="error">{errors.category}</div>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="mapArea">Map Area :</label>
                            <select id="mapArea" className="form-control" value={area} onChange={(e) => { setArea(e.target.value);}}>
                                <option>Select a map area</option>
                                <option>Walana</option>
                                <option>Thanthirimulla</option>
                                <option>Udahamulla</option>
                                <option>Kuruppumulla</option>
                                <option>Atambagoda</option>
                                <option>Walawila Pattiya</option>
                                <option>Pattiya North</option>
                                <option>Kadaweediya North</option>
                                <option>Kadaweediya</option>
                                <option>Kadaweediya West</option>
                                <option>Sagara Place</option>
                                <option>Pattiya South</option>
                                <option>Uyankele</option>
                                <option>Pattiya</option>
                                <option>Morawinna </option>
                            </select>
                            {errors.area && <div className="error">{errors.area}</div>}
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description :</label>
                        <textarea id="description" placeholder="Enter additional" className="form-control" value={description} onChange={(e) => { setDescription(e.target.value);}}></textarea>
                        {errors.description && <div className="error">{errors.description}</div>}
                    </div>

                    <div className="form-group">
                        <button style={{backgroundColor:"#4CAF50"}} type="submit" className="btn btn-submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
        </div>
    );
}

export default Add;

