import { Injectable, Pipe } from '@angular/core';
import type { PipeTransform } from '@angular/core';

@Pipe({
  name: 'displayCategory',
  standalone: true
})
@Injectable({ providedIn: 'root' })
export class DisplayCategoryPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';

    const format = (str: string) =>
      str
        .replace(/([A-Z])/g, ' $1') // espaço antes de maiúsculas
        .replace(/^./, s => s.toUpperCase()); // primeira letra maiúscula

    if (Array.isArray(value)) {
      return value.map(v => format(v)).join(', '); // junta as categorias formatadas
    }

    return format(value);
  };

};
