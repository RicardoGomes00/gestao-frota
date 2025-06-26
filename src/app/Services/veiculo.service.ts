import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Veiculo } from '../Models/veiculo.model';

@Injectable({
  providedIn: 'root'
})
export class VeiculoService {
  private apiUrl = `${environment.apiUrl}/admin/veiculos`;

  constructor(private http: HttpClient) { }

  buscarVeiculos(): Observable<Veiculo[]> {
    return this.http.get<Veiculo[]>(this.apiUrl);
  }

  adicionarVeiculo(veiculo: Partial<Veiculo>): Observable<Veiculo> {
    return this.http.post<Veiculo>(this.apiUrl, veiculo);
  }

  atualizarVeiculo(id: number, veiculo: Partial<Veiculo>): Observable<Veiculo> {
    return this.http.put<Veiculo>(`${this.apiUrl}/${id}`, veiculo);
  }

  atualizarStatus(id: number, novoStatus: string): Observable<any> {
    const payload = { status: novoStatus };
    return this.http.patch(`${this.apiUrl}/${id}/status`, payload);
  }
}