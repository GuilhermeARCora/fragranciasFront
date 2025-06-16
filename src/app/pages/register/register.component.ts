import Swal from 'sweetalert2';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { matchFieldsValidator } from '../../shared/validators/matchFields.validator';
import { hasFormError } from '../../shared/utils/helpers';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth/auth.service';
import { RegisterPayload } from '../../shared/types/User';
import { ToastService } from '../../core/services/swal/toast.service';
@Component({
  selector: 'app-register',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    CommonModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

    registerForm!: FormGroup;
    hasFormError = hasFormError;
    toast = inject(ToastService);
    hide = signal(true);
    router = inject(Router);
    authService = inject(AuthService);

    ngOnInit(): void {
        this.buildForm();
    };

    buildForm(): void{

      this.registerForm = new FormGroup({
            name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]),
            email: new FormControl('',[Validators.required, Validators.email]),
            password: new FormControl('',[Validators.required, Validators.minLength(6)]),
            confirmPassword: new FormControl('',[Validators.required, Validators.minLength(6)]),
            confirmEmail: new FormControl('',[Validators.required, Validators.email]),
        },
        {
            validators: [
                  matchFieldsValidator('email', 'confirmEmail'),
                  matchFieldsValidator('password', 'confirmPassword'),
            ]
        }
      );
    };

    onSubmit(): void{

      if(this.registerForm.invalid) return;

      const userData = this.registerForm.value as RegisterPayload;

      this.authService.signup(userData).subscribe({
        next: () =>{
          this.router.navigateByUrl('/home').then(()=>{
            this.toast.success('Login bem sucedido!');
          });

        },
        error:() => {
          Swal.fire({icon: "error",title:"Erro de Cadastro",text:'Tente novamente!'});
        }
      });

    };

    clickEvent(event: MouseEvent): void {
      this.hide.update(value => !value);
      event.preventDefault();
      event.stopPropagation();
    };


};
