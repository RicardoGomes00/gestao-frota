import { Veiculo } from './veiculo.model';
import { Motorista } from './motorista.model';

export interface Abastecimento {
  id: number;
  dataAbastecimento: string;
  tipoCombustivel: string;
  valorTotal: number;
  quilometragemNoAbastecimento: number;
  
  veiculo?: Veiculo;
  motorista?: Motorista;
}
