import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { CepService } from './cep.service';

describe('CepService', () => {
  let service: CepService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), CepService]
    });
    service = TestBed.inject(CepService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('consulta o ViaCEP sem alterar o formato do CEP', () => {
    service.buscar('01001000').subscribe((resultado) => {
      expect(resultado.uf).toBe('SP');
    });

    const request = http.expectOne('https://viacep.com.br/ws/01001000/json/');
    expect(request.request.method).toBe('GET');
    request.flush({ cep: '01001-000', uf: 'SP', localidade: 'São Paulo' });
  });
});
