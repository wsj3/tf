import React from 'react';
import { Typography, Box } from '@mui/material';

function About() {
  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4">About Us</Typography>
      <Typography>This is the about page. Add information about your organization here.</Typography>
    </Box>
  );
}

export default About;