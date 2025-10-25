import React from 'react';
import { Card, CardContent, CardMedia, Typography, ButtonBase } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Worker } from '../services/apiService';

interface WorkerCardProps {
  worker: Worker;
}

const WorkerCard: React.FC<WorkerCardProps> = ({ worker }) => {
  return (
    <ButtonBase component={RouterLink} to={`/workers/${worker.id}`} sx={{ width: '100%' }}>
      <Card sx={{ width: '100%' }}>
        <CardMedia
          component="img"
          height="140"
          image={worker.image_urls[0]}
          alt={`${worker.first_name} ${worker.last_name}`}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {worker.first_name} {worker.last_name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Doc ID: {worker.document_id}
          </Typography>
        </CardContent>
      </Card>
    </ButtonBase>
  );
};

export default WorkerCard;
