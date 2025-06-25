import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// 1. IMPORTE O SERVIÇO E O MODELO
import { VeiculoService } from '../../Services/veiculo.service';
import { Veiculo } from '../../Models/veiculo.model';

@Component({
  selector: 'app-veiculos',
  standalone: true,
  imports: [ FormsModule, CommonModule ],
  templateUrl: './veiculos.component.html',
  styleUrls: ['./veiculos.component.css'],
})
export class VeiculosComponent implements OnInit {
  veiculos: Veiculo[] = [];
  isLoading = false;

  // Propriedades para controlar o formulário
  modoFormulario = false; // Controla a visibilidade do formulário
  veiculoEmEdicao: Partial<Veiculo> = {}; // Guarda os dados do form

  // 2. INJETE O SERVIÇO
  constructor(private veiculoService: VeiculoService) { }

  ngOnInit() {
    this.carregarVeiculos();
  }

  carregarVeiculos(): void {
    this.isLoading = true;
    // Lógica de integração comentada
    /*
    this.veiculoService.buscarVeiculos().subscribe(data => {
      this.veiculos = data;
      this.isLoading = false;
    });
    */

    // Dados estáticos
    this.veiculos = [
      { id: 1, placa: 'ABC-1234', modelo: 'Fiat Toro', tipo: 'Picape', ano: 2021, quilometragem: 20000, status: 'Disponível' },
      { id: 2, placa: 'DEF-5678', modelo: 'Toyota Hilux', tipo: 'Picape', ano: 2019, quilometragem: 50000, status: 'Em Manutenção' },
      { id: 3, placa: 'GHI-9012', modelo: 'Mercedes Sprinter', tipo: 'Van', ano: 2022, quilometragem: 15000, status: 'Inativo' },
    ];
    this.isLoading = false;
  }

  // MÉTODOS PARA CONTROLAR O FORMULÁRIO
  iniciarAdicao(): void {
    this.veiculoEmEdicao = { status: 'Disponível' }; // Limpa o objeto e define um status padrão
    this.modoFormulario = true; // Exibe o formulário
  }

  iniciarEdicao(veiculo: Veiculo): void {
    // Cria uma cópia do objeto para edição, para não alterar a lista diretamente
    this.veiculoEmEdicao = { ...veiculo };
    this.modoFormulario = true;
  }

  cancelarEdicao(): void {
    this.veiculoEmEdicao = {};
    this.modoFormulario = false;
  }

  salvarVeiculo(): void {
    if (!this.veiculoEmEdicao.placa || !this.veiculoEmEdicao.modelo) {
      alert('Placa e Modelo são obrigatórios!');
      return;
    }

    if (this.veiculoEmEdicao.id) {
      // --- LÓGICA DE ATUALIZAÇÃO ---
      // Lógica de integração comentada
      /*
      this.veiculoService.atualizarVeiculo(this.veiculoEmEdicao.id, this.veiculoEmEdicao).subscribe(() => {
        this.carregarVeiculos();
      });
      */
      
      // Lógica estática
      const index = this.veiculos.findIndex(v => v.id === this.veiculoEmEdicao.id);
      if (index > -1) {
        this.veiculos[index] = this.veiculoEmEdicao as Veiculo;
      }
      alert('Veículo atualizado (estático)!');

    } else {
      // --- LÓGICA DE CRIAÇÃO ---
      // Lógica de integração comentada
      /*
      this.veiculoService.adicionarVeiculo(this.veiculoEmEdicao).subscribe(() => {
        this.carregarVeiculos();
      });
      */

      // Lógica estática
      this.veiculoEmEdicao.id = Date.now(); // Simula um novo ID
      this.veiculos.push(this.veiculoEmEdicao as Veiculo);
      alert('Veículo adicionado (estático)!');
    }

    this.cancelarEdicao(); // Esconde o formulário após salvar
  }

  alternarStatus(veiculo: Veiculo): void {
    const novoStatus = veiculo.status === 'Inativo' ? 'Disponível' : 'Inativo';

    // Lógica de integração comentada
    /*
    this.veiculoService.atualizarStatus(veiculo.id, novoStatus).subscribe(() => {
      veiculo.status = novoStatus;
    });
    */

    // Lógica estática
    veiculo.status = novoStatus;
    alert(`Status do veículo ${veiculo.placa} alterado para ${novoStatus} (estático)!`);
  }
}