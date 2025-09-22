import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { hasFormError } from '../../../shared/utils/helpers';
import { AuthService } from '../../../core/services/auth/auth.service';
import { ToastService } from '../../../core/services/swal/toast.service';
import { LoginPayload } from '../../../shared/types/Authentication';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  loginForm!: FormGroup;
  hasFormError = hasFormError;
  toast = inject(ToastService);
  hide = signal(true);
  router = inject(Router);
  authService = inject(AuthService);

  ngOnInit(): void {
    this.buildForm();
  };

  buildForm(): void{
       this.loginForm = new FormGroup({
            email: new FormControl('',[Validators.required, Validators.email]),
            password: new FormControl('',[Validators.required, Validators.minLength(6)]),
        }
      );
  };

  onSubmit(): void{

    if(this.loginForm.invalid) return;

    const formValue = this.loginForm.value as LoginPayload;

    this.authService.login(formValue).subscribe({
      next:() => {
        this.router.navigateByUrl('/admin/home');
        this.toast.success('Login bem sucedido!');

      },
      error:() => {
        Swal.fire({icon: "error",title: "Erro de Login",text: "Tente novamente!"});
      }
    });

  };

  clickEvent(event: MouseEvent): void {
      this.hide.update(value => !value);
      event.preventDefault();
      event.stopPropagation();
  };

};
