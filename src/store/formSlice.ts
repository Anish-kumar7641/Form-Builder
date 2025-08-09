import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormField, FormSchema, FormState } from './types';
import { loadFormsFromStorage, saveFormToStorage } from '../utils/localStorage';
import { v4 as uuidv4 } from 'uuid';

const initialState: FormState = {
  currentForm: {
    fields: [],
    name: '',
  },
  savedForms: loadFormsFromStorage(),
  isLoading: false,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addField: (state, action: PayloadAction<Omit<FormField, 'id'>>) => {
      const newField: FormField = {
        ...action.payload,
        id: uuidv4(),
      };
      state.currentForm.fields.push(newField);
    },
    updateField: (state, action: PayloadAction<FormField>) => {
      const index = state.currentForm.fields.findIndex(field => field.id === action.payload.id);
      if (index !== -1) {
        state.currentForm.fields[index] = action.payload;
      }
    },
    deleteField: (state, action: PayloadAction<string>) => {
      state.currentForm.fields = state.currentForm.fields.filter(field => field.id !== action.payload);
    },
    reorderFields: (state, action: PayloadAction<FormField[]>) => {
      state.currentForm.fields = action.payload;
    },
    setFormName: (state, action: PayloadAction<string>) => {
      state.currentForm.name = action.payload;
    },
    saveForm: (state, action: PayloadAction<string>) => {
      const formSchema: FormSchema = {
        id: uuidv4(),
        name: action.payload,
        fields: [...state.currentForm.fields],
        createdAt: new Date().toISOString(),
      };
      state.savedForms.push(formSchema);
      saveFormToStorage(formSchema);
      // Reset current form
      state.currentForm = { fields: [], name: '' };
    },
    loadForm: (state, action: PayloadAction<FormSchema>) => {
      state.currentForm = {
        fields: [...action.payload.fields],
        name: action.payload.name,
      };
    },
    clearCurrentForm: (state) => {
      state.currentForm = { fields: [], name: '' };
    },
  },
});

export const {
  addField,
  updateField,
  deleteField,
  reorderFields,
  setFormName,
  saveForm,
  loadForm,
  clearCurrentForm,
} = formSlice.actions;

export default formSlice.reducer;
