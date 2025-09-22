import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'displayCategory'
})
export class DisplayCategoryPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';
    return value
      .replace(/([A-Z])/g, ' $1') // espaço antes de maiúsculas
      .replace(/^./, str => str.toUpperCase()); // primeira letra maiúscula
  };

};
