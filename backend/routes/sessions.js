const express = require('express');
const router = express.Router();

// Get all sessions
router.get('/', (req, res) => {
  res.json({ message: 'Get all sessions' });
});

// Get a specific session
router.get('/:id', (req, res) => {
  res.json({ message: `Get session with id ${req.params.id}` });
});

// Create a new session
router.post('/', (req, res) => {
  res.json({ message: 'Create a new session' });
});

// Update a session
router.put('/:id', (req, res) => {
  res.json({ message: `Update session with id ${req.params.id}` });
});

// Delete a session
router.delete('/:id', (req, res) => {
  res.json({ message: `Delete session with id ${req.params.id}` });
});

module.exports = router;