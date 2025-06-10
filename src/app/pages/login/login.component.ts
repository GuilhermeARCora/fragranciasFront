import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { hasFormError } from '../../shared/utils/helpers';
@Component({
  selector: 'app-login',
  imports: [
    RouterLink,
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
  hide = signal(true);
  route = inject(Router);

  ngOnInit(): void {
    this.buildForm();
  };

  buildForm(){
       this.loginForm = new FormGroup({
            email: new FormControl('',[Validators.required, Validators.email]),
            password: new FormControl('',[Validators.required, Validators.minLength(6)]),
        }
      );
  };

  onSubmit(){

    if(this.loginForm.valid){
       console.log('Testing', this.loginForm.value);
       this.Toast.fire({
          icon: "success",
          title: "Logado com sucesso"
       });
       this.route.navigateByUrl('/home');
    }else{
      Swal.fire({icon: "error",title: "Erro de Login",text: "Por favor tente novamente"});
    }

  };

  clickEvent(event: MouseEvent) {
      this.hide.update(value => !value);
      event.preventDefault();
      event.stopPropagation();
  };

  Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
  });

};
