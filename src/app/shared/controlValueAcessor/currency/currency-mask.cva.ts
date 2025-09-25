import { CurrencyPipe } from '@angular/common';
import { Directive, ElementRef, forwardRef, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';

@Directive({
  selector: '[appCurrencyMask]',
  providers: [
    CurrencyPipe,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CurrencyMask),
      multi: true
    }
  ]
})
export class CurrencyMask implements ControlValueAccessor {

  private el: HTMLInputElement;

  private onChange: (value: number | null) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(
    private elementRef: ElementRef<HTMLInputElement>,
    private currencyPipe: CurrencyPipe
  ) {
    this.el = this.elementRef.nativeElement;
  };

  /** Quando o Angular escreve um valor no campo (ex: edição) */
  writeValue(value: number | null): void {
    if (value !== null && value !== undefined && !isNaN(value)) {
      this.el.value =
        this.currencyPipe.transform(value, 'BRL', 'symbol', '1.2-2', 'pt-BR') ?? '';
    } else {
      this.el.value = '';
    };
  };

  registerOnChange(fn: (value: number | null) => void): void {
    this.onChange = fn;
  };

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  };

  setDisabledState?(isDisabled: boolean): void {
    this.el.disabled = isDisabled;
  };

  /** Ao focar → mostra o valor cru para o usuário editar */
  @HostListener('focus')
  onFocus() {
    const numericValue = this.el.value
      ? parseFloat(this.el.value.replace(/[^\d.-]/g, '').replace(',', '.'))
      : null;
    if (numericValue !== null && !isNaN(numericValue)) {
      this.el.value = String(numericValue);
    };
  };

  /** Ao perder o foco → formata como moeda */
  @HostListener('blur')
  onBlur() {
    this.onTouched();
    const value = this.el.value;
    if (value) {
      const numericValue = parseFloat(value.replace(/[^\d.-]/g, '').replace(',', '.'));
      if (!isNaN(numericValue)) {
        this.onChange(numericValue);
        this.el.value =
          this.currencyPipe.transform(numericValue, 'BRL', 'symbol', '1.2-2', 'pt-BR') ?? '';
      } else {
        this.onChange(null);
        this.el.value = '';
      }
    } else {
      this.onChange(null);
      this.el.value = '';
    };
  };

  /** Bloqueia números negativos */
  @HostListener('keydown', ['$event'])
  preventNegative(event: KeyboardEvent) {
    if (event.key === '-' || event.key === 'Subtract') {
      event.preventDefault();
    };
  };

};
