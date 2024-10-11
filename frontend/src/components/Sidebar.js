import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PeopleIcon from '@mui/icons-material/People';
import EmailIcon from '@mui/icons-material/Email';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import NoteIcon from '@mui/icons-material/Note';
import BarChartIcon from '@mui/icons-material/BarChart';
import VideocamIcon from '@mui/icons-material/Videocam';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import SettingsIcon from '@mui/icons-material/Settings';
import logo from '../assets/logo.png'; // Make sure to add your logo file

const menuItems = [
  { text: 'Home', icon: <HomeIcon />, path: '/' },
  { text: 'Calendar', icon: <CalendarTodayIcon />, path: '/calendar' },
  { text: 'Patients', icon: <PeopleIcon />, path: '/patients' },
  { text: 'Messages', icon: <EmailIcon />, path: '/messages' },
  { text: 'Billing', icon: <AttachMoneyIcon />, path: '/billing' },
  { text: 'Notes', icon: <NoteIcon />, path: '/notes' },
  { text: 'Analytics', icon: <BarChartIcon />, path: '/analytics' },
  { text: 'Video Sessions', icon: <VideocamIcon />, path: '/video-sessions' },
  { text: 'Diagnosis', icon: <LocalHospitalIcon />, path: '/diagnosis' },
  { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
];

function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          bgcolor: '#1a2035',
          color: 'white',
        },
      }}
    >
      <Box
        component={Link}
        to="/"
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: 2,
          textDecoration: 'none',
          color: 'white',
        }}
      >
        <img src={logo} alt="Logo" style={{ width: 40, marginRight: 10 }} />
        <Typography variant="h6">Therapist's Friend</Typography>
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItem button key={item.text} component={Link} to={item.path}>
            <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default Sidebar;