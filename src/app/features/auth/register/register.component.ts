import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthValidators } from '../../../shared/validator/form-auth.validator';
import { AuthService } from '../auth.service';
import { RegisterCredentials } from '../auth.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  passwordGroup = new FormGroup({
    password: new FormControl('', {validators: [Validators.required]}),
    confirmPassword: new FormControl('', {validators: [Validators.required]})
  },
  {
    validators: [AuthValidators.equalValues('password', 'confirmPassword')]
  });

  form = new FormGroup({
    username: new FormControl('', {validators: [Validators.required]}),
    passwordGroup: this.passwordGroup,
    firstName: new FormControl('', {validators: [Validators.required]}),
    lastName: new FormControl(''),
    email: new FormControl('', {validators: [Validators.required, Validators.email]})
  });

  router = inject(Router);

  constructor(private authService: AuthService){}

  onSubmit() {
    console.log(this.form.value);
    this.authService.register({
      username: this.form.value.username!, 
      password: this.form.value.passwordGroup?.password!,
      role: 'customer', 
      firstName: this.form.value.firstName!, 
      lastName: this.form.value.lastName!, 
      email: this.form.value.email!
    } as RegisterCredentials).subscribe({
      next: (response) => {
        if(response.data) {
          this.router.navigate(['auth/login']);
          Swal.fire({
            icon: 'success',
            title: 'Register Success',
            showConfirmButton: false,
            timer: 1500
          })
        }
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: err.error.message,
          showConfirmButton: false,
          timer: 1500
        })
      }
    });
  }
}
