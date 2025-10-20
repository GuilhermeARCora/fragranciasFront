import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[appOnlyNumber]'
})
export class OnlyNumberDirective {

  el = inject(ElementRef<HTMLInputElement>);

  @HostListener('input', ['$event'])
  onInput():void {
    const input = this.el.nativeElement;
    const value = input.value;
    const numeric: number = value.replace(/\D/g, '');

    if (numeric !== value) input.value = numeric;
  };

};
