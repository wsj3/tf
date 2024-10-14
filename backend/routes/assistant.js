const express = require('express');
const router = express.Router();

router.post('/enable', (req, res) => {
  res.json({ message: 'Assistant enabled' });
});

router.post('/disable', (req, res) => {
  res.json({ message: 'Assistant disabled' });
});

// Add a GET route for testing purposes
router.get('/process', (req, res) => {
  res.json({ message: 'AI Assistant process route is working' });
});

router.post('/process', (req, res) => {
  const { input } = req.body;
  // Here you would process the input and generate a response
  // For now, let's just echo the input
  res.json({ response: `You said: ${input}` });
});

module.exports = router;