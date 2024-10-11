import React, { useState } from 'react';
import { Typography, Box, Paper, List, ListItem, ListItemText, TextField, Button, Grid } from '@mui/material';

function Notes() {
  const [notes, setNotes] = useState([
    { id: 1, title: 'Session with John Doe', content: 'Patient showed improvement in...', date: '2024-10-01' },
    { id: 2, title: 'Follow-up with Jane Smith', content: 'Discussed new treatment options...', date: '2024-10-03' },
  ]);
  const [newNote, setNewNote] = useState({ title: '', content: '' });

  const handleAddNote = () => {
    if (newNote.title && newNote.content) {
      setNotes([...notes, { ...newNote, id: Date.now(), date: new Date().toISOString().split('T')[0] }]);
      setNewNote({ title: '', content: '' });
    }
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <Typography variant="h4" gutterBottom>Notes</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: 'calc(100vh - 200px)', overflow: 'auto' }}>
            <List>
              {notes.map((note) => (
                <ListItem key={note.id}>
                  <ListItemText 
                    primary={note.title}
                    secondary={`${note.content.substring(0, 50)}... - ${note.date}`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: 'calc(100vh - 200px)' }}>
            <TextField
              fullWidth
              label="Note Title"
              value={newNote.title}
              onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Note Content"
              multiline
              rows={4}
              value={newNote.content}
              onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
              margin="normal"
            />
            <Button variant="contained" color="primary" onClick={handleAddNote} sx={{ mt: 2 }}>
              Add Note
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Notes;