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

  /**
   * Envia os dados de um novo motorista para serem cadastrados na API.
   * @param motorista Objeto com os dados do novo motorista.
   */
  adicionarMotorista(motorista: Partial<Motorista>): Observable<Motorista> {
    return this.http.post<Motorista>(this.apiUrl, motorista);
  }

   atualizarMotorista(id: number, motorista: Partial<Motorista>): Observable<Motorista> {
    return this.http.put<Motorista>(`${this.apiUrl}/${id}`, motorista);
  }

  /**
   * Solicita à API para inativar um motorista específico.
   * @param motoristaId O ID do motorista a ser inativado.
   */
  inativarMotorista(motoristaId: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${motoristaId}`, { ativo: false });
  }

  // Futuramente, você pode adicionar métodos para editar (PUT) ou deletar (DELETE) um motorista.
}