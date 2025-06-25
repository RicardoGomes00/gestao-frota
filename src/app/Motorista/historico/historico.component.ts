import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// 1. IMPORTE O SERVIÇO E A INTERFACE
import { ViagemService } from '../../Services/viagem.service';
import { Viagem } from '../../Models/viagem.model';

@Component({
  selector: 'app-historico',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
  ],
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css']
})
export class HistoricoComponent implements OnInit {
  // 2. USE A INTERFACE E ADICIONE CONTROLES DE UI
  historico: Viagem[] = [];
  isLoading = false;
  error: string | null = null;

  // 3. INJETE O ViagemService
  constructor(private viagemService: ViagemService) { }

  ngOnInit() {
    this.carregarHistorico();
  }

  carregarHistorico(): void {
    this.isLoading = true;
    this.error = null;

    // ==================================================================
    // Bloco para integração com o back-end (PRONTO PARA SER ATIVADO)
    // Para ativar: Descomente este bloco e comente ou remova o de "DADOS ESTÁTICOS".
    /*
    this.viagemService.buscarHistoricoMotorista().subscribe({
      next: (data) => {
        this.historico = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Não foi possível carregar o histórico.';
        this.isLoading = false;
        console.error(err);
      }
    });
    */
    // ==================================================================

    // ==================================================================
    // Bloco de DADOS ESTÁTICOS (para visualização sem back-end)
    // A estrutura foi ajustada para corresponder à interface 'Viagem'
    const mockHistorico: Viagem[] = [
      {
        id: 4,
        veiculo: { id: 102, placa: 'DEF-5678', modelo: 'Fiat Toro' },
        motorista: { id: 123, nomeCompleto: 'Motorista Logado' },
        destino: 'Campinas',
        justificativa: '',
        dataHoraSaida: '2025-06-01T08:00:00',
        dataHoraRetorno: '2025-06-01T18:00:00',
        quilometragemInicial: 12000,
        quilometragemFinal: 12100,
        status: 'FINALIZADO'
      },
      {
        id: 5,
        veiculo: { id: 103, placa: 'GHI-9012', modelo: 'Toyota Hilux' },
        motorista: { id: 123, nomeCompleto: 'Motorista Logado' },
        destino: 'Santos',
        justificativa: '',
        dataHoraSaida: '2025-05-28T09:30:00',
        dataHoraRetorno: '2025-05-28T16:00:00',
        quilometragemInicial: 8000,
        quilometragemFinal: 8100,
        status: 'FINALIZADO'
      }
    ];
    this.historico = mockHistorico;
    this.isLoading = false;
    // ==================================================================
  }
}