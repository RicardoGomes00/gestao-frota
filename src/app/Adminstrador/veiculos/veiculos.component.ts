import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

import { VeiculoService } from '../../Services/veiculo.service';
import { Veiculo } from '../../Models/veiculo.model';

@Component({
  selector: 'app-veiculos',
  standalone: true,
  imports: [ FormsModule, CommonModule, NgxMaskDirective ],
  providers: [provideNgxMask()], 
  templateUrl: './veiculos.component.html',
  styleUrls: ['./veiculos.component.css'],
})
export class VeiculosComponent implements OnInit {
  veiculos: Veiculo[] = [];
  isLoading = false;
  error: string | null = null;

  modoFormulario = false;
  veiculoEmEdicao: Partial<Veiculo> = {};

  constructor(private veiculoService: VeiculoService) { }

  ngOnInit() {
    this.carregarVeiculos();
  }

  carregarVeiculos(): void {
    this.isLoading = true;
    this.error = null;

    this.veiculoService.buscarVeiculos().subscribe({
      next: (data) => {
        this.veiculos = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = "Falha ao carregar a lista de veículos.";
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  iniciarAdicao(): void {
    this.veiculoEmEdicao = { status: 'Disponível' };
    this.modoFormulario = true;
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  }

  iniciarEdicao(veiculo: Veiculo): void {
    this.veiculoEmEdicao = { ...veiculo };
    this.modoFormulario = true;
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
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
      this.veiculoService.atualizarVeiculo(this.veiculoEmEdicao.id, this.veiculoEmEdicao).subscribe({
        next: () => {
          alert('Veículo atualizado com sucesso!');
          this.cancelarEdicao();
          this.carregarVeiculos();
        },
        error: (err) => {
          alert('Erro ao atualizar veículo.');
          console.error(err);
        }
      });
    } else {
      this.veiculoService.adicionarVeiculo(this.veiculoEmEdicao).subscribe({
        next: () => {
          alert('Veículo adicionado com sucesso!');
          this.cancelarEdicao();
          this.carregarVeiculos();
        },
        error: (err) => {
          alert('Erro ao adicionar veículo. Verifique se a placa já existe.');
          console.error(err);
        }
      });
    }
  }

  alternarStatus(veiculo: Veiculo): void {
    const novoStatus = veiculo.status === 'Inativo' ? 'Disponível' : 'Inativo';

    if (confirm(`Tem certeza que deseja alterar o status do veículo ${veiculo.placa} para "${novoStatus}"?`)) {
      this.veiculoService.atualizarStatus(veiculo.id, novoStatus).subscribe({
        next: () => {
          alert('Status alterado com sucesso!');
          
          veiculo.status = novoStatus; 
        },
        error: (err) => {
          alert('Erro ao alterar o status do veículo.');
          console.error(err);
        }
      });
    }
  }
}
