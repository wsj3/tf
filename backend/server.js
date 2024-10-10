require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const userRoutes = require('./routes/userRoutes');

const app = express();  // Move this line up, right after requiring express

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGODB_URI = 'mongodb+srv://johnstonswill:HotTuna99*@cluster0.7luwt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGODB_URI, { 
  serverSelectionTimeoutMS: 5000,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('Could not connect to MongoDB');
    console.error('Error name:', err.name);
    console.error('Error message:', err.message);
    console.error('Full error object:', JSON.stringify(err, null, 2));
    process.exit(1);
  });

// Routes
app.get('/', (req, res) => {
  res.send('Therapist Friend API is running');
});

app.use('/api/users', userRoutes);

// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});