import { CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { PercentagePipe } from '../../../shared/pipes/percentage/percentage.pipe';
import { DisplayCategoryPipe } from '../../../shared/pipes/display-category/display-category.pipe';

@Injectable({
  providedIn: 'root'
})
export class PipeRegistryService {

  constructor(
    private currency: CurrencyPipe,
    private date: DatePipe,
    private decimal: DecimalPipe,
    private percent: PercentagePipe,
    private categories: DisplayCategoryPipe
  ) {}

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
