import React, { useEffect, useState } from "react";
import './issues.css';  // Assuming same styles will be used
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from '../header/header'

function IssueNotification() {
    const navigate = useNavigate();
    const [issues, setIssues] = useState([]);

    useEffect(() => {
        // Fetching the list of issues (posts) from the backend
        axios.get("http://localhost:5000/posts")
            .then(response => {
                setIssues(response.data.existingPosts);  // Access 'existingPosts'
            })
            .catch(error => {
                console.error("There was an error fetching the issues!", error);
            });
    }, []);

    const handleEdit = (id) => {
        navigate(`/manage/${id}`);  // Navigate to the page with the issue ID
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this issue?")) {
            // Make the delete request
            axios.delete(`http://localhost:5000/posts/delete/${id}`)
                .then(response => {
                    alert("Issue deleted successfully!");
                    // Update the list by removing the deleted issue
                    setIssues(issues.filter(issue => issue._id !== id));
                })
                .catch(error => {
                    alert("Error deleting issue: " + error.message);
                });
        }
    };

    return (
        <div>
            <Header/>
        <div>
            <h1 className="title"><u>Calender View</u></h1>

            <div className="container">
                {issues.length === 0 ? (
                    <p>No issues reported yet.</p>
                ) : (
                    issues.map((issue) => (
                        <div style={{marginTop:"3%"}} className="issue-card" key={issue._id}>
                            <h2><u><i class="fa fa-bell" aria-hidden="true"></i> Notification</u> : {issue.category}</h2>
                        </div>
                    ))
                )}
            </div>
            <div style={{marginLeft:"54%"}} className="issue-buttons">
                                <button style={{backgroundColor:"#4CAF50"}}  className="btn-btn-primary">
                                    Set Reminder
                                </button>
                                <button onClick={() => navigate("/issues")} style={{backgroundColor:"#4CAF50"}} className="btn-btn-secondary">
                                    To View Details
                                </button>
                            </div>
        </div>
        </div>
    );
}

export default IssueNotification;
