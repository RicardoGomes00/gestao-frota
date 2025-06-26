import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Manutencao } from '../Models/manutencao.model';

interface ManutencaoCreateDTO {
  veiculoId: number;
  dataInicio: string;
  descricaoServico: string;
  custo: number;
  quilometragem: number;
}

@Injectable({
  providedIn: 'root'
})
export class ManutencaoService {
  private apiUrl = `${environment.apiUrl}/admin/manutencoes`;

  constructor(private http: HttpClient) { }

  buscarManutencoes(): Observable<Manutencao[]> {
    return this.http.get<Manutencao[]>(this.apiUrl);
  }

  registrarManutencao(dados: ManutencaoCreateDTO): Observable<Manutencao> {
    return this.http.post<Manutencao>(this.apiUrl, dados);
  }
}
