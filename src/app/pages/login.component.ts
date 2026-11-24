import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  readonly route = inject(ActivatedRoute);
  email = '';
  password = '';
  readonly error = signal('');

  constructor() {
    if (this.route.snapshot.queryParamMap.get('motivo') === 'token') {
      this.error.set('Token inválido. Entre novamente.');
    }
  }

  entrar(): void {
    if (!this.auth.login(this.email, this.password)) {
      this.error.set('Informe um e-mail válido e uma senha com pelo menos 6 caracteres.');
      return;
    }

    this.error.set('');
    void this.router.navigate(['/perfil']);
  }
}
