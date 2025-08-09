import { ValidationRule } from '../store/types';

export const validateField = (value: any, rules: ValidationRule[]): string | null => {
  for (const rule of rules) {
    switch (rule.type) {
      case 'required':
        if (!value || (typeof value === 'string' && value.trim() === '')) {
          return rule.message;
        }
        break;
      case 'minLength':
        if (typeof value === 'string' && value.length < (rule.value as number)) {
          return rule.message;
        }
        break;
      case 'maxLength':
        if (typeof value === 'string' && value.length > (rule.value as number)) {
          return rule.message;
        }
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (typeof value === 'string' && !emailRegex.test(value)) {
          return rule.message;
        }
        break;
      case 'customPassword':
        const passwordRegex = /^(?=.*[0-9]).{8,}$/;
        if (typeof value === 'string' && !passwordRegex.test(value)) {
          return rule.message;
        }
        break;
    }
  }
  return null;
};
