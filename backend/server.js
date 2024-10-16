const path = require('path');
const dotenv = require('dotenv');

console.log('Current directory:', __dirname);
console.log('Env file path:', path.resolve(__dirname, '.env'));

const result = dotenv.config({ path: path.resolve(__dirname, '.env') });
if (result.error) {
  console.log('Error loading .env file:', result.error);
} else {
  console.log('.env file loaded successfully');
}

console.log('OPENAI_API_KEY:', process.env.OPENAI_API_KEY ? 'API key is set' : 'API key is missing');
console.log('Environment variables:', Object.keys(process.env));

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const { OpenAI } = require('openai');

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Set up multer for handling file uploads
const upload = multer({ dest: 'uploads/' });

// Initialize OpenAI
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI;
console.log('MONGODB_URI:', process.env.MONGODB_URI);
console.log('PORT:', process.env.PORT);

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

// AI Assistant route
app.post('/api/assistant/process', upload.single('audio'), async (req, res) => {
  console.log('Received audio processing request');
  if (!req.file) {
    console.log('No audio file provided');
    return res.status(400).json({ error: "No audio file provided" });
  }

  try {
    console.log('Transcribing audio...');
    const transcript = await openai.audio.transcriptions.create({
      file: fs.createReadStream(req.file.path),
      model: "whisper-1",
    });
    console.log('Transcript:', transcript.text);

    console.log('Generating response...');
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: transcript.text }
      ],
    });
    const responseText = completion.choices[0].message.content;
    console.log('AI Response:', responseText);

    console.log('Converting response to speech...');
    const speechFile = path.resolve("./tmp/response.mp3");
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: "alloy",
      input: responseText,
    });
    const buffer = Buffer.from(await mp3.arrayBuffer());
    await fs.promises.writeFile(speechFile, buffer);

    console.log('Sending response...');
    res.json({
      transcript: transcript.text,
      response: responseText,
      audio_url: "/api/assistant/audio"
    });

  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: "An error occurred while processing your request", details: error.message, stack: error.stack });
  } finally {
    // Clean up the uploaded file
    fs.unlink(req.file.path, (err) => {
      if (err) console.error('Error deleting file:', err);
    });
  }
});

// Route to serve the generated audio file
app.get('/api/assistant/audio', (req, res) => {
  const filePath = path.resolve("./tmp/response.mp3");
  res.sendFile(filePath);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});