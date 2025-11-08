import { CommonModule, Location } from '@angular/common';
import { Component, HostListener, inject, input, Input, signal, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { HeaderCartComponent } from './header-cart/header-cart.component';
import { BreakPointService } from '../../../core/services/breakPoint/break-point.service';
import { AuthService } from '../../../core/services/auth/auth.service';
import { HeaderInputAutoCompleteComponent } from './header-input-auto-complete/header-input-auto-complete.component';
import { ProductsService } from '../../../core/services/products/products.service';
import { ToastService } from '../../../core/services/swal/toast.service';
import { InputAutocompleteComponent } from './input-autocomplete/input-autocomplete.component';
import type { Observable } from 'rxjs';
import type { ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    RouterModule,
    MatTooltipModule,
    HeaderCartComponent,
    MatIconModule,
    HeaderInputAutoCompleteComponent,
    InputAutocompleteComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{

  @Input({ required:true }) isHome$!: Observable<boolean>;
  @Input({ required:true }) isProduto$!: Observable<boolean>;
  @Input() isCategoria$!:Observable<boolean>;

  location = inject(Location);
  breakpointService = inject(BreakPointService);
  authService = inject(AuthService);
  productsService = inject(ProductsService);
  toaster = inject(ToastService);

  isAdmin = this.authService.currentUser?.role;

  title = input<string>('');
  openSearchInput = signal<boolean>(false);

  ngOnInit(){
    this.productsService.getAllProducts({ active:true }).subscribe({
      error: (err) => {
        this.toaster.error(err.error.message);
      }
    });;
  };

  back():void {
    this.location.back();
  };

  searchInputState():void{
    this.openSearchInput.update(v => !v);
  };

  @ViewChild('headerRoot', { static: true })
    headerEl!: ElementRef<HTMLElement>;
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.openSearchInput()) return;

    const target = event.target as HTMLElement;

    const insideSearch = !!target.closest('app-input-autocomplete,[data-search-root]');
    if (insideSearch) return;
    if (target.closest('#toggle-search-btn')) return;

    const insideHeader = this.headerEl.nativeElement.contains(target);
    if (insideHeader) this.openSearchInput.set(false);
  };

};
