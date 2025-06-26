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
  
  dadosFormulario = {
    veiculoId: null as number | null,
    motoristaId: null as number | null,
    dataHoraSaida: '',
    destino: '',
    justificativa: ''
  };

  isLoading = false;
  error: string | null = null;

  constructor(
    private viagemService: ViagemService,
    private veiculoService: VeiculoService,
    private motoristaService: MotoristaService
  ) {}

  ngOnInit() {
    this.carregarDadosIniciais();
  }

  carregarDadosIniciais(): void {
    this.isLoading = true;
    this.error = null;

    this.carregarViagens();
    this.carregarVeiculos();
    this.carregarMotoristas();

    this.isLoading = false;
  }
  
  carregarViagens(): void {
    this.viagemService.buscarTodasAsViagens().subscribe({
        next: (data) => {
            this.viagens = data
                .filter(v => v.status !== 'FINALIZADO')
                .sort((a, b) => new Date(a.dataHoraSaida).getTime() - new Date(b.dataHoraSaida).getTime());
        },
        error: (err) => {
            this.error = 'Falha ao carregar agendamentos.';
            console.error(err);
        }
    });
  }

  carregarVeiculos(): void {
    this.veiculoService.buscarVeiculos().subscribe({
      next: (data) => {
        this.veiculosDisponiveis = data.filter(v => v.status === 'Disponível');
      },
      error: (err) => {
          console.error('Falha ao carregar veículos.', err);
      }
    });
  }

  carregarMotoristas(): void {
    this.motoristaService.buscarMotoristas().subscribe({
      next: (data) => {
        this.motoristasDisponiveis = data.filter(m => m.ativo && m.perfil?.toUpperCase() === 'MOTORISTA');
      },
      error: (err) => {
          console.error('Falha ao carregar motoristas.', err);
      }
    });
  }

  salvarAgendamento(): void {
    if (!this.dadosFormulario.veiculoId || !this.dadosFormulario.motoristaId || !this.dadosFormulario.dataHoraSaida || !this.dadosFormulario.destino) {
      alert('Preencha todos os campos obrigatórios!');
      return;
    }

    this.viagemService.agendarNovaViagem(this.dadosFormulario).subscribe({
        next: () => {
          alert('Viagem agendada com sucesso!');
          this.limparFormulario();
          this.carregarViagens(); 
        },
        error: (err) => {
            let mensagemErro = 'Ocorreu um erro desconhecido.';
            if (err.error) {
              if (typeof err.error === 'object' && err.error.message) {
                mensagemErro = err.error.message;
              } else if (typeof err.error === 'string') {
                mensagemErro = err.error;
              }
            } else if (err.message) {
              mensagemErro = err.message;
            }
            alert(`Erro ao agendar a viagem: ${mensagemErro}`);
            console.error('Objeto de erro completo:', err);
        }
    });
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