import React from 'react';
import { Typography, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';

function Patients() {
  const patients = [
    { id: 1, name: 'John Doe', age: 35, lastVisit: '2024-10-01' },
    { id: 2, name: 'Jane Smith', age: 28, lastVisit: '2024-10-05' },
    { id: 3, name: 'Alice Johnson', age: 42, lastVisit: '2024-09-30' },
  ];

  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <Typography variant="h4" gutterBottom>Patients</Typography>
      <Button variant="contained" color="primary" sx={{ mb: 2 }}>Add New Patient</Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Age</TableCell>
              <TableCell align="right">Last Visit</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell component="th" scope="row">{patient.name}</TableCell>
                <TableCell align="right">{patient.age}</TableCell>
                <TableCell align="right">{patient.lastVisit}</TableCell>
                <TableCell align="right">
                  <Button size="small">View</Button>
                  <Button size="small">Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Patients;