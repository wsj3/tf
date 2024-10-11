import React from 'react';
import { Typography, Box } from '@mui/material';

function Home() {
  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: 'calc(100vh - 64px)' // Adjust based on your header height
    }}>
      <Typography 
        variant="h5" 
        align="center" 
        sx={{ 
          color: '#ecf0f1', 
          maxWidth: '800px',
          padding: '20px'
        }}
      >
        Welcome to the AI driven tool in support of mental health therapy, provided by non-profit Vistral.
      </Typography>
    </Box>
  );
}

export default Home;