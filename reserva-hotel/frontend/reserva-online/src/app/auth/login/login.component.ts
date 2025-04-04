import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false, // ← Fuerza a que no sea standalone
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent { 
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const data = this.loginForm.value;

      this.authService.login(data).subscribe({
        next: (response) => {
          console.log('Login exitoso', response);
          localStorage.setItem('token', response.token); // 🧪
        },
        error: (err) => {
          console.error('Error al iniciar sesión', err);
        }
      });
    }
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}