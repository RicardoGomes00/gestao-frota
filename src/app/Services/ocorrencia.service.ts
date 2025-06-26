import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Ocorrencia } from '../Models/ocorrencia.model';

interface OcorrenciaCreateDTO {
  viagemId: number;
  titulo: string;
  descricao: string;
}

@Injectable({
  providedIn: 'root'
})
export class OcorrenciaService {
  private apiUrl = `${environment.apiUrl}/ocorrencias`;

  constructor(private http: HttpClient) { }

  registrarOcorrencia(dadosOcorrencia: OcorrenciaCreateDTO): Observable<Ocorrencia> {
    return this.http.post<Ocorrencia>(this.apiUrl, dadosOcorrencia);
  }


  buscarOcorrencias(): Observable<Ocorrencia[]> {
    return this.http.get<Ocorrencia[]>(this.apiUrl);
  }
}
