import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Abastecimento } from '../Models/abastecimento.model';
import { AbastecimentoCreateDTO } from '../Models/abastecimento-create.dto';

@Injectable({
  providedIn: 'root'
})
export class AbastecimentoService {
  private apiUrl = `${environment.apiUrl}/admin/abastecimentos`;

  constructor(private http: HttpClient) {}

  buscarAbastecimentos(): Observable<Abastecimento[]> {
    return this.http.get<Abastecimento[]>(this.apiUrl);
  }

  registrarAbastecimento(dados: AbastecimentoCreateDTO): Observable<Abastecimento> {
    return this.http.post<Abastecimento>(this.apiUrl, dados);
  }
}
