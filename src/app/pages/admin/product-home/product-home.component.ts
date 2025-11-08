import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { BreakPointService } from '../../../core/services/breakPoint/break-point.service';
import { DataTableComponent } from '../../../shared/components/data-table/data-table.component';
import { ProductsService } from '../../../core/services/products/products.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ToastService } from '../../../core/services/swal/toast.service';
import Swal from 'sweetalert2';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DisplayCategoryPipe } from '../../../shared/pipes/display-category/display-category.pipe';
import { MatCheckboxModule } from '@angular/material/checkbox';
import type { Product } from '../../../shared/types/product';
import type { FormGroup } from '@angular/forms';
import type { OnInit } from '@angular/core';
@Component({
  selector: 'app-product-home',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    DataTableComponent,
    RouterModule,
    MatFormFieldModule,
    MatInput,
    MatSelectModule,
    DisplayCategoryPipe,
    MatCheckboxModule
  ],
  templateUrl: './product-home.component.html',
  styleUrl: './product-home.component.scss'
})
export class ProductHomeComponent implements OnInit{

  breakpoint = inject(BreakPointService);
  router = inject(Router);
  formBuilder = inject(FormBuilder);
  productService = inject(ProductsService);
  toaster = inject(ToastService);
  productForm!: FormGroup;

  allCategories: string[] = ['aromatizadores', 'autoCuidado', 'casaEBemEstar', 'destaque'];

  columns = [
    { key: '_id', label: '_id', visible: false },
    { key: 'name', label: 'Nome', visible: true },
    { key: 'cod', label: 'Código', visible: true },
    { key: 'categories', label: 'Categorias', visible: true, pipe: 'categories' },
    { key: 'fullPrice', label:'Preço Cheio', visible: true, pipe: 'currency', pipeArgs: ['BRL', 'symbol', '1.2-2'] },
    { key: 'promoPercentage', label: '% de Promoção', visible: true, pipe: 'percentage'  },
    { key: 'currentPrice', label: 'Preço Atual', visible: true, pipe: 'currency', pipeArgs: ['BRL', 'symbol', '1.2-2'] },
    { key: 'pixPrice', label: 'Preço Pix', visible: true, pipe: 'currency', pipeArgs: ['BRL', 'symbol', '1.2-2'] }
  ];

  ngOnInit(): void{
    this.createForm();
    this.firstFilter();
  };

  createForm(): void{
    this.productForm = this.formBuilder.group({
      name:[''],
      cod:[''],
      fullPrice:[''],
      promoPercentage:[''],
      categories: [''],
      active:[true],
      isInPromo:[false]
    });
  };

  redirectEditProduct(product: Product):void{
    this.router.navigate([`/admin/editar-produto/${product._id}`], {
      state: { product }
    });
  };

  changeActive(product: Product): void{
    const newStatus = !product.active;

    Swal.fire({
      title: 'Deseja mudar o status?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText:'NÃO',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'SIM'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.changeStatusProduct(newStatus!, product._id).subscribe({
          next: () => {
            this.sendFilter();
            this.toaster.success('Status do produto atualizado!');
          },
          error: (err) => {
            this.toaster.setTimerEnabled(false);
            this.toaster.error(err.error.message);
          }
        });
      };
    });

  };

  removeProduct(product: Product):void{

    Swal.fire({
      title: 'Deseja excluir este produto?',
      text:'Essa acão não será reversivel!',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText:'NÃO',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'SIM'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProduct(product._id).subscribe({
          next: () => {
            this.sendFilter();
            this.toaster.success('Produto deletado!');
          },
          error: (err) => {
            this.toaster.setTimerEnabled(false);
            this.toaster.error(err.error.message);
          }
        });
      };
    });

  };

  onSubmit():void {

    if(this.productForm.untouched || this.productForm.pristine){
      this.toaster.info('Para filtrar escolha parâmetros');
      return;
    };

    this.sendFilter();
  };

  sendFilter(): void{
    const filters = this.productForm.value;

    this.productService.getAllProducts(filters).subscribe({
      error: (err) => {
        this.toaster.error(err.error.message);
      }
    });
  };

  firstFilter(): void {
    const state = history.state?.filter;

    if (state) {
      const { active } = state;
      if(active !== false ) state.active = true;

      this.productForm.patchValue(state);
      this.productForm.updateValueAndValidity();
      this.productService.getAllProducts(state).subscribe({
        error: (err) => this.toaster.error(err.error.message)
      });

      history.replaceState({}, '');
    } else {
      this.sendFilter();
    };

  };

  resetForm():void {
    this.productForm.reset({
      active: true,
      name:'',
      cod:'',
      fullPrice:'',
      promoPercentage:'',
      categories: '',
      isInPromo: false
    });
    this.sendFilter();
    this.productForm.updateValueAndValidity();
  };

  preventNegative(event: KeyboardEvent):void {
    if (event.key === '-' || event.key === 'Subtract') {
      event.preventDefault();
    };
  };

};
