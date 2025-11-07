import { inject, Injectable } from '@angular/core';
import { CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { PercentagePipe } from '../../../shared/pipes/percentage/percentage.pipe';
import { DisplayCategoryPipe } from '../../../shared/pipes/display-category/display-category.pipe';

@Injectable({
  providedIn: 'root'
})
export class PipeRegistryService {

  currency = inject(CurrencyPipe);
  date= inject(DatePipe);
  decimal= inject(DecimalPipe);
  percent= inject(PercentagePipe);
  categories= inject(DisplayCategoryPipe);

  apply(pipeName: string, value: string, ...args: any[]): string | null {
    switch (pipeName) {
    case 'currency':
      return this.currency.transform(value, ...args);
    case 'date':
      return this.date.transform(value, ...args);
    case 'decimal':
      return this.decimal.transform(value, ...args);
    case 'percentage':
      return this.percent.transform(value);
    case 'categories':
      return this.categories.transform(value);
    default:
      return value;
    };
  };

};
