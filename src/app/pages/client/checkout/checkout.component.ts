import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { LayoutComponent } from "../layout/layout.component";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastService } from '../../../core/services/swal/toast.service';
import { CheckoutService } from '../../../core/services/checkout/checkout.service';
import { MatInputModule } from '@angular/material/input';
import { hasFormError } from '../../../shared/utils/helpers';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

@Component({
  selector: 'app-checkout',
  imports: [
    CommonModule,
    LayoutComponent,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    CdkTextareaAutosize
],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {

  fb = inject(FormBuilder);
  hasFormError = hasFormError;

  checkoutService = inject(CheckoutService);
  toaster = inject(ToastService);

  checkoutForm!: FormGroup;

  ngOnInit(): void {
    this.createForm();
  };

  createForm():void{
    this.checkoutForm = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      address: ['', [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(150),
          Validators.pattern(/^[\w\sÀ-ÿ.,!?"'()-]*$/)
        ]
      ],
      cpfOrCnpj: ['', [Validators.required]],
    });
  };

  onSubmit():void{
    this.checkoutService.newClient(this.checkoutForm.value);
    this.toaster.success("Informações enviadas para o WhatsApp com sucesso!");
  };

};
