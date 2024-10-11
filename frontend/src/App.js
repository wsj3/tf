import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
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
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
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
    </Router>
  );
}

export default App;