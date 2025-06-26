import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AbastecimentoService } from '../../Services/abastecimento.service';
import { VeiculoService } from '../../Services/veiculo.service';
import { MotoristaService } from '../../Services/motorista.service';

import { Abastecimento } from '../../Models/abastecimento.model';
import { Veiculo } from '../../Models/veiculo.model';
import { Motorista } from '../../Models/motorista.model';
import { AbastecimentoCreateDTO } from '../../Models/abastecimento-create.dto';

@Component({
  selector: 'app-registrar-abastecimento',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registrar-abastecimento.component.html',
  styleUrls: ['./registrar-abastecimento.component.css'],
})
export class RegistrarAbastecimentoComponent implements OnInit {
  abastecimentos: Abastecimento[] = [];
  veiculosDisponiveis: Veiculo[] = [];
  motoristasDisponiveis: Motorista[] = [];

  novoRegistro: AbastecimentoCreateDTO = {
    veiculoId: null,
    motoristaId: null,
    dataAbastecimento: '',
    tipoCombustivel: 'Gasolina',
    valorTotal: null,
    quilometragemNoAbastecimento: null
  };

  isLoading = false;
  isSaving = false;
  error: string | null = null;

  constructor(
    private abastecimentoService: AbastecimentoService,
    private veiculoService: VeiculoService,
    private motoristaService: MotoristaService
  ) {}

  ngOnInit(): void {
    this.carregarDadosIniciais();
  }

  carregarDadosIniciais(): void {
    this.isLoading = true;
    this.error = null;

    this.carregarAbastecimentos();
    this.carregarVeiculos();
    this.carregarMotoristas();

    this.isLoading = false;
  }

  carregarAbastecimentos(): void {
    this.abastecimentoService.buscarAbastecimentos().subscribe({
      next: (data) => {
        this.abastecimentos = data.sort((a, b) =>
          new Date(b.dataAbastecimento).getTime() - new Date(a.dataAbastecimento).getTime()
        );
      },
      error: (err) => {
        this.error = 'Falha ao carregar registros de abastecimento.';
        console.error(err);
      }
    });
  }

  carregarVeiculos(): void {
    this.veiculoService.buscarVeiculos().subscribe({
      next: (data) => this.veiculosDisponiveis = data,
      error: (err) => console.error('Falha ao carregar veículos.', err)
    });
  }

  carregarMotoristas(): void {
    this.motoristaService.buscarMotoristas().subscribe({
      next: (data) => this.motoristasDisponiveis = data.filter(m => m.ativo),
      error: (err) => console.error('Falha ao carregar motoristas.', err)
    });
  }

  salvarRegistro(): void {
    if (!this.novoRegistro.veiculoId || !this.novoRegistro.motoristaId || !this.novoRegistro.dataAbastecimento || !this.novoRegistro.valorTotal || !this.novoRegistro.quilometragemNoAbastecimento) {
      alert('Preencha todos os campos obrigatórios!');
      return;
    }

    this.isSaving = true;

    const payload: AbastecimentoCreateDTO = {
      ...this.novoRegistro,
      dataAbastecimento: new Date(this.novoRegistro.dataAbastecimento).toISOString()
    };

    this.abastecimentoService.registrarAbastecimento(payload).subscribe({
      next: () => {
        alert('Abastecimento registrado com sucesso!');
        this.limparFormulario();
        this.carregarAbastecimentos();
        this.isSaving = false;
      },
      error: (err) => {
        let mensagem = 'Erro desconhecido.';
        if (typeof err.error === 'string') {
          mensagem = err.error;
        } else if (err.error?.message) {
          mensagem = err.error.message;
        }
        alert(`Erro ao registrar abastecimento: ${mensagem}`);
        console.error(err);
        this.isSaving = false;
      }
    });
  }

  limparFormulario(): void {
    this.novoRegistro = {
      veiculoId: null,
      motoristaId: null,
      dataAbastecimento: '',
      tipoCombustivel: 'Gasolina',
      valorTotal: null,
      quilometragemNoAbastecimento: null
    };
  }
}
