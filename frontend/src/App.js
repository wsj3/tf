import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from './components/Header';
import Layout from './components/Layout';
import VoiceAssistant from './components/VoiceAssistant';
import AIAssistant from './components/AIAssistant';

// Import all page components
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Help from './pages/Help';
import Calendar from './pages/Calendar';
import Patients from './pages/Patients';
import Messages from './pages/Messages';
import Billing from './pages/Billing';
import Notes from './pages/Notes';
import Analytics from './pages/Analytics';
import VideoSessions from './pages/VideoSessions';
import Diagnosis from './pages/Diagnosis';
import Settings from './pages/Settings';

function App() {
  const [isAIAssistantEnabled, setIsAIAssistantEnabled] = useState(false);

  const toggleAIAssistant = () => {
    setIsAIAssistantEnabled(prev => !prev);
    console.log('AI Assistant toggled:', !isAIAssistantEnabled); // For debugging
  };

  return (
    <Router>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header 
          isAIAssistantEnabled={isAIAssistantEnabled} 
          toggleAIAssistant={toggleAIAssistant} 
        />
        <Box sx={{ display: 'flex', flexGrow: 1 }}>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/help" element={<Help />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/patients" element={<Patients />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/billing" element={<Billing />} />
              <Route path="/notes" element={<Notes />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/video-sessions" element={<VideoSessions />} />
              <Route path="/diagnosis" element={<Diagnosis />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Layout>
        </Box>
        {isAIAssistantEnabled && <VoiceAssistant />}
        <AIAssistant isEnabled={isAIAssistantEnabled} />
      </Box>
    </Router>
  );
}

export default App;