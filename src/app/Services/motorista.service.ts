import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Motorista } from '../Models/motorista.model';

@Injectable({
  providedIn: 'root'
})
export class MotoristaService {
  private apiUrl = `${environment.apiUrl}/admin/motoristas`;

  constructor(private http: HttpClient) { }


  buscarMotoristas(): Observable<Motorista[]> {
    return this.http.get<Motorista[]>(this.apiUrl);
  }

  buscarMotoristaPorId(id: number): Observable<Motorista> {
    return this.http.get<Motorista>(`${this.apiUrl}/${id}`);
  }


  adicionarMotorista(motorista: Partial<Motorista>): Observable<Motorista> {
    return this.http.post<Motorista>(this.apiUrl, motorista);
  }


  atualizarMotorista(id: number, motorista: Partial<Motorista>): Observable<Motorista> {
    return this.http.put<Motorista>(`${this.apiUrl}/${id}`, motorista);
  }


  inativarMotorista(motoristaId: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${motoristaId}/inativar`, null);
  }
}
