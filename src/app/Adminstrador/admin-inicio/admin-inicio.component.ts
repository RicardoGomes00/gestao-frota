import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


interface Agendamento {
  id: number;
  motorista: string;
  veiculo: string;
  destino: string;
  dataHoraSaida: Date;
  status: 'PENDENTE' | 'EM USO' | 'FINALIZADO' | string;
}

@Component({
  selector: 'app-admin-inicio',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './admin-inicio.component.html',
  styleUrls: ['./admin-inicio.component.css'],
})

export class AdminInicioComponent implements OnInit {
  agendamentos: Agendamento[] = [];
  filtroMotorista: string = '';
  filtroStatus: string = '';
  filtroDataInicio?: string;
  filtroDataFim?: string;

  ngOnInit() {
    // Dados dummy
    this.agendamentos = [
      { id: 1, motorista: 'Carlos Silva', veiculo: 'Fiat Toro', destino: 'São Paulo', dataHoraSaida: new Date('2025-06-10T08:00'), status: 'PENDENTE' },
      { id: 2, motorista: 'Ana Paula', veiculo: 'Hilux', destino: 'Campinas', dataHoraSaida: new Date('2025-06-09T10:30'), status: 'EM USO' },
      { id: 3, motorista: 'João Lima', veiculo: 'Gol', destino: 'Santos', dataHoraSaida: new Date('2025-06-05T07:00'), status: 'FINALIZADO' },
    ];
  }

  filtrarAgendamentos() {
    return this.agendamentos.filter(a => {
      let okMotorista = this.filtroMotorista ? a.motorista.toLowerCase().includes(this.filtroMotorista.toLowerCase()) : true;
      let okStatus = this.filtroStatus ? a.status === this.filtroStatus : true;
      let okData = true;

      if (this.filtroDataInicio) {
        okData = okData && (a.dataHoraSaida >= new Date(this.filtroDataInicio));
      }
      if (this.filtroDataFim) {
        okData = okData && (a.dataHoraSaida <= new Date(this.filtroDataFim));
      }
      return okMotorista && okStatus && okData;
    });
  }

  acaoBotao(agendamento: Agendamento) {
    switch (agendamento.status) {
      case 'PENDENTE':
        alert(`Agendar Viagem: id ${agendamento.id}`);
        break;
      case 'EM USO':
        alert(`Registrar Abastecimento: id ${agendamento.id}`);
        break;
      case 'FINALIZADO':
        alert(`Registrar Manutenção: id ${agendamento.id}`);
        break;
    }
  }
}
