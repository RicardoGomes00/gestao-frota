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
    dataSaidaAgendada: '', 
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
          .sort((a, b) => new Date(a.dataSaidaAgendada).getTime() - new Date(b.dataSaidaAgendada).getTime());
      },
      // ...
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
  const { veiculoId, motoristaId, dataSaidaAgendada, destino } = this.dadosFormulario;

  if (!veiculoId || !motoristaId || !dataSaidaAgendada || !destino.trim()) {
    alert('Preencha todos os campos obrigatórios!');
    return;
  }

  // Garante que o valor tenha segundos (adiciona ":00" se só tiver hora:minuto)
  const [date, time] = dataSaidaAgendada.split('T');
  const timeWithSeconds = time.length === 5 ? time + ':00' : time; // "19:10" → "19:10:00"
  const dataFormatada = `${date}T${timeWithSeconds}`;

  const payload = {
    ...this.dadosFormulario,
    dataSaidaAgendada: dataFormatada
  };

  console.log('Enviando agendamento:', payload);

  this.viagemService.agendarNovaViagem(payload).subscribe({
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
      dataSaidaAgendada: '', 
      destino: '',
      justificativa: ''
    };
  }
}