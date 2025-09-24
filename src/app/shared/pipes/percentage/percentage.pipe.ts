import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'percentage',
  pure: true
})
@Injectable({ providedIn: 'root' })
export class PercentagePipe implements PipeTransform {

  transform(value: number | string | null | undefined): string {
    if (value === null || value === undefined || value === '') {
      return '';
    };

    return `${value}%`;
  };

};
