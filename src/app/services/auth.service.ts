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
    this.isAuthenticated.set(Boolean(token));
  }

  login(email: string, password: string): boolean {
    if (email.trim().toLowerCase() !== 'emily@email.com' || password !== '123456') {
      return false;
    }

    localStorage.setItem('auth_token', 'token-valido-emily');
    this.isAuthenticated.set(true);
    return true;
  }

  me(): Observable<UserProfile> {
    return this.http.get<UserProfile>('https://httpbin.org/anything/auth/me').pipe(
      map(() => ({ name: 'Emily', email: 'emily@email.com' })),
      tap((profile) => this.profile.set(profile))
    );
  }

  useInvalidToken(): void {
    localStorage.setItem('auth_token', 'token-inventado');
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    this.profile.set(null);
    this.isAuthenticated.set(false);
  }
}
