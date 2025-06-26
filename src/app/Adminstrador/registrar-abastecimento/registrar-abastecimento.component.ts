import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// 1. IMPORTE OS SERVIÇOS E MODELOS
import { AbastecimentoService } from '../../Services/abastecimento.service';
import { VeiculoService } from '../../Services/veiculo.service';
import { MotoristaService } from '../../Services/motorista.service';
import { Abastecimento } from '../../Models/abastecimento.model';
import { Veiculo } from '../../Models/veiculo.model';
import { Motorista } from '../../Models/motorista.model';

@Component({
  selector: 'app-registrar-abastecimento',
  standalone: true,
  imports: [ FormsModule, CommonModule ],
  templateUrl: './registrar-abastecimento.component.html',
  styleUrls: ['./registrar-abastecimento.component.css'],
})
export class RegistrarAbastecimentoComponent implements OnInit {
  // Listas de dados
  abastecimentos: Abastecimento[] = [];
  veiculosDisponiveis: Veiculo[] = [];
  motoristasDisponiveis: Motorista[] = [];
  
  // Objeto para o formulário
  novoRegistro: Partial<Abastecimento> = {};

  isLoading = false;

  // 2. INJETE TODOS OS SERVIÇOS NECESSÁRIOS
  constructor(
    private abastecimentoService: AbastecimentoService,
    private veiculoService: VeiculoService,
    private motoristaService: MotoristaService
  ) {}

  ngOnInit() {
    this.carregarDados();
  }

  carregarDados(): void {
    this.isLoading = true;
    
    // Simula o carregamento de todos os dados necessários
    this.carregarAbastecimentos();
    this.carregarVeiculos();
    this.carregarMotoristas();

    this.isLoading = false;
  }

  carregarAbastecimentos(): void {
    // Lógica de integração comentada
    /*
    this.abastecimentoService.buscarAbastecimentos().subscribe(data => {
      this.abastecimentos = data;
    });
    */
    // Lógica estática
    this.abastecimentos = [
      { id: 1, veiculoId: 1, motoristaId: 2, data: '2025-06-24', tipoCombustivel: 'Gasolina', valor: 250.50, quilometragem: 20500, veiculo: { id: 1, placa: 'ABC-1234', modelo: 'Fiat Toro', tipo: '', ano: 0, quilometragemAtual: 0, status: 'Disponível' }, motorista: { id: 2, nomeCompleto: 'Carlos de Souza', cpf: '', cnhNumero: '', cnhValidade: '', telefone: '', email: '', ativo: true, perfil: 'MOTORISTA', cep: '', logradouro: '', numero: '', bairro: '', cidade: '', uf: '' } },
      { id: 2, veiculoId: 2, motoristaId: 2, data: '2025-06-20', tipoCombustivel: 'Diesel', valor: 350.00, quilometragem: 50200, veiculo: { id: 2, placa: 'DEF-5678', modelo: 'Toyota Hilux', tipo: '', ano: 0, quilometragemAtual: 0, status: 'Disponível' }, motorista: { id: 2, nomeCompleto: 'Carlos de Souza', cpf: '', cnhNumero: '', cnhValidade: '', telefone: '', email: '', ativo: true, perfil: 'MOTORISTA', cep: '', logradouro: '', numero: '', bairro: '', cidade: '', uf: '' } }
    ];
  }

  carregarVeiculos(): void {
    // Lógica de integração comentada
    /*
    this.veiculoService.buscarVeiculos().subscribe(data => {
      this.veiculosDisponiveis = data.filter(v => v.status !== 'Inativo');
    });
    */
    // Lógica estática
    this.veiculosDisponiveis = [
      { id: 1, placa: 'ABC-1234', modelo: 'Fiat Toro', tipo: 'Picape', ano: 2021, quilometragemAtual: 20000, status: 'Disponível' },
      { id: 2, placa: 'DEF-5678', modelo: 'Toyota Hilux', tipo: 'Picape', ano: 2019, quilometragemAtual: 50000, status: 'Em Manutenção' },
    ];
  }

  carregarMotoristas(): void {
    // Lógica de integração comentada
    /*
    this.motoristaService.buscarMotoristas().subscribe(data => {
      this.motoristasDisponiveis = data.filter(m => m.ativo);
    });
    */
    // Lógica estática
    this.motoristasDisponiveis = [
      { id: 1, nomeCompleto: 'Admin Principal', perfil: 'ADMIN', ativo: true, cpf: '', cnhNumero: '', cnhValidade: '', telefone: '', email: '', cep: '', logradouro: '', numero: '', bairro: '', cidade: '', uf: '' },
      { id: 2, nomeCompleto: 'Carlos de Souza', perfil: 'MOTORISTA', ativo: true, cpf: '', cnhNumero: '', cnhValidade: '', telefone: '', email: '', cep: '', logradouro: '', numero: '', bairro: '', cidade: '', uf: '' },
    ];
  }

  salvarRegistro(): void {
    if (!this.novoRegistro.veiculoId || !this.novoRegistro.data || !this.novoRegistro.valor) {
      alert('Veículo, Data e Valor são obrigatórios!');
      return;
    }

    // Lógica de integração comentada
    /*
    this.abastecimentoService.registrarAbastecimento(this.novoRegistro).subscribe(() => {
      alert('Abastecimento registrado com sucesso!');
      this.novoRegistro = {}; // Limpa o formulário
      this.carregarAbastecimentos(); // Atualiza a lista
    });
    */
    
    // Lógica estática
    alert('Abastecimento registrado (estático)!');
    this.novoRegistro = {}; // Limpa o formulário
  }
}