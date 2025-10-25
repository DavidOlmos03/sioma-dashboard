import React, { useEffect, useState, useCallback } from 'react';
import { AppBar, Toolbar, Typography, Container, Grid, Button, Box, CircularProgress, Alert, Dialog, DialogContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import apiService, { Device } from '../services/apiService';
import DeviceList from '../components/DeviceList';
import CreateCodeForm from '../components/CreateCodeForm';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const [openCreateCodeModal, setOpenCreateCodeModal] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  const fetchDevices = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedDevices = await apiService.getDevices();
      setDevices(fetchedDevices);
    } catch (err) {
      setError('Failed to fetch devices.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDevices();
  }, [fetchDevices]);

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  const handleOpenCreateCodeModal = () => {
    setOpenCreateCodeModal(true);
  };

  const handleCloseCreateCodeModal = () => {
    setOpenCreateCodeModal(false);
    setFormError(null);
  };

  const handleCreateCodeSubmit = async (code: string, description: string, expiresAt: number | null) => {
    try {
      setFormLoading(true);
      setFormError(null);
      const newCode = await apiService.createActivationCode(code, description, expiresAt);
      alert(`Successfully created code: ${newCode.code}`);
      handleCloseCreateCodeModal();
    } catch (err) {
      setFormError('Failed to create code. Please check the fields.');
      console.error(err);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeactivateDevice = async (deviceId: string) => {
    if (window.confirm('Are you sure you want to deactivate this device?')) {
      try {
        setActionError(null);
        await apiService.deactivateDevice(deviceId);
        await fetchDevices(); // Refresh the list
      } catch (err) {
        setActionError('Failed to deactivate device.');
        console.error(err);
      }
    }
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Sioma Dashboard
          </Typography>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4">Devices</Typography>
          <Button variant="contained" onClick={handleOpenCreateCodeModal}>
            Create New Code
          </Button>
        </Box>
        {actionError && <Alert severity="error" sx={{ mb: 2 }}>{actionError}</Alert>}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
              </Box>
            ) : error ? (
              <Alert severity="error">{error}</Alert>
            ) : (
              <DeviceList devices={devices} onDeactivate={handleDeactivateDevice} />
            )}
          </Grid>
        </Grid>
      </Container>

      <Dialog open={openCreateCodeModal} onClose={handleCloseCreateCodeModal}>
        <DialogContent>
          {formError && <Alert severity="error" sx={{ mb: 2 }}>{formError}</Alert>}
          <CreateCodeForm 
            onSubmit={handleCreateCodeSubmit} 
            onCancel={handleCloseCreateCodeModal} 
            loading={formLoading} 
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Dashboard;