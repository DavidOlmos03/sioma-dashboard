import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink, Outlet } from 'react-router-dom';
import authService from '../services/authService';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Sioma Dashboard
          </Typography>
          <Button color="inherit" component={RouterLink} to="/">Metrics</Button>
          <Button color="inherit" component={RouterLink} to="/dashboard/devices">Devices</Button>
          <Button color="inherit" component={RouterLink} to="/dashboard/workers">Workers</Button>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ p: 3 }}>
        <Outlet />
      </Box>
    </div>
  );
}

export default Dashboard;