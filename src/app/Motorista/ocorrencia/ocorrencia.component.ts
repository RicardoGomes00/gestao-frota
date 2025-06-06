import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ocorrencia',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './ocorrencia.component.html',
  styleUrl: './ocorrencia.component.css'
})
export class OcorrenciaComponent {
  veiculo: string = '';
  descricao: string = '';

  enviarOcorrencia() {
    if (!this.veiculo || !this.descricao) {
      alert('Preencha todos os campos.');
      return;
    }

    const ocorrencia = {
      veiculo: this.veiculo,
      descricao: this.descricao,
      data: new Date()
    };

    console.log('Ocorrência enviada:', ocorrencia);
    alert('Ocorrência registrada com sucesso!');
    this.veiculo = '';
    this.descricao = '';
  }
}