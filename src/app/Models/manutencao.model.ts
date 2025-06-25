import { Veiculo } from './veiculo.model';

export interface Manutencao {
  id: number;
  data: string; // ou Date
  tipo: 'Preventiva' | 'Corretiva';
  descricao: string;
  valor: number;
  quilometragem: number;

  veiculoId: number;

  veiculo?: Veiculo;
}