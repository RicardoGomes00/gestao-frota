import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MotoristaService } from '../../Services/motorista.service';
import { ViacepService } from '../../Services/viacep.service';
import { AuthService } from '../../Services/auth.service';
import { Motorista } from '../../Models/motorista.model';

@Component({
  selector: 'app-motoristas',
  standalone: true,
  imports: [ FormsModule, CommonModule ],
  templateUrl: './motoristas.component.html',
  styleUrls: ['./motoristas.component.css'],
})
export class MotoristasComponent implements OnInit {
  motoristas: Motorista[] = [];

  // Propriedades para controlar o formulário
  modoFormulario = false;
  usuarioEmEdicao: Partial<Motorista> = {};

  isLoading = false;
  error: string | null = null;
  
  constructor(
    private motoristaService: MotoristaService,
    private viacepService: ViacepService,
    private authService: AuthService
  ) {}

  ngOnInit() { this.carregarMotoristas(); }

  carregarMotoristas(): void { 
    this.isLoading = true;
    
    // Lógica de integração comentada
    /*
    this.motoristaService.buscarMotoristas().subscribe({ ... });
    */

    // ==================================================================
    //           EXEMPLO ESTÁTICO ADICIONADO AQUI
    // ==================================================================
    const mockMotoristas: Motorista[] = [
      { 
        id: 1, 
        nome: 'Admin Principal', 
        cpf: '111.111.111-11', 
        cnh: '123456789', 
        validadeCnh: '2030-12-20', 
        telefone: '(41) 99999-0001', 
        email: 'admin@frota.com', 
        ativo: true,
        perfil: 'ADMIN',
        cep: '80010-010',
        logradouro: 'Rua das Flores',
        numero: '100',
        bairro: 'Centro',
        cidade: 'Curitiba',
        uf: 'PR'
      },
      { 
        id: 2, 
        nome: 'Carlos de Souza', 
        cpf: '222.222.222-22', 
        cnh: '987654321', 
        validadeCnh: '2028-05-15', 
        telefone: '(41) 98888-0002', 
        email: 'carlos.souza@email.com', 
        ativo: true,
        perfil: 'MOTORISTA',
        cep: '80230-010',
        logradouro: 'Avenida Sete de Setembro',
        numero: '2000',
        bairro: 'Centro',
        cidade: 'Curitiba',
        uf: 'PR'
      },
      { 
        id: 3, 
        nome: 'Ana Beatriz Lima', 
        cpf: '333.333.333-33', 
        cnh: '555444333', 
        validadeCnh: '2026-10-01', 
        telefone: '(41) 97777-0003', 
        email: 'ana.lima@email.com', 
        ativo: false, // Exemplo de usuário inativo
        perfil: 'MOTORISTA',
        cep: '81020-430',
        logradouro: 'Avenida República Argentina',
        numero: '300',
        bairro: 'Água Verde',
        cidade: 'Curitiba',
        uf: 'PR'
      }
    ];
    this.motoristas = mockMotoristas;
    // ==================================================================

    this.isLoading = false;
  }

  // --- MÉTODOS PARA CONTROLAR O FORMULÁRIO ---

  iniciarAdicao(): void {
    this.usuarioEmEdicao = { perfil: 'MOTORISTA', numero: '' }; // Prepara um objeto limpo
    this.modoFormulario = true; // Exibe o formulário
  }

  iniciarEdicao(usuario: Motorista): void {
    this.usuarioEmEdicao = { ...usuario }; // Copia os dados do usuário para o formulário
    this.modoFormulario = true; // Exibe o formulário em modo de edição
  }

  cancelarEdicao(): void {
    this.usuarioEmEdicao = {}; // Limpa o objeto do formulário
    this.modoFormulario = false; // Esconde o formulário
  }

  // --- LÓGICA DE INTEGRAÇÃO (ViaCEP ATIVO) ---

  consultarCep(): void {
    // IMPORTANTE: usamos 'usuarioEmEdicao' aqui agora
    const cep = this.usuarioEmEdicao.cep?.replace(/\D/g, ''); 

    if (cep && cep.length === 8) {
      this.viacepService.consultarCep(cep).subscribe({
        next: (dados) => {
          if (dados.erro) {
            alert('CEP não encontrado.');
          } else {
            this.usuarioEmEdicao.logradouro = dados.logradouro;
            this.usuarioEmEdicao.bairro = dados.bairro;
            this.usuarioEmEdicao.cidade = dados.localidade;
            this.usuarioEmEdicao.uf = dados.uf;
          }
        },
        error: (err) => {
          alert('Erro ao consultar o CEP.');
          console.error(err);
        }
      });
    }
  }

  // --- MÉTODOS DE AÇÃO ---

  salvarUsuario(): void {
    // Validação dos campos obrigatórios
    if (!this.usuarioEmEdicao.nome || !this.usuarioEmEdicao.email || !this.usuarioEmEdicao.senha) {
      alert('Nome, E-mail e Senha são obrigatórios!');
      return;
    }

    if (this.usuarioEmEdicao.id) {
      // --- LÓGICA DE ATUALIZAÇÃO (EDIÇÃO) ---
      /*
      this.motoristaService.atualizarMotorista(this.usuarioEmEdicao.id, this.usuarioEmEdicao).subscribe(() => {
        this.carregarMotoristas();
      });
      */
      const index = this.motoristas.findIndex(m => m.id === this.usuarioEmEdicao.id);
      if (index > -1) this.motoristas[index] = this.usuarioEmEdicao as Motorista;
      alert('Usuário atualizado (estático)!');

    } else {
      // --- LÓGICA DE CRIAÇÃO ---
      /*
      this.motoristaService.adicionarMotorista(this.usuarioEmEdicao).subscribe(() => {
        this.carregarMotoristas();
      });
      */
      this.usuarioEmEdicao.id = Date.now();
      this.motoristas.push(this.usuarioEmEdicao as Motorista);
      alert('Usuário adicionado (estático)!');
    }
    this.cancelarEdicao();
  }

  inativarMotorista(motorista: Motorista): void {
    // ... (lógica para inativar motorista permanece a mesma) ...
  }
}