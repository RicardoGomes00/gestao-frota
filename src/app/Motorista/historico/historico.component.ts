import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ViagemService } from '../../Services/viagem.service';
import { Viagem } from '../../Models/viagem.model';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-historico',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css']
})
export class HistoricoComponent implements OnInit {
  historico: Viagem[] = [];
  isLoading = false;
  error: string | null = null;

  constructor(
    private viagemService: ViagemService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.carregarHistorico();
  }

  carregarHistorico(): void {
    this.isLoading = true;
    this.error = null;

    const motoristaId = this.authService.getUsuarioId();
    if (!motoristaId) {
      this.error = 'Usuário não autenticado.';
      this.isLoading = false;
      return;
    }

    this.viagemService.buscarHistoricoMotorista(motoristaId).subscribe({
      next: (data) => {
        this.historico = data.sort(
          (a, b) => new Date(b.dataSaidaAgendada).getTime() - new Date(a.dataSaidaAgendada).getTime()
        );
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Não foi possível carregar o histórico de viagens.';
        this.isLoading = false;
        console.error(err);
      }
    });
  }
}
