import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: false
})
export class RegisterComponent {
  registerForm: FormGroup;
  registrationError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required], // ← Añadido
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  onSubmit() {
    this.registrationError = null;

    if (this.registerForm.valid) {
      const { nombre, email, password, confirmPassword } = this.registerForm.value;

      this.authService.register({ nombre, email, password, confirmPassword }).subscribe({
        next: (res) => {
          console.log('Registro exitoso', res);
          // Redirigir o notificar al usuario
        },
        error: (err) => {
          console.error('Error en el registro', err);
          this.registrationError = err.error?.message || 'Error al registrar usuario';
        }
      });
    } else {
      console.warn('Formulario inválido', this.registerForm.errors);
      this.registrationError = 'Por favor completa todos los campos correctamente';
    }
  }

  // Getters para acceso desde el template
  get nombre() {
    return this.registerForm.get('nombre');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }
}
