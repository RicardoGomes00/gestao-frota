import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { OcorrenciaService } from '../../Services/ocorrencia.service';
import { ViagemService } from '../../Services/viagem.service';
import { Viagem } from '../../Models/viagem.model';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-ocorrencia',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './ocorrencia.component.html',
  styleUrls: ['./ocorrencia.component.css']
})
export class OcorrenciaComponent implements OnInit {
  viagensDisponiveis: Viagem[] = [];

  viagemIdSelecionada: number | null = null;
  tituloOcorrencia: string = '';
  descricao: string = '';
  
  isLoading = false;
  error: string | null = null;

  constructor(
    private ocorrenciaService: OcorrenciaService,
    private viagemService: ViagemService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.carregarViagensAtivas();
  }

  carregarViagensAtivas(): void {
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
        this.viagensDisponiveis = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Não foi possível carregar as viagens para registrar a ocorrência.';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  enviarOcorrencia(): void {
    if (!this.viagemIdSelecionada || !this.tituloOcorrencia || !this.descricao) {
      alert('Todos os campos (Viagem, Título e Descrição) são obrigatórios.');
      return;
    }

    const dadosOcorrencia = {
      viagemId: this.viagemIdSelecionada,
      titulo: this.tituloOcorrencia,
      descricao: this.descricao
    };

    this.ocorrenciaService.registrarOcorrencia(dadosOcorrencia).subscribe({
      next: () => {
        alert('Ocorrência registrada com sucesso no sistema!');
        this.viagemIdSelecionada = null;
        this.tituloOcorrencia = '';
        this.descricao = '';
      },
      error: (err) => {
        const mensagemErro = err.error?.message || 'Ocorreu um erro desconhecido.';
        alert(`Erro ao registrar a ocorrência: ${mensagemErro}`);
        console.error(err);
      }
    });
  }
}
