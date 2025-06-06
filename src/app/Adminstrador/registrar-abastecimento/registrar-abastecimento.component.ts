import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-registrar-abastecimento',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './registrar-abastecimento.component.html',
  styleUrls: ['./registrar-abastecimento.component.css'],
})

export class RegistrarAbastecimentoComponent {
  veiculo = '';
  data = '';
  tipoCombustivel = '';
  valor = 0;
  quilometragem = 0;
  motorista = '';

  registrar() {
    if (!this.veiculo || !this.data || !this.tipoCombustivel || !this.valor || !this.quilometragem || !this.motorista) {
      alert('Preencha todos os campos obrigatórios!');
      return;
    }
    alert('Abastecimento registrado com sucesso!');
    this.veiculo = '';
    this.data = '';
    this.tipoCombustivel = '';
    this.valor = 0;
    this.quilometragem = 0;
    this.motorista = '';
  }
}