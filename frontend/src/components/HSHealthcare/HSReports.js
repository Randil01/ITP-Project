import React from 'react';
import { Container, Typography, Button, Paper, Grid } from '@mui/material';

function Reports() {
  const handleDownload = () => {
    // Placeholder for download functionality
    alert('Downloading the health report...');
  };

  const handlePrint = () => {
    // Placeholder for print functionality
    window.print();
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
        Health Reports
      </Typography>
      <Typography variant="h5" paragraph>
        Access personalized health reports, track your health metrics over time, and download or print detailed summaries.
      </Typography>

      {/* Personalized Health Summary */}
      <Paper style={{ padding: '20px', marginBottom: '20px' }}>
        <Typography variant="h6" gutterBottom>
          Your Health Summary
        </Typography>
        <Typography variant="body1">
          Here you can view your personalized health metrics and summaries based on your records.
        </Typography>
        {/* Example Metrics (You can replace this with dynamic data) */}
        <Grid container spacing={2} style={{ marginTop: '20px' }}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2">Blood Pressure: 120/80 mmHg</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2">Cholesterol Level: 180 mg/dL</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2">BMI: 22.5</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2">Last Consultation: 2023-09-01</Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Download and Print Buttons */}
      <Grid container spacing={2} justifyContent="center">
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleDownload}>
            Download Report
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="secondary" onClick={handlePrint}>
            Print Report
          </Button>
        </Grid>
      </Grid>
    </Container>
    </>
  );
}

export default Reports;
