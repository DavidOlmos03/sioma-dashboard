import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, Typography, Button } from '@mui/material';
import { Device } from '../services/apiService';

interface DeviceListProps {
  devices: Device[];
  onDeactivate: (deviceId: string) => void;
}

const DeviceList: React.FC<DeviceListProps> = ({ devices, onDeactivate }) => {
  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" sx={{ p: 2 }}>
        Registered Devices
      </Typography>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Model</TableCell>
            <TableCell>Device ID</TableCell>
            <TableCell>Tenant ID</TableCell>
            <TableCell>Registered At</TableCell>
            <TableCell>Last Sync</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {devices.map((device) => (
            <TableRow
              key={device.device_id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {device.device_name}
              </TableCell>
              <TableCell>{device.device_model}</TableCell>
              <TableCell>{device.device_id}</TableCell>
              <TableCell>{device.tenant_id}</TableCell>
              <TableCell>{new Date(device.registered_at).toLocaleString()}</TableCell>
              <TableCell>{new Date(device.last_sync_at).toLocaleString()}</TableCell>
              <TableCell>
                <Chip
                  label={device.is_active ? 'Active' : 'Inactive'}
                  color={device.is_active ? 'success' : 'error'}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="warning"
                  size="small"
                  onClick={() => onDeactivate(device.device_id)}
                  disabled={!device.is_active}
                >
                  Deactivate
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DeviceList;
