const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
  res.json({ message: 'Login route' });
});

router.post('/logout', (req, res) => {
  res.json({ message: 'Logout route' });
});

module.exports = router;