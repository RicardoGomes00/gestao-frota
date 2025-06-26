import { Veiculo } from './veiculo.model';

export interface Manutencao {
  id: number;
  dataInicio: string;
  dataFim?: string;
  descricaoServico: string;
  custo: number;
  quilometragem: number;
  
  veiculo?: Veiculo;
}
