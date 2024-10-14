import React from 'react';
import { AppBar, Toolbar, Typography, Switch, FormControlLabel, Button, Box } from '@mui/material';

function Header({ isAIAssistantEnabled, toggleAIAssistant }) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Therapist's Friend
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <FormControlLabel
            control={
              <Switch
                checked={isAIAssistantEnabled}
                onChange={toggleAIAssistant}
                name="aiAssistant"
                color="secondary"
              />
            }
            label="AI Assistant"
          />
          <Button color="inherit">LOGIN</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;