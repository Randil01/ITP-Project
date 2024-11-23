import React, { useState } from 'react';
import { Container, Typography, Button, Paper, Grid, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

function MedicalRecords() {
  const [records, setRecords] = useState([]);
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = (e) => {
    e.preventDefault();

    if (file && description) {
      const newRecord = { id: records.length + 1, file: file.name, description };
      setRecords([...records, newRecord]);
      setFile(null);
      setDescription('');
    } else {
      alert('Please provide a file and description.');
    }
  };

  const handleDelete = (id) => {
    setRecords(records.filter(record => record.id !== id));
  };

  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        Medical Records
      </Typography>
      <Typography variant="h5" paragraph>
        Here you can manage your medical history, upload records, and more.
      </Typography>

      {/* Form to Upload Medical Records */}
      <Paper style={{ padding: '20px', marginBottom: '20px' }}>
        <Typography variant="h6" gutterBottom>
          Upload New Medical Record
        </Typography>
        <form onSubmit={handleUpload}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="file"
                onChange={handleFileChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Upload Record
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {/* Table to Display Uploaded Records */}
      <Typography variant="h6" gutterBottom>
        Your Medical Records
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell>File Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{record.description}</TableCell>
                <TableCell>{record.file}</TableCell>
                <TableCell>
                  <Button color="secondary" onClick={() => handleDelete(record.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default MedicalRecords;
