import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { BreakPointService } from '../../../core/services/breakPoint/break-point.service';
import { DataTableComponent } from "../../../shared/components/data-table/data-table.component";
import { ProductsService } from '../../../core/services/products/products.service';
import { Product } from '../../../shared/types/Product';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastService } from '../../../core/services/swal/toast.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-product-home',
  imports: [
    MatIconModule,
    CommonModule,
    DataTableComponent,
    RouterModule
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

  columns = [
    { key: '_id', label: '_id', visible: false },
    { key: 'name', label: 'Nome', visible: true },
    { key: 'cod', label: 'Código', visible: true },
    { key: 'categories', label: 'Categorias', visible: true, pipe: 'categories' },
    { key: 'fullPrice', label:'Preço Cheio', visible: true, pipe: 'currency', pipeArgs: ['BRL', 'symbol', '1.2-2'] },
    { key: 'promoPercentage', label: 'Porcentagem de Promoção', visible: true, pipe: 'percentage'  },
    { key: 'currentPrice', label: 'Preço Atual', visible: true, pipe: 'currency', pipeArgs: ['BRL', 'symbol', '1.2-2'] },
    { key: 'pixPrice', label: 'Preço Pix', visible: true, pipe: 'currency', pipeArgs: ['BRL', 'symbol', '1.2-2'] },
  ];

  ngOnInit(): void{
    this.productService.getAllProducts().subscribe(res => console.log(res));
  };

  createForm(): void{
    this.productForm = this.formBuilder.group({
      name:[''],
      cod:[''],
      fullPrice:[''],
      currentPrice:[''],
      pixPrice:[''],
      promoPercentege:[''],
      categories: this.formBuilder.array([])
    });
  };

  redirectCreateProduct():void{
    this.router.navigateByUrl('/admin/createProduct');
  };

  redirectEditProduct(product: Product):void{
    this.router.navigate([`/admin/editProduct/${product._id}`], {
      state: { product }
    });
  };

  changeStatus(product: Product): void{
    const newStatus = !product.active;

     Swal.fire({
        title: "Deseja mudar o status?",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText:"NÃO",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "SIM"
      }).then((result) => {
        if (result.isConfirmed) {
        this.productService.changeStatusProduct(newStatus!, product._id).subscribe({
          next: () => {
            this.toaster.success("Status do produto atualizado!");
          },
          error: (err) => {
            this.toaster.setTimerEnabled(false);
            this.toaster.error(err.error.message);
          }
        });
      };
    });

  };

};
