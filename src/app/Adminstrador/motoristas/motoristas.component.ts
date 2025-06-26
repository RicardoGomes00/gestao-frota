import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective, provideNgxMask, NgxMaskPipe } from 'ngx-mask';

import { MotoristaService } from '../../Services/motorista.service';
import { ViacepService } from '../../Services/viacep.service';
import { AuthService } from '../../Services/auth.service';
import { Motorista } from '../../Models/motorista.model';

@Component({
  selector: 'app-motoristas',
  standalone: true,
  imports: [ FormsModule, CommonModule, NgxMaskDirective, NgxMaskPipe ],
  providers: [provideNgxMask()],
  templateUrl: './motoristas.component.html',
  styleUrls: ['./motoristas.component.css'],
})
export class MotoristasComponent implements OnInit {
  motoristas: Motorista[] = [];
  modoFormulario = false;
  usuarioEmEdicao: Partial<Motorista> = {};
  isLoading = false;
  error: string | null = null;
  
  constructor(
    private motoristaService: MotoristaService,
    private viacepService: ViacepService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.carregarMotoristas();
  }

  carregarMotoristas(): void { 
    this.isLoading = true;
    this.error = null;
    
    this.motoristaService.buscarMotoristas().subscribe({
      next: (data) => {
        this.motoristas = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = "Falha ao carregar a lista de usuários.";
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  iniciarAdicao(): void {
    this.usuarioEmEdicao = { perfil: 'MOTORISTA', ativo: true };
    this.modoFormulario = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  iniciarEdicao(usuario: Motorista): void {
    this.usuarioEmEdicao = { ...usuario };
    this.modoFormulario = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  cancelarEdicao(): void {
    this.usuarioEmEdicao = {};
    this.modoFormulario = false;
  }

  consultarCep(): void {
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
        error: (err) => alert('Erro ao consultar o CEP.')
      });
    }
  }

  salvarUsuario(): void {
    if (!this.usuarioEmEdicao.nomeCompleto || !this.usuarioEmEdicao.email) {
      alert('Nome e E-mail são obrigatórios!');
      return;
    }

    if (!this.usuarioEmEdicao.id && (!this.usuarioEmEdicao.senha || this.usuarioEmEdicao.senha.trim() === '')) {
      alert('A Senha é obrigatória para criar um novo usuário!');
      return;
    }

    if (this.usuarioEmEdicao.id) {
      this.motoristaService.atualizarMotorista(this.usuarioEmEdicao.id, this.usuarioEmEdicao).subscribe({
        next: () => {
          alert('Usuário atualizado com sucesso!');
          this.cancelarEdicao();
          this.carregarMotoristas();
        },
        error: (err) => {
          alert('Erro ao atualizar usuário.');
          console.error(err);
        }
      });
    } else {
      this.motoristaService.adicionarMotorista(this.usuarioEmEdicao).subscribe({
        next: () => {
          alert('Usuário adicionado com sucesso!');
          this.cancelarEdicao();
          this.carregarMotoristas();
        },
        error: (err) => {
          alert('Erro ao adicionar usuário.');
          console.error(err);
        }
      });
    }
  }

  inativarMotorista(motorista: Motorista): void {


    if (confirm(`Tem certeza que deseja inativar o usuário ${motorista.nomeCompleto}?`)) {
      this.motoristaService.inativarMotorista(motorista.id).subscribe({
        next: () => {
          alert('Usuário inativado com sucesso!');
          this.carregarMotoristas(); 
        },
        error: (err) => {
          alert('Erro ao inativar usuário.');
          console.error(err);
        }
      });
    }
  }
}
