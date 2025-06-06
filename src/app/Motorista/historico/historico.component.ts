import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-historico',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './historico.component.html',
  styleUrl: './historico.component.css'
})

export class HistoricoComponent {
  historico: any[] = [];

  ngOnInit() {
    const motoristaId = '123'; // simula login

    // Simulação de histórico de viagens
    this.historico = [
      {
        veiculo: 'Fiat Toro',
        destino: 'Campinas',
        dataSaida: new Date('2025-06-01T08:00:00'),
        dataRetorno: new Date('2025-06-01T18:00:00'),
        kmInicial: 12000,
        kmFinal: 12100
      },
      {
        veiculo: 'Hilux',
        destino: 'Santos',
        dataSaida: new Date('2025-05-28T09:30:00'),
        dataRetorno: new Date('2025-05-28T16:00:00'),
        kmInicial: 8000,
        kmFinal: 8100
      }
    ];
  }
}