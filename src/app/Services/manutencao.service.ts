import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Manutencao } from '../Models/manutencao.model';

@Injectable({
  providedIn: 'root'
})
export class ManutencaoService {
  private apiUrl = `${environment.apiUrl}/admin/manutencoes`;

  constructor(private http: HttpClient) { }

  /** Busca a lista de todos os registros de manutenção. */
  buscarManutencoes(): Observable<Manutencao[]> {
    return this.http.get<Manutencao[]>(this.apiUrl);
  }

  /** * Adiciona um novo registro de manutenção.
   * O back-end deve, idealmente, atualizar o status do veículo para 'Em Manutenção'.
   */
  registrarManutencao(manutencao: Partial<Manutencao>): Observable<Manutencao> {
    return this.http.post<Manutencao>(this.apiUrl, manutencao);
  }
}