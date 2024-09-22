import { Box } from "@mui/material";
import FeedbackTable from "./FeedbackTable";
import Axios from "axios";
import { useEffect, useState } from "react";
import Navbar from '../../Navbar'; // Import the Navbar component

const AdminFeedbackView = () => {
    const [feedback, setFeedback] = useState([]);

    useEffect(() => {
        getFeedback();
    }, []);

    const getFeedback = () => {
        Axios.get('http://localhost:3001/api/feedbacks') // Request data from backend
            .then(response => {
                setFeedback(response.data?.feedbacks || []); // Ensure 'feedbacks' is the correct key
            })
            .catch(error => {
                console.error("Axios Error: ", error);
            });
    }

    const deleteFeedback = (id) => {
        Axios.post('http://localhost:3001/api/deleteFeedback', { id }) // Adjust if needed
            .then(() => {
                getFeedback();
            })
            .catch(error => {
                console.error("Axios Error: ", error);
            });
    }

    return (
        <Box>
            <Navbar /> {/* Add the Navbar component here */}
            <FeedbackTable
                rows={feedback}
                deleteFeedback={id => window.confirm('Are you sure?') && deleteFeedback(id)}
            />
        </Box>
    )
}

export default AdminFeedbackView;
