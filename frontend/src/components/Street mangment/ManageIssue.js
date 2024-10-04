import React, { useEffect, useState } from "react";
import { useParams , useNavigate } from "react-router-dom";  // Import useParams to get the ID from the URL
import './add.css';
import axios from "axios";
import Header from '../header/header'

function ManageIssue() {

    const navigate = useNavigate();

    const { id } = useParams();  // Get the issue ID from the URL
    const [category, setCategory] = useState("");
    const [area, setArea] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        // Fetch the issue details using the ID
        axios.get(`http://localhost:5000/posts/${id}`)
            .then(response => {
                const issue = response.data;
                setCategory(issue.category);
                setArea(issue.area);
                setDescription(issue.description);
            })
            .catch(error => {
                console.error("There was an error fetching the issue details!", error);
            });
    }, [id]);  // Dependency array to ensure it runs when the ID changes

    const validateForm = () => {
        const newErrors = {};

        if (!category || category === "Select a category") {
            newErrors.category = " * Please select a category.";
        }

        if (!area || area === " * Select a map area") {
            newErrors.area = " * Please select a map area.";
        }

        if (!description.trim()) {
            newErrors.description = " * Description cannot be empty.";
        } else if (description.length < 10) {
            newErrors.description = " * Description must be at least 10 characters long.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const updateIssue = (e) => {
        e.preventDefault();

        if (validateForm()) {
            const updatedIssue = { category, area, description };

            axios.put(`http://localhost:5000/posts/update/${id}`, updatedIssue)
                .then(() => {
                    alert("Issue updated successfully!");

                    navigate("/issues");  
                })
                .catch((err) => {
                    alert("Error: " + err.message);
                });
        }
    };

    return (
        <div>
            <Header/>
            <h1 className="title"><u>Edit Issue</u></h1>

            <div className="container">
                <form onSubmit={updateIssue} className="form">

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="issueCategory">Issue Category :</label>
                            <select id="issueCategory" className="form-control" value={category} onChange={(e) => { setCategory(e.target.value); }}>
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
                            <select id="mapArea" className="form-control" value={area} onChange={(e) => { setArea(e.target.value); }}>
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
                        <textarea id="description" placeholder="Enter additional" className="form-control" value={description} onChange={(e) => { setDescription(e.target.value); }}></textarea>
                        {errors.description && <div className="error">{errors.description}</div>}
                    </div>

                    <div className="form-group">
                        <button style={{backgroundColor:"#4CAF50"}} type="submit" className="btn btn-submit">Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ManageIssue;
