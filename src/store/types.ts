export interface ValidationRule {
  type: 'required' | 'minLength' | 'maxLength' | 'email' | 'customPassword';
  value?: number | string;
  message: string;
}

export interface FormField {
  id: string;
  type: 'text' | 'number' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'date';
  label: string;
  required: boolean;
  defaultValue: any;
  validationRules: ValidationRule[];
  options?: string[]; // For select and radio fields
  isDerived?: boolean;
  derivedConfig?: {
    parentFields: string[];
    formula: string; // Simple formula like "field1 + field2" or "age_from_dob"
    computationType: 'sum' | 'age_from_dob' | 'custom';
  };
}

export interface FormSchema {
  id: string;
  name: string;
  fields: FormField[];
  createdAt: string;
}

export interface FormState {
  currentForm: {
    fields: FormField[];
    name: string;
  };
  savedForms: FormSchema[];
  isLoading: boolean;
}

export interface FormValues {
  [fieldId: string]: any;
}
