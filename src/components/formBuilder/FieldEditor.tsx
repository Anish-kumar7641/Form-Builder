import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Box,
  Chip,
  IconButton,
  Typography,
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import { FormField, ValidationRule } from '../../store/types';

interface FieldEditorProps {
  open: boolean;
  field?: FormField;
  onSave: (field: Omit<FormField, 'id'> | FormField) => void;
  onClose: () => void;
  allFields: FormField[];
}

const FieldEditor: React.FC<FieldEditorProps> = ({ open, field, onSave, onClose, allFields }) => {
  const [formData, setFormData] = useState<Omit<FormField, 'id'>>({
    type: 'text',
    label: '',
    required: false,
    defaultValue: '',
    validationRules: [],
    options: [],
    isDerived: false,
    derivedConfig: undefined,
    ...field,
  });

  const [newOption, setNewOption] = useState('');
  const [newValidationRule, setNewValidationRule] = useState<Partial<ValidationRule>>({
    type: 'required',
    message: '',
  });

  const handleSave = () => {
    if (field) {
      onSave({ ...formData, id: field.id } as FormField);
    } else {
      onSave(formData);
    }
    onClose();
  };

  const addOption = () => {
    if (newOption.trim()) {
      setFormData({
        ...formData,
        options: [...(formData.options || []), newOption.trim()],
      });
      setNewOption('');
    }
  };

  const removeOption = (index: number) => {
    setFormData({
      ...formData,
      options: formData.options?.filter((_, i) => i !== index),
    });
  };

  const addValidationRule = () => {
    if (newValidationRule.type && newValidationRule.message) {
      setFormData({
        ...formData,
        validationRules: [...formData.validationRules, newValidationRule as ValidationRule],
      });
      setNewValidationRule({ type: 'required', message: '' });
    }
  };

  const removeValidationRule = (index: number) => {
    setFormData({
      ...formData,
      validationRules: formData.validationRules.filter((_, i) => i !== index),
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{field ? 'Edit Field' : 'Add New Field'}</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <FormControl fullWidth>
            <InputLabel>Field Type</InputLabel>
            <Select
              value={formData.type}
              label="Field Type" 
              onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
            >
              <MenuItem value="text">Text</MenuItem>
              <MenuItem value="number">Number</MenuItem>
              <MenuItem value="textarea">Textarea</MenuItem>
              <MenuItem value="select">Select</MenuItem>
              <MenuItem value="radio">Radio</MenuItem>
              <MenuItem value="checkbox">Checkbox</MenuItem>
              <MenuItem value="date">Date</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Label"
            value={formData.label}
            onChange={(e) => setFormData({ ...formData, label: e.target.value })}
            fullWidth
          />

          <FormControlLabel
            control={
              <Switch
                checked={formData.required}
                onChange={(e) => setFormData({ ...formData, required: e.target.checked })}
              />
            }
            label="Required"
          />

          <TextField
            label="Default Value"
            value={formData.defaultValue}
            onChange={(e) => setFormData({ ...formData, defaultValue: e.target.value })}
            fullWidth
          />

          {(formData.type === 'select' || formData.type === 'radio') && (
            <Box>
              <Typography variant="subtitle2">Options</Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                <TextField
                  size="small"
                  placeholder="Add option"
                  value={newOption}
                  onChange={(e) => setNewOption(e.target.value)}
                />
                <Button onClick={addOption} startIcon={<Add />}>
                  Add
                </Button>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {formData.options?.map((option, index) => (
                  <Chip
                    key={index}
                    label={option}
                    onDelete={() => removeOption(index)}
                    deleteIcon={<Delete />}
                  />
                ))}
              </Box>
            </Box>
          )}

          <FormControlLabel
            control={
              <Switch
                checked={formData.isDerived}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  isDerived: e.target.checked,
                  derivedConfig: e.target.checked ? {
                    parentFields: [],
                    formula: '',
                    computationType: 'sum'
                  } : undefined
                })}
              />
            }
            label="Derived Field"
          />

          {formData.isDerived && (
            <Box>
              <Typography variant="subtitle2">Derived Field Configuration</Typography>
              <FormControl fullWidth sx={{ mb: 1 }}>
                <InputLabel>Computation Type</InputLabel>
                <Select
                 label="Computation Type"
                  value={formData.derivedConfig?.computationType || 'sum'}
                  onChange={(e) => setFormData({
                    ...formData,
                    derivedConfig: {
                      ...formData.derivedConfig!,
                      computationType: e.target.value as any
                    }
                  })}
                >
                  <MenuItem value="sum">Sum</MenuItem>
                  <MenuItem value="age_from_dob">Age from Date of Birth</MenuItem>
                  <MenuItem value="custom">Custom Formula</MenuItem>
                </Select>
              </FormControl>
            </Box>
          )}

          <Box>
            <Typography variant="subtitle2">Validation Rules</Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 1, alignItems: 'center' }}>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <Select
                  value={newValidationRule.type}
                  onChange={(e) => setNewValidationRule({ ...newValidationRule, type: e.target.value as any })}
                >
                  <MenuItem value="required">Required</MenuItem>
                  <MenuItem value="minLength">Min Length</MenuItem>
                  <MenuItem value="maxLength">Max Length</MenuItem>
                  <MenuItem value="email">Email</MenuItem>
                  <MenuItem value="customPassword">Password</MenuItem>
                </Select>
              </FormControl>
              {(newValidationRule.type === 'minLength' || newValidationRule.type === 'maxLength') && (
                <TextField
                  size="small"
                  type="number"
                  placeholder="Value"
                  value={newValidationRule.value || ''}
                  onChange={(e) => setNewValidationRule({ ...newValidationRule, value: parseInt(e.target.value) })}
                />
              )}
              <TextField
                size="small"
                placeholder="Error message"
                value={newValidationRule.message}
                onChange={(e) => setNewValidationRule({ ...newValidationRule, message: e.target.value })}
              />
              <Button onClick={addValidationRule} startIcon={<Add />}>
                Add
              </Button>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {formData.validationRules.map((rule, index) => (
                <Chip
                  key={index}
                  label={`${rule.type}${rule.value ? `: ${rule.value}` : ''}`}
                  onDelete={() => removeValidationRule(index)}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FieldEditor;
