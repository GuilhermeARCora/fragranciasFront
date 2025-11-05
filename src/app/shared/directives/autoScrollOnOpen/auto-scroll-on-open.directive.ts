import { Directive, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs';
import { MatExpansionPanel } from '@angular/material/expansion';
import { ElementRef } from '@angular/core';

@Directive({
  selector: '[appAutoScrollOnOpen]',
  standalone: true
})
export class AutoScrollOnOpenDirective{

  panel = inject(MatExpansionPanel);
  host = inject(ElementRef<HTMLElement>);

  constructor() {
    // Escuta quando o painel abre
    this.panel.opened.pipe(
      debounceTime(150),
      takeUntilDestroyed()
    ).subscribe(() => {
      // Aguarda o Angular aplicar a animação antes do scroll
      this.host.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  };

};
