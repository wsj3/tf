const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Treatment route' });
});

module.exports = router;