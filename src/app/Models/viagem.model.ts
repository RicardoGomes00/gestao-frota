import { Veiculo } from './veiculo.model';
import { Motorista } from './motorista.model';

export interface Viagem {
  id: number;
  destino: string;
  justificativa: string;
  
  dataSaidaAgendada: string;

  dataRetornoEfetiva?: string; 
  status: 'AGENDADO' | 'EM_USO' | 'FINALIZADO';
  quilometragemInicial?: number;
  quilometragemFinal?: number;
  
  veiculo?: Veiculo;
  motorista?: Motorista;
}
