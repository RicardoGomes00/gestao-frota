import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Viagem } from '../Models/viagem.model';

@Injectable({
  providedIn: 'root'
})
export class ViagemService {
  private apiUrl = `${environment.apiUrl}/viagens`; // URL base para viagens

  constructor(private http: HttpClient) { }

  buscarTodasAsViagens(): Observable<Viagem[]> {
    return this.http.get<Viagem[]>(this.apiUrl);
  }

  buscarViagensPendentesMotorista(): Observable<Viagem[]> {
    return this.http.get<Viagem[]>(`${environment.apiUrl}/motorista/viagens/pendentes`);
  }
  
  iniciarViagem(viagemId: number, quilometragemInicial: number): Observable<any> {
    const body = { quilometragem_inicial: quilometragemInicial };
    return this.http.patch(`${this.apiUrl}/${viagemId}/iniciar`, body);
  }
  
  agendarNovaViagem(dadosViagem: Partial<Viagem>): Observable<Viagem> {
    return this.http.post<Viagem>(this.apiUrl, dadosViagem);
  }
  
  finalizarViagem(viagemId: number, quilometragemFinal: number): Observable<any> {
    const body = { quilometragem_final: quilometragemFinal };
    return this.http.patch(`${this.apiUrl}/${viagemId}/finalizar`, body);
  }

  buscarHistoricoMotorista(): Observable<Viagem[]> {
    const url = `${environment.apiUrl}/motorista/viagens/historico`;
    return this.http.get<Viagem[]>(url);
  }

}