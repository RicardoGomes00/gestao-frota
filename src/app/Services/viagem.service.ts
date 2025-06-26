import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Viagem } from '../Models/viagem.model';

@Injectable({
  providedIn: 'root'
})
export class ViagemService {
  private apiUrl = `${environment.apiUrl}/viagens`;

  constructor(private http: HttpClient) { }

 
  buscarTodasAsViagens(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

 
  buscarViagensPendentesMotorista(motoristaId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/motorista/${motoristaId}/pendentes`);
  }


  buscarHistoricoMotorista(motoristaId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/motorista/${motoristaId}/historico`);
  }


  agendarNovaViagem(payloadParaApi: any): Observable<Viagem> {
    return this.http.post<Viagem>(`${this.apiUrl}/agendar`, payloadParaApi);
  }


  iniciarViagem(viagemId: number, quilometragemInicial: number): Observable<any> {
    const payload = { quilometragem_inicial: quilometragemInicial };
    return this.http.patch(`${this.apiUrl}/${viagemId}/iniciar`, payload);
  }
  

  finalizarViagem(viagemId: number, quilometragemFinal: number): Observable<any> {
    const payload = { quilometragem_final: quilometragemFinal };
    return this.http.patch(`${this.apiUrl}/${viagemId}/finalizar`, payload);
  }

}
