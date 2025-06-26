import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ViagemService } from '../../Services/viagem.service';
import { Viagem } from '../../Models/viagem.model';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-pagina-inicial',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pagina-inicial.component.html',
  styleUrls: ['./pagina-inicial.component.css']
})
export class PaginaInicialComponent implements OnInit {
  agendamentos: Viagem[] = [];
  isLoading = false;
  error: string | null = null;

  constructor(
    private viagemService: ViagemService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.carregarViagens();
  }

  carregarViagens(): void {
    this.isLoading = true;
    this.error = null;

    const motoristaId = this.authService.getUsuarioId();
    if (!motoristaId) {
      this.error = 'Usuário não autenticado.';
      this.isLoading = false;
      return;
    }

    this.viagemService.buscarViagensPendentesMotorista(motoristaId).subscribe({
      next: (data) => {
        this.agendamentos = data.sort(
          (a, b) => new Date(a.dataSaidaAgendada).getTime() - new Date(b.dataSaidaAgendada).getTime()
        );
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Não foi possível carregar seus agendamentos.';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  iniciarViagem(agendamento: Viagem): void {
    const km = prompt(`Iniciando viagem para: ${agendamento.destino}.\n\nPor favor, informe a quilometragem inicial do veículo:`);
    if (km && !isNaN(Number(km))) {
      this.viagemService.iniciarViagem(agendamento.id, Number(km)).subscribe({
        next: () => {
          alert('Viagem iniciada com sucesso no sistema!');
          this.carregarViagens(); 
        },
        error: (err) => {
          const mensagemErro = err.error?.message || 'Ocorreu um erro.';
          alert(`Erro ao iniciar a viagem: ${mensagemErro}`);
          console.error(err);
        }
      });
    }
  }

  finalizarViagem(agendamento: Viagem): void {
    const km = prompt(`Finalizando viagem para: ${agendamento.destino}.\n\nPor favor, informe a quilometragem final do veículo:`);
    if (km && !isNaN(Number(km))) {
      this.viagemService.finalizarViagem(agendamento.id, Number(km)).subscribe({
        next: () => {
          alert('Viagem finalizada com sucesso no sistema!');
          this.carregarViagens();
        },
        error: (err) => {
          const mensagemErro = err.error?.message || 'Ocorreu um erro.';
          alert(`Erro ao finalizar a viagem: ${mensagemErro}`);
          console.error(err);
        }
      });
    }
  }

  verDetalhes(agendamento: Viagem): void {
    const detalhes = `
      Destino: ${agendamento.destino}
      Veículo: ${agendamento.veiculo?.modelo} - ${agendamento.veiculo?.placa}
      Status: ${agendamento.status}
      KM Inicial: ${agendamento.quilometragemInicial || 'N/A'}
      KM Final: ${agendamento.quilometragemFinal || 'N/A'}
    `;
    alert(detalhes);
  }
}
