import { AbstractControl, ValidationErrors } from '@angular/forms';

export function numberValidator(control: AbstractControl): ValidationErrors | null {
  if (control.value === null || control.value === '') return null; // deixa required cuidar
  return isNaN(control.value) ? { notNumber: true } : null;
}
