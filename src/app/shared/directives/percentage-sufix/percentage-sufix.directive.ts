import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appPercentageSufix]'
})
export class PercentageSufixDirective {

  private el: HTMLInputElement;

  constructor(
    private elementRef: ElementRef,
    private control: NgControl
  ) {
    this.el = this.elementRef.nativeElement;
  }

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    let value = this.el.value.replace(/[^\d.,]/g, ''); // só números
    if (value) {
      const numericValue = parseFloat(value.replace(',', '.'));
      if (!isNaN(numericValue)) {
        this.control.control?.setValue(numericValue); // atualiza o form
        this.el.value = `${numericValue}%`;           // exibe formatado
      } else {
        this.control.control?.setValue(null);
        this.el.value = '';
      }
    } else {
      this.control.control?.setValue(null);
      this.el.value = '';
    }
  }

  @HostListener('keydown', ['$event'])
  preventNegative(event: KeyboardEvent) {
    if (event.key === '-' || event.key === 'Subtract') {
      event.preventDefault();
    }
  }

}
