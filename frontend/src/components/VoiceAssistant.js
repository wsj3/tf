import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Button } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';

function VoiceAssistant() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      recognitionRef.current = new window.webkitSpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event) => {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript;
        setTranscript(transcript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const toggleListening = () => {
    if (recognitionRef.current) {
      if (isListening) {
        recognitionRef.current.stop();
      } else {
        recognitionRef.current.start();
      }
      setIsListening(!isListening);
    } else {
      console.error('Speech recognition is not supported in this browser');
    }
  };

  return (
    <Box sx={{ position: 'fixed', bottom: 20, right: 20, backgroundColor: 'rgba(0,0,0,0.7)', padding: 2, borderRadius: 2 }}>
      <Typography variant="h6" color="white">AI Assistant</Typography>
      <Button 
        variant="contained" 
        color={isListening ? "secondary" : "primary"} 
        onClick={toggleListening}
        startIcon={<MicIcon />}
      >
        {isListening ? 'Stop Listening' : 'Start Listening'}
      </Button>
      <Typography color="white">Transcript: {transcript}</Typography>
    </Box>
  );
}

export default VoiceAssistant;