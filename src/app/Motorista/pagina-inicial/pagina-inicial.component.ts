import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pagina-inicial',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './pagina-inicial.component.html',
  styleUrls: ['./pagina-inicial.component.css']
})
export class PaginaInicialComponent implements OnInit {
  agendamentos: any[] = [];

  ngOnInit() {
    const motoristaId = '123'; // simula o motorista logado

    const mockAgendamentos = [
      {
        idMotorista: '123',
        data: new Date('2025-06-07T08:00:00'),
        veiculo: 'Ford Ranger',
        destino: 'São Paulo',
        status: 'AGENDADO'
      },
      {
        idMotorista: '123',
        data: new Date('2025-06-05T10:00:00'),
        veiculo: 'Fiat Toro',
        destino: 'Campinas',
        status: 'EM USO'
      },
      {
        idMotorista: '123',
        data: new Date('2025-06-03T14:00:00'),
        veiculo: 'Hilux',
        destino: 'Santos',
        status: 'FINALIZADO'
      }
    ];

    this.agendamentos = mockAgendamentos
      .filter(a => a.idMotorista === motoristaId)
      .sort((a, b) => a.data.getTime() - b.data.getTime());
  }

  iniciarViagem(agendamento: any) {
    alert(`Iniciando viagem para: ${agendamento.destino}`);
  }

  finalizarViagem(agendamento: any) {
    alert(`Finalizando viagem para: ${agendamento.destino}`);
  }

  verDetalhes(agendamento: any) {
    alert(`Visualizando detalhes da viagem para: ${agendamento.destino}`);
  }

}
