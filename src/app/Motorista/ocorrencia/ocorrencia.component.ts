import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// IMPORTE OS SERVIÇOS E INTERFACES
import { OcorrenciaService } from '../../Services/ocorrencia.service';
import { ViagemService } from '../../Services/viagem.service';
import { Viagem } from '../../Models/viagem.model';

@Component({
  selector: 'app-ocorrencia',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './ocorrencia.component.html',
  styleUrls: ['./ocorrencia.component.css']
})
export class OcorrenciaComponent implements OnInit {
  viagensDisponiveis: Viagem[] = [];
  viagemIdSelecionada: number | null = null;
  descricao: string = '';

  constructor(
    private ocorrenciaService: OcorrenciaService,
    private viagemService: ViagemService 
  ) { }

  ngOnInit(): void {
    // Ao iniciar o componente, buscamos as viagens do motorista
    
    // Lógica de integração comentada
    /*
    // No seu ViagemService, você precisaria de um método como este
    this.viagemService.buscarViagensAtivasOuRecentes().subscribe(data => {
      this.viagensDisponiveis = data;
    });
    */

    // Usando dados estáticos por enquanto para o dropdown funcionar
    const mockViagens: Viagem[] = [
      { id: 1, dataHoraSaida: '2025-06-27T08:00:00', veiculo: { id: 101, placa: 'ABC-1234', modelo: 'Ford Ranger' }, motorista: {id: 1, nomeCompleto: ''}, destino: 'São Paulo', status: 'AGENDADO', justificativa: '' },
      { id: 2, dataHoraSaida: '2025-06-25T10:00:00', veiculo: { id: 102, placa: 'DEF-5678', modelo: 'Fiat Toro' }, motorista: {id: 1, nomeCompleto: ''}, destino: 'Campinas', status: 'EM_USO', justificativa: '' }
    ];
    this.viagensDisponiveis = mockViagens;
  }

  enviarOcorrencia(): void {
    if (!this.viagemIdSelecionada || !this.descricao) {
      alert('Preencha todos os campos.');
      return;
    }

    alert('Ocorrência registrada com os dados estáticos!');

    // Lógica de integração comentada
    /*
    const dadosOcorrencia = {
      viagemId: this.viagemIdSelecionada,
      descricao: this.descricao
    };

    this.ocorrenciaService.registrarOcorrencia(dadosOcorrencia).subscribe({
      next: () => {
        alert('Ocorrência registrada com sucesso no sistema!');
        // Limpa o formulário
        this.viagemIdSelecionada = null;
        this.descricao = '';
      },
      error: (err) => {
        alert('Erro ao registrar a ocorrência.');
        console.error(err);
      }
    });
    */
  }
}