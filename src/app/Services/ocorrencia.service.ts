import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Ocorrencia } from '../Models/ocorrencia.model';

@Injectable({
  providedIn: 'root'
})
export class OcorrenciaService {
  private apiUrl = `${environment.apiUrl}/ocorrencias`;

  constructor(private http: HttpClient) { }

  /**
   * Envia os dados de uma nova ocorrência para o back-end.
   * O back-end deve usar o token do motorista para associar o ID dele.
   * @param dadosOcorrencia Contém a descrição e o ID da viagem associada.
   */
  registrarOcorrencia(dadosOcorrencia: { viagemId: number; descricao: string }): Observable<Ocorrencia> {
    // A rota para criar uma nova ocorrência provavelmente será um POST na raiz do recurso
    return this.http.post<Ocorrencia>(this.apiUrl, dadosOcorrencia);
  }

  // Futuramente, você pode adicionar outros métodos aqui, como:
  // buscarOcorrenciasPorMotorista(): Observable<Ocorrencia[]> { ... }
}