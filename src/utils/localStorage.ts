import { FormSchema } from '../store/types';

const FORMS_STORAGE_KEY = 'formBuilderForms';

export const loadFormsFromStorage = (): FormSchema[] => {
  try {
    const stored = localStorage.getItem(FORMS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading forms from localStorage:', error);
    return [];
  }
};

export const saveFormToStorage = (form: FormSchema): void => {
  try {
    const existingForms = loadFormsFromStorage();
    const updatedForms = [...existingForms, form];
    localStorage.setItem(FORMS_STORAGE_KEY, JSON.stringify(updatedForms));
  } catch (error) {
    console.error('Error saving form to localStorage:', error);
  }
};

export const deleteFormFromStorage = (formId: string): void => {
  try {
    const existingForms = loadFormsFromStorage();
    const updatedForms = existingForms.filter(form => form.id !== formId);
    localStorage.setItem(FORMS_STORAGE_KEY, JSON.stringify(updatedForms));
  } catch (error) {
    console.error('Error deleting form from localStorage:', error);
  }
};
