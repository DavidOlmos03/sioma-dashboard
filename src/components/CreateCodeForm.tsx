import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

interface CreateCodeFormProps {
  onSubmit: (code: string, description: string, expiresAt: number | null) => Promise<void>;
  onCancel: () => void;
  loading: boolean;
}

const CreateCodeForm: React.FC<CreateCodeFormProps> = ({ onSubmit, onCancel, loading }) => {
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
  const [expiresAt, setExpiresAt] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const expiresAtTimestamp = expiresAt ? new Date(expiresAt).getTime() : null;
    onSubmit(code, description, expiresAtTimestamp);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h6">Create New Activation Code</Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        id="code"
        label="Activation Code (e.g., TENANT-CODE)"
        name="code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        disabled={loading}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="description"
        label="Description"
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={loading}
      />
      <TextField
        margin="normal"
        fullWidth
        id="expires_at"
        label="Expires At"
        type="datetime-local"
        InputLabelProps={{
          shrink: true,
        }}
        value={expiresAt}
        onChange={(e) => setExpiresAt(e.target.value)}
        disabled={loading}
      />
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button onClick={onCancel} disabled={loading} sx={{ mr: 1 }}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" disabled={loading}>
          Create
        </Button>
      </Box>
    </Box>
  );
};

export default CreateCodeForm;
