import React, { useState } from 'react';
import {
  Box,
  Button,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import { Add, Edit, Delete, DragIndicator, Save } from '@mui/icons-material';
// Change this import line:
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { addField, updateField, deleteField, reorderFields, saveForm } from '../../store/formSlice';
import FieldEditor from './FieldEditor';
import { FormField } from '../../store/types';

const FormBuilder: React.FC = () => {
  const dispatch = useDispatch();
  const { currentForm } = useSelector((state: RootState) => state.form);
  const [fieldEditorOpen, setFieldEditorOpen] = useState(false);
  const [editingField, setEditingField] = useState<FormField | undefined>();
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [formName, setFormName] = useState('');

  const handleAddField = () => {
    setEditingField(undefined);
    setFieldEditorOpen(true);
  };

  const handleEditField = (field: FormField) => {
    setEditingField(field);
    setFieldEditorOpen(true);
  };

  const handleSaveField = (field: Omit<FormField, 'id'> | FormField) => {
    if ('id' in field) {
      dispatch(updateField(field));
    } else {
      dispatch(addField(field));
    }
  };

  const handleDeleteField = (fieldId: string) => {
    dispatch(deleteField(fieldId));
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(currentForm.fields);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    dispatch(reorderFields(items));
  };

  const handleSaveForm = () => {
    if (formName.trim() && currentForm.fields.length > 0) {
      dispatch(saveForm(formName.trim()));
      setFormName('');
      setSaveDialogOpen(false);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Form Builder</Typography>
        <Box>
          <Button
            startIcon={<Add />}
            variant="contained"
            onClick={handleAddField}
            sx={{ mr: 1 }}
          >
            Add Field
          </Button>
          <Button
            startIcon={<Save />}
            variant="outlined"
            onClick={() => setSaveDialogOpen(true)}
            disabled={currentForm.fields.length === 0}
          >
            Save Form
          </Button>
        </Box>
      </Box>

      <Paper sx={{ p: 2 }}>
        {currentForm.fields.length === 0 ? (
          <Typography color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
            No fields added yet. Click "Add Field" to get started.
          </Typography>
        ) : (
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="fields">
              {(provided) => (
                <List {...provided.droppableProps} ref={provided.innerRef}>
                  {currentForm.fields.map((field, index) => (
                    <Draggable key={field.id} draggableId={field.id} index={index}>
                      {(provided, snapshot) => (
                        <ListItem
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          sx={{
                            border: '1px solid #e0e0e0',
                            borderRadius: 1,
                            mb: 1,
                            backgroundColor: snapshot.isDragging ? '#f5f5f5' : 'white',
                          }}
                        >
                          <Box {...provided.dragHandleProps} sx={{ mr: 2 }}>
                            <DragIndicator />
                          </Box>
                          <ListItemText
                            primary={field.label}
                            secondary={`Type: ${field.type}${field.required ? ' • Required' : ''}${field.isDerived ? ' • Derived' : ''}`}
                          />
                          <ListItemSecondaryAction>
                            <IconButton onClick={() => handleEditField(field)}>
                              <Edit />
                            </IconButton>
                            <IconButton onClick={() => handleDeleteField(field.id)}>
                              <Delete />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </List>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </Paper>

      <FieldEditor
        open={fieldEditorOpen}
        field={editingField}
        allFields={currentForm.fields}
        onSave={handleSaveField}
        onClose={() => setFieldEditorOpen(false)}
      />

      <Dialog open={saveDialogOpen} onClose={() => setSaveDialogOpen(false)}>
        <DialogTitle>Save Form</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Form Name"
            fullWidth
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSaveDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSaveForm} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FormBuilder;
