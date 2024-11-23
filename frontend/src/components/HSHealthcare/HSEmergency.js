import React from 'react';
import { Container, Typography, Button, List, ListItem, ListItemText, Divider } from '@mui/material';

const emergencyContacts = [
  { name: 'Police Emergency', number: '119' },
  { name: 'Fire Service', number: '110' },
  { name: 'Ambulance Service', number: '1990' },
  { name: 'National Hospital Colombo', number: '011 269 1111' },
  { name: 'Sri Lanka Red Cross Society', number: '011 258 1234' },
  { name: 'Child Protection Authority', number: '1929' },
];

function Emergency() {
  const handleSOS = () => {
    // Placeholder for SOS functionality
    // Here you can implement a call to a specific emergency number or a notification system
    alert('SOS! Help is on the way.'); // For demo purposes
    // For actual implementation, you might want to use a calling function or link
    // Example: window.location.href = `tel:119`; // This can initiate a call on mobile devices
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
        Emergency Contacts
      </Typography>
      <Typography variant="h5" paragraph>
        Quickly access emergency contacts and services.
      </Typography>

      {/* Emergency Contacts List */}
      <List>
        {emergencyContacts.map((contact, index) => (
          <div key={index}>
            <ListItem>
              <ListItemText primary={contact.name} secondary={contact.number} />
            </ListItem>
            {index < emergencyContacts.length - 1 && <Divider />}
          </div>
        ))}
      </List>

      {/* SOS Button */}
      <Button variant="contained" color="error" onClick={handleSOS} style={{ marginTop: '20px', width: '100%' }}>
        SOS
      </Button>
    </Container>
    </>
  );
}

export default Emergency;
