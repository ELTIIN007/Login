import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), AuthService]
    });
    service = TestBed.inject(AuthService);
  });

  afterEach(() => {
    TestBed.inject(HttpTestingController).verify();
  });

  it('rejeita e-mail inválido', () => {
    expect(service.login('email-invalido', 'senha123')).toBe(false);
  });

  it('rejeita senha curta', () => {
    expect(service.login('torcedor@email.com', '123')).toBe(false);
  });

  it('aceita dados informados pelo usuário e cria token', () => {
    expect(service.login('maria.silva@email.com', 'minhaSenha')).toBe(true);
    expect(service.isAuthenticated()).toBe(true);
    expect(localStorage.getItem('auth_token')).toBeTruthy();
    expect(service.profile()?.name).toBe('Maria Silva');
  });

  it('limpa dados ao sair', () => {
    service.login('torcedor@email.com', 'senha123');
    service.logout();
    expect(service.isAuthenticated()).toBe(false);
    expect(localStorage.getItem('auth_token')).toBeNull();
    expect(localStorage.getItem('auth_profile')).toBeNull();
  });
});
