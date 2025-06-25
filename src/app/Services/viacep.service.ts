import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViacepService {
  private apiUrl = 'https://viacep.com.br/ws';

  constructor(private http: HttpClient) { }

  /**
   * Consulta um CEP na API do ViaCEP.
   * @param cep O CEP a ser consultado (apenas números).
   */
  consultarCep(cep: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${cep}/json/`);
  }
}