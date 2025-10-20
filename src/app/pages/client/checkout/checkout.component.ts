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
import { Router } from '@angular/router';
import { OnlyNumberDirective } from '../../../shared/directives/onlyNumber/only-number.directive';
import { cpfCnpjValidator } from '../../../shared/validators/isCPForCNPJ.validator';

@Component({
  selector: 'app-checkout',
  imports: [
    CommonModule,
    LayoutComponent,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    CdkTextareaAutosize,
    OnlyNumberDirective
],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {

  fb = inject(FormBuilder);
  hasFormError = hasFormError;
  router = inject(Router);

  checkoutService = inject(CheckoutService);
  toaster = inject(ToastService);

  checkoutForm!: FormGroup;

  ngOnInit(): void {
    this.createForm();
  };

  createForm():void{
    this.checkoutForm = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(150),
          Validators.pattern(/^[\w\sÀ-ÿ.,!?"'()-]*$/)
        ]
      ],
      cpfOrCnpj: ['', [Validators.required, cpfCnpjValidator]],
    });
  };

  onSubmit():void{
    this.checkoutService.newClient(this.checkoutForm.value);
    this.toaster.setTimerEnabled(false);
    this.toaster.success("Informações enviadas para o WhatsApp com sucesso!");
    this.router.navigateByUrl("/");
  };

};
