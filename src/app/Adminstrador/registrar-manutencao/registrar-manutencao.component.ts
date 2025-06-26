import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ManutencaoService } from '../../Services/manutencao.service';
import { VeiculoService } from '../../Services/veiculo.service';
import { Manutencao } from '../../Models/manutencao.model';
import { Veiculo } from '../../Models/veiculo.model';

@Component({
  selector: 'app-registrar-manutencao',
  standalone: true,
  imports: [ FormsModule, CommonModule ],
  templateUrl: './registrar-manutencao.component.html',
  styleUrls: ['./registrar-manutencao.component.css'],
})
export class RegistrarManutencaoComponent implements OnInit {
  manutencoes: Manutencao[] = [];
  veiculosDisponiveis: Veiculo[] = [];

  novoRegistro = {
    veiculoId: null as number | null,
    dataInicio: '',
    tipo: 'Preventiva', 
    descricaoServico: '',
    custo: null as number | null,
    quilometragem: null as number | null
  };

  isLoading = false;
  error: string | null = null;

  constructor(
    private manutencaoService: ManutencaoService,
    private veiculoService: VeiculoService
  ) {}

  ngOnInit() {
    this.carregarDadosIniciais();
  }

  carregarDadosIniciais(): void {
    this.isLoading = true;
    this.error = null;
    this.carregarManutencoes();
    this.carregarVeiculos();
    this.isLoading = false;
  }

  carregarManutencoes(): void {
    this.manutencaoService.buscarManutencoes().subscribe({
      next: (data) => {
        this.manutencoes = data.sort((a, b) => new Date(b.dataInicio).getTime() - new Date(a.dataInicio).getTime());
      },
      error: (err) => {
        this.error = "Falha ao carregar registros de manutenção.";
        console.error(err);
      }
    });
  }

  carregarVeiculos(): void {
    this.veiculoService.buscarVeiculos().subscribe({
      next: (data) => {
        this.veiculosDisponiveis = data;
      },
      error: (err) => console.error("Falha ao carregar veículos.", err)
    });
  }

  salvarRegistro(): void {
    if (!this.novoRegistro.veiculoId || !this.novoRegistro.dataInicio || !this.novoRegistro.descricaoServico || !this.novoRegistro.custo || !this.novoRegistro.quilometragem) {
      alert('Preencha todos os campos obrigatórios!');
      return;
    }

    this.manutencaoService.registrarManutencao(this.novoRegistro as any).subscribe({
      next: () => {
        alert('Manutenção registrada com sucesso! O status do veículo foi alterado para "Em Manutenção".');
        this.limparFormulario();
        this.carregarManutencoes(); 
      },
      error: (err) => {
        const mensagemErro = err.error?.message || 'Ocorreu um erro desconhecido.';
        alert(`Erro ao registrar manutenção: ${mensagemErro}`);
        console.error(err);
      }
    });
  }

  limparFormulario(): void {
    this.novoRegistro = {
      veiculoId: null,
      dataInicio: '',
      tipo: 'Preventiva',
      descricaoServico: '',
      custo: null,
      quilometragem: null
    };
  }
}