import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Abastecimento } from '../Models/abastecimento.model';

@Injectable({
  providedIn: 'root'
})
export class AbastecimentoService {
  private apiUrl = `${environment.apiUrl}/admin/abastecimentos`;

  constructor(private http: HttpClient) { }

  /** Busca a lista de todos os registros de abastecimento. */
  buscarAbastecimentos(): Observable<Abastecimento[]> {
    return this.http.get<Abastecimento[]>(this.apiUrl);
  }

  /** Adiciona um novo registro de abastecimento. */
  registrarAbastecimento(abastecimento: Partial<Abastecimento>): Observable<Abastecimento> {
    return this.http.post<Abastecimento>(this.apiUrl, abastecimento);
  }
}