require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const userRoutes = require('./routes/userRoutes');

// Side menu routes
const calendarRoutes = require('./routes/calendar');
const patientsRoutes = require('./routes/patients');
const messagesRoutes = require('./routes/messages');
const billingRoutes = require('./routes/billing');
const recordsRoutes = require('./routes/records');
const sessionsRoutes = require('./routes/sessions');
const treatmentRoutes = require('./routes/treatment');
const analysisRoutes = require('./routes/analysis');
const settingsRoutes = require('./routes/settings');

// Top menu routes
const aboutRoutes = require('./routes/about');
const helpRoutes = require('./routes/help');
const authRoutes = require('./routes/auth');
const assistantRoutes = require('./routes/assistant');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI;

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

// Side menu routes
app.use('/api/calendar', calendarRoutes);
app.use('/api/patients', patientsRoutes);
app.use('/api/messages', messagesRoutes);
app.use('/api/billing', billingRoutes);
app.use('/api/records', recordsRoutes);
app.use('/api/sessions', sessionsRoutes);
app.use('/api/treatment', treatmentRoutes);
app.use('/api/analysis', analysisRoutes);
app.use('/api/settings', settingsRoutes);

// Top menu routes
app.use('/api/about', aboutRoutes);
app.use('/api/help', helpRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/assistant', assistantRoutes);

// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});