import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ViagemService } from '../../Services/viagem.service';
import { Viagem } from '../../Models/viagem.model';

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

  constructor(private viagemService: ViagemService) { }

  ngOnInit() {
    this.carregarViagens();
  }

  carregarViagens(): void {
    this.isLoading = true;
    this.error = null;

    // ==================================================================
    // Bloco para integração com o back-end (PRONTO PARA SER ATIVADO)
    // Para ativar: Descomente este bloco e comente ou remova o bloco de "DADOS ESTÁTICOS" abaixo.
    /*
    this.viagemService.buscarViagensPendentesMotorista().subscribe({
      next: (data) => {
        this.agendamentos = data.sort((a, b) => new Date(a.dataHoraSaida).getTime() - new Date(b.dataHoraSaida).getTime());
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Não foi possível carregar os agendamentos.';
        this.isLoading = false;
        console.error(err);
      }
    });
    */
    // ==================================================================

    // ==================================================================
    // Bloco de DADOS ESTÁTICOS (para visualização sem back-end)
    // Comente ou remova este bloco quando for ativar a integração real.

    const mockAgendamentos: Viagem[] = [
      {
        id: 1,
        // Adaptamos os nomes para corresponder à interface 'Viagem'
        dataHoraSaida: '2025-06-27T08:00:00',
        veiculo: { id: 101, placa: 'ABC-1234', modelo: 'Ford Ranger' },
        motorista: { id: 123, nomeCompleto: 'Motorista Logado' },
        destino: 'São Paulo',
        justificativa: 'Entrega de material',
        status: 'AGENDADO'
      },
      {
        id: 2,
        dataHoraSaida: '2025-06-25T10:00:00',
        veiculo: { id: 102, placa: 'DEF-5678', modelo: 'Fiat Toro' },
        motorista: { id: 123, nomeCompleto: 'Motorista Logado' },
        destino: 'Campinas',
        justificativa: 'Reunião com cliente',
        status: 'EM_USO',
        quilometragemInicial: 75000
      },
      {
        id: 3,
        dataHoraSaida: '2025-06-23T14:00:00',
        veiculo: { id: 103, placa: 'GHI-9012', modelo: 'Toyota Hilux' },
        motorista: { id: 123, nomeCompleto: 'Motorista Logado' },
        destino: 'Santos',
        justificativa: 'Retirada de equipamento',
        status: 'FINALIZADO',
        quilometragemInicial: 74500,
        quilometragemFinal: 74850
      }
    ];
    this.agendamentos = mockAgendamentos.sort((a, b) => new Date(b.dataHoraSaida).getTime() - new Date(a.dataHoraSaida).getTime());
    this.isLoading = false;
    // ==================================================================
  }

  iniciarViagem(agendamento: Viagem): void {
    const km = prompt(`Iniciando viagem para: ${agendamento.destino}.\n\nPor favor, informe a quilometragem inicial do veículo:`);
    if (km && !isNaN(Number(km))) {
      alert('Viagem iniciada com os dados estáticos!');

      // Lógica de integração comentada
      /*
      this.viagemService.iniciarViagem(agendamento.id, Number(km)).subscribe({
        next: () => {
          alert('Viagem iniciada com sucesso no sistema!');
          this.carregarViagens(); // Recarrega a lista para atualizar o status
        },
        error: (err) => {
          alert('Erro ao tentar iniciar a viagem no sistema.');
          console.error(err);
        }
      });
      */
    }
  }

  finalizarViagem(agendamento: Viagem): void {
    const km = prompt(`Finalizando viagem para: ${agendamento.destino}.\n\nPor favor, informe a quilometragem final do veículo:`);
    if (km && !isNaN(Number(km))) {
      alert('Viagem finalizada com os dados estáticos!');

      // Lógica de integração comentada
      /*
      // Crie um método 'finalizarViagem' no seu ViagemService similar ao 'iniciarViagem'
      this.viagemService.finalizarViagem(agendamento.id, Number(km)).subscribe({
        next: () => {
          alert('Viagem finalizada com sucesso no sistema!');
          this.carregarViagens(); // Recarrega a lista
        },
        error: (err) => {
          alert('Erro ao tentar finalizar a viagem no sistema.');
          console.error(err);
        }
      });
      */
    }
  }

  verDetalhes(agendamento: Viagem): void {
    // A lógica de detalhes pode abrir um modal ou navegar para outra página.
    // Por enquanto, apenas um alerta.
    const detalhes = `
      Destino: ${agendamento.destino}
      Veículo: ${agendamento.veiculo.modelo} - ${agendamento.veiculo.placa}
      Status: ${agendamento.status}
      KM Inicial: ${agendamento.quilometragemInicial || 'N/A'}
      KM Final: ${agendamento.quilometragemFinal || 'N/A'}
    `;
    alert(detalhes);
  }
}