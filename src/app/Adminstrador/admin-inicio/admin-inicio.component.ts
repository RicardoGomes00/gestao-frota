import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // 1. IMPORTE O ROUTER

// 2. IMPORTE O SERVIÇO E O MODELO CORRETO
import { ViagemService } from '../../Services/viagem.service';
import { Viagem } from '../../Models/viagem.model';

@Component({
  selector: 'app-admin-inicio',
  standalone: true,
  imports: [ FormsModule, CommonModule ],
  templateUrl: './admin-inicio.component.html',
  styleUrls: ['./admin-inicio.component.css'],
})
export class AdminInicioComponent implements OnInit {
  agendamentos: Viagem[] = []; // Lista principal, sem filtros
  agendamentosFiltrados: Viagem[] = []; // Lista que será exibida na tela

  // Propriedades dos filtros
  filtroMotorista: string = '';
  filtroStatus: string = '';
  filtroDataInicio?: string;
  filtroDataFim?: string;
  isLoading = false;

  // 3. INJETE O ROUTER E O SERVIÇO
  constructor(private viagemService: ViagemService, private router: Router) {}

  ngOnInit() {
    this.carregarAgendamentos();
  }

  carregarAgendamentos(): void {
    this.isLoading = true;
    // Lógica de integração comentada
    /*
    this.viagemService.buscarTodasAsViagens().subscribe(data => {
      this.agendamentos = data;
      this.aplicarFiltros(); // Filtra os dados recebidos da API
      this.isLoading = false;
    });
    */

    // Dados estáticos para visualização
    this.agendamentos = [
      { id: 1, motorista: {id: 1, nomeCompleto: 'Carlos Silva'}, veiculo: {id:1, modelo: 'Fiat Toro', placa:'BRA2E19'}, destino: 'São Paulo', dataHoraSaida: '2025-06-10T08:00:00', status: 'AGENDADO', justificativa:'' },
      { id: 2, motorista: {id: 2, nomeCompleto: 'Ana Paula'}, veiculo: {id:2, modelo: 'Hilux', placa:'BRA2E20'}, destino: 'Campinas', dataHoraSaida: '2025-06-09T10:30:00', status: 'EM_USO', justificativa:'' },
      { id: 3, motorista: {id: 1, nomeCompleto: 'Carlos Silva'}, veiculo: {id:3, modelo: 'VW Gol', placa:'BRA2E21'}, destino: 'Santos', dataHoraSaida: '2025-06-05T07:00:00', status: 'FINALIZADO', justificativa:'' },
    ];
    this.aplicarFiltros();
    this.isLoading = false;
  }

  aplicarFiltros(): void {
    let resultado = this.agendamentos;

    if (this.filtroMotorista) {
      resultado = resultado.filter(v => v.motorista.nomeCompleto.toLowerCase().includes(this.filtroMotorista.toLowerCase()));
    }
    if (this.filtroStatus) {
      resultado = resultado.filter(v => v.status === this.filtroStatus);
    }
    
     if (this.filtroDataInicio) {
      resultado = resultado.filter(v => new Date(v.dataHoraSaida) >= new Date(this.filtroDataInicio!));
    }
    if (this.filtroDataFim) {
      const dataFim = new Date(this.filtroDataFim!);
      dataFim.setDate(dataFim.getDate() + 1);
      resultado = resultado.filter(v => new Date(v.dataHoraSaida) < dataFim);
    }
    
    this.agendamentosFiltrados = resultado;
  }
  
  getNomeBotao(status: string): string {
    const nomes: { [key: string]: string } = {
        AGENDADO: 'Ver/Editar Agendamento',
        EM_USO: 'Registrar Abastecimento',
        FINALIZADO: 'Registrar Manutenção'
    };
    return nomes[status] || '';
  }

  acaoBotao(viagem: Viagem): void {
    // 4. LÓGICA DE NAVEGAÇÃO REAL
    switch (viagem.status) {
      case 'AGENDADO':
        this.router.navigate(['/admin/agendar-viagem']); // Pode passar o ID se a tela de agendamento também editar
        break;
      case 'EM_USO':
        // Passa o ID do veículo como parâmetro para pré-selecionar na próxima tela
        this.router.navigate(['/admin/registrar-abastecimento'], { queryParams: { veiculoId: viagem.veiculo.id } });
        break;
      case 'FINALIZADO':
        this.router.navigate(['/admin/registrar-manutencao'], { queryParams: { veiculoId: viagem.veiculo.id } });
        break;
    }
  }
}