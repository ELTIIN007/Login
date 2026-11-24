import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CepResult {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

@Injectable({ providedIn: 'root' })
export class CepService {
  constructor(private readonly http: HttpClient) {}

  buscar(cep: string): Observable<CepResult> {
    const limpo = cep.replace(/\D/g, '');
    return this.http.get<CepResult>(`https://viacep.com.br/ws/${limpo}/json/`);
  }
}
