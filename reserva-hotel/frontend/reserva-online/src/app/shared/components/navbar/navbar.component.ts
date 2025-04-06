import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, NgIf],
  template: `
    <nav style="padding: 1rem; background: #f2f2f2; display: flex; justify-content: space-between;">
      <div>
        <a routerLink="/" style="margin-right: 1rem;">🏠 Inicio</a>
        <a routerLink="/reserva">📆 Reservas</a>
      </div>
      <div *ngIf="authService.isLoggedIn(); else loggedOut">
        ✅ Sesión activa |
        <button (click)="logout()">Cerrar sesión</button>
      </div>
      <ng-template #loggedOut>
        ⛔ No autenticado
      </ng-template>
    </nav>
  `
})
export class NavbarComponent {
  constructor(public authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
