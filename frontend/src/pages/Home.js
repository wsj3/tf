import React from 'react';
import { Typography, Box } from '@mui/material';

function Home() {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center', 
      alignItems: 'center', 
      height: 'calc(100vh - 64px)', // Adjust based on your header height
      backgroundColor: '#f5f5f5', // Light background color
    }}>
      <Typography 
        variant="h5" 
        align="center" 
        sx={{ 
          color: '#333', // Dark text color for better readability
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