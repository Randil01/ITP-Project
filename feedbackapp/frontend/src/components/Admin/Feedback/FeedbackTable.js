import React, { useState } from "react";
import { Box, Button, InputAdornment, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { CSVLink } from 'react-csv';
import Search from '@mui/icons-material/Search';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import StarRating from './StarRating'; // Ensure you have a StarRating component
import Swal from 'sweetalert2';

const FeedbackTable = ({ rows, deleteFeedback }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredRows = rows.filter(row =>
        (row.employeeName && row.employeeName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (row.department && row.department.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const csvHeaders = [
        { label: 'Employee Name', key: 'employeeName' },
        { label: 'Employee Email', key: 'employeeEmail' },
        { label: 'Department', key: 'department' },
        { label: 'Rating', key: 'rating' },
        { label: 'Feedback', key: 'feedback' },
    ];

    const csvData = filteredRows.map(row => ({
        employeeName: row.employeeName,
        employeeEmail: row.employeeEmail,
        department: row.department,
        rating: row.rating,
        feedback: row.feedback,
    }));

    const handleGeneratePDF = () => {
        const doc = new jsPDF();
        doc.text("Feedback Report", 14, 15);
        doc.autoTable({
            head: [['Employee Name', 'Employee Email', 'Department', 'Rating', 'Feedback']],
            body: csvData.map(row => [row.employeeName, row.employeeEmail, row.department, row.rating, row.feedback]),
            startY: 20
        });
        doc.save("feedback_report.pdf");
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setAnchorEl(null);
    };

    const handleDeleteFeedback = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                deleteFeedback(id);
                Swal.fire(
                    'Deleted!',
                    'Your feedback has been deleted.',
                    'success'
                );
            }
        });
    };

    return (
        <div>
            <Typography variant="h4" sx={{ flex: 1, color: '#000000', marginLeft: 5, textAlign: 'center', fontWeight: 'bold', marginTop: '20px' }}>
                Admin View Feedback
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', marginTop: '20px' }}>
                <TextField
                    sx={{
                        borderRadius: '20px',
                        marginLeft: 12,
                        width: 350,
                        textAlign: 'center'
                    }}
                    label="Search by Employee Name or Department"
                    variant="outlined"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search sx={{ fontSize: '2rem', borderRadius: '50%' }} />
                            </InputAdornment>
                        )
                    }}
                />
                <Paper elevation={3} sx={{
                    boxShadow: 5,
                    borderRadius: '20px',
                    width: 250,
                    height: 80,
                    padding: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: 'auto',
                    marginRight: '20px'
                }}>
                    <Button
                        onClick={handleClick}
                        sx={{
                            color: "white",
                            fontWeight: 'bold',
                            fontSize: 14,
                            borderRadius: '40px',
                            backgroundColor: '#6EA95F',
                            '&:hover': {
                                backgroundColor: '#0d47a1',
                            },
                            textTransform: 'none',
                        }}
                    >
                        Download Report
                    </Button>
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        sx={{ marginTop: '10px' }}
                    >
                        <MenuItem onClick={() => {
                            handleClose();
                        }}>
                            <CSVLink
                                data={csvData}
                                headers={csvHeaders}
                                filename={"feedback_data.csv"}
                                style={{ textDecoration: 'none', color: 'inherit' }}
                            >
                                CSV
                            </CSVLink>
                        </MenuItem>
                        <MenuItem onClick={() => {
                            handleClose();
                            handleGeneratePDF();
                        }}>
                            PDF
                        </MenuItem>
                    </Menu>
                </Paper>
            </Box>

            <TableContainer component={Paper} sx={{ margin: '20px auto', maxWidth: '90vw' }}>
                <Table>
                    <TableHead sx={{ backgroundColor: '#6EA95F' }}>
                        <TableRow>
                            <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Employee Name</TableCell>
                            <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Employee Email</TableCell>
                            <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Department</TableCell>
                            <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Rating</TableCell>
                            <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Feedback</TableCell>
                            <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            filteredRows.length > 0 ? filteredRows.map(row => (
                                <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell>{row.employeeName}</TableCell>
                                    <TableCell>{row.employeeEmail}</TableCell>
                                    <TableCell>{row.department}</TableCell>
                                    <TableCell>
                                        <StarRating rating={row.rating} />
                                    </TableCell>
                                    <TableCell>{row.feedback}</TableCell>
                                    <TableCell>
                                        <Button
                                            sx={{
                                                borderRadius: '20px',
                                                backgroundColor: '#FF0000',
                                                color: '#FFF',
                                                '&:hover': {
                                                    backgroundColor: '#B71C1C',
                                                },
                                                marginTop: '8px'
                                            }}
                                            onClick={() => handleDeleteFeedback(row._id)}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )) :
                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell colSpan={6}>No Data</TableCell>
                                </TableRow>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default FeedbackTable;
