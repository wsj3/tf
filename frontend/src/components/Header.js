import React, { useState } from 'react';
import { AppBar, Toolbar, Button, IconButton, Switch, FormControlLabel } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [aiAssistantEnabled, setAiAssistantEnabled] = useState(false);

  const handleLoginLogout = () => {
    setIsLoggedIn(!isLoggedIn);
    // Add actual login/logout logic here
  };

  const handleAiAssistantToggle = () => {
    setAiAssistantEnabled(!aiAssistantEnabled);
    // Add logic to enable/disable AI assistant here
  };

  return (
    <AppBar position="static" sx={{ bgcolor: '#f0f2f5', boxShadow: 'none' }}>
      <Toolbar>
        <Button color="inherit" component={Link} to="/about" sx={{ color: '#333', textTransform: 'uppercase' }}>About</Button>
        <Button color="inherit" component={Link} to="/contact" sx={{ color: '#333', textTransform: 'uppercase' }}>Contact</Button>
        <Button color="inherit" component={Link} to="/help" sx={{ color: '#333', textTransform: 'uppercase' }}>Help</Button>
        <div style={{ flexGrow: 1 }}></div>
        <FormControlLabel
          control={
            <Switch
              checked={aiAssistantEnabled}
              onChange={handleAiAssistantToggle}
              color="primary"
            />
          }
          label="AI Assistant"
          sx={{ color: '#333', mr: 2 }}
        />
        <Button 
          color="inherit" 
          onClick={handleLoginLogout} 
          sx={{ color: '#333', textTransform: 'uppercase', mr: 2 }}
        >
          {isLoggedIn ? 'Logout' : 'Login'}
        </Button>
        <IconButton
          size="large"
          aria-label="account of current user"
          color="inherit"
          sx={{ color: '#333' }}
        >
          <AccountCircleIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Header;