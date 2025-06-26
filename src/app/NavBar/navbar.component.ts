import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  currentRoute: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => { 
        this.currentRoute = event.urlAfterRedirects;
      });
  }

  get perfilAtual(): 'ADMIN' | 'MOTORISTA' | null {
    return this.authService.getUserProfile() as 'ADMIN' | 'MOTORISTA' | null;
  }

  adminRotas = [
    { rota: '/admin/inicio', label: 'Dashboard' },
    { rota: '/admin/veiculos', label: 'Veículos' },
    { rota: '/admin/motoristas', label: 'Usuários' },
    { rota: '/admin/agendar-viagem', label: 'Agendar Viagem' },
    { rota: '/admin/registrar-abastecimento', label: 'Abastecimento' },
    { rota: '/admin/registrar-manutencao', label: 'Manutenção' },
  ];

  motoristaRotas = [
    { rota: '/motorista/inicio', label: 'Viagens' },
    { rota: '/motorista/ocorrencias', label: 'Ocorrências' },
    { rota: '/motorista/historico', label: 'Histórico' },
  ];
  


  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  sair(): void {
    this.authService.logout();
  }
}