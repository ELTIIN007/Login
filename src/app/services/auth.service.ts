import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, map } from 'rxjs';

export interface UserProfile {
  name: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly isAuthenticated = signal(false);
  readonly profile = signal<UserProfile | null>(null);

  constructor(private readonly http: HttpClient) {
    const token = localStorage.getItem('auth_token');
    const savedProfile = localStorage.getItem('auth_profile');
    this.isAuthenticated.set(Boolean(token));

    if (savedProfile) {
      try {
        this.profile.set(JSON.parse(savedProfile) as UserProfile);
      } catch {
        localStorage.removeItem('auth_profile');
      }
    }
  }

  login(email: string, password: string): boolean {
    const normalizedEmail = email.trim().toLowerCase();
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail);

    if (!emailValido || password.length < 6) {
      return false;
    }

    const nomeBase = normalizedEmail.split('@')[0].replace(/[._-]+/g, ' ').trim();
    const name = nomeBase
      ? nomeBase.split(' ').map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(' ')
      : 'Torcedor';

    const profile = { name, email: normalizedEmail };
    const token = `demo-${crypto.randomUUID()}`;

    localStorage.setItem('auth_token', token);
    localStorage.setItem('auth_profile', JSON.stringify(profile));
    this.profile.set(profile);
    this.isAuthenticated.set(true);
    return true;
  }

  me(): Observable<UserProfile> {
    return this.http.get<unknown>('https://httpbin.org/anything/auth/me').pipe(
      map(() => this.profile() ?? { name: 'Torcedor', email: '' }),
      tap((profile) => this.profile.set(profile))
    );
  }

  useInvalidToken(): void {
    localStorage.setItem('auth_token', 'token-inventado');
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_profile');
    this.profile.set(null);
    this.isAuthenticated.set(false);
  }
}
