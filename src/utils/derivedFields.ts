import { FormField, FormValues } from '../store/types';

export const computeDerivedValue = (
  field: FormField,
  formValues: FormValues,
  allFields: FormField[]
): any => {
  if (!field.isDerived || !field.derivedConfig) {
    return formValues[field.id] || field.defaultValue;
  }

  const { parentFields, computationType } = field.derivedConfig;

  switch (computationType) {
    case 'sum':
      return parentFields.reduce((sum, parentId) => {
        const value = parseFloat(formValues[parentId]) || 0;
        return sum + value;
      }, 0);

    case 'age_from_dob':
      if (parentFields.length === 1) {
        const dobValue = formValues[parentFields[0]];
        if (dobValue) {
          const today = new Date();
          const birthDate = new Date(dobValue);
          const age = today.getFullYear() - birthDate.getFullYear();
          const monthDiff = today.getMonth() - birthDate.getMonth();
          if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            return age - 1;
          }
          return age;
        }
      }
      return 0;

    case 'custom':
      // For custom formulas, you can implement a simple evaluator
      // This is a basic example - in production, you might want to use a proper expression parser
      let formula = field.derivedConfig.formula;
      parentFields.forEach((parentId, index) => {
        const value = formValues[parentId] || 0;
        formula = formula.replace(`field${index + 1}`, value.toString());
      });
      try {
        // eslint-disable-next-line no-eval
        return eval(formula);
      } catch {
        return 0;
      }

    default:
      return 0;
  }
};
