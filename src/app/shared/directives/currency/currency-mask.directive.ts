import { CurrencyPipe } from '@angular/common';
import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appCurrencyMask]',
  providers: [CurrencyPipe]
})
export class CurrencyMaskDirective {

  private el: HTMLInputElement;

  constructor(
    private elementRef: ElementRef,
    private currencyPipe: CurrencyPipe,
    private control: NgControl
  ) {
    this.el = this.elementRef.nativeElement;
  };

  @HostListener('focus')
  onFocus() {
    const value = this.control.value;
    if (value != null && value !== '') {
      this.el.value = String(value); // mostra número cru
    };
  };

  @HostListener('blur')
  onBlur() {
    const value = this.el.value;

    if (value) {
      const numericValue = parseFloat(value.replace(/[^\d.-]/g, '').replace(',', '.'));

      if (!isNaN(numericValue)) {

        this.control.control?.setValue(numericValue);
        this.el.value = this.currencyPipe.transform(numericValue, 'BRL', 'symbol', '1.2-2') ?? '';
      } else {

        this.control.control?.setValue(null);
        this.el.value = '';
      }
    } else {

      this.control.control?.setValue(null);
      this.el.value = '';
    };
  };

  @HostListener('keydown', ['$event'])
  preventNegative(event: KeyboardEvent) {
    if (event.key === '-' || event.key === 'Subtract') {
      event.preventDefault();
    };
  };

};
