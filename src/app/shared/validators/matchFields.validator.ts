import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function matchFieldsValidator(field1: string, field2: string): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const control1 = group.get(field1);
    const control2 = group.get(field2);

    if (!control1 || !control2) return null;

    const value1 = control1.value;
    const value2 = control2.value;

    if (value1 !== value2) {
      control2.setErrors({ matchFieldsValidator: true });
      return { matchFieldsValidator: true }; // optional: return error on the group too
    }

    // Clear error if previously set
    if (control2.hasError('matchFieldsValidator')) {
      control2.setErrors(null);
    }

    return null;
  };
}
