import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CepResult, CepService } from '../services/cep.service';

interface Game {
  id: number;
  home: string;
  away: string;
  date: string;
  stadium: string;
  price: number;
}

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  readonly auth = inject(AuthService);
  private readonly cepService = inject(CepService);
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  readonly games: Game[] = [
    { id: 1, home: 'Flamengo', away: 'Palmeiras', date: '29 NOV • 18:30', stadium: 'Maracanã', price: 120 },
    { id: 2, home: 'Corinthians', away: 'São Paulo', date: '06 DEZ • 16:00', stadium: 'Neo Química Arena', price: 95 },
    { id: 3, home: 'Grêmio', away: 'Internacional', date: '13 DEZ • 20:00', stadium: 'Arena do Grêmio', price: 110 }
  ];
  selectedGame = this.games[0];
  quantity = 1;
  readonly purchaseConfirmed = signal(false);

  cep = '';
  readonly cepResult = signal<CepResult | null>(null);
  readonly cepErro = signal('');
  readonly loadingCep = signal(false);
  readonly loadingProfile = signal(true);

  ngOnInit(): void {
    this.auth.me().subscribe({
      next: () => this.loadingProfile.set(false),
      error: () => this.loadingProfile.set(false)
    });
  }

  get total(): number {
    return this.selectedGame.price * this.quantity;
  }

  comprar(): void {
    this.purchaseConfirmed.set(true);
  }

  buscarCep(): void {
    const limpo = this.cep.replace(/\D/g, '');
    if (limpo.length !== 8) {
      this.cepErro.set('Digite um CEP válido com 8 números.');
      this.cepResult.set(null);
      return;
    }

    this.loadingCep.set(true);
    this.cepErro.set('');
    this.cepService.buscar(limpo).subscribe({
      next: (resultado) => {
        this.loadingCep.set(false);
        if (resultado.erro) {
          this.cepResult.set(null);
          this.cepErro.set('CEP não encontrado.');
        } else {
          this.cepResult.set(resultado);
        }
      },
      error: () => {
        this.loadingCep.set(false);
        this.cepErro.set('Não foi possível consultar o CEP.');
      }
    });
  }

  usarTokenInventado(): void {
    this.auth.useInvalidToken();
    this.http.get('https://httpbin.org/status/401').subscribe({
      error: () => undefined
    });
  }

  sair(): void {
    this.auth.logout();
    void this.router.navigate(['/entrar']);
  }
}
