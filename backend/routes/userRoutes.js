const express = require('express');
const router = express.Router();
const User = require('../models/User');

console.log('User model loaded:', User);

// Create a new user
router.post('/', async (req, res, next) => {
  console.log('POST /users route hit');
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    next(error);
  }
});

// Get all users
router.get('/', async (req, res, next) => {
  console.log('GET /users route hit');
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    next(error);
  }
});

module.exports = router;