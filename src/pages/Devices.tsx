import React, { useEffect, useState, useCallback } from 'react';
import { Container, Grid, Button, Box, CircularProgress, Alert, Dialog, DialogContent, Typography } from '@mui/material';
import apiService, { Device } from '../services/apiService';
import DeviceList from '../components/DeviceList';
import CreateCodeForm from '../components/CreateCodeForm';
import RegisterDeviceForm from '../components/RegisterDeviceForm';
import { DeviceRegistrationData } from '../services/apiService';

const Devices: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const [openCreateCodeModal, setOpenCreateCodeModal] = useState(false);
  const [openRegisterDeviceModal, setOpenRegisterDeviceModal] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  const fetchDevices = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedDevices = await apiService.getAllDevices();
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

  const handleOpenCreateCodeModal = () => {
    setOpenCreateCodeModal(true);
  };

  const handleCloseCreateCodeModal = () => {
    setOpenCreateCodeModal(false);
    setFormError(null);
  };

  const handleOpenRegisterDeviceModal = () => {
    setOpenRegisterDeviceModal(true);
  };

  const handleCloseRegisterDeviceModal = () => {
    setOpenRegisterDeviceModal(false);
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

  const handleRegisterDeviceSubmit = async (data: DeviceRegistrationData) => {
    try {
      setFormLoading(true);
      setFormError(null);
      await apiService.registerDevice(data);
      alert(`Successfully registered device: ${data.device_name}`);
      handleCloseRegisterDeviceModal();
      fetchDevices(); // Refresh the list
    } catch (err) {
      setFormError('Failed to register device. Please check the fields.');
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
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4">Devices</Typography>
        <Box>
          <Button variant="contained" onClick={handleOpenCreateCodeModal} sx={{ mr: 1 }}>
            Create New Code
          </Button>
          <Button variant="contained" onClick={handleOpenRegisterDeviceModal}>
            Register Device
          </Button>
        </Box>
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

      <Dialog open={openRegisterDeviceModal} onClose={handleCloseRegisterDeviceModal}>
        <DialogContent>
          {formError && <Alert severity="error" sx={{ mb: 2 }}>{formError}</Alert>}
          <RegisterDeviceForm 
            onSubmit={handleRegisterDeviceSubmit} 
            onCancel={handleCloseRegisterDeviceModal} 
            loading={formLoading} 
          />
        </DialogContent>
      </Dialog>
    </Container>
  );
}

export default Devices;
