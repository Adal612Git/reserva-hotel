import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { CoreModule } from '../core/core.module';


// Angular Material
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// Componentes (solo si NO son standalone)
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


// auth.module.ts
@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    
  ],
  imports: [
    CommonModule,          // Usa CommonModule en lugar de BrowserModule
    AuthRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    CoreModule,
    MatIconModule
    // ❌ Elimina BrowserModule y CoreModule
  ]
})
export class AuthModule {}

