import React, { useEffect, useState } from "react";
import './issues.css';  // Assuming same styles will be used
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jsPDF from 'jspdf'
import Header from '../header/header'

function Issues() {
    const navigate = useNavigate();
    const [issues, setIssues] = useState([]);
    const [searchQuary, setSearchQuery] = useState('');

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
    const handleSerch = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
    }

    const filterIssues = issues.filter((issue) =>
        issue.area.toLowerCase().includes(searchQuary)
    );

    //Genarate the pdf & Download
    const generatePDF = () => {
        const doc = new jsPDF();
    
        const pageWidth = doc.internal.pageSize.getWidth();
        const logoWidth = 35;
        const logoHeight = 35;
    
        const logoX = (pageWidth - logoWidth) / 2;
        const logoUrl = 'data:image/jpeg;base64,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';  
        doc.addImage(logoUrl, 'JPEG', logoX, 10, logoWidth, logoHeight);  // Add logo at the top
    
        doc.setFontSize(22);
        doc.setFont('helvetica', 'bold');
        doc.text("Panadura Municipal Council", pageWidth / 2, 55, { align: 'center' });
    
        doc.setFontSize(16);
        doc.text("Report of Issues", pageWidth / 2, 65, { align: 'center' });
    
        const genDate = new Date().toLocaleDateString();
        doc.setFontSize(12);
        doc.text(`Generated on: ${genDate}`, pageWidth / 2, 75, { align: 'center' });
    
        let yOffset = 90;  // Start below the header for content
    
        issues.forEach((issue, index) => {
            doc.setFontSize(14);
            doc.text(`Issue ${index + 1}`, 10, yOffset);
            doc.setFontSize(12);
            doc.text(`Category: ${issue.category}`, 10, yOffset + 10);
            doc.text(`Map Area: ${issue.area}`, 10, yOffset + 20);
            doc.text(`Description: ${issue.description}`, 10, yOffset + 30);
            yOffset += 50;  // Add space for the next issue
        });
        
        const pageHeight = doc.internal.pageSize.height;
        doc.text(`Date:${genDate}`,20,pageHeight-20);
        const signatureText = "Signature: ___________";
        const textWidth = doc.getTextWidth(signatureText); 
        doc.text(signatureText, doc.internal.pageSize.width - textWidth - 20, pageHeight - 20);
        doc.save("issues_report.pdf");
    };
    

    return (
        <div>
            <Header/>
        <div>

            <h1 className="title"><u>Reported Issues</u></h1>
            <button className="btn-download-report" onClick={generatePDF}>
                Download Report
            </button>

            <div className="container">
            <input type="text" className="search-issue" placeholder="search by area" value={searchQuary} onChange={handleSerch}/>
                {issues.length === 0 ? (
                    <p>No issues reported yet.</p>
                ) : (
                    filterIssues.map((issue) => (
                        <div style={{marginTop:"3%"}} className="issue-card" key={issue._id}>
                            <h2>Category: {issue.category}</h2>
                            <p><strong>Map Area:</strong> {issue.area}</p>
                            <p><strong>Description:</strong> {issue.description}</p>

                            {/* A button for viewing details, can be linked to a detailed view */}
                            <button className="btn-view-details" onClick={() => handleEdit(issue._id)} >
                                Edit Details
                            </button>
                            <button style={{backgroundColor:"red",marginLeft:"2%"}} className="btn-view-details" onClick={() => handleDelete(issue._id)} >
                                Delete Issue
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
        </div>
    );
}

export default Issues;

