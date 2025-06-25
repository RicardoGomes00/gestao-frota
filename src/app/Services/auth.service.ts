import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userProfile: 'MOTORISTA' | 'ADMIN' | null = null;

  // Em uma aplicação real, você injetaria o HttpClient para falar com o backend
  constructor(private router: Router) { }

  // Lógica de login estática (como fizemos antes)
  login(email: string, senha: string): boolean {
    if (email === 'motorista@frota.com' && senha === '123') {
      this.userProfile = 'MOTORISTA';
      // Salva o perfil no sessionStorage para persistir entre reloads da página
      sessionStorage.setItem('userProfile', this.userProfile);
      this.router.navigate(['/motorista/inicio']);
      return true;
    }

    if (email === 'admin@frota.com' && senha === 'admin123') {
      this.userProfile = 'ADMIN';
      sessionStorage.setItem('userProfile', this.userProfile);
      this.router.navigate(['/admin/inicio']);
      return true;
    }

    return false;
  }

  logout(): void {
    this.userProfile = null;
    sessionStorage.removeItem('userProfile');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    // Verifica se o perfil existe na memória ou no sessionStorage
    return !!this.getUserProfile();
  }

  getUserProfile(): 'MOTORISTA' | 'ADMIN' | null {
    // Prioriza o estado em memória, mas recupera do sessionStorage se a página for recarregada
    if (!this.userProfile) {
      this.userProfile = sessionStorage.getItem('userProfile') as 'MOTORISTA' | 'ADMIN' | null;
    }
    return this.userProfile;
  }
}