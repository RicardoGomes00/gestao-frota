import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Motorista {
  id: number;
  nome: string;
  cpf: string;
  cnh: string;
  validadeCnh: string;
  telefone: string;
  endereco: string;
  email: string;
  ativo: boolean;
}

@Component({
  selector: 'app-motoristas',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './motoristas.component.html',
  styleUrls: ['./motoristas.component.css'],
})

export class MotoristasComponent implements OnInit {
  motoristas: Motorista[] = [];
  novoMotorista: Partial<Motorista> = {};

  ngOnInit() {
    this.motoristas = [
      { id: 1, nome: 'Carlos Silva', cpf: '123.456.789-00', cnh: 'AB123456', validadeCnh: '2027-12-31', telefone: '11999999999', endereco: 'Rua X, 123', email: 'carlos@email.com', ativo: true },
      { id: 2, nome: 'Ana Paula', cpf: '987.654.321-00', cnh: 'CD987654', validadeCnh: '2024-06-15', telefone: '11988888888', endereco: 'Rua Y, 456', email: 'ana@email.com', ativo: true },
    ];
  }

  adicionarMotorista() {
    if (!this.novoMotorista.nome || !this.novoMotorista.cpf || !this.novoMotorista.cnh || !this.novoMotorista.validadeCnh) {
      alert('Preencha todos os campos obrigatórios!');
      return;
    }

    this.motoristas.push({
      id: Date.now(),
      nome: this.novoMotorista.nome,
      cpf: this.novoMotorista.cpf,
      cnh: this.novoMotorista.cnh,
      validadeCnh: this.novoMotorista.validadeCnh,
      telefone: this.novoMotorista.telefone || '',
      endereco: this.novoMotorista.endereco || '',
      email: this.novoMotorista.email || '',
      ativo: true,
    });

    this.novoMotorista = {};
  }

  inativarMotorista(motorista: Motorista) {
    if (motorista.id === 1) { // Exemplo: não remover a si mesmo
      alert('Não é permitido inativar o administrador atual.');
      return;
    }
    motorista.ativo = false;
  }
}