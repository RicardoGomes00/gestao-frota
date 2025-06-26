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
  agendamentos: Viagem[] = []; 
  agendamentosFiltrados: Viagem[] = []; 

  filtroMotorista: string = '';
  filtroStatus: string = '';
  filtroDataInicio?: string;
  filtroDataFim?: string;
  isLoading = false;
  error: string | null = null;

  constructor(private viagemService: ViagemService, private router: Router) {}

  ngOnInit() {
    this.carregarAgendamentos();
  }

  carregarAgendamentos(): void {
    this.isLoading = true;
    this.error = null;
    
    this.viagemService.buscarTodasAsViagens().subscribe({
      next: (data) => {
        this.agendamentos = data.sort((a, b) => new Date(b.dataSaidaAgendada).getTime() - new Date(a.dataSaidaAgendada).getTime());
        this.aplicarFiltros(); 
        this.isLoading = false;
      },
      error: (err) => {
        this.error = "Falha ao carregar os agendamentos.";
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  aplicarFiltros(): void {
    let resultado = this.agendamentos;

    if (this.filtroMotorista) {
      resultado = resultado.filter(v => 
        v.motorista?.nomeCompleto.toLowerCase().includes(this.filtroMotorista.toLowerCase())
      );
    }
    if (this.filtroStatus) {
      resultado = resultado.filter(v => v.status === this.filtroStatus);
    }
    if (this.filtroDataInicio) {
      resultado = resultado.filter(v => new Date(v.dataSaidaAgendada) >= new Date(this.filtroDataInicio!));
    }
    if (this.filtroDataFim) {
      const dataFim = new Date(this.filtroDataFim!);
      dataFim.setDate(dataFim.getDate() + 1); 
      resultado = resultado.filter(v => new Date(v.dataSaidaAgendada) < dataFim);
    }
    
    this.agendamentosFiltrados = resultado;
  }
  
  getNomeBotao(status: string): string {
    const nomes: { [key: string]: string } = {
        AGENDADO: 'Ver/Editar Agendamento',
        EM_USO: 'Registrar Abastecimento',
        FINALIZADO: 'Registrar Manutenção'
    };
    return nomes[status] || 'Ver Detalhes';
  }

  acaoBotao(viagem: Viagem): void {
    switch (viagem.status) {
      case 'AGENDADO':
        this.router.navigate(['/admin/agendar-viagem']); 
        break;
      case 'EM_USO':
        this.router.navigate(['/admin/registrar-abastecimento'], { queryParams: { veiculoId: viagem.veiculo?.id } });
        break;
      case 'FINALIZADO':
        this.router.navigate(['/admin/registrar-manutencao'], { queryParams: { veiculoId: viagem.veiculo?.id } });
        break;
    }
  }
}