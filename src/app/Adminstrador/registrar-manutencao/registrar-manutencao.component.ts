import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-registrar-manutencao',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './registrar-manutencao.component.html',
  styleUrls: ['./registrar-manutencao.component.css'],
})

export class RegistrarManutencaoComponent {
  data = '';
  tipo = '';
  descricao = '';
  valor = 0;
  quilometragem = 0;

  registrar() {
    if (!this.data || !this.tipo || !this.descricao || !this.valor || !this.quilometragem) {
      alert('Preencha todos os campos obrigatórios!');
      return;
    }
    alert('Manutenção registrada com sucesso!');
    this.data = '';
    this.tipo = '';
    this.descricao = '';
    this.valor = 0;
    this.quilometragem = 0;
  }
}