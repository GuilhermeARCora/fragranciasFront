import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function matchFieldsValidator(field1: string, field2: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value1 = control.get(field1)?.value;
    const value2 = control.get(field2)?.value;

    if (value1 !== value2) {
      control.get(field2)?.setErrors({ notMatching: true });
      return { notMatching: true };
    } else {
      // Clear the error if previously set
      if (control.get(field2)?.hasError('notMatching')) {
        control.get(field2)?.setErrors(null);
      }
      return null;
    }
  };
}


/*

{
form Group
},
{
validators: [
      matchFieldsValidator('email', 'emailConfirm'),
      matchFieldsValidator('password', 'passwordConfirm'),
    ]
}

*/
