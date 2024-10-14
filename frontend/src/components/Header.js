import React from 'react';
import { AppBar, Toolbar, Typography, Switch, Box, Button, Chip } from '@mui/material';
import { Link } from 'react-router-dom';
import MicIcon from '@mui/icons-material/Mic';

function Header({ isAIAssistantEnabled, toggleAIAssistant }) {
  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: 'space-between', padding: '0 16px' }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 0 }}>
          Therapist's Friend
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
            <Typography variant="body2" sx={{ mr: 1, color: 'white' }}>AI Assistant</Typography>
            <Switch
              checked={isAIAssistantEnabled}
              onChange={toggleAIAssistant}
              color="default"
              size="small"
            />
            {isAIAssistantEnabled && (
              <Chip
                icon={<MicIcon />}
                label="Listening"
                color="secondary"
                size="small"
                sx={{ ml: 1 }}
              />
            )}
          </Box>
          <Button color="inherit" component={Link} to="/about" size="small">ABOUT</Button>
          <Button color="inherit" component={Link} to="/contact" size="small">CONTACT</Button>
          <Button color="inherit" component={Link} to="/help" size="small">HELP</Button>
          <Button color="inherit" size="small">LOGIN</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;