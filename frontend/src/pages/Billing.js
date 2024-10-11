import React from 'react';
import { Typography, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';

function Billing() {
  const billings = [
    { id: 1, patient: 'John Doe', amount: 150, date: '2024-10-01', status: 'Paid' },
    { id: 2, patient: 'Jane Smith', amount: 200, date: '2024-10-03', status: 'Pending' },
    { id: 3, patient: 'Alice Johnson', amount: 175, date: '2024-10-05', status: 'Paid' },
  ];

  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <Typography variant="h4" gutterBottom>Billing</Typography>
      <Button variant="contained" color="primary" sx={{ mb: 2 }}>Create New Invoice</Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Patient</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {billings.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">{row.patient}</TableCell>
                <TableCell align="right">${row.amount}</TableCell>
                <TableCell align="right">{row.date}</TableCell>
                <TableCell align="right">{row.status}</TableCell>
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

export default Billing;