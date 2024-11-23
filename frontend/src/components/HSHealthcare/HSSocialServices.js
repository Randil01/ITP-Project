import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Paper, Grid, MenuItem, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

function SocialServices() {
  const [applications, setApplications] = useState([]);
  const [programName, setProgramName] = useState('');
  const [userName, setUserName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [status] = useState('Pending');

  // Common programs available for application
  const programs = [
    'COVID-19 Vaccine',
    'Seasonal Flu Vaccine',
    'Routine Childhood Vaccines',
    'Food Assistance Programs',
    'Child Support',
    'Senior Citizen Benefits',
    'Mental Health Support',
    'Maternal and Child Health Services',
    'Disability Services',
  ];

  // Fetch applications on component mount
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/applications');
        const data = await response.json();
        setApplications(data);
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    };

    fetchApplications();
  }, []); // Empty dependency array means this runs once on mount

  const handleApply = async (e) => {
    e.preventDefault();

    const mobileNumberRegex = /^07[0-9]{8}$/;

    if (programName && userName && contactNumber) {
      if (!mobileNumberRegex.test(contactNumber)) {
        alert('Please enter a valid Sri Lankan mobile number (e.g., 0779999999).');
        return;
      }

      const applicationData = { program: programName, user: userName, contact: contactNumber };
      console.log('Submitting application:', applicationData); // Log the data being sent

      try {
        const response = await fetch('http://localhost:5000/api/apply', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(applicationData),
        });

        const data = await response.json();
        if (response.ok) { // Check if the response is successful
          setApplications([...applications, data]); // Add the new application to the state
          setProgramName('');
          setUserName('');
          setContactNumber('');
        } else {
          alert(data.message); // Show error message if the response is not okay
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      alert('Please fill in all fields.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/applications/${id}`, {
        method: 'DELETE',
      });

      setApplications(applications.filter(application => application._id !== id)); // Use _id for MongoDB
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
    <header className="hsheader">
        <div className="hslogo-title">
          <img src="/hslogo.png" alt="Logo" className="hslogo" />
          <Typography variant="h2" className="hsheader-title">
            Panadura Municipal Council
          </Typography>
        </div>
      </header>

    <Container>
      <Typography variant="h2" gutterBottom>
        Social Services
      </Typography>
      <Typography variant="h5" paragraph>
        Apply for social assistance programs, track application status, and access resources and support to meet your needs.
      </Typography>

      {/* Form to Apply for Social Assistance Programs */}
      <Paper style={{ padding: '20px', marginBottom: '20px' }}>
        <Typography variant="h6" gutterBottom>
          Apply for Assistance
        </Typography>
        <form onSubmit={handleApply}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Select Program"
                value={programName}
                onChange={(e) => setProgramName(e.target.value)}
                required
              >
                {programs.map((program, index) => (
                  <MenuItem key={index} value={program}>
                    {program}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Your Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
  <TextField
    fullWidth
    label="Contact Number"
    value={contactNumber}
    onChange={(e) => {
      const input = e.target.value;

      // Allow only digits and limit length to 10
      if (/^\d*$/.test(input) && (input.length <= 10)) {
        // Allow input only if it starts with '0'
        if (input.length === 1 && input !== '0') {
          setContactNumber(''); // Reset if not starting with '0'
        } else if (input.length === 0 || input.startsWith('0')) {
          setContactNumber(input);
        }
      }
    }}
    required
    type="tel"
    helperText="Enter a valid Sri Lankan mobile number (e.g., 0779999999)"
  />
</Grid>

            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Apply
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {/* Table to Display Applications */}
      <Typography variant="h6" gutterBottom>
        Your Applications
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Program Name</TableCell>
              <TableCell>User Name</TableCell>
              <TableCell>Contact Number</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applications.map((application) => (
              <TableRow key={application._id}> {/* Use _id for MongoDB */}
                <TableCell>{application.program}</TableCell>
                <TableCell>{application.user}</TableCell>
                <TableCell>{application.contact}</TableCell>
                <TableCell>{application.status}</TableCell>
                <TableCell>
                  <Button color="secondary" onClick={() => handleDelete(application._id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
    </>
  );
}

export default SocialServices;
