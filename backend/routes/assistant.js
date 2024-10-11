const express = require('express');
const router = express.Router();

router.post('/enable', (req, res) => {
  res.json({ message: 'Assistant enabled' });
});

router.post('/disable', (req, res) => {
  res.json({ message: 'Assistant disabled' });
});

module.exports = router;