import { Directive, ElementRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatExpansionPanel } from '@angular/material/expansion';
import { debounceTime } from 'rxjs';

@Directive({
  selector: '[autoScrollOnOpen]',
  standalone: true
})
export class AutoScrollOnOpenDirective{

  constructor(private panel: MatExpansionPanel, private host: ElementRef<HTMLElement>) {
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
