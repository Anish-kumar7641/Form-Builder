import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
  Button,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { FormValues, FormField } from '../../store/types';
import { validateField } from '../../utils/validation';
import { computeDerivedValue } from '../../utils/derivedFields';

const FormPreview: React.FC = () => {
  const { currentForm } = useSelector((state: RootState) => state.form);
  const [formValues, setFormValues] = useState<FormValues>({});
  const [errors, setErrors] = useState<{ [fieldId: string]: string }>({});

  // Initialize form values with defaults
  useEffect(() => {
    const initialValues: FormValues = {};
    currentForm.fields.forEach(field => {
      if (!field.isDerived) {
        initialValues[field.id] = field.defaultValue;
      }
    });
    setFormValues(initialValues);
  }, [currentForm.fields]);

  // Update derived fields when dependencies change
  useEffect(() => {
    const updatedValues = { ...formValues };
    let hasChanges = false;

    currentForm.fields.forEach(field => {
      if (field.isDerived) {
        const newValue = computeDerivedValue(field, formValues, currentForm.fields);
        if (updatedValues[field.id] !== newValue) {
          updatedValues[field.id] = newValue;
          hasChanges = true;
        }
      }
    });

    if (hasChanges) {
      setFormValues(updatedValues);
    }
  }, [formValues, currentForm.fields]);

  const handleFieldChange = (fieldId: string, value: any) => {
    setFormValues(prev => ({ ...prev, [fieldId]: value }));
    
    // Clear error when user starts typing
    if (errors[fieldId]) {
      setErrors(prev => ({ ...prev, [fieldId]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: { [fieldId: string]: string } = {};
    
    currentForm.fields.forEach(field => {
      if (!field.isDerived) {
        const error = validateField(formValues[field.id], field.validationRules);
        if (error) {
          newErrors[field.id] = error;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      alert('Form is valid! (In a real app, you would submit the data here)');
      console.log('Form values:', formValues);
    }
  };

  const renderField = (field: FormField) => {
    const value = formValues[field.id] || '';
    const error = errors[field.id];
    const isDisabled = field.isDerived;

    switch (field.type) {
      case 'text':
        return (
          <TextField
            fullWidth
            label={field.label}
            value={value}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            error={!!error}
            helperText={error}
            required={field.required}
            disabled={isDisabled}
          />
        );

      case 'number':
        return (
          <TextField
            fullWidth
            type="number"
            label={field.label}
            value={value}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            error={!!error}
            helperText={error}
            required={field.required}
            disabled={isDisabled}
          />
        );

      case 'textarea':
        return (
          <TextField
            fullWidth
            multiline
            rows={4}
            label={field.label}
            value={value}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            error={!!error}
            helperText={error}
            required={field.required}
            disabled={isDisabled}
          />
        );

      case 'select':
        return (
          <FormControl fullWidth error={!!error}>
            <InputLabel>{field.label}</InputLabel>
            <Select
              value={value}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              label={field.label}
              required={field.required}
              disabled={isDisabled}
            >
              {field.options?.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
            {error && <Typography color="error" variant="caption">{error}</Typography>}
          </FormControl>
        );

      case 'radio':
        return (
          <FormControl error={!!error} disabled={isDisabled}>
            <FormLabel component="legend">{field.label}</FormLabel>
            <RadioGroup
              value={value}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
            >
              {field.options?.map((option) => (
                <FormControlLabel
                  key={option}
                  value={option}
                  control={<Radio />}
                  label={option}
                />
              ))}
            </RadioGroup>
            {error && <Typography color="error" variant="caption">{error}</Typography>}
          </FormControl>
        );

      case 'checkbox':
        return (
          <FormControlLabel
            control={
              <Checkbox
                checked={!!value}
                onChange={(e) => handleFieldChange(field.id, e.target.checked)}
                disabled={isDisabled}
              />
            }
            label={field.label}
          />
        );

      case 'date':
        return (
          <TextField
            fullWidth
            type="date"
            label={field.label}
            value={value}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            error={!!error}
            helperText={error}
            required={field.required}
            disabled={isDisabled}
            InputLabelProps={{
              shrink: true,
            }}
          />
        );

      default:
        return null;
    }
  };

  if (currentForm.fields.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h5" color="text.secondary">
          No form to preview
        </Typography>
        <Typography color="text.secondary">
          Create a form first to see the preview
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Form Preview
      </Typography>
      
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {currentForm.fields.map((field) => (
            <Box key={field.id}>
              {renderField(field)}
              {field.isDerived && (
                <Typography variant="caption" color="text.secondary">
                  This is a derived field (automatically calculated)
                </Typography>
              )}
            </Box>
          ))}
          
          <Box sx={{ pt: 2 }}>
            <Button variant="contained" onClick={handleSubmit} size="large">
              Submit Form
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default FormPreview;
