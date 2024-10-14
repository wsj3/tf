import React from 'react';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';

function Layout({ children, isAIAssistantEnabled, toggleAIAssistant }) {
  return (
    <Box sx={{ display: 'flex', flexGrow: 1 }}>
      <Sidebar isAIAssistantEnabled={isAIAssistantEnabled} toggleAIAssistant={toggleAIAssistant} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
}

export default Layout;