import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Grid, Paper } from '@mui/material';
import './HSDashboard.css'; // Custom styles

function Dashboard() {
  return (
    <><header className="hsheader">
        <div className="hslogo-title">
          <img src="/hslogo.png" alt="Logo" className="hslogo" />
          <Typography variant="h2" className="hsheader-title">
            Panadura Municipal Council
          </Typography>
        </div>
      </header>
    <Container className="hsdashboard-container">
      <Typography variant="h2" className="hsdashboard-title" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        
        <Grid item xs={12} sm={6} md={4}>
          <Paper className="hsdashboard-item">
            <Typography variant="h6" gutterBottom>
              Effortlessly find and schedule appointments with healthcare providers. View, reschedule, or cancel your bookings.
            </Typography>
            <Button 
              component={Link} 
              to="/hsappointments" 
              variant="contained" 
              fullWidth
              className="hsneon-button secondary"
            >
              Schedule an Appointment
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper className="hsdashboard-item">
            <Typography variant="h6" gutterBottom>
              Apply for social assistance programs, track application status, and access resources and support to meet your needs.
            </Typography>
            <Button 
              component={Link} 
              to="/hssocial-services" 
              variant="contained" 
              fullWidth
              className="hsneon-button secondary"
            >
              Social Services
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper className="hsdashboard-item">
            <Typography variant="h6" gutterBottom>
              Stay informed with ongoing health campaigns, receive preventive care tips, and get reminders for vaccines and screenings.
            </Typography>
            <Button 
              component={Link} 
              to="/hspreventive-care" 
              variant="contained" 
              fullWidth
              className="hsneon-button secondary"
            >
              Preventive Care
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper className="hsdashboard-item">
            <Typography variant="h6" gutterBottom>
              Access personalized health reports, track your health metrics over time, and download or print detailed summaries.
            </Typography>
            <Button 
              component={Link} 
              to="/hsreports" 
              variant="contained" 
              fullWidth
              className="hsneon-button secondary"
            >
              Reports and Analytics
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper className="hsdashboard-item">
            <Typography variant="h6" gutterBottom>
              Quickly access emergency contacts and services, with an SOS button for immediate assistance.
            </Typography>
            <Button 
              component={Link} 
              to="/hsemergency" 
              variant="contained" 
              fullWidth
              className="hsneon-button danger"
            >
              Emergency Services
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
    </>
  );
}

export default Dashboard;
