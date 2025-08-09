import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
} from '@mui/material';
import Grid from '@mui/material/Grid'; // This is Grid2 in MUI v7
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store';
import { loadForm } from '../../store/formSlice';
import { FormSchema } from '../../store/types';

const MyForms: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { savedForms } = useSelector((state: RootState) => state.form);

  const handlePreviewForm = (form: FormSchema) => {
    dispatch(loadForm(form));
    navigate('/preview');
  };

  const handleEditForm = (form: FormSchema) => {
    dispatch(loadForm(form));
    navigate('/create');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (savedForms.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h5" color="text.secondary" gutterBottom>
          No saved forms
        </Typography>
        <Typography color="text.secondary" paragraph>
          Create your first form to see it here
        </Typography>
        <Button variant="contained" onClick={() => navigate('/create')}>
          Create Form
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        My Forms
      </Typography>
      
      <Grid container spacing={3}>
        {savedForms.map((form) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={form.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {form.name}
                </Typography>
                <Typography color="text.secondary" gutterBottom>
                  Created: {formatDate(form.createdAt)}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  <Chip label={`${form.fields.length} fields`} size="small" />
                  {form.fields.some(f => f.isDerived) && (
                    <Chip label="Has derived fields" size="small" color="primary" />
                  )}
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Field types: {Array.from(new Set(form.fields.map(f => f.type))).join(', ')}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => handlePreviewForm(form)}>
                  Preview
                </Button>
                <Button size="small" onClick={() => handleEditForm(form)}>
                  Edit
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MyForms;
