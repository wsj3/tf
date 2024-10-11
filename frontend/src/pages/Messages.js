import React from 'react';
import { Typography, Box, Paper, List, ListItem, ListItemText, Divider, TextField, Button } from '@mui/material';

function Messages() {
  const messages = [
    { id: 1, sender: 'John Doe', content: 'Hello, I have a question about my appointment.', timestamp: '10:30 AM' },
    { id: 2, sender: 'Jane Smith', content: 'Thank you for the last session.', timestamp: '11:45 AM' },
    { id: 3, sender: 'Alice Johnson', content: 'Can we reschedule our next meeting?', timestamp: '2:15 PM' },
  ];

  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <Typography variant="h4" gutterBottom>Messages</Typography>
      <Paper sx={{ p: 2, maxHeight: 'calc(100vh - 200px)', overflow: 'auto' }}>
        <List>
          {messages.map((message) => (
            <React.Fragment key={message.id}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={message.sender}
                  secondary={
                    <React.Fragment>
                      <Typography component="span" variant="body2" color="text.primary">
                        {message.content}
                      </Typography>
                      {` — ${message.timestamp}`}
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider component="li" />
            </React.Fragment>
          ))}
        </List>
        <Box sx={{ mt: 2 }}>
          <TextField fullWidth label="Type a message" variant="outlined" />
          <Button variant="contained" color="primary" sx={{ mt: 1 }}>Send</Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default Messages;