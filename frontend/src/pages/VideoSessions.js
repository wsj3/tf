import React from 'react';
import { Typography, Box, Paper, Grid, Button, List, ListItem, ListItemText } from '@mui/material';

function VideoSessions() {
  const upcomingSessions = [
    { id: 1, patient: 'John Doe', date: '2024-10-15', time: '10:00 AM' },
    { id: 2, patient: 'Jane Smith', date: '2024-10-16', time: '2:00 PM' },
    { id: 3, patient: 'Alice Johnson', date: '2024-10-17', time: '11:30 AM' },
  ];

  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <Typography variant="h4" gutterBottom>Video Sessions</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: 'calc(100vh - 200px)' }}>
            <Typography variant="h6" gutterBottom>Upcoming Sessions</Typography>
            <List>
              {upcomingSessions.map((session) => (
                <ListItem key={session.id}>
                  <ListItemText
                    primary={session.patient}
                    secondary={`${session.date} at ${session.time}`}
                  />
                  <Button variant="contained" color="primary">Join</Button>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: 'calc(100vh - 200px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="h6">Video Session Area</Typography>
            {/* Add video component here */}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default VideoSessions;