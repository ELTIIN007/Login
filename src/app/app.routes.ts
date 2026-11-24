import { Routes, CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { LoginComponent } from './pages/login.component';
import { ProfileComponent } from './pages/profile.component';
import { AuthService } from './services/auth.service';

const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return auth.isAuthenticated() ? true : router.createUrlTree(['/entrar']);
};

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'entrar' },
  { path: 'entrar', component: LoginComponent },
  { path: 'perfil', component: ProfileComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'entrar' }
];
