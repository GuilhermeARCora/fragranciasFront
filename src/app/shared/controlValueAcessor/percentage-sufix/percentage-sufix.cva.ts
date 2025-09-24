import { Directive, ElementRef, HostListener, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
@Directive({
  selector: '[appPercentageSuffix]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PercentageSuffix),
      multi: true
    }
  ]
})

export class PercentageSuffix implements ControlValueAccessor {
  private el: HTMLInputElement;

  constructor(private elementRef: ElementRef<HTMLInputElement>) {
    this.el = this.elementRef.nativeElement;
  }

  // callbacks que o Angular registra
  private onChange: (value: number | null) => void = () => {};
  private onTouched: () => void = () => {};

  /** ✅ Quando o Angular escreve um valor no campo (ex: edição) */
  writeValue(value: number | null): void {
    if (value !== null && value !== undefined && !isNaN(value)) {
      this.el.value = `${value}%`;
    } else {
      this.el.value = '';
    }
  }

  /** ✅ Registra callback para propagar alterações */
  registerOnChange(fn: (value: number | null) => void): void {
    this.onChange = fn;
  }

  /** ✅ Registra callback para propagar blur/touched */
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  /** ✅ Atualiza valor ao digitar */
  @HostListener('input', ['$event'])
  onInput(event: Event) {
    let value = this.el.value.replace(/[^\d.,]/g, ''); // só números
    if (value) {
      const numericValue = parseFloat(value.replace(',', '.'));
      if (!isNaN(numericValue)) {
        this.el.value = `${numericValue}%`;
        this.onChange(numericValue); // notifica o form
      } else {
        this.el.value = '';
        this.onChange(null);
      }
    } else {
      this.el.value = '';
      this.onChange(null);
    }
  };

  /** ✅ Marca como touched ao perder foco */
  @HostListener('blur')
  onBlur() {
    this.onTouched();
  };

  /** ✅ Impede negativos */
  @HostListener('keydown', ['$event'])
  preventNegative(event: KeyboardEvent) {
    if (event.key === '-' || event.key === 'Subtract') {
      event.preventDefault();
    }
  };

};
