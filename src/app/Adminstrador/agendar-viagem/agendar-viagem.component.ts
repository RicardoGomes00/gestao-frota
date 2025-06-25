import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ViagemService } from '../../Services/viagem.service';
import { VeiculoService } from '../../Services/veiculo.service';
import { MotoristaService } from '../../Services/motorista.service';
import { Viagem } from '../../Models/viagem.model';
import { Veiculo } from '../../Models/veiculo.model';
import { Motorista } from '../../Models/motorista.model';

@Component({
  selector: 'app-agendar-viagem',
  standalone: true,
  imports: [ FormsModule, CommonModule ],
  templateUrl: './agendar-viagem.component.html',
  styleUrls: ['./agendar-viagem.component.css'],
})
export class AgendarViagemComponent implements OnInit {
  viagens: Viagem[] = [];
  veiculosDisponiveis: Veiculo[] = [];
  motoristasDisponiveis: Motorista[] = [];
  
  // ==================================================================
  //                      MUDANÇA PRINCIPAL AQUI
  // ==================================================================
  // 1. Criamos um objeto SEPARADO para o formulário.
  // Ele pode ter a estrutura que quisermos, incluindo veiculoId e motoristaId.
  dadosFormulario = {
    veiculoId: null as number | null,
    motoristaId: null as number | null,
    dataHoraSaida: '',
    destino: '',
    justificativa: ''
  };
  // ==================================================================

  isLoading = false;

  constructor(
    private viagemService: ViagemService,
    private veiculoService: VeiculoService,
    private motoristaService: MotoristaService
  ) {}

  ngOnInit() { this.carregarDadosIniciais(); }

  // Os métodos de carregamento de dados não mudam
  carregarDadosIniciais(): void { /* ... */ }
  carregarViagens(): void { /* ... */ }
  carregarVeiculos(): void { /* ... */ }
  carregarMotoristas(): void { /* ... */ }

  salvarAgendamento(): void {
    if (!this.dadosFormulario.veiculoId || !this.dadosFormulario.motoristaId || !this.dadosFormulario.dataHoraSaida || !this.dadosFormulario.destino) {
      alert('Preencha todos os campos obrigatórios!');
      return;
    }

    // ==================================================================
    //                      CORREÇÃO APLICADA AQUI
    // ==================================================================
    const agendamentoParaApi: Partial<Viagem> = {
      destino: this.dadosFormulario.destino,
      dataHoraSaida: this.dadosFormulario.dataHoraSaida,
      justificativa: this.dadosFormulario.justificativa,
      
      // Ao usar 'as any', dizemos ao TypeScript para aceitar o objeto
      // mesmo que ele contenha apenas o 'id'.
      veiculo: { id: this.dadosFormulario.veiculoId } as any,
      motorista: { id: this.dadosFormulario.motoristaId } as any,
    };
    // ==================================================================


    // Lógica de integração comentada (agora usa o objeto transformado corretamente)
    /*
    this.viagemService.agendarNovaViagem(agendamentoParaApi).subscribe({
        next: () => {
          alert('Viagem agendada com sucesso no sistema!');
          this.limparFormulario();
          this.carregarViagens();
        },
        error: (err) => {
          alert('Erro ao agendar a viagem.');
          console.error(err);
        }
    });
    */

    // Lógica estática
    alert('Viagem agendada (estático)!');
    this.limparFormulario();
  }
  
  limparFormulario(): void {
    this.dadosFormulario = {
      veiculoId: null,
      motoristaId: null,
      dataHoraSaida: '',
      destino: '',
      justificativa: ''
    };
  }
}