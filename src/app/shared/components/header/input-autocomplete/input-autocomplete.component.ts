import { Component, inject, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { combineLatest, debounceTime, distinctUntilChanged, map, startWith, take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { ProductsService } from '../../../../core/services/products/products.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import type { ElementRef, OnInit } from '@angular/core';
import type { Product } from '../../../types/product';
import type { Observable } from 'rxjs';

@Component({
  selector: 'app-input-autocomplete',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './input-autocomplete.component.html',
  styleUrl: './input-autocomplete.component.scss'
})
export class InputAutocompleteComponent implements OnInit{

  productService = inject(ProductsService);
  router = inject(Router);

  filtered$!: Observable<Product[]>;
  prodCtrl = new FormControl('');

  ngOnInit(): void {
    this.filteringTheInput();
  };

  filteringTheInput(): void{
    const input$ = this.prodCtrl.valueChanges.pipe(
      startWith(''),
      debounceTime(150),
      distinctUntilChanged(),
      map(value => value?.toLowerCase() ?? '')
    );

    this.filtered$ = combineLatest([
      this.productService.products$,
      input$
    ]).pipe(
      map(([products, search]) => {
        if (!search) return products;
        const term = this.normalize(search);
        const terms = term.split(/\s+/);

        return products.filter(p => {
          const name = this.normalize(p.name ?? '');
          const desc = this.normalize(p.description ?? '');
          const text = `${name} ${desc}`;
          return terms.every(t => text.includes(t));
        });
      })
    );
  };

  private normalize(text: string): string {
    return text
      .toLowerCase()
      .normalize('NFD') // separa letras dos acentos
      .replace(/[\u0300-\u036f]/g, ''); // remove acentos
  };

  @ViewChild('input') input!: ElementRef<HTMLInputElement>;
  clearFilter(event: MouseEvent):void {
    this.prodCtrl.patchValue('');
    this.prodCtrl.updateValueAndValidity();
    event.preventDefault();
    event.stopPropagation();
    this.input.nativeElement.focus();
  };

  onProductSelected(productName: string): void {
    this.filtered$.pipe(take(1)).subscribe(products => {
      const product = products.find(p => p.name === productName);
      if (product) {
        this.redirectToProduct(product);
      }
    });
  };

  redirectToProduct(product : Product){
    this.router.navigate([`/produto/${product._id}`], {
      state: product
    });
  };

  displayFn(value: Product | string): string {
    return typeof value === 'object' ? value.name : value;
  };

};
