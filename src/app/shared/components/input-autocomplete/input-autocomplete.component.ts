import { Component, ElementRef, HostListener, inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { debounceTime, distinctUntilChanged, Observable, startWith, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Product } from '../../types/Product';
import { ProductsService } from '../../../core/services/products/products.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-input-autocomplete',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  templateUrl: './input-autocomplete.component.html',
  styleUrl: './input-autocomplete.component.scss'
})
export class InputAutocompleteComponent implements OnInit{

  productService = inject(ProductsService);

  filtered$!: Observable<Product[]>;
  prodCtrl = new FormControl('');

  ngOnInit(): void {
    this.filteringTheInput();
  };

  filteringTheInput(): void{
    this.filtered$ = this.prodCtrl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => {
        const query = value?.trim() ?? '';

        if (query.length < 2) {
          // 🔸 Caso o filtro esteja vazio, retorna todos os produtos
          return this.productService.getAllProducts({});
        };

        // 🔸 Caso contrário, faz o autocomplete
        return this.productService.searchAutoComplete(query);
      })
    );
  };

  @ViewChild('input') input!: ElementRef<HTMLInputElement>;
  clearFilter(event: MouseEvent):void {
    this.prodCtrl.patchValue('');
    this.prodCtrl.updateValueAndValidity();
    event.preventDefault();
    event.stopPropagation();
    this.input.nativeElement.focus();
  };

};
