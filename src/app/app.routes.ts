import { Routes } from '@angular/router';

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

export const routes: Routes = [
  // Redirecionamento padrão para página inicial do motorista
  { path: '', redirectTo: '/motorista/inicio', pathMatch: 'full' },

  // Rotas Motorista
  { path: 'motorista/inicio', component: PaginaInicialComponent },
  { path: 'motorista/ocorrencias', component: OcorrenciaComponent },
  { path: 'motorista/historico', component: HistoricoComponent },

  // Rotas Administrador
  { path: 'admin/inicio', component: AdminInicioComponent },
  { path: 'admin/veiculos', component: VeiculosComponent },
  { path: 'admin/motoristas', component: MotoristasComponent },
  { path: 'admin/registrar-abastecimento', component: RegistrarAbastecimentoComponent },
  { path: 'admin/registrar-manutencao', component: RegistrarManutencaoComponent },

  // Caso a rota não exista, pode criar uma rota de fallback (opcional)
  // { path: '**', redirectTo: '/motorista/inicio' }
];
