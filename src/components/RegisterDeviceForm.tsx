import React, { useState } from 'react';
import { TextField, Button, Box, Typography, CircularProgress } from '@mui/material';

interface Props {
  onSubmit: (data: { activation_code: string; device_id: string; device_name: string; device_model: string; device_manufacturer: string; android_version: string; }) => void;
  onCancel: () => void;
  loading: boolean;
}

const RegisterDeviceForm: React.FC<Props> = ({ onSubmit, onCancel, loading }) => {
  const [activationCode, setActivationCode] = useState('');
  const [deviceName, setDeviceName] = useState('');
  const [deviceModel, setDeviceModel] = useState('');
  const [deviceManufacturer, setDeviceManufacturer] = useState('');
  const [androidVersion, setAndroidVersion] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const deviceId = crypto.randomUUID();
    onSubmit({
      activation_code: activationCode,
      device_id: deviceId,
      device_name: deviceName,
      device_model: deviceModel,
      device_manufacturer: deviceManufacturer,
      android_version: androidVersion,
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <Typography component="h2" variant="h6">Register New Device</Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        label="Activation Code"
        value={activationCode}
        onChange={(e) => setActivationCode(e.target.value)}
        disabled={loading}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Device Name"
        value={deviceName}
        onChange={(e) => setDeviceName(e.target.value)}
        disabled={loading}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Device Model"
        value={deviceModel}
        onChange={(e) => setDeviceModel(e.target.value)}
        disabled={loading}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Device Manufacturer"
        value={deviceManufacturer}
        onChange={(e) => setDeviceManufacturer(e.target.value)}
        disabled={loading}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Android Version"
        value={androidVersion}
        onChange={(e) => setAndroidVersion(e.target.value)}
        disabled={loading}
      />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button onClick={onCancel} disabled={loading} sx={{ mr: 1 }}>Cancel</Button>
        <Button type="submit" variant="contained" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Register'}
        </Button>
      </Box>
    </Box>
  );
};

export default RegisterDeviceForm;
