import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

interface LoginResponse {
  usuarioId: number;
  nome: string;
  email: string;
  perfil: 'admin' | 'motorista';
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient, private router: Router) { }

  login(credenciais: { email: string, password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credenciais).pipe(
      tap(response => {
        sessionStorage.setItem('authToken', response.token);
        sessionStorage.setItem('userProfile', response.perfil.toUpperCase());
        sessionStorage.setItem('userName', response.nome);
        sessionStorage.setItem('usuarioId', response.usuarioId.toString());
      })
    );
  }

  logout(): void {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('authToken');
  }

  getUserProfile(): 'ADMIN' | 'MOTORISTA' | null {
    return sessionStorage.getItem('userProfile') as 'ADMIN' | 'MOTORISTA' | null;
  }
  
  getUserName(): string | null {
    return sessionStorage.getItem('userName');
  }


  getUsuarioId(): number | null {
    const id = sessionStorage.getItem('usuarioId');
    return id ? parseInt(id, 10) : null;
  }
}
