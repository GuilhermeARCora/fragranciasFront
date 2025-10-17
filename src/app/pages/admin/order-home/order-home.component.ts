import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { DataTableComponent } from '../../../shared/components/data-table/data-table.component';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BreakPointService } from '../../../core/services/breakPoint/break-point.service';
import { OrderService } from '../../../core/services/order/order.service';
import { ToastService } from '../../../core/services/swal/toast.service';
import { Order } from '../../../shared/types/Order';
import Swal from 'sweetalert2';
import { CurrencyMask } from '../../../shared/controlValueAcessor/currency/currency-mask.cva';

@Component({
  selector: 'app-order-home',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    DataTableComponent,
    RouterModule,
    MatFormFieldModule,
    MatInput,
    MatSelectModule,
    CurrencyMask
  ],
  templateUrl: './order-home.component.html',
  styleUrl: './order-home.component.scss'
})
export class OrderHomeComponent implements OnInit{

  breakpoint = inject(BreakPointService);
  router = inject(Router);
  formBuilder = inject(FormBuilder);
  orderService = inject(OrderService);
  toaster = inject(ToastService);
  orderForm!: FormGroup;

  statusList: string[] = ['PENDENTE', 'CONCLUIDO', 'CANCELADO'];

  columns = [
    { key: '_id', label: '_id', visible: true },
    { key: 'status', label: 'Status', visible: true },
    { key: 'totalFullPrice', label: 'Valor cheio', visible: true, pipe: 'currency', pipeArgs: ['BRL', 'symbol', '1.2-2'] },
    { key: 'totalDiscount', label:'Desconto', visible: true, pipe: 'currency', pipeArgs: ['BRL', 'symbol', '1.2-2'] },
    { key: 'totalCurrentPrice', label: 'Valor final', visible: true, pipe: 'currency', pipeArgs: ['BRL', 'symbol', '1.2-2']  },
    { key: 'totalPixPrice', label: 'Valor pix', visible: true, pipe: 'currency', pipeArgs: ['BRL', 'symbol', '1.2-2'] },
    { key: 'totalUnits', label: 'Unidades', visible: true },
  ];

  ngOnInit(): void{
    this.createForm();
    this.sendFilter();
  };

  createForm(): void{
    this.orderForm = this.formBuilder.group({
      _id:[''],
      status:[''],
      totalFullPrice:[''],
      totalDiscount:[''],
      totalCurrentPrice: [''],
      totalPixPrice:[''],
      totalUnits:['']
    });
  };

  changeStatus(order: Order): void{

     Swal.fire({
        title: "Deseja mudar o status?",
        icon: "question",
        showCancelButton: true,
        cancelButtonText:"CANCELAR",
        confirmButtonText: "CONCLUIDO",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33"
      }).then((result) => {
        if (result.isConfirmed) {
          this.orderService.completeOrder(order._id).subscribe({
            next: () => {
              this.sendFilter();
              this.toaster.success("Status do pedido atualizado!");
            },
            error: (err) => {
              this.toaster.setTimerEnabled(false);
              this.toaster.error(err.error.message);
            }
          });
        }else if (result.dismiss === Swal.DismissReason.cancel) {
          this.orderService.cancelOrder(order._id).subscribe({
            next: () => {
              this.sendFilter();
              this.toaster.success("Status do pedido atualizado!");
            },
            error: (err) => {
              this.toaster.setTimerEnabled(false);
              this.toaster.error(err.error.message);
            }
          });
        };
    });

  };

  redirectToOrder(order: Order):void{
    const orderId = order._id;

    this.router.navigateByUrl(`/pedido/${orderId}`);
  };

  onSubmit():void {

    if(this.orderForm.untouched || this.orderForm.pristine){
      this.toaster.info("Para filtrar escolha parâmetros")
      return;
    };

    this.sendFilter();
  };

  sendFilter(): void{
    const filters = this.orderForm.value;

    this.orderService.findAllOrders(filters).subscribe({
      next: () => {},
      error: (err) => {
        this.toaster.error(err.error.message);
      }
    });
  };

  resetForm():void {
    this.orderForm.reset({
      _id:'',
      status:'',
      totalFullPrice:'',
      totalDiscount:'',
      totalCurrentPrice: '',
      totalPixPrice: '',
      totalUnits: '',
    });
    this.sendFilter();
    this.orderForm.updateValueAndValidity();
  };

};
