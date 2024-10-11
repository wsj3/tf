import React, { useState } from 'react';
import { Typography, Box, Paper, TextField, Button, List, ListItem, ListItemText } from '@mui/material';

function Diagnosis() {
  const [symptoms, setSymptoms] = useState('');
  const [diagnoses, setDiagnoses] = useState([
    { id: 1, condition: 'Generalized Anxiety Disorder', probability: '75%' },
    { id: 2, condition: 'Major Depressive Disorder', probability: '60%' },
  ]);

  const handleDiagnose = () => {
    // In a real app, this would call an AI service for diagnosis
    console.log('Diagnosing based on symptoms:', symptoms);
    // For now, we'll just add a dummy diagnosis
    setDiagnoses([...diagnoses, { 
      id: Date.now(), 
      condition: 'New Condition', 
      probability: Math.floor(Math.random() * 100) + '%' 
    }]);
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <Typography variant="h4" gutterBottom>Diagnosis</Typography>
      <Paper sx={{ p: 2, mb: 3 }}>
        <TextField
          fullWidth
          label="Enter patient symptoms"
          multiline
          rows={4}
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleDiagnose} sx={{ mt: 2 }}>
          Diagnose
        </Button>
      </Paper>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>Potential Diagnoses</Typography>
        <List>
          {diagnoses.map((diagnosis) => (
            <ListItem key={diagnosis.id}>
              <ListItemText
                primary={diagnosis.condition}
                secondary={`Probability: ${diagnosis.probability}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
}

export default Diagnosis;