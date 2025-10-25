import React, { useEffect, useState } from 'react';
import { Container, Typography, CircularProgress, Alert, Grid, Card, CardMedia } from '@mui/material';
import { useParams } from 'react-router-dom';
import apiService, { Worker } from '../services/apiService';

const WorkerDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [worker, setWorker] = useState<Worker | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWorker = async () => {
      if (!id) return;
      try {
        setLoading(true);
        setError(null);
        const fetchedWorker = await apiService.getWorkerById(id);
        setWorker(fetchedWorker);
      } catch (err) {
        setError('Failed to fetch worker details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWorker();
  }, [id]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!worker) {
    return <Alert severity="info">Worker not found.</Alert>;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>{worker.first_name} {worker.last_name}</Typography>
      <Typography variant="h6">Document ID: {worker.document_id}</Typography>
      <Typography variant="h6">Email: {worker.email}</Typography>
      <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>Images</Typography>
      <Grid container spacing={2}>
        {worker.image_urls.map((url, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={url}
                alt={`Worker image ${index + 1}`}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default WorkerDetail;
