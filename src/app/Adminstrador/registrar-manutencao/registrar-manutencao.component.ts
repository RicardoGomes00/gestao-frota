import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// 1. IMPORTE OS SERVIÇOS E MODELOS
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
  // Listas de dados
  manutencoes: Manutencao[] = [];
  veiculosDisponiveis: Veiculo[] = [];

  // Objeto para o formulário
  novoRegistro: Partial<Manutencao> = { tipo: 'Preventiva' }; // Define um tipo padrão

  isLoading = false;

  // 2. INJETE OS SERVIÇOS
  constructor(
    private manutencaoService: ManutencaoService,
    private veiculoService: VeiculoService
  ) {}

  ngOnInit() {
    this.carregarDados();
  }

  carregarDados(): void {
    this.isLoading = true;
    this.carregarManutencoes();
    this.carregarVeiculos();
    this.isLoading = false;
  }

  carregarManutencoes(): void {
    // Lógica de integração comentada
    /*
    this.manutencaoService.buscarManutencoes().subscribe(data => {
      this.manutencoes = data;
    });
    */
    // Dados estáticos
    const mockVeiculo1 = { id: 1, placa: 'ABC-1234', modelo: 'Fiat Toro', tipo: '', ano: 0, quilometragem: 0, status: 'Disponível' as const };
    const mockVeiculo2 = { id: 2, placa: 'DEF-5678', modelo: 'Toyota Hilux', tipo: '', ano: 0, quilometragem: 0, status: 'Disponível' as const };
    this.manutencoes = [
      { id: 1, veiculoId: 1, data: '2025-06-15', tipo: 'Preventiva', descricao: 'Troca de óleo e filtros', valor: 450.00, quilometragem: 20000, veiculo: mockVeiculo1 },
      { id: 2, veiculoId: 2, data: '2025-05-30', tipo: 'Corretiva', descricao: 'Reparo no freio dianteiro', valor: 850.00, quilometragem: 49500, veiculo: mockVeiculo2 }
    ];
  }

  carregarVeiculos(): void {
    // Lógica de integração comentada
    /*
    this.veiculoService.buscarVeiculos().subscribe(data => {
      this.veiculosDisponiveis = data;
    });
    */
    // Dados estáticos
    this.veiculosDisponiveis = [
      { id: 1, placa: 'ABC-1234', modelo: 'Fiat Toro', tipo: 'Picape', ano: 2021, quilometragem: 20000, status: 'Disponível' },
      { id: 2, placa: 'DEF-5678', modelo: 'Toyota Hilux', tipo: 'Picape', ano: 2019, quilometragem: 50000, status: 'Disponível' },
    ];
  }

  salvarRegistro(): void {
    if (!this.novoRegistro.veiculoId || !this.novoRegistro.data || !this.novoRegistro.valor || !this.novoRegistro.descricao) {
      alert('Preencha todos os campos obrigatórios!');
      return;
    }

    // Lógica de integração comentada
    /*
    this.manutencaoService.registrarManutencao(this.novoRegistro).subscribe(() => {
      alert('Manutenção registrada com sucesso!');
      this.novoRegistro = { tipo: 'Preventiva' }; // Limpa o formulário
      this.carregarDados(); // Atualiza as listas
    });
    */

    // Lógica estática
    alert('Manutenção registrada (estático)!');
    this.novoRegistro = { tipo: 'Preventiva' };
  }
}