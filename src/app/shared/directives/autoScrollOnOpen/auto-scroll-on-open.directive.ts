import { Directive, ElementRef, OnDestroy } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[autoScrollOnOpen]',
  standalone: true
})
export class AutoScrollOnOpenDirective implements OnDestroy {
  private sub: Subscription;

  constructor(private panel: MatExpansionPanel, private host: ElementRef<HTMLElement>) {
    // Escuta quando o painel abre
    this.sub = this.panel.opened.subscribe(() => {
      // Aguarda o Angular aplicar a animação antes do scroll
      setTimeout(() => {
        this.host.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 150);
    });
  };

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  };

};
