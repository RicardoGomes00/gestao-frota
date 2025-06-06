import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { NgClass, CommonModule } from '@angular/common';

enum Perfil {
  ADMIN = 'ADMIN',
  MOTORISTA = 'MOTORISTA'
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, NgClass],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})

export class NavbarComponent {
  currentRoute: string = '';
  perfilAtual: Perfil = Perfil.ADMIN;

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = (event as NavigationEnd).urlAfterRedirects;
        console.log('Rota atual:', this.currentRoute);
      });
  }

  adminRotas = [
    { rota: '/admin/inicio', label: 'Dashboard Admin' },
    { rota: '/admin/veiculos', label: 'Veiculos' },
    { rota: '/admin/motoristas', label: 'Motorista' },
    { rota: '/admin/registrar-abastecimento', label: 'Abastecimento' },
    { rota: '/admin/registrar-manutencao', label: 'Manutencao' },
  ];

  motoristaRotas = [
    { rota: '/motorista/inicio', label: 'Dashboard Motorista' },
    { rota: '/motorista/ocorrencias', label: 'Ocorrencias' },
    { rota: '/motorista/historico', label: 'Historico' },
  ];

  getNavbarClass(): string {
    const adminRotas = [
      '/admin/inicio',
      'admin/veiculos',
      '/admin/motoristas',
      '/admin/registrar-abastecimento',
      'admin/registrar-manutencao',
    ];
  
    const motoristaRotas = [
      '/motorista/inicio',
      '/motorista/historico',
      '/motorista/ocorrencias',
    ];
    return ''; // Sem classe extra
  }

  getButtonClass(route: string): string {
    const adminRotas = [
      '/admin/inicio',
      'admin/veiculos',
      '/admin/motoristas',
      '/admin/registrar-abastecimento',
      'admin/registrar-manutencao',
    ];
  
    const motoristaRotas = [
      '/motorista/inicio',
      '/motorista/historico',
      '/motorista/ocorrencias',
    ];
  
    const loginRotas = [
      '/login',
      '/login/recuperar'
    ];
    return 'btn-outline';
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  sair() {
    // Simulação de logout - limpe localStorage ou redirecione
    alert('Você saiu da conta.');
    localStorage.clear(); // se usar localStorage para login
    this.router.navigate(['/']); // redireciona para login ou página inicial
  }

}