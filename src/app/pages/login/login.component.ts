import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
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
      console.log('Testing', this.loginForm.value);
    };

    clickEvent(event: MouseEvent) {
      this.hide.update(value => !value);
      event.preventDefault();
      event.stopPropagation();
    };

};
