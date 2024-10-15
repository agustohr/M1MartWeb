import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { LoginCredentials } from '../auth.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form = new FormGroup({
    username: new FormControl('', {validators: [Validators.required]}),
    password: new FormControl('', {validators: [Validators.required]})
  });
  router = inject(Router)
  constructor(private authService: AuthService) {}
  onSubmit(){
    this.authService.login({username: this.form.value.username!, password: this.form.value.password!} as LoginCredentials)
    .subscribe({
      next: (response) => {
        if (response.data) {
          if(response.data.role === 'admin') {
            this.router.navigate(['admin'])
          }else {
            this.router.navigate(['catalog']);
          }
          Swal.fire({
            icon: 'success',
            title: 'Login Success',
            showConfirmButton: false,
            timer: 1500
          })
        }else {
          window.alert('Tidak dapat login')
        }
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: err.error.message,
          showConfirmButton: false,
          timer: 1500
        })
        console.log(err.error.message);
      }
    })
  }
}
