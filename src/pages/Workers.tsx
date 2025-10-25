import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, CircularProgress, Alert } from '@mui/material';
import apiService, { Worker } from '../services/apiService';
import WorkerCard from '../components/WorkerCard';

const Workers: React.FC = () => {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedWorkers = await apiService.getWorkers();
        setWorkers(fetchedWorkers);
      } catch (err) {
        setError('Failed to fetch workers.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkers();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>Workers</Typography>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Grid container spacing={3}>
          {workers.map((worker) => (
            <Grid item key={worker.id} xs={12} sm={6} md={4}>
              <WorkerCard worker={worker} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Workers;
