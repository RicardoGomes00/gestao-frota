import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Veiculo {
  id: number;
  placa: string;
  modelo: string;
  tipo: string;
  ano: number;
  quilometragem: number;
  status: 'Disponível' | 'Inativo' | 'Em Manutenção' | string;
}

@Component({
  selector: 'app-veiculos',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './veiculos.component.html',
  styleUrls: ['./veiculos.component.css'],
})

export class VeiculosComponent implements OnInit {
  veiculos: Veiculo[] = [];

  ngOnInit() {
    this.veiculos = [
      { id: 1, placa: 'ABC-1234', modelo: 'Fiat Toro', tipo: 'Carro', ano: 2021, quilometragem: 20000, status: 'Disponível' },
      { id: 2, placa: 'DEF-5678', modelo: 'Hilux', tipo: 'Caminhonete', ano: 2019, quilometragem: 50000, status: 'Em Manutenção' },
    ];
  }

  alternarStatus(veiculo: Veiculo) {
    if (veiculo.status === 'Inativo') {
      veiculo.status = 'Disponível';
    } else {
      veiculo.status = 'Inativo';
    }
  }
}