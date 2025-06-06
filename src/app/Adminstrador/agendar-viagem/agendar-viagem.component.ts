import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-agendar-viagem',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './agendar-viagem.component.html',
  styleUrls: ['./agendar-viagem.component.css'],
})

export class AgendarViagemComponent {
  veiculo = '';
  motorista = '';
  dataHoraSaida = '';
  destino = '';
  justificativa = '';

  agendar() {
    if (!this.veiculo || !this.motorista || !this.dataHoraSaida || !this.destino) {
      alert('Preencha todos os campos obrigatórios!');
      return;
    }

    const novoAgendamento = {
      veiculo: this.veiculo,
      motorista: this.motorista,
      dataHoraSaida: new Date(this.dataHoraSaida),
      destino: this.destino,
      justificativa: this.justificativa,
      status: 'AGENDADO',
    };

    console.log('Agendamento criado:', novoAgendamento);
    alert('Viagem agendada com sucesso!');

    this.veiculo = '';
    this.motorista = '';
    this.dataHoraSaida = '';
    this.destino = '';
    this.justificativa = '';
  }
}