import { Veiculo } from './veiculo.model';
import { Motorista } from './motorista.model';

export interface Abastecimento {
  id: number;
  data: string; // ou Date
  tipoCombustivel: string;
  valor: number;
  quilometragem: number;
  
  veiculoId: number;
  motoristaId: number;
  
  veiculo?: Veiculo;
  motorista?: Motorista;
}