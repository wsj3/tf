import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText, Switch, Box, FormControlLabel } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PeopleIcon from '@mui/icons-material/People';
import MessageIcon from '@mui/icons-material/Message';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import NoteIcon from '@mui/icons-material/Note';
import BarChartIcon from '@mui/icons-material/BarChart';
import VideocamIcon from '@mui/icons-material/Videocam';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import SettingsIcon from '@mui/icons-material/Settings';
import SmartToyIcon from '@mui/icons-material/SmartToy';

// ... rest of your Sidebar component code ...

function Sidebar({ isAIAssistantEnabled, toggleAIAssistant }) {
  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'Calendar', icon: <CalendarTodayIcon />, path: '/calendar' },
    { text: 'Patients', icon: <PeopleIcon />, path: '/patients' },
    { text: 'Messages', icon: <MessageIcon />, path: '/messages' },
    { text: 'Billing', icon: <AttachMoneyIcon />, path: '/billing' },
    { text: 'Notes', icon: <NoteIcon />, path: '/notes' },
    { text: 'Analytics', icon: <BarChartIcon />, path: '/analytics' },
    { text: 'Video Sessions', icon: <VideocamIcon />, path: '/video-sessions' },
    { text: 'Diagnosis', icon: <LocalHospitalIcon />, path: '/diagnosis' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
  ];

  return (
    <Box sx={{ width: 240, flexShrink: 0, bgcolor: 'background.paper', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <List sx={{ flexGrow: 1 }}>
        {menuItems.map((item) => (
          <ListItem button key={item.text} component={Link} to={item.path}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <FormControlLabel
        control={
          <Switch
            checked={isAIAssistantEnabled}
            onChange={toggleAIAssistant}
            name="aiAssistant"
            color="primary"
          />
        }
        label="AI Assistant"
        icon={<SmartToyIcon />}
        sx={{ m: 2 }}
      />
    </Box>
  );
}

export default Sidebar;