import React, { useEffect, useState } from 'react';
import { Container, Grid, Paper, Typography, CircularProgress, Alert } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import apiService, { Device } from '../services/apiService';

const MetricsDashboard: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedDevices = await apiService.getAllDevices();
        setDevices(fetchedDevices);
      } catch (err) {
        setError('Failed to fetch data for metrics.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const deviceStatusData = [
    { name: 'Active', value: devices.filter(d => d.is_active).length },
    { name: 'Inactive', value: devices.filter(d => !d.is_active).length },
  ];

  const deviceManufacturerData = devices.reduce((acc, device) => {
    const manufacturer = device.device_manufacturer || 'Unknown';
    const existing = acc.find(item => item.name === manufacturer);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: manufacturer, value: 1 });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  const androidVersionData = devices.reduce((acc, device) => {
    const version = device.android_version || 'Unknown';
    const existing = acc.find(item => item.name === version);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: version, value: 1 });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  const registrationsByDate = devices.reduce((acc, device) => {
    const date = new Date(device.registered_at).toLocaleDateString();
    const existing = acc.find(item => item.date === date);
    if (existing) {
      existing.registrations += 1;
    } else {
      acc.push({ date, registrations: 1 });
    }
    return acc;
  }, [] as { date: string; registrations: number }[]);

  const workersPerTenantData = devices.reduce((acc, device) => {
    const tenant = device.tenant_id || 'Unknown';
    const existing = acc.find(item => item.name === tenant);
    if (existing) {
      existing.value += 1; // This is devices per tenant, not workers
    } else {
      acc.push({ name: tenant, value: 1 });
    }
    return acc;
  }, [] as { name: string; value: number }[]);


  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>Metrics Dashboard</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Device Status</Typography>
            <PieChart width={400} height={300}>
              <Pie data={deviceStatusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                {deviceStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Devices per Manufacturer</Typography>
            <BarChart width={500} height={300} data={deviceManufacturerData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Android Versions</Typography>
            <PieChart width={400} height={300}>
              <Pie data={androidVersionData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#82ca9d" label>
                {androidVersionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Devices per Tenant</Typography>
            <BarChart width={500} height={300} data={workersPerTenantData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Device Registrations over Time</Typography>
            <LineChart width={1000} height={300} data={registrationsByDate}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="registrations" stroke="#8884d8" />
            </LineChart>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MetricsDashboard;
