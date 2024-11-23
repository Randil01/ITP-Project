import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    description: '',
    inspector: '',
    phoneNumber: '',
  });
  const [searchDescription, setSearchDescription] = useState('');
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const currentDateTime = new Date();

  const inspectors = [
    { id: 1, name: 'Inspector A' },
    { id: 2, name: 'Inspector B' },
    { id: 3, name: 'Inspector C' },
  ];

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/appointments');
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      alert('Failed to fetch appointments. Please try again.');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedDateTime = new Date(`${formData.date}T${formData.time}`);

    const phoneNumberRegex = /^0\d{9}$/;
    if (!phoneNumberRegex.test(formData.phoneNumber)) {
      alert('Invalid phone number format. Insert a valid phone number!');
      return;
    }

    if (selectedDateTime < currentDateTime) {
      alert('Please select a future date and time.');
      return;
    }

    try {
      if (editId) {
        const response = await axios.put(
          `http://localhost:5000/api/appointments/${editId}`,
          formData
        );
        setAppointments(appointments.map((appointment) =>
          appointment.id === editId ? response.data : appointment
        ));
        setEditId(null);
      } else {
        const response = await axios.post('http://localhost:5000/api/appointments', formData);
        setAppointments([...appointments, response.data]);
      }

      setFormData({ date: '', time: '', description: '', inspector: '', phoneNumber: '' });
    } catch (error) {
      console.error('Error creating or updating appointment:', error);
      alert('Failed to save appointment. Please try again.');
    }
  };

  const handleEdit = (appointment) => {
    setFormData({
      date: appointment.date,
      time: appointment.time,
      description: appointment.description,
      inspector: appointment.inspector,
      phoneNumber: appointment.phoneNumber,
    });
    setEditId(appointment.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/appointments/${deleteId}`); // Use deleteId here
      if (response.status === 204) {
        // Filter out the deleted appointment from the local state
        setAppointments(appointments.filter((appt) => appt._id !== deleteId)); // Use _id for comparison
        closeDeleteDialog(); // Close the dialog
      } else {
        console.error("Failed to delete appointment.");
        alert("Failed to delete appointment.");
      }
    } catch (error) {
      console.error("Error occurred while deleting the appointment:", error);
      alert("Failed to delete appointment.");
    }
  };
  
  
  
  

  const openDeleteDialog = (id) => {
    setDeleteId(id);
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setDeleteId(null);
  };

  const filteredAppointments = appointments.filter((appointment) =>
    appointment.description.toLowerCase().includes(searchDescription.toLowerCase())
  );

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
        Appointments
      </Typography>
      <Typography variant="h5" paragraph>
        Here you can view and manage your appointments.
      </Typography>

      <TextField
        fullWidth
        label="Search by Description"
        value={searchDescription}
        onChange={(e) => setSearchDescription(e.target.value)}
        style={{ marginBottom: '20px' }}
      />

      <Paper style={{ padding: '20px', marginBottom: '20px' }}>
        <Typography variant="h6" gutterBottom>
          {editId ? 'Update Appointment' : 'Schedule a New Appointment'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Date"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Time"
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              required
              inputProps={{ min: '08:00', max: '17:00' }} // Restrict time selection
            />

            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={(e) => {
                const phoneNumber = e.target.value;

              // Allow only numeric input and limit to 10 digits
              if (phoneNumber.match(/^\d{0,10}$/)) {
              // Ensure the first digit is 0 or allow empty string for reset
              if (phoneNumber === '' || phoneNumber.startsWith('0')) {
                setFormData({ ...formData, phoneNumber });
                } else {
                alert('Phone number must start with 0.');
                }
              }
            }}
              required
              placeholder="e.g., 0769728090"
              inputProps={{ maxLength: 10 }} // Enforces 10 characters max
            />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                select
                fullWidth
                label="Select Inspector"
                name="inspector"
                value={formData.inspector}
                onChange={handleChange}
                required
              >
                {inspectors.map((inspector) => (
                  <MenuItem key={inspector.id} value={inspector.name}>
                    {inspector.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                {editId ? 'Update Appointment' : 'Schedule Appointment'}
              </Button>
              {editId && (
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => {
                    setEditId(null);
                    setFormData({
                      date: '',
                      time: '',
                      description: '',
                      inspector: '',
                      phoneNumber: '',
                    });
                  }}
                  style={{ marginLeft: '10px' }}
                >
                  Cancel
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Inspector</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>{appointment.date}</TableCell>
                  <TableCell>{appointment.time}</TableCell>
                  <TableCell>{appointment.description}</TableCell>
                  <TableCell>{appointment.inspector}</TableCell>
                  <TableCell>{appointment.phoneNumber}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => handleEdit(appointment)}
                      style={{ marginRight: '10px' }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      onClick={() => openDeleteDialog(appointment._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No appointments found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={isDeleteDialogOpen}
        onClose={closeDeleteDialog}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">Delete Appointment</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete this appointment?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
    </>
  );
};

export default Appointments;
