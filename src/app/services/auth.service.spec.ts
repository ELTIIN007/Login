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

  it('rejeita senha incorreta', () => {
    expect(service.login('emily@email.com', 'errada')).toBe(false);
  });

  it('aceita login correto e cria token', () => {
    expect(service.login('emily@email.com', '123456')).toBe(true);
    expect(service.isAuthenticated()).toBe(true);
    expect(localStorage.getItem('auth_token')).toBe('token-valido-emily');
  });

  it('limpa token ao sair', () => {
    service.login('emily@email.com', '123456');
    service.logout();
    expect(service.isAuthenticated()).toBe(false);
    expect(localStorage.getItem('auth_token')).toBeNull();
  });
});
