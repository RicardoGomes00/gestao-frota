import { Routes } from '@angular/router';
import { authGuard } from './Guards/auth.guard';
import { LoginComponent } from './Cadastro/login.component';

// Motorista
import { PaginaInicialComponent } from './Motorista/pagina-inicial/pagina-inicial.component';
import { OcorrenciaComponent } from './Motorista/ocorrencia/ocorrencia.component';
import { HistoricoComponent } from './Motorista/historico/historico.component';

// Admin
import { AdminInicioComponent } from './Adminstrador/admin-inicio/admin-inicio.component';
import { VeiculosComponent } from './Adminstrador/veiculos/veiculos.component';
import { MotoristasComponent } from './Adminstrador/motoristas/motoristas.component';
import { RegistrarAbastecimentoComponent } from './Adminstrador/registrar-abastecimento/registrar-abastecimento.component';
import { RegistrarManutencaoComponent } from './Adminstrador/registrar-manutencao/registrar-manutencao.component';
import { AgendarViagemComponent } from './Adminstrador/agendar-viagem/agendar-viagem.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },

  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // Rotas do Motorista
  {
    path: 'motorista',
    canActivate: [authGuard], 
    data: { expectedRole: 'MOTORISTA' }, 
    children: [
      { path: 'inicio', component: PaginaInicialComponent },
      { path: 'ocorrencias', component: OcorrenciaComponent },
      { path: 'historico', component: HistoricoComponent },
      { path: '', redirectTo: 'inicio', pathMatch: 'full' }
    ]
  },

  // Rotas do Administrador
  {
    path: 'admin',
    canActivate: [authGuard],
    data: { expectedRole: 'ADMIN' },
    children: [
      { path: 'inicio', component: AdminInicioComponent },
      { path: 'veiculos', component: VeiculosComponent },
      { path: 'motoristas', component: MotoristasComponent },
      { path: 'registrar-abastecimento', component: RegistrarAbastecimentoComponent },
      { path: 'registrar-manutencao', component: RegistrarManutencaoComponent },
      { path: 'agendar-viagem', component: AgendarViagemComponent },
      { path: '', redirectTo: 'inicio', pathMatch: 'full' }
    ]
  },

  { path: '**', redirectTo: '/login' }
];