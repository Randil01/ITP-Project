import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Typography, Grid } from '@mui/material';
import './HSHome.css'; // Updated styles
import './HSStyles.css';

function HSHome() {
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

      <Container container spacing={30} className="hshome-container">
        <Typography variant="h3" align="center" paragraph className="hsintro-text">
          Manage your health and social services with ease.
        </Typography>
        <Grid container spacing={15} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Button 
              component={Link} 
              to="/hsdashboard" 
              variant="contained" 
              fullWidth
              className="hsneon-button secondary"
            >
              Go to Dashboard
            </Button>
            <Typography variant="body" className="hsdescription">
              Access your personalized dashboard to schedule appointments, apply for social services, and more.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button 
              component={Link} 
              to="/hsappointments" 
              variant="contained" 
              fullWidth
              className="hsneon-button secondary"
            >
              View Appointments
            </Button>
            <Typography variant="body" className="hsdescription">
              Schedule, view, reschedule, or cancel appointments with healthcare providers efficiently.
            </Typography>
          </Grid>
        </Grid>
      </Container>
      
      <footer className="hsfooter">
        <Typography variant="body2">© 2024 Healthcare and Social Services</Typography>
      </footer>
    </>
  );
}

export default HSHome;
