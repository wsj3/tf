import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Box, Typography, Paper, CircularProgress, IconButton, Button } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';

const backendUrl = process.env.REACT_APP_AI_BACKEND_URL || 'http://localhost:5000/api/assistant';
console.log("Backend URL:", backendUrl);

function AIAssistant({ isEnabled }) {
  const [conversation, setConversation] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const mediaRecorderRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const audioChunksRef = useRef([]);
  const isEnabledRef = useRef(isEnabled);
  const processingIntervalRef = useRef(null);

  const processAudio = useCallback(async () => {
    if (!backendUrl || audioChunksRef.current.length === 0) {
      console.log("No audio to process or backend URL not set");
      return;
    }
    setIsProcessing(true);
    try {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
      console.log(`Processing audio, total size: ${audioBlob.size} bytes`);
      const formData = new FormData();
      formData.append('audio', audioBlob, 'recording.wav');

      console.log('Sending audio to backend for processing...');
      const response = await fetch(`${backendUrl}/process`, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      const data = await response.json();
      console.log('Received response from backend:', data);
      setConversation(prev => [
        ...prev,
        { type: 'user', text: data.transcript },
        { type: 'ai', text: data.response }
      ]);

      // Play the audio response
      const audio = new Audio(`${backendUrl}${data.audio_url}`);
      audio.play();
    } catch (error) {
      console.error('Error processing audio:', error);
      setConversation(prev => [
        ...prev,
        { type: 'user', text: 'Audio input' },
        { type: 'ai', text: `Sorry, I encountered an error: ${error.message}. Please check your connection and try again.` }
      ]);
      setError(`Failed to process audio: ${error.message}`);
    } finally {
      setIsProcessing(false);
      audioChunksRef.current = []; // Clear processed audio chunks
    }
  }, [backendUrl]);

  const monitorAudioLevels = useCallback(() => {
    if (analyserRef.current) {
      const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
      const updateLevel = () => {
        analyserRef.current.getByteFrequencyData(dataArray);
        const average = dataArray.reduce((acc, value) => acc + value, 0) / dataArray.length;
        setAudioLevel(average);
        if (isListening) {
          requestAnimationFrame(updateLevel);
        }
      };
      updateLevel();
    }
  }, [isListening]);

  const startListening = useCallback(() => {
    if (!isListening && isEnabledRef.current) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          console.log('Microphone access granted');
          const mediaRecorder = new MediaRecorder(stream);
          mediaRecorderRef.current = mediaRecorder;
          audioChunksRef.current = [];

          // Set up audio context for level monitoring
          audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
          analyserRef.current = audioContextRef.current.createAnalyser();
          const source = audioContextRef.current.createMediaStreamSource(stream);
          source.connect(analyserRef.current);

          mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
              audioChunksRef.current.push(event.data);
              console.log('Audio data available, chunk size:', event.data.size);
            }
          };

          mediaRecorder.start(1000); // Record in 1-second chunks
          console.log('MediaRecorder started');
          setIsListening(true);

          // Start monitoring audio levels
          monitorAudioLevels();

          // Set up interval for automatic processing
          processingIntervalRef.current = setInterval(() => {
            if (audioChunksRef.current.length > 0) {
              processAudio();
            }
          }, 5000); // Process every 5 seconds if there's audio
        })
        .catch(err => {
          console.error('Error accessing microphone:', err);
          setError('Could not access microphone');
        });
    }
  }, [isListening, processAudio, monitorAudioLevels]);

  const stopListening = useCallback(() => {
    if (isListening && mediaRecorderRef.current) {
      console.log('Stopping MediaRecorder');
      mediaRecorderRef.current.stop();
      setIsListening(false);
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      if (processingIntervalRef.current) {
        clearInterval(processingIntervalRef.current);
      }
    }
  }, [isListening]);

  const manualProcessAudio = () => {
    if (audioChunksRef.current.length > 0) {
      processAudio();
    } else {
      console.log("No audio data to process");
    }
  };

  useEffect(() => {
    isEnabledRef.current = isEnabled;
    if (isEnabled) {
      console.log('AI Assistant enabled, starting listening');
      startListening();
    } else {
      console.log('AI Assistant disabled, stopping listening');
      stopListening();
    }
  }, [isEnabled, startListening, stopListening]);

  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      if (processingIntervalRef.current) {
        clearInterval(processingIntervalRef.current);
      }
    };
  }, []);

  if (!isEnabled) return null;

  return (
    <Paper elevation={3} sx={{ position: 'fixed', bottom: 20, right: 20, width: 300, maxHeight: 400, p: 2, overflowY: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">AI Assistant</Typography>
        <IconButton onClick={isListening ? stopListening : startListening}>
          {isListening ? <MicIcon color="primary" /> : <MicOffIcon />}
        </IconButton>
      </Box>
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      <Box sx={{ mb: 2, height: 20, bgcolor: 'grey.300' }}>
        <Box sx={{ width: `${audioLevel / 2.55}%`, height: '100%', bgcolor: 'primary.main' }} />
      </Box>
      <Button onClick={manualProcessAudio} disabled={!isListening || isProcessing}>
        Process Audio
      </Button>
      {conversation.length === 0 ? (
        <Typography variant="body2">How can I assist you today?</Typography>
      ) : (
        conversation.map((message, index) => (
          <Typography key={index} variant="body2" sx={{ mb: 1, textAlign: message.type === 'user' ? 'right' : 'left' }}>
            <strong>{message.type === 'user' ? 'You: ' : 'AI: '}</strong>{message.text}
          </Typography>
        ))
      )}
      {isProcessing && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <CircularProgress size={24} />
        </Box>
      )}
      {isListening && (
        <Typography variant="body2" sx={{ mt: 1, fontStyle: 'italic', color: 'primary.main' }}>
          Listening... (Audio level: {audioLevel.toFixed(2)})
        </Typography>
      )}
    </Paper>
  );
}

export default AIAssistant;