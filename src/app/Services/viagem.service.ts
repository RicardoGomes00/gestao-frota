import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // 1. Importe o operador 'map'
import { environment } from '../../environments/environment';
import { Viagem } from '../Models/viagem.model';

@Injectable({
  providedIn: 'root'
})
export class ViagemService {
  private apiUrl = `${environment.apiUrl}/viagens`;

  constructor(private http: HttpClient) { }


  buscarTodasAsViagens(): Observable<Viagem[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(viagensDaApi => {
        return viagensDaApi.map(viagemApi => {
          const viagemFrontEnd: Viagem = {
            id: viagemApi.id,
            destino: viagemApi.destino,
            justificativa: viagemApi.justificativa,
            dataHoraSaida: viagemApi.dataSaidaAgendada,
            dataHoraRetorno: viagemApi.dataRetornoEfetiva,
            status: viagemApi.status,
            quilometragemInicial: viagemApi.quilometragemInicial,
            quilometragemFinal: viagemApi.quilometragemFinal,
            veiculo: viagemApi.veiculo,
            motorista: viagemApi.motorista
          };
          return viagemFrontEnd;
        });
      })
    );
  }

 
  agendarNovaViagem(dadosFormulario: any): Observable<Viagem> {
    const payload = {
      veiculoId: dadosFormulario.veiculoId,
      motoristaId: dadosFormulario.motoristaId,
      destino: dadosFormulario.destino,
      justificativa: dadosFormulario.justificativa,
      dataSaidaAgendada: dadosFormulario.dataHoraSaida 
    };
    
    return this.http.post<Viagem>(`${this.apiUrl}/agendar`, payload);
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
