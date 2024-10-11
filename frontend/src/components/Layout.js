import React from 'react';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import Header from './Header';

function Layout({ children }) {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#1e2a38' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Header />
        <Box component="main" sx={{ flexGrow: 1, p: 3, color: '#fff' }}>
          {children}
        </Box>
        <Box component="footer" sx={{ p: 2, textAlign: 'center', color: '#8b939c', bgcolor: '#1e2a38' }}>
          "2024 Therapist's Friend. All rights reserved."
        </Box>
      </Box>
    </Box>
  );
}

export default Layout;