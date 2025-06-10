import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { matchFieldsValidator } from '../../shared/validators/matchFields.validator';
import { hasFormError } from '../../shared/utils/helpers';
import { CommonModule } from '@angular/common';
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
    hide = signal(true);

    ngOnInit(): void {
        this.buildForm();
    };

    buildForm(){

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

    onSubmit(){
      console.log('Testing', this.registerForm.value);
    };

    clickEvent(event: MouseEvent) {
      this.hide.update(value => !value);
      event.preventDefault();
      event.stopPropagation();
    };

};
